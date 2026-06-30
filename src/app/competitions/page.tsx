"use client";

import { useState } from "react";
import DesignShell from "@/components/design/DesignShell";

const QF = [
  ["Ava", "Kai"], ["Leo", "Mira"], ["Nina", "Dex"], ["Maya", "Rio"],
];
const SF = [["Ava", "Leo"], ["Nina", "Maya"]];
const FINAL = ["Ava", "Maya"];
const CHAMP = "Ava";

const LEADERBOARD = [
  { name: "Ava", pts: 980 }, { name: "Maya", pts: 910 }, { name: "Leo", pts: 845 }, { name: "Nina", pts: 790 }, { name: "Kai", pts: 612 },
];

function Match({ a, b, winner }: { a: string; b: string; winner?: string }) {
  return (
    <div className="overflow-hidden rounded-xl text-sm" style={{ border: "1px solid rgba(255,70,85,.18)", background: "rgba(255,60,75,.03)" }}>
      {[a, b].map((n) => (
        <div key={n} className="flex items-center justify-between border-b border-white/5 px-3 py-2 last:border-0" style={winner === n ? { color: "#ff8a92", fontWeight: 700 } : { color: "#b9a9ab" }}>
          {n}{winner === n && <span>✓</span>}
        </div>
      ))}
    </div>
  );
}

export default function CompetitionsPage() {
  const [joined, setJoined] = useState(false);

  return (
    <DesignShell glow="radial-gradient(900px 450px at 50% -10%,rgba(225,29,42,.22),transparent 65%)">
      <section className="mx-auto max-w-[1100px] px-6 pb-2 pt-10 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff5663" }}>AI Competitions</div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Summer <span style={{ color: "#ff2d3f" }}>Championship</span></h1>
        <p className="mx-auto mt-3 max-w-[480px] text-[16px]" style={{ color: "#a99a9c" }}>Compete in tournament brackets, climb the leaderboard, and win the season.</p>
        <div className="mt-6 flex justify-center">
          <button onClick={() => setJoined((j) => !j)} className="rounded-xl px-7 py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.02]" style={joined ? { border: "1px solid rgba(255,70,85,.4)", color: "#ff8a92", background: "transparent" } : { background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 28px -8px rgba(225,29,42,.6)" }}>
            {joined ? "✓ You're registered" : "Join Competition"}
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-8">
        {/* bracket */}
        <h2 className="font-display mb-4 text-lg font-bold">Tournament Bracket</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "#8e7f81" }}>Quarterfinals</div>
            <div className="flex flex-col gap-3">{QF.map(([a, b], i) => <Match key={i} a={a} b={b} winner={SF.flat()[i]} />)}</div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "#8e7f81" }}>Semifinals</div>
            <div className="mt-8 flex flex-col gap-12">{SF.map(([a, b], i) => <Match key={i} a={a} b={b} winner={FINAL[i]} />)}</div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "#8e7f81" }}>Final</div>
            <div className="mt-24"><Match a={FINAL[0]} b={FINAL[1]} winner={CHAMP} /></div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "#8e7f81" }}>Champion</div>
            <div className="mt-24 grid place-items-center rounded-xl p-4 text-center" style={{ border: "1px solid rgba(255,70,85,.5)", background: "radial-gradient(200px 100px at 50% 0,rgba(225,29,42,.25),transparent 70%),rgba(20,8,10,.6)" }}>
              <div className="text-3xl">🏆</div><div className="font-display mt-1 text-lg font-bold">{CHAMP}</div>
            </div>
          </div>
        </div>

        {/* leaderboard */}
        <h2 className="font-display mt-12 mb-3 text-lg font-bold">Season Leaderboard</h2>
        <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,70,85,.16)", background: "rgba(255,60,75,.03)" }}>
          {LEADERBOARD.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3 border-b border-white/5 px-4 py-3 last:border-0">
              <span className="font-display w-5 text-sm font-bold" style={{ color: i === 0 ? "#f0b94f" : "#ff5663" }}>{i + 1}</span>
              <span className="flex-1 font-semibold">{c.name}</span>
              <span className="text-sm" style={{ color: "#ff8a92" }}>{c.pts} pts</span>
            </div>
          ))}
        </div>
      </section>
    </DesignShell>
  );
}
