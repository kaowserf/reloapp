import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Business Hub — Reelo" };

const WORKSPACES = [
  { name: "DateWise", videos: 47, color: "from-cyan-400 to-blue-500", letter: "D" },
  { name: "Reelo", videos: 61, color: "from-amber-400 to-red-500", letter: "R" },
  { name: "Hooked On Health", videos: 20, color: "from-emerald-400 to-teal-500", letter: "H" },
];

const TABS = ["Overview", "Library", "Brand Kit", "Assets"];

const PANELS = [
  { title: "Library", desc: "Every commercial, short, and avatar video, searchable.", href: "/library", cta: "Open library" },
  { title: "Brand Kit", desc: "Website, logo, color, and description reused across every generator.", href: "#", cta: "Edit brand kit" },
  { title: "Assets", desc: "Uploaded photos and scraped content, ready to remix.", href: "#", cta: "Manage assets" },
];

export default function BusinessHubPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 text-white sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">Business Hub</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">One workspace per business.</h1>
            <p className="mt-2 text-white/55">Every video, organized — with a Library, Brand Kit, and Assets that follow you everywhere.</p>
          </div>
          <button className="rounded-full bg-gradient-to-r from-amber-400 to-red-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-red-900/30 transition-transform hover:scale-[1.03]">
            + New workspace
          </button>
        </div>

        {/* workspaces */}
        <h2 className="mt-10 mb-4 text-lg font-bold">Workspaces</h2>
        <Reveal className="grid gap-4 sm:grid-cols-3">
          {WORKSPACES.map((w) => (
            <div key={w.name} className="rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/25">
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${w.color} text-lg font-bold`}>
                  {w.letter}
                </span>
                <div>
                  <p className="font-semibold">{w.name}</p>
                  <p className="text-xs text-white/45">{w.videos} videos</p>
                </div>
              </div>
              <button className="mt-4 w-full rounded-full border border-white/15 bg-white/5 py-2 text-sm font-semibold hover:bg-white/10">
                Open workspace
              </button>
            </div>
          ))}
        </Reveal>

        {/* tabs (static) */}
        <div className="mt-12 flex flex-wrap gap-2">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                i === 0 ? "bg-gradient-to-r from-amber-400 to-red-500 text-white" : "border border-white/15 bg-black/40 text-white/65"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* panels */}
        <Reveal className="mt-6 grid gap-5 lg:grid-cols-3">
          {PANELS.map((p) => (
            <div key={p.title} className="flex flex-col rounded-2xl border border-white/10 bg-black/45 p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-white/55">{p.desc}</p>
              <Link href={p.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:underline">
                {p.cta} →
              </Link>
            </div>
          ))}
        </Reveal>
      </main>
    </>
  );
}
