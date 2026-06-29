import Image from "next/image";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Video Library — Reelo" };

const FILTERS = ["All", "Commercials", "20 Shorts", "Talking", "Dancing", "Avatar"];

const VIDEOS = [
  { name: "Amber serum ad", type: "Commercial", len: "0:28", img: "/assets/product-skincare.jpg" },
  { name: "Founder intro", type: "Talking", len: "0:22", img: "/assets/talking-selfie.jpg" },
  { name: "Street dance promo", type: "Dancing", len: "0:10", img: "/assets/dancing.jpg" },
  { name: "Product hero", type: "Product", len: "0:30", img: "/assets/product.jpg" },
  { name: "Spokesperson cut", type: "Avatar", len: "0:24", img: "/assets/spokesperson.jpg" },
  { name: "Neon city ad", type: "Commercial", len: "0:18", img: "/assets/commercials.jpg" },
  { name: "Batch shorts #4", type: "20 Shorts", len: "0:15", img: "/assets/shorts.jpg" },
  { name: "Talking selfie", type: "Talking", len: "0:20", img: "/assets/talking-photo.jpg" },
  { name: "Grandpa dance", type: "Dancing", len: "0:10", img: "/assets/dancing-grandpa.jpg" },
];

export default function LibraryPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 text-white sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">Library</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Video Library</h1>
            <p className="mt-2 text-white/55">Every video you&apos;ve made — searchable and ready to remix.</p>
          </div>
          <div className="relative">
            <input
              placeholder="Search videos…"
              className="w-64 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none backdrop-blur-md focus:border-amber-400/60"
            />
          </div>
        </div>

        {/* filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-gradient-to-r from-amber-400 to-red-500 text-white"
                  : "border border-white/15 bg-black/40 text-white/65 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <Reveal key={v.name} delay={(i % 3) * 90}>
            <div
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-amber-400/40"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image src={v.img} alt={v.name} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-red-500">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium">{v.len}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{v.name}</p>
                  <p className="text-xs text-white/45">{v.type}</p>
                </div>
                <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">
                  Download
                </button>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
