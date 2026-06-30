"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import DesignShell from "@/components/design/DesignShell";

const AVATARS = [
  { id: "ava", name: "Ava", img: "/assets/talking-selfie.jpg" },
  { id: "leo", name: "Leo", img: "/assets/spokesperson.jpg" },
  { id: "nina", name: "Nina", img: "/assets/avatar-business.jpg" },
  { id: "maya", name: "Maya", img: "/assets/talking-photo.jpg" },
];
const TYPES = ["Dance Battle", "Roast Battle", "Comedy Battle", "Debate"];
const JUDGES = ["Comedian", "Marketing Expert", "Grandma"];
const LEADERBOARD = [
  { name: "Leo", wins: 42, img: "/assets/spokesperson.jpg" },
  { name: "Ava", wins: 38, img: "/assets/talking-selfie.jpg" },
  { name: "Nina", wins: 29, img: "/assets/avatar-business.jpg" },
  { name: "Maya", wins: 21, img: "/assets/talking-photo.jpg" },
];

// deterministic pseudo-score from a seed so SSR/CSR match
function scoreFor(seed: string, judge: number) {
  let h = judge * 31;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) % 1000;
  return 6 + (h % 40) / 10; // 6.0–9.9
}

export default function BattlesPage() {
  const [a, setA] = useState("ava");
  const [b, setB] = useState("leo");
  const [type, setType] = useState(TYPES[0]);
  const [status, setStatus] = useState<"idle" | "fighting" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const avA = AVATARS.find((x) => x.id === a)!;
  const avB = AVATARS.find((x) => x.id === b)!;
  const seedA = `${a}-${type}`;
  const seedB = `${b}-${type}`;
  const scoresA = JUDGES.map((_, i) => scoreFor(seedA, i));
  const scoresB = JUDGES.map((_, i) => scoreFor(seedB, i));
  const totalA = scoresA.reduce((s, x) => s + x, 0);
  const totalB = scoresB.reduce((s, x) => s + x, 0);
  const winner = totalA === totalB ? "Tie" : totalA > totalB ? avA.name : avB.name;

  const start = () => {
    if (a === b) return;
    setStatus("fighting");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("done"), 2200);
  };

  return (
    <DesignShell glow="radial-gradient(900px 450px at 50% -10%,rgba(225,29,42,.22),transparent 65%)">
      <section className="mx-auto max-w-[1000px] px-6 pb-2 pt-10 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff5663" }}>AI Battle Arena</div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Avatar <span style={{ color: "#ff2d3f" }}>Battles</span></h1>
        <p className="mx-auto mt-3 max-w-[460px] text-[16px]" style={{ color: "#a99a9c" }}>Pick two avatars, choose a battle, and let the AI judges decide.</p>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 pb-16 pt-8">
        {/* battle type */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {TYPES.map((t) => (
            <button key={t} onClick={() => { setType(t); setStatus("idle"); }} className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors" style={t === type ? { background: "linear-gradient(135deg,#ff3645,#c4101c)", color: "#fff" } : { border: "1px solid rgba(255,70,85,.2)", color: "#b9a9ab" }}>{t}</button>
          ))}
        </div>

        {/* arena */}
        <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <Fighter side="A" avatar={avA} options={AVATARS} disabled={status === "fighting"} onPick={(id) => { setA(id); setStatus("idle"); }} scores={status === "done" ? scoresA : null} total={status === "done" ? totalA : null} win={status === "done" && winner === avA.name} />
          <div className="grid place-items-center">
            <span className="font-display rounded-full px-4 py-2 text-2xl font-extrabold" style={{ background: "rgba(255,70,85,.12)", color: "#ff5663", border: "1px solid rgba(255,70,85,.3)" }}>VS</span>
          </div>
          <Fighter side="B" avatar={avB} options={AVATARS} disabled={status === "fighting"} onPick={(id) => { setB(id); setStatus("idle"); }} scores={status === "done" ? scoresB : null} total={status === "done" ? totalB : null} win={status === "done" && winner === avB.name} />
        </div>

        {a === b && <p className="mt-3 text-center text-sm" style={{ color: "#ff8a92" }}>Pick two different avatars to battle.</p>}

        <div className="mt-6 flex justify-center">
          <button onClick={start} disabled={a === b || status === "fighting"} className="flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-50" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 28px -8px rgba(225,29,42,.6)" }}>
            {status === "fighting" ? "Battling…" : status === "done" ? "Rematch" : "Start Battle"}
          </button>
        </div>

        {status === "done" && (
          <div className="mt-6 rounded-2xl p-5 text-center" style={{ border: "1px solid rgba(255,70,85,.3)", background: "radial-gradient(500px 160px at 50% 0,rgba(225,29,42,.2),transparent 70%),rgba(14,6,8,.6)" }}>
            <div className="text-sm uppercase tracking-widest" style={{ color: "#ff5663" }}>Winner</div>
            <div className="font-display mt-1 text-3xl font-extrabold">🏆 {winner}</div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {JUDGES.map((j, i) => (
                <span key={j} className="rounded-lg px-3 py-1 text-xs" style={{ border: "1px solid rgba(255,70,85,.2)", color: "#cabcbe" }}>{j}: {scoresA[i].toFixed(1)} – {scoresB[i].toFixed(1)}</span>
              ))}
            </div>
          </div>
        )}

        {/* leaderboard */}
        <h2 className="font-display mt-12 mb-3 text-lg font-bold">Weekly Leaderboard</h2>
        <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,70,85,.16)", background: "rgba(255,60,75,.03)" }}>
          {LEADERBOARD.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3 border-b border-white/5 px-4 py-3 last:border-0">
              <span className="font-display w-5 text-sm font-bold" style={{ color: "#ff5663" }}>{i + 1}</span>
              <div className="relative h-9 w-9 overflow-hidden rounded-full"><Image src={c.img} alt="" fill sizes="36px" className="object-cover" /></div>
              <span className="flex-1 font-semibold">{c.name}</span>
              <span className="text-sm" style={{ color: "#ff8a92" }}>{c.wins} wins</span>
            </div>
          ))}
        </div>
      </section>
    </DesignShell>
  );
}

