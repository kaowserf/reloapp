"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// double-thump "lub-dub" heartbeat, 0..1
function beat(t: number) {
  const period = 0.95;
  const x = t % period;
  const b1 = Math.exp(-Math.pow((x - 0.06) / 0.05, 2));
  const b2 = Math.exp(-Math.pow((x - 0.3) / 0.07, 2)) * 0.8;
  return Math.min(1, b1 + b2);
}

const HALF = 19; // board half-extent

type Poly = { points: THREE.Vector3[]; seg: number[]; len: number };

function useBoard() {
  return useMemo(() => {
    const dummy = new THREE.Object3D();

    // ---- circuit traces radiating from the central chip ----
    const traces: number[][][] = [];
    const TRACE_COUNT = 46;
    for (let i = 0; i < TRACE_COUNT; i++) {
      const ang = Math.random() * Math.PI * 2;
      let x = Math.cos(ang) * 1.7;
      let z = Math.sin(ang) * 1.7;
      const pts: number[][] = [[x, z]];
      const steps = 3 + Math.floor(Math.random() * 4);
      let horiz = Math.abs(Math.cos(ang)) > Math.abs(Math.sin(ang));
      for (let s = 0; s < steps; s++) {
        const len = 1.6 + Math.random() * 3.6;
        if (horiz) x += Math.sign(Math.cos(ang) || 1) * len * (0.6 + Math.random() * 0.8);
        else z += Math.sign(Math.sin(ang) || 1) * len * (0.6 + Math.random() * 0.8);
        x = Math.max(-HALF, Math.min(HALF, x));
        z = Math.max(-HALF, Math.min(HALF, z));
        pts.push([x, z]);
        horiz = !horiz;
      }
      traces.push(pts);
    }

    const segMatrices: THREE.Matrix4[] = [];
    const polylines: Poly[] = [];
    for (const pts of traces) {
      const poly: Poly = { points: [], seg: [], len: 0 };
      for (const p of pts) poly.points.push(new THREE.Vector3(p[0], 0.07, p[1]));
      for (let k = 1; k < pts.length; k++) {
        const ax = pts[k][0] - pts[k - 1][0];
        const az = pts[k][1] - pts[k - 1][1];
        const l = Math.hypot(ax, az);
        if (l < 0.01) continue;
        poly.seg.push(l);
        poly.len += l;
        const mx = (pts[k][0] + pts[k - 1][0]) / 2;
        const mz = (pts[k][1] + pts[k - 1][1]) / 2;
        dummy.position.set(mx, 0.06, mz);
        dummy.rotation.set(0, Math.atan2(-az, ax), 0);
        dummy.scale.set(l, 1, 1);
        dummy.updateMatrix();
        segMatrices.push(dummy.matrix.clone());
      }
      if (poly.len > 0.5) polylines.push(poly);
    }

    // ---- surface components (chips, capacitors) ----
    const compMatrices: THREE.Matrix4[] = [];
    for (let i = 0; i < 140; i++) {
      const x = (Math.random() * 2 - 1) * HALF;
      const z = (Math.random() * 2 - 1) * HALF;
      if (Math.hypot(x, z) < 3.2) continue;
      const w = 0.4 + Math.random() * 1.6;
      const d = 0.4 + Math.random() * 1.6;
      const h = 0.2 + Math.random() * 0.9;
      dummy.position.set(x, h / 2, z);
      dummy.rotation.set(0, Math.random() < 0.5 ? 0 : Math.PI / 2, 0);
      dummy.scale.set(w, h, d);
      dummy.updateMatrix();
      compMatrices.push(dummy.matrix.clone());
    }

    return { segMatrices, polylines, compMatrices };
  }, []);
}

function Instanced({
  matrices,
  children,
}: {
  matrices: THREE.Matrix4[];
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
  }, [matrices]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, matrices.length]} castShadow>
      {children}
    </instancedMesh>
  );
}

