import Link from "next/link";

const LOGOS = ["TikTok", "YouTube", "Instagram", "facebook", "Shopify"];

function ChipR() {
  const pins = Array.from({ length: 9 });
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-full bg-red-600/30 blur-3xl" />
      <div className="relative h-60 w-60 sm:h-72 sm:w-72">
        {/* pins */}
        <div className="absolute -top-2 left-0 right-0 flex justify-around px-8">
          {pins.map((_, i) => (
            <span key={i} className="h-3 w-1.5 rounded-sm bg-red-500/50" />
          ))}
        </div>
        <div className="absolute -bottom-2 left-0 right-0 flex justify-around px-8">
          {pins.map((_, i) => (
            <span key={i} className="h-3 w-1.5 rounded-sm bg-red-500/50" />
          ))}
        </div>
        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-around py-8">
          {pins.map((_, i) => (
            <span key={i} className="h-1.5 w-3 rounded-sm bg-red-500/50" />
          ))}
        </div>
        <div className="absolute -right-2 top-0 bottom-0 flex flex-col justify-around py-8">
          {pins.map((_, i) => (
            <span key={i} className="h-1.5 w-3 rounded-sm bg-red-500/50" />
          ))}
        </div>
        {/* chip body */}
        <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] border border-red-500/40 bg-gradient-to-br from-[#1c0608] via-[#120406] to-black shadow-[0_0_70px_-10px_rgba(239,68,68,0.6)]">
          <div className="absolute inset-4 rounded-[1.5rem] border border-red-500/20" />
          <span className="select-none text-8xl font-black text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]">
            R
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroV2() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              AI Video Creation, Reimagined
            </p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Create Stunning Videos with{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/65">
              Transform ideas, photos, and scripts into professional videos in
              minutes. No editing skills required.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#how-it-works"
                className="rounded-xl bg-red-600 px-6 py-3.5 text-center font-semibold text-white shadow-[0_10px_30px_-5px_rgba(239,68,68,0.5)] transition-transform hover:scale-[1.03]"
              >
                Start Creating for Free
              </Link>
              <Link
                href="#examples"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-center font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                See Examples
              </Link>
            </div>

            <p className="mt-10 text-sm text-white/40">
              Trusted by creators and businesses worldwide
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              {LOGOS.map((l) => (
                <span key={l} className="text-sm font-semibold text-white/55">
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ChipR />
          </div>
        </div>
      </div>
    </section>
  );
}
