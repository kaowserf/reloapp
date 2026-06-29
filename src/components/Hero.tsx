export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* darken center for text legibility over the live board */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 35%, rgba(7,4,6,0.75) 0%, rgba(7,4,6,0.2) 60%, rgba(7,4,6,0) 100%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70 backdrop-blur">
          <span className="text-amber-400">★</span>
          10,000+ creators
          <span className="text-white/25">·</span>
          No credit card
        </div>

        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          Create anything.
          <br />
          <span className="bg-gradient-to-r from-amber-300 via-red-400 to-red-500 bg-clip-text text-transparent">
            In seconds.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-white/70 sm:text-xl">
          Paste an idea. Reelo builds the video. Ready in one tap.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#how-it-works"
            className="w-full rounded-full bg-gradient-to-r from-amber-400 to-red-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-900/40 transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Start Creating
          </a>
          <a
            href="#examples"
            className="w-full rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto"
          >
            See what&apos;s possible
          </a>
        </div>
      </div>
    </section>
  );
}
