"use client";

import { useState } from "react";
import Link from "next/link";
import DesignShell from "@/components/design/DesignShell";

const CTRL = [
  { name: "style", label: "Style", options: ["Cinematic", "Documentary", "Vlog", "Anime", "Luxury", "Retro"] },
  { name: "camera", label: "Camera Movement", options: ["Static", "Slow push-in", "Orbit", "Handheld", "Crane up", "Dolly zoom"] },
  { name: "lighting", label: "Lighting", options: ["Natural", "Golden hour", "Neon", "Studio softbox", "Moody low-key", "High-key"] },
  { name: "pacing", label: "Pacing", options: ["Calm", "Energetic", "Fast cuts", "Dramatic"] },
];
const EFFECTS = ["Bokeh", "Lens flare", "Film grain", "Slow motion", "Color grade", "Depth of field"];

export default function PromptBuilderPage() {
  const [subject, setSubject] = useState("");
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(CTRL.map((c) => [c.name, c.options[0]])));
  const [fx, setFx] = useState<string[]>(["Bokeh", "Color grade"]);
  const [out, setOut] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleFx = (e: string) => setFx((p) => (p.includes(e) ? p.filter((x) => x !== e) : [...p, e]));

  const build = () => {
    const s = subject.trim() || "a product on a clean surface";
    const prompt = `${vals.style} shot of ${s}, ${vals.camera.toLowerCase()} camera movement, ${vals.lighting.toLowerCase()} lighting, ${vals.pacing.toLowerCase()} pacing${fx.length ? `, with ${fx.map((x) => x.toLowerCase()).join(", ")}` : ""}. Ultra-detailed, 4K, professional color grade, natural motion, high production value.`;
    setOut(prompt);
  };
  const copy = () => { try { navigator.clipboard?.writeText(out); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1600); };

  return (
    <DesignShell glow="radial-gradient(900px 450px at 50% -10%,rgba(225,29,42,.2),transparent 65%)">
      <section className="mx-auto max-w-[900px] px-6 pb-2 pt-10 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff5663" }}>AI Prompt Builder</div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Build the <span style={{ color: "#ff2d3f" }}>perfect prompt</span></h1>
        <p className="mx-auto mt-3 max-w-[460px] text-[16px]" style={{ color: "#a99a9c" }}>Simple controls — Reelo writes the advanced prompt for you.</p>
      </section>

      <section className="mx-auto grid max-w-[900px] gap-6 px-6 pb-16 pt-8 lg:grid-cols-2">
        {/* controls */}
        <div className="space-y-5 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/85">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. a luxury watch on marble" className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none" style={{ border: "1px solid rgba(255,70,85,.22)", background: "rgba(255,60,75,.04)" }} />
          </div>
          {CTRL.map((c) => (
            <div key={c.name}>
              <label className="mb-2 block text-sm font-semibold text-white/85">{c.label}</label>
              <select value={vals[c.name]} onChange={(e) => setVals((v) => ({ ...v, [c.name]: e.target.value }))} className="w-full appearance-none rounded-xl px-4 py-3 text-sm text-white outline-none" style={{ border: "1px solid rgba(255,70,85,.22)", background: "rgba(255,60,75,.04)" }}>
                {c.options.map((o) => <option key={o} className="bg-[#140a0c]">{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/85">Effects</label>
            <div className="flex flex-wrap gap-2">
              {EFFECTS.map((e) => { const on = fx.includes(e); return <button key={e} onClick={() => toggleFx(e)} className="rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors" style={on ? { background: "linear-gradient(135deg,#ff3645,#c4101c)", color: "#fff" } : { border: "1px solid rgba(255,70,85,.2)", color: "#b9a9ab" }}>{e}</button>; })}
            </div>
          </div>
          <button onClick={build} className="w-full rounded-full px-6 py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.01]" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 28px -8px rgba(225,29,42,.6)" }}>Build Prompt</button>
        </div>

        {/* output */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between"><span className="font-display font-bold">Generated Prompt</span>{out && <button onClick={copy} className="rounded-lg px-3 py-1.5 text-xs font-semibold" style={{ border: "1px solid rgba(255,70,85,.3)", color: copied ? "#5fd08a" : "#ff8a92" }}>{copied ? "Copied!" : "Copy"}</button>}</div>
          {out ? (
            <>
              <p className="rounded-xl p-4 text-sm leading-relaxed" style={{ border: "1px solid rgba(255,70,85,.15)", background: "rgba(255,60,75,.03)", color: "#e7dada" }}>{out}</p>
              <Link href="/create/website-commercial" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#ff5663" }}>Use in a studio →</Link>
            </>
          ) : (
            <div className="grid h-48 place-items-center rounded-xl text-center text-sm text-white/40" style={{ border: "1px dashed rgba(255,70,85,.2)" }}>Set your controls and hit Build Prompt.</div>
          )}
        </div>
      </section>
    </DesignShell>
  );
}
