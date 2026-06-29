type PhaseIcon = "play" | "trophy" | "chart";

function PhaseGfx({ name }: { name: PhaseIcon }) {
  const c = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_25px_-8px_rgba(239,68,68,0.6)]">
      {name === "play" && (
        <svg {...c}>
          <path d="M21 7.5v9L12 22l-9-5.5v-9L12 2z" />
          <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
        </svg>
      )}
      {name === "trophy" && (
        <svg {...c}>
          <path d="M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 14h6v3H9zM8 21h8" />
        </svg>
      )}
      {name === "chart" && (
        <svg {...c}>
          <path d="M3 20h18M6 16l4-4 3 3 5-6" />
          <path d="M18 6h3v3" />
        </svg>
      )}
    </div>
  );
}

const PHASES: { phase: string; title: string; icon: PhaseIcon; items: string[] }[] = [
  {
    phase: "Phase 1",
    title: "Core Creation Studio",
    icon: "play",
    items: [
      "AI Avatars",
      "Talking Photos",
      "Dancing Photos",
      "AI Voices",
      "AI Videos",
      "Commercials & Product Videos",
      "20 Shorts from One Description",
    ],
  },
  {
    phase: "Phase 2",
    title: "Growth & Engagement",
    icon: "trophy",
    items: [
      "Avatar Battles",
      "Groups & Social",
      "Trend AI — What's Working Now",
      "Greeting Videos (Birthdays, Holidays)",
      "Revenge Videos",
      "Leaderboards & Challenges",
    ],
  },
  {
    phase: "Phase 3",
    title: "Scale & Automation",
    icon: "chart",
    items: [
      "TikTok/Instagram/YouTube Scheduling",
      "Advanced Analytics",
      "Batch Creation & Queue",
      "AI Story Maker (Episodic Videos)",
      "Product Commercial Engine",
      "Enterprise & Team Tools",
    ],
  },
];

export default function PowerfulFeatures() {
  return (
    <section id="examples" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Powerful <span className="text-red-500">Features.</span> Professional
          Results.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Reelo gives you everything you need to create viral content and grow
          your brand.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PHASES.map((p) => (
          <div
            key={p.phase}
            className="flex flex-col rounded-2xl border border-red-500/20 bg-black/40 p-7 backdrop-blur-md transition-all hover:border-red-500/50 hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]"
          >
            <PhaseGfx name={p.icon} />
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-red-500">
              {p.phase}
            </p>
            <h3 className="mt-1 text-xl font-bold text-white">{p.title}</h3>
            <ul className="mt-5 space-y-3">
              {p.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" className="mt-0.5 shrink-0">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* roadmap banner */}
      <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-600/10 to-black/40 p-6 backdrop-blur-md sm:flex-row sm:p-7">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
          </span>
          <div>
            <h3 className="text-lg font-bold text-white">New features. Every week.</h3>
            <p className="text-sm text-white/55">Built for creators. Built for results.</p>
          </div>
        </div>
        <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
          See Roadmap
        </button>
      </div>
    </section>
  );
}
