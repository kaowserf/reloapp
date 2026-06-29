import Link from "next/link";

type IconKey = "avatar" | "mic" | "dance" | "video" | "megaphone" | "wave";

function Icon({ name }: { name: IconKey }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "avatar":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      );
    case "mic":
      return (
        <svg {...common}>
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      );
    case "dance":
      return (
        <svg {...common}>
          <circle cx="13" cy="4" r="2" />
          <path d="M13 7l-3 4 3 2-1 7M13 7l4 2M10 11l-4 1" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          <rect x="2" y="5" width="14" height="14" rx="3" />
          <path d="M16 10l6-3v10l-6-3" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l9 4V6L6 10H4a1 1 0 0 0-1 1zM18 9a3 3 0 0 1 0 6" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M4 10v4M8 6v12M12 9v6M16 4v16M20 10v4" />
        </svg>
      );
  }
}

const FEATURES: { icon: IconKey; title: string; desc: string; href: string }[] = [
  { icon: "avatar", title: "AI Avatars", desc: "Realistic AI avatars that talk and engage.", href: "/studio/spokesperson" },
  { icon: "mic", title: "Talking Photos", desc: "Make any photo speak naturally.", href: "/studio/talking-photo" },
  { icon: "dance", title: "Dancing Photos", desc: "Bring any photo to life with dance.", href: "/studio/dancing" },
  { icon: "video", title: "AI Videos", desc: "Generate stunning videos with AI.", href: "/studio/shorts" },
  { icon: "megaphone", title: "Commercials", desc: "High-converting ads in minutes.", href: "/studio/commercials" },
  { icon: "wave", title: "AI Voices", desc: "Natural voices in multiple languages.", href: "/studio/talking-photo" },
];

export default function EverythingYouNeed() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Everything You Need to Create{" "}
        <span className="text-red-500">Amazing</span> Videos
      </h2>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="group rounded-2xl border border-red-500/15 bg-black/40 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-red-500/50 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 transition-colors group-hover:bg-red-500/20">
              <Icon name={f.icon} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{f.title}</h3>
            <p className="mt-1.5 text-sm text-white/55">{f.desc}</p>
          </Link>
        ))}
      </div>

      {/* speed card */}
      <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-600/10 to-black/40 p-7 backdrop-blur-md sm:flex-row sm:p-8">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 14a4 4 0 0 0 4-4" />
            <path d="M3 16a9 9 0 1 1 18 0" />
            <path d="M12 14l4-3" />
          </svg>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            3–4 Clicks. 2–3 Decisions.{" "}
            <span className="text-red-500">Video Ready in Under 3 Minutes.</span>
          </h3>
          <p className="mt-1 text-white/55">Everything from your phone.</p>
        </div>
      </div>
    </section>
  );
}
