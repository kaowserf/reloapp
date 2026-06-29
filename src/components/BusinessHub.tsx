const FEATURES = [
  {
    title: "Workspaces",
    desc: "DateWise, Reelo, Hooked On Health, all in one place.",
  },
  {
    title: "Library",
    desc: "Every commercial, short, and avatar video, searchable.",
  },
  {
    title: "Brand Kit",
    desc: "Website, logo, color, description, reused everywhere.",
  },
  {
    title: "Assets",
    desc: "Uploaded photos and scraped content, ready to remix.",
  },
];

const TABS = ["Overview", "Create", "Library", "Brand Kit", "Assets"];
const CATEGORIES = [
  "Commercial",
  "20 Shorts",
  "Talking",
  "Dancing",
  "Avatar",
  "Revoice",
  "Recent",
];

export default function BusinessHub() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-sm font-semibold text-amber-300">
            New
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Now with Business Hub
          </h2>
          <p className="mt-3 text-lg font-medium text-white/70">
            One workspace per business. Every video, organized.
          </p>
          <p className="mt-4 text-white/60">
            Reelo isn&apos;t just where you generate videos anymore. It&apos;s
            where you organize everything you create — by business, with a
            Library, Brand Kit, and Assets that follow you across every
            generator.
          </p>

          <ul className="mt-8 space-y-4">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="font-semibold text-white">{f.title}</span>
                  <span className="text-white/60"> — {f.desc}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 font-semibold text-amber-400 hover:underline"
            >
              Open Business Hub →
            </a>
            <span className="text-sm text-white/50">
              Included with every paid plan
            </span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-3 shadow-2xl shadow-red-900/20 backdrop-blur-md">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TABS.map((t, i) => (
                <span
                  key={t}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                    i === 0
                      ? "bg-gradient-to-r from-amber-400 to-red-500 text-white"
                      : "bg-white/5 text-white/60"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CATEGORIES.map((c) => (
                <div
                  key={c}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs font-medium text-white/80"
                >
                  <div className="mb-2 h-12 rounded-md bg-gradient-to-br from-red-500/25 to-amber-400/10" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
