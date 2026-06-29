import Image from "next/image";

/* ---------- mockup panels ---------- */

function StepPanelContent() {
  const tabs = ["Upload Photo", "AI Avatar", "Text/Script"];
  const thumbs = [
    "/assets/avatar-business.jpg",
    "/assets/spokesperson.jpg",
    "/assets/talking-selfie.jpg",
    "/assets/talking-photo.jpg",
  ];
  return (
    <div className="rounded-2xl border border-red-500/20 bg-black/50 p-5 shadow-[0_0_40px_-15px_rgba(239,68,68,0.5)] backdrop-blur-md">
      <p className="mb-4 text-sm font-semibold text-white">Choose Your Content</p>
      <div className="flex gap-2">
        {tabs.map((t, i) => (
          <span
            key={t}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              i === 0 ? "bg-red-600 text-white" : "border border-white/10 bg-white/5 text-white/55"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {thumbs.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-500/30 bg-white/[0.02] py-6 text-center">
        <span className="text-sm font-medium text-white/80">Upload Your Photo</span>
        <span className="text-xs text-white/40">or drag and drop</span>
      </div>
    </div>
  );
}

function CustomizePanelContent() {
  const selects = [
    { label: "Voice", value: "Natural (Female)" },
    { label: "Style", value: "Professional" },
    { label: "Music", value: "Upbeat Corporate" },
  ];
  return (
    <div className="rounded-2xl border border-red-500/20 bg-black/50 p-5 shadow-[0_0_40px_-15px_rgba(239,68,68,0.5)] backdrop-blur-md">
      <p className="mb-4 text-sm font-semibold text-white">Customize Your Video</p>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          {selects.map((s) => (
            <div key={s.label}>
              <p className="mb-1 text-xs text-white/50">{s.label}</p>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                {s.value}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-32 w-full overflow-hidden rounded-xl border border-white/10 sm:w-28">
          <Image src="/assets/talking-selfie.jpg" alt="" fill sizes="120px" className="object-cover" />
          <span className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-red-600">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-end gap-0.5">
        {Array.from({ length: 48 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm bg-red-500/60"
            style={{ height: `${6 + Math.abs(Math.sin(i * 1.1)) * 22}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function ResultPanelContent() {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-black/50 p-5 shadow-[0_0_40px_-15px_rgba(239,68,68,0.5)] backdrop-blur-md">
      <p className="mb-4 text-sm font-semibold text-white">Your Video is Ready!</p>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
        <Image src="/assets/talking-photo.jpg" alt="" fill sizes="400px" className="object-cover" />
        <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-red-600">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>Rendering complete</span>
          <span>100%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full rounded-full bg-red-600" />
        </div>
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_-8px_rgba(239,68,68,0.6)] hover:scale-[1.01]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
        </svg>
        Download Video
      </button>
    </div>
  );
}

const STEPS = [
  { n: 1, title: "Choose Your Content", desc: "Upload a photo, write a script, or choose an avatar.", panel: <StepPanelContent /> },
  { n: 2, title: "Customize Your Video", desc: "Pick a voice, style, music, and customize your video.", panel: <CustomizePanelContent /> },
  { n: 3, title: "Generate & Download", desc: "Let AI create your video in minutes. Download and share anywhere.", panel: <ResultPanelContent /> },
];

type BadgeIcon = "fast" | "easy" | "ai" | "quality";
const BADGES: { icon: BadgeIcon; title: string; desc: string }[] = [
  { icon: "fast", title: "Fast", desc: "Videos in minutes" },
  { icon: "easy", title: "Easy", desc: "No skills needed" },
  { icon: "ai", title: "AI Powered", desc: "Advanced technology" },
  { icon: "quality", title: "High Quality", desc: "Professional results" },
];

function Badge({ name }: { name: BadgeIcon }) {
  const c = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "fast") return <svg {...c}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  if (name === "easy") return <svg {...c}><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>;
  if (name === "ai") return <svg {...c}><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14z" /></svg>;
  return <svg {...c}><path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z" /><path d="m9 12 2 2 4-4" /></svg>;
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create Videos in 3 <span className="text-red-500">Easy</span> Steps
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          It&apos;s that simple. No complicated software. Just your ideas and Reelo.
        </p>
      </div>

      <div className="mt-14 space-y-12">
        {STEPS.map((s) => (
          <div key={s.n} className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white shadow-[0_0_25px_-6px_rgba(239,68,68,0.7)]">
                {s.n}
              </span>
              <div>
                <h3 className="text-2xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 max-w-sm text-white/60">{s.desc}</p>
              </div>
            </div>
            <div>{s.panel}</div>
          </div>
        ))}
      </div>

      {/* bottom badges */}
      <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md sm:grid-cols-4">
        {BADGES.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
              <Badge name={b.icon} />
            </span>
            <div>
              <p className="font-semibold text-white">{b.title}</p>
              <p className="text-xs text-white/45">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
