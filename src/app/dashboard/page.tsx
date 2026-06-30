import Link from "next/link";
import Image from "next/image";
import AppShell from "@/components/design/AppShell";

export const metadata = { title: "Dashboard — Reelo" };

const STATS = [
  { label: "Videos Created", value: "128", delta: "↑ 24% this month", highlight: false },
  { label: "Total Views", value: "45.2K", delta: "↑ 31% this month", highlight: false },
  { label: "Engagement", value: "8.7%", delta: "↑ 19% this month", highlight: false },
  { label: "Tokens Left", value: "320", delta: "Renews in 12 days", highlight: true },
];

const RECENT = [
  { t: "Chiropractic Commercial", m: "00:30 · 2 hours ago", img: "/assets/commercials.jpg" },
  { t: "AI Avatar Intro", m: "00:45 · 1 day ago", img: "/assets/spokesperson.jpg" },
  { t: "Dancing Photo", m: "00:15 · 2 days ago", img: "/assets/dancing.jpg" },
  { t: "20 Shorts Pack", m: "Created 3 days ago", img: "/assets/shorts.jpg" },
];

const QUICK: { t: string; href: string; icon: React.ReactNode; star?: boolean }[] = [
  { t: "AI Avatar Video", href: "/create/ai-avatar-studio", icon: <><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></> },
  { t: "Talking Photo", href: "/create/talking-photo", icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="2" /></> },
  { t: "Dancing Photo", href: "/create/dancing-photo", icon: <><circle cx="12" cy="4" r="2" /><path d="M12 6v6l-3 6m3-6l3 6" /></> },
  { t: "Product Commercial", href: "/create/product-commercial", icon: <><rect x="3" y="5" width="14" height="14" rx="2" /><path d="M21 7l-4 3 4 3z" /></> },
  { t: "Website Commercial", href: "/create/website-commercial", icon: <path d="M3 11l16-6v14l-16-6z" /> },
  { t: "20 Shorts from One Prompt", href: "/create/shorts-20", star: true, icon: <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" /> },
];

export default function DashboardPage() {
  return (
    <AppShell active="home">
      <div className="mb-[26px] flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em]">Welcome back, Michael!</h1>
          <p className="mt-1 text-[15px]" style={{ color: "#a99a9c" }}>Let&apos;s create something amazing today.</p>
        </div>
        <div className="relative h-[42px] w-[42px] overflow-hidden rounded-full" style={{ border: "1px solid rgba(255,70,85,.4)" }}>
          <Image src="/assets/spokesperson.jpg" alt="Profile" fill sizes="42px" className="object-cover" />
        </div>
      </div>

      {/* stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={s.highlight ? { border: "1px solid rgba(255,70,85,.3)", background: "radial-gradient(300px 120px at 80% 0,rgba(225,29,42,.2),transparent 70%),rgba(255,60,75,.05)" } : { border: "1px solid rgba(255,70,85,.14)", background: "rgba(255,60,75,.04)" }}>
            <div className="mb-2 text-xs" style={{ color: "#8e7f81" }}>{s.label}</div>
            <div className="font-display text-3xl font-bold" style={s.highlight ? { color: "#ff5663" } : undefined}>{s.value}</div>
            <div className="mt-1 text-xs" style={{ color: s.highlight ? "#a99a9c" : "#5fd08a" }}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* two cols */}
      <div className="mb-[22px] grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* recent */}
        <div className="rounded-[18px] p-[22px]" style={{ border: "1px solid rgba(255,70,85,.14)", background: "rgba(255,60,75,.03)" }}>
          <div className="font-display mb-4 text-[17px] font-bold">Recent Projects</div>
          <div className="flex flex-col gap-3">
            {RECENT.map((r) => (
              <div key={r.t} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[rgba(255,70,85,.06)]">
                <div className="relative h-[42px] w-16 flex-shrink-0 overflow-hidden rounded-[9px]">
                  <Image src={r.img} alt="" fill sizes="64px" className="object-cover" />
                  <span className="absolute inset-0 grid place-items-center bg-black/25">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{r.t}</div>
                  <div className="font-mono text-xs" style={{ color: "#8e7f81" }}>{r.m}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* quick create */}
        <div className="rounded-[18px] p-[22px]" style={{ border: "1px solid rgba(255,70,85,.14)", background: "rgba(255,60,75,.03)" }}>
          <div className="font-display mb-4 text-[17px] font-bold">Quick Create</div>
          <div className="flex flex-col gap-[9px]">
            {QUICK.map((q) => (
              <Link
                key={q.t}
                href={q.href}
                className="flex items-center gap-[11px] rounded-[11px] px-3.5 py-3 text-[13.5px] font-semibold transition-all hover:border-[rgba(255,70,85,.45)]"
                style={q.star ? { border: "1px solid rgba(255,70,85,.3)", background: "radial-gradient(200px 80px at 90% 0,rgba(225,29,42,.18),transparent 70%)", fontWeight: 700 } : { border: "1px solid rgba(255,70,85,.16)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff5663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{q.icon}</svg>
                {q.t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* trend alert */}
      <div className="flex flex-col items-start gap-5 rounded-[18px] px-6 py-[22px] sm:flex-row sm:items-center" style={{ border: "1px solid rgba(255,70,85,.24)", background: "radial-gradient(500px 180px at 88% 50%,rgba(225,29,42,.18),transparent 70%),rgba(18,7,9,.5)" }}>
        <div className="flex-1">
          <div className="mb-1.5 flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" /></svg>
            <span className="font-display text-[17px] font-bold">AI Trend Alert</span>
          </div>
          <div className="mb-3 text-[13.5px]" style={{ color: "#a99a9c" }}>What&apos;s working now.</div>
          <div className="flex flex-wrap gap-2">
            {["AI Avatars", "Motivational", "Product Demos"].map((c) => (
              <span key={c} className="rounded-lg px-3 py-1.5 text-xs font-semibold" style={{ background: "rgba(255,70,85,.12)", border: "1px solid rgba(255,70,85,.25)", color: "#ffb3b9" }}>{c}</span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 200 90" width="200" height="90" className="flex-shrink-0">
          <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,70,85,.4)" /><stop offset="1" stopColor="rgba(255,70,85,0)" /></linearGradient></defs>
          <path d="M0 75 L40 60 L75 66 L110 40 L150 30 L200 8" fill="none" stroke="#ff5663" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0 75 L40 60 L75 66 L110 40 L150 30 L200 8 L200 90 L0 90 Z" fill="url(#g1)" />
        </svg>
        <Link href="/trends" className="whitespace-nowrap text-sm font-bold transition-colors hover:text-white" style={{ color: "#ff8a92" }}>View Trends →</Link>
      </div>
    </AppShell>
  );
}
