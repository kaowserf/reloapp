"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };
type Wire = { pts: Pt[]; seg: number[]; len: number };
type Pulse = { wi: number; d: number; sp: number; w: number };

export default function CircuitBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let W = 0;
    let H = 0;
    let wires: Wire[] = [];
    let pads: Pt[] = [];
    let pulses: Pulse[] = [];

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      wires = [];
      pads = [];
      pulses = [];
      const grid = 44;
      const cols = Math.ceil(W / grid);
      const rows = Math.ceil(H / grid);
      const count = Math.max(16, Math.min(64, Math.floor((W * H) / 24000)));

      for (let i = 0; i < count; i++) {
        const pts: Pt[] = [];
        let cx = Math.floor(rnd(0, cols));
        let cy = Math.floor(rnd(0, rows));
        pts.push({ x: cx * grid, y: cy * grid });
        const steps = Math.floor(rnd(3, 7));
        let horiz = Math.random() < 0.5;
        for (let s = 0; s < steps; s++) {
          const dist = Math.floor(rnd(2, 7));
          if (horiz) cx += Math.random() < 0.5 ? dist : -dist;
          else cy += Math.random() < 0.5 ? dist : -dist;
          cx = Math.max(-2, Math.min(cols + 2, cx));
          cy = Math.max(-2, Math.min(rows + 2, cy));
          pts.push({ x: cx * grid, y: cy * grid });
          horiz = !horiz;
        }
        const seg: number[] = [];
        let len = 0;
        for (let k = 1; k < pts.length; k++) {
          const l = Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y);
          seg.push(l);
          len += l;
        }
        if (len < grid) continue;
        wires.push({ pts, seg, len });
        pads.push(pts[0], pts[pts.length - 1]);
      }

      const pc = Math.max(12, Math.min(52, Math.floor(wires.length * 0.85)));
      for (let i = 0; i < pc; i++) {
        const wi = Math.floor(rnd(0, wires.length));
        pulses.push({ wi, d: rnd(0, wires[wi]?.len ?? 0), sp: rnd(45, 130), w: rnd(1, 2.4) });
      }
    }

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function posOnWire(w: Wire, d: number): Pt {
      let rem = d;
      for (let k = 0; k < w.seg.length; k++) {
        if (rem <= w.seg[k]) {
          const t = w.seg[k] === 0 ? 0 : rem / w.seg[k];
          const a = w.pts[k];
          const b = w.pts[k + 1];
          return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
        rem -= w.seg[k];
      }
      const last = w.pts[w.pts.length - 1];
      return { x: last.x, y: last.y };
    }

    // double-thump "lub-dub" heartbeat, 0..1
    function beat(t: number) {
      const period = 1.15;
      const x = t % period;
      const b1 = Math.exp(-Math.pow((x - 0.06) / 0.05, 2));
      const b2 = Math.exp(-Math.pow((x - 0.3) / 0.07, 2)) * 0.8;
      return Math.min(1, b1 + b2);
    }

    const start = performance.now();
    let last = start;

    function draw(now: number) {
      const t = (now - start) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const hb = beat(t);

      // fade previous frame -> laser trails
      ctx!.fillStyle = "rgba(6,3,5,0.34)";
      ctx!.fillRect(0, 0, W, H);

      // heartbeat radial bloom (the "chip" core)
      const g = ctx!.createRadialGradient(W / 2, H * 0.46, 0, W / 2, H * 0.46, Math.max(W, H) * 0.62);
      g.addColorStop(0, `rgba(255,42,38,${0.05 + hb * 0.11})`);
      g.addColorStop(1, "rgba(255,42,38,0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);

      // traces
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = `rgba(255,58,46,${0.06 + hb * 0.1})`;
      for (const w of wires) {
        ctx!.beginPath();
        ctx!.moveTo(w.pts[0].x, w.pts[0].y);
        for (let k = 1; k < w.pts.length; k++) ctx!.lineTo(w.pts[k].x, w.pts[k].y);
        ctx!.stroke();
      }

      // junction pads
      for (const p of pads) {
        ctx!.fillStyle = `rgba(255,96,62,${0.12 + hb * 0.42})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx!.fill();
      }

      // travelling laser pulses
      ctx!.shadowColor = "rgba(255,64,42,0.9)";
      for (const pu of pulses) {
        const w = wires[pu.wi];
        if (!w) continue;
        pu.d += pu.sp * dt;
        if (pu.d > w.len) {
          pu.d = 0;
          pu.wi = Math.floor(Math.random() * wires.length);
        }
        const pos = posOnWire(w, pu.d);
        const bright = 0.5 + hb * 0.5;
        ctx!.shadowBlur = 8 + hb * 12;
        ctx!.fillStyle = `rgba(255,${120 + Math.floor(hb * 60)},90,${0.72 * bright})`;
        ctx!.beginPath();
        ctx!.arc(pos.x, pos.y, pu.w + hb * 0.9, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    if (reduce) {
      // paint a couple of static frames so something is visible
      draw(performance.now());
      draw(performance.now() + 16);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
