import Image from "next/image";

export default function Featured() {
  return (
    <section id="examples" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          See what Reelo can make.
        </h2>

        <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-red-900/10 backdrop-blur-md sm:p-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-400">
              Commercials
            </p>
            <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cinematic ads from a URL.
            </h3>
            <p className="mt-4 text-lg text-white/65">
              Paste your website. Reelo writes the script, shoots the scenes,
              and delivers a finished commercial — in minutes.
            </p>
            <a
              href="/studio/commercials"
              className="mt-7 inline-flex rounded-full bg-gradient-to-r from-amber-400 to-red-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-900/40 transition-transform hover:scale-[1.03]"
            >
              Make a commercial
            </a>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-lg">
            <Image
              src="/assets/product-skincare.jpg"
              alt="Cinematic commercial preview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-red-500">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