function Fighter({ side, avatar, options, disabled, onPick, scores, total, win }: {
  side: string; avatar: { id: string; name: string; img: string }; options: typeof AVATARS; disabled: boolean;
  onPick: (id: string) => void; scores: number[] | null; total: number | null; win: boolean;
}) {
  return (
    <div className="rounded-2xl p-4" style={{ border: `1px solid ${win ? "rgba(255,70,85,.6)" : "rgba(255,70,85,.18)"}`, background: win ? "radial-gradient(300px 160px at 50% 0,rgba(225,29,42,.22),transparent 70%),rgba(20,8,10,.6)" : "linear-gradient(180deg,rgba(24,9,12,.5),rgba(10,5,7,.5))", boxShadow: win ? "0 0 40px -10px rgba(225,29,42,.6)" : undefined }}>
      <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-xl">
        <Image src={avatar.img} alt={avatar.name} fill sizes="180px" className="object-cover" />
        <span className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(0,0,0,.5)", color: "#fff" }}>Fighter {side}</span>
      </div>
      <div className="mt-3 text-center font-display text-lg font-bold">{avatar.name}{win && " 👑"}</div>
      {scores ? (
        <div className="mt-2 text-center">
          <div className="font-display text-2xl font-extrabold" style={{ color: "#ff5663" }}>{total!.toFixed(1)}</div>
          <div className="text-[11px]" style={{ color: "#8e7f81" }}>judges score</div>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {options.map((o) => (
            <button key={o.id} disabled={disabled} onClick={() => onPick(o.id)} className="rounded-lg px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50" style={o.id === avatar.id ? { background: "rgba(255,70,85,.2)", color: "#ffb3b9", border: "1px solid rgba(255,70,85,.4)" } : { border: "1px solid rgba(255,70,85,.15)", color: "#b9a9ab" }}>{o.name}</button>
          ))}
        </div>
      )}
    </div>
  );
}
