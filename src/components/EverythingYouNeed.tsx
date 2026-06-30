import Link from "next/link";

const FEATURES: { icon: string; title: string; desc: string; href: string }[] = [
  { icon: "/assets/lady icon.png", title: "AI Avatars", desc: "Realistic AI avatars that talk and engage.", href: "/studio/spokesperson" },
  { icon: "/assets/record.png", title: "Talking Photos", desc: "Make any photo speak naturally.", href: "/studio/talking-photo" },
  { icon: "/assets/man winigng.png", title: "Dancing Photos", desc: "Bring any photo to life with dance.", href: "/studio/dancing" },
  { icon: "/assets/video.png", title: "AI Videos", desc: "Generate stunning videos with AI.", href: "/studio/shorts" },
  { icon: "/assets/mike.png", title: "Commercials", desc: "High-converting ads in minutes.", href: "/studio/commercials" },
  { icon: "/assets/sound icon.png", title: "AI Voices", desc: "Natural voices in multiple languages.", href: "/studio/talking-photo" },
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
            <div className="h-14 w-14 overflow-hidden rounded-xl border border-red-500/30 transition-colors group-hover:border-red-500/60">
              <img
                src={f.icon}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
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
