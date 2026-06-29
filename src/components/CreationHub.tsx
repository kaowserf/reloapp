import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const PATHS = [
  {
    slug: "commercials",
    title: "Commercials",
    desc: "Paste a URL. Get a cinematic ad.",
    img: "/assets/commercials.jpg",
  },
  {
    slug: "shorts",
    title: "20 Shorts",
    desc: "A month of TikToks in one batch.",
    img: "/assets/shorts.jpg",
  },
  {
    slug: "talking-photo",
    title: "Talking Photo",
    desc: "Your photo, talking on camera.",
    img: "/assets/talking-photo.jpg",
  },
  {
    slug: "dancing",
    title: "Dancing Videos",
    desc: "Any photo. Any move. Instantly.",
    img: "/assets/dancing.jpg",
  },
  {
    slug: "product",
    title: "Product Videos",
    desc: "Cinematic product videos that sell.",
    img: "/assets/product.jpg",
  },
  {
    slug: "spokesperson",
    title: "AI Spokesperson",
    desc: "AI avatars. Real voice. Real impact.",
    img: "/assets/spokesperson.jpg",
  },
];

export default function CreationHub() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24 text-white"
    >
      {/* neon ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-700/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest">
            <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              The Creation Hub
            </span>
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            What do you want to create?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
            <Link
              href={`/studio/${p.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-red-900/30"
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* bottom gradient scrim */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
              />

              {/* overlay content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-4 block h-1 w-10 rounded-full bg-gradient-to-r from-amber-400 to-red-500" />
                <h3 className="text-2xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-white/70">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                  Open studio
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
