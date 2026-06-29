"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/design/AppShell";

const TABS = ["Trending Now", "Top Hooks", "Popular Styles", "Rising Sounds"];

const TRENDS = [
  { title: "AI Avatar Business Tips", badge: "Trending", green: false, created: "2.4K", note: "High engagement", grad: "linear-gradient(150deg,#5a1a1f,#1a0a0c)" },
  { title: "Motivational Shorts", badge: "Hot", green: false, created: "1.9K", note: "High engagement", grad: "linear-gradient(150deg,#4e1822,#160a0e)" },
  { title: "Product Before / After", badge: "New", green: true, created: "1.5K", note: "High conversion", grad: "linear-gradient(150deg,#641a1c,#1c0a0b)" },
  { title: "Funny Talking Photos", badge: "Trending", green: false, created: "1.1K", note: "High shares", grad: "linear-gradient(150deg,#5c1418,#190a0a)" },
  { title: "Real Estate Walkthroughs", badge: "Hot", green: false, created: "980", note: "High conversion", grad: "linear-gradient(150deg,#4a1a26,#150a0f)" },
];

export default function TrendsPage() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <AppShell active="trends">
      <div className="mb-[22px] flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em]">What&apos;s Working Now</h1>
          <p className="mt-1 text-[15px]" style={{ color: "#a99a9c" }}>Stay ahead of trends. Create what converts.</p>
        </div>
        <Link href="/account" className="rounded-[10px] px-4 py-[9px] text-[13px] font-semibold transition-colors hover:text-white" style={{ color: "#cfbfc1", border: "1px solid rgba(255,70,85,.2)" }}>Account</Link>
      </div>

      <div className="mb-[22px] flex flex-wrap gap-[9px]">
        {TABS.map((t) => {
          const on = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="cursor-pointer rounded-[10px] px-4 py-[9px] text-[13px] font-semibold transition-all"
              style={on ? { color: "#fff", background: "linear-gradient(135deg,#ff3645,#c4101c)", border: "1px solid transparent", boxShadow: "0 6px 16px rgba(225,29,42,.35)" } : { color: "#b9a9ab", background: "transparent", border: "1px solid rgba(255,70,85,.2)" }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {TRENDS.map((t) => (
          <div key={t.title} className="flex items-center gap-4 rounded-2xl p-4 transition-all hover:border-[rgba(255,70,85,.35)]" style={{ border: "1px solid rgba(255,70,85,.14)", background: "rgba(255,60,75,.03)" }}>
            <div className="relative grid h-[54px] w-[84px] flex-shrink-0 place-items-center rounded-[11px]" style={{ background: t.grad }}>
              <div className="grid h-[30px] w-[30px] place-items-center rounded-full" style={{ background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.3)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2.5">
                <span className="font-display text-[15.5px] font-semibold">{t.title}</span>
                <span className="rounded-md px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.04em]" style={t.green ? { color: "#5fd08a", background: "rgba(95,208,138,.15)", border: "1px solid rgba(95,208,138,.3)" } : { color: "#ff8a92", background: "rgba(255,70,85,.16)", border: "1px solid rgba(255,70,85,.3)" }}>{t.badge}</span>
              </div>
              <div className="text-[12.5px]" style={{ color: "#8e7f81" }}>{t.created} videos created · {t.note}</div>
            </div>
            <Link href="/how-it-works" className="whitespace-nowrap rounded-[10px] px-[18px] py-2.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-px" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 6px 16px rgba(225,29,42,.35)" }}>Use This Trend</Link>
          </div>
        ))}
      </div>

      <div className="mt-7 text-center">
        <Link href="/examples" className="inline-block rounded-xl px-7 py-3 text-sm font-bold transition-colors hover:bg-[rgba(255,70,85,.1)]" style={{ color: "#f3e9e9", border: "1px solid rgba(255,70,85,.3)" }}>View All Trends</Link>
      </div>
    </AppShell>
  );
}