function Pulses({ polylines }: { polylines: Poly[] }) {
  const COUNT = 54;
  const ref = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const state = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        wi: Math.floor(Math.random() * polylines.length),
        d: Math.random() * 40,
        sp: 4.5 + Math.random() * 8,
      })),
    [polylines]
  );

  const posOnPoly = (poly: Poly, d: number, out: THREE.Vector3) => {
    let rem = d % poly.len;
    for (let k = 0; k < poly.seg.length; k++) {
      if (rem <= poly.seg[k]) {
        const t = poly.seg[k] === 0 ? 0 : rem / poly.seg[k];
        out.lerpVectors(poly.points[k], poly.points[k + 1], t);
        return;
      }
      rem -= poly.seg[k];
    }
    out.copy(poly.points[poly.points.length - 1]);
  };

  useFrame((_, dt) => {
    const mesh = ref.current;
    if (!mesh || polylines.length === 0) return;
    const t = performance.now() / 1000;
    const hb = beat(t);
    const scale = 0.12 * (1 + hb * 0.4);
    const v = new THREE.Vector3();
    for (let i = 0; i < COUNT; i++) {
      const s = state[i];
      const poly = polylines[s.wi];
      if (!poly) continue;
      s.d += s.sp * Math.min(0.05, dt);
      if (s.d > poly.len) {
        s.d = 0;
        s.wi = Math.floor(Math.random() * polylines.length);
      }
      posOnPoly(poly, s.d, v);
      dummy.position.copy(v);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (matRef.current) matRef.current.emissiveIntensity = 3 + hb * 2.5;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        ref={matRef}
        color="#ff7a3a"
        emissive="#ff5a28"
        emissiveIntensity={4}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function Scene() {
  const { segMatrices, polylines, compMatrices } = useBoard();
  const lightRef = useRef<THREE.PointLight>(null);
  const chipMat = useRef<THREE.MeshStandardMaterial>(null);
  const traceMat = useRef<THREE.MeshStandardMaterial>(null);
  const t0 = useRef(0);

  useFrame((stt, dt) => {
    const t = performance.now() / 1000;
    const hb = beat(t);
    if (lightRef.current) lightRef.current.intensity = 9 + hb * 20;
    if (chipMat.current) chipMat.current.emissiveIntensity = 1.1 + hb * 1.8;
    if (traceMat.current) traceMat.current.emissiveIntensity = 1.3 + hb * 1.1;

    // slow living camera drift
    t0.current += dt * 0.1;
    const a = t0.current;
    stt.camera.position.set(Math.sin(a) * 6, 15 + Math.sin(a * 0.7) * 1.5, 19 + Math.cos(a) * 3);
    stt.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#070406"]} />
      <fog attach="fog" args={["#070406", 26, 60]} />
      <ambientLight intensity={0.18} />
      <pointLight ref={lightRef} position={[0, 6, 0]} color="#ff3b1e" intensity={20} distance={70} decay={1.4} />
      <directionalLight position={[10, 20, 8]} intensity={0.25} color="#ff8866" />

      {/* board base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[HALF * 2.2, HALF * 2.2]} />
        <meshStandardMaterial color="#0a0506" metalness={0.6} roughness={0.45} />
      </mesh>

      {/* circuit traces */}
      <Instanced matrices={segMatrices}>
        <boxGeometry args={[1, 0.05, 0.13]} />
        <meshStandardMaterial ref={traceMat} color="#3a0c08" emissive="#ff3a1e" emissiveIntensity={2} toneMapped={false} />
      </Instanced>

      {/* surface components */}
      <Instanced matrices={compMatrices}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#15090b" metalness={0.5} roughness={0.6} emissive="#3a0a06" emissiveIntensity={0.4} />
      </Instanced>

      {/* central chip (the heart) */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[3.2, 0.6, 3.2]} />
          <meshStandardMaterial ref={chipMat} color="#1a0608" emissive="#ff2a1a" emissiveIntensity={2} metalness={0.7} roughness={0.4} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[2.2, 0.04, 2.2]} />
          <meshStandardMaterial color="#0a0304" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* travelling laser pulses */}
      <Pulses polylines={polylines} />

      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={1.0} />
      </EffectComposer>
    </>
  );
}

export default function Motherboard3D() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ fov: 42, position: [0, 15, 20], near: 0.1, far: 80 }}
        >
          <Scene />
        </Canvas>
      </div>
      {/* dimming scrim: keeps the board visible but lets UI/text read clearly */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070406]/55" />
    </>
  );
}

// keep TS aware of r3f intrinsic elements
export type _R3F = ThreeElements;
