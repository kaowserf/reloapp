const COLUMNS = [
  {
    title: "Product",
    links: ["How it works", "Examples", "Pricing", "FAQ"],
  },
  {
    title: "Company",
    links: ["Blog", "Reviews", "Sign in", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Refund Policy", "Contact us"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      {/* Final CTA band */}
      <div className="border-y border-white/10 bg-gradient-to-r from-amber-500/15 via-red-600/15 to-fuchsia-700/15 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Turn ideas into viral videos in seconds.
          </h2>
          <a
            href="#"
            className="rounded-full bg-gradient-to-r from-amber-400 to-red-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-900/40 transition-transform hover:scale-[1.03]"
          >
            Start free preview
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-red-500 text-sm font-bold text-white">
                R
              </span>
              <span className="text-lg font-bold tracking-tight text-white">Reelo</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/55">
              Turn ideas into viral videos in seconds. Built for creators who
              want to post every day.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © 2026 Reelo. All rights reserved. Made for creators who ship every
          day.
        </div>
      </div>
    </footer>
  );
}
