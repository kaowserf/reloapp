"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  { label: "Realistic Lip Sync", icon: <path d="M4 10v4M8 7v10M12 9v6M16 6v12M20 10v4" /> },
  { label: "Natural Expressions", icon: <><circle cx="12" cy="12" r="9" /><path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01" /></> },
  { label: "Powered by AI", icon: <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" /> },
];

export default function FeaturedTalkingPhoto() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="grid items-center gap-8 rounded-[26px] p-6 sm:p-8 lg:grid-cols-2" style={{ border: "1px solid rgba(255,70,85,.25)", background: "linear-gradient(180deg,rgba(28,9,12,.55),rgba(10,5,7,.5))", boxShadow: "0 0 60px -20px rgba(225,29,42,.5)" }}>
      {/* left */}
      <div>
        <span className="grid h-16 w-16 place-items-center rounded-[20px] text-white" style={{ background: "linear-gradient(135deg,#ff3645,#b3121d)", boxShadow: "0 0 28px rgba(225,29,42,.5)" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-9l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
            <path d="M8 9v4M11 8v6M14 9.5v3M17 8v6" />
          </svg>
        </span>
        <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">Talking<br />Photo</h2>
        <p className="mt-4 max-w-[320px] text-lg" style={{ color: "#a99a9c" }}>Make any photo speak naturally.</p>

        <div className="mt-7 flex flex-col gap-3.5">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ border: "1px solid rgba(255,70,85,.3)", background: "rgba(255,70,85,.08)" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff5663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
              </span>
              <span className="font-medium" style={{ color: "#e7dada" }}>{f.label}</span>
            </div>
          ))}
        </div>

        <Link href="/create/talking-photo" className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 28px -8px rgba(225,29,42,.6)" }}>
          Open Talking Photo Studio →
        </Link>
      </div>

      {/* right — video player preview */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <div className="relative aspect-video">
          <Image src="/assets/talking-selfie.jpg" alt="Talking Photo preview" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />

          {/* caption bubble */}
          <div className="absolute right-3 top-3 flex max-w-[70%] items-start gap-2 rounded-2xl px-3.5 py-2.5 shadow-xl" style={{ background: "rgba(255,255,255,.95)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3645" strokeWidth="2" strokeLinecap="round" className="mt-px shrink-0"><path d="M4 10v4M8 7v10M12 9v6M16 6v12M20 10v4" /></svg>
            <span className="text-[13px] font-medium leading-snug" style={{ color: "#1a1018" }}>Hello! Welcome to Talking Photo.</span>
          </div>

          {/* center play */}
          {!playing && (
            <button onClick={() => setPlaying(true)} className="absolute inset-0 grid place-items-center" aria-label="Play">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-lg transition hover:scale-105"><svg width="22" height="22" viewBox="0 0 24 24" fill="#c4101c" className="ml-1"><polygon points="6 4 20 12 6 20 6 4" /></svg></span>
            </button>
          )}

          {/* control bar */}
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 backdrop-blur-md" style={{ background: "rgba(10,6,8,.55)", border: "1px solid rgba(255,255,255,.1)" }}>
              <button onClick={() => setPlaying((p) => !p)} className="shrink-0 text-white" aria-label={playing ? "Pause" : "Play"}>
                {playing ? <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg> : <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>}
              </button>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <div key={playing ? "on" : "off"} className="h-full rounded-full" style={{ width: playing ? "0%" : "45%", background: "linear-gradient(90deg,#ff3645,#c4101c)", animation: playing ? "playbar 8s linear infinite" : "none" }} />
              </div>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M11 5L6 9H3v6h3l5 4z" /><path d="M16 9a4 4 0 0 1 0 6" /></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
