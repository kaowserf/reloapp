import Link from "next/link";

type NavKey = "home" | "create" | "videos" | "trends" | "chat" | "business" | "settings";

const NAV: { key: NavKey; href: string; title: string; bottom?: boolean; icon: React.ReactNode }[] = [
  { key: "home", href: "/dashboard", title: "Home", icon: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></> },
  { key: "create", href: "/how-it-works", title: "Create", icon: <path d="M12 5v14M5 12h14" /> },
  { key: "videos", href: "/examples", title: "Videos", icon: <><rect x="3" y="5" width="14" height="14" rx="2" /><path d="M21 7l-4 3 4 3z" /></> },
  { key: "trends", href: "/trends", title: "Trends", icon: <><path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" /></> },
  { key: "chat", href: "/trends", title: "Chat", icon: <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" /> },
  { key: "business", href: "/business-center", title: "Business Center", icon: <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" /> },
  { key: "settings", href: "/account", title: "Settings", bottom: true, icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4.6 15H4a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1A2 2 0 1 1 8 5.4l.1.1a1.6 1.6 0 0 0 2.7-1.1V4a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.2" /></> },
];

export default function AppShell({ active, children }: { active: NavKey; children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(900px 500px at 70% -5%,rgba(225,29,42,.13),transparent 60%)" }} />

      {/* sidebar */}
      <aside className="sticky top-0 z-[5] hidden h-screen w-[72px] flex-shrink-0 flex-col items-center gap-2 py-5 md:flex" style={{ borderRight: "1px solid rgba(255,70,85,.12)", background: "rgba(14,7,9,.6)", backdropFilter: "blur(6px)" }}>
        <Link href="/" className="font-display mb-3.5 grid h-[42px] w-[42px] place-items-center rounded-xl text-[23px] font-bold text-white" style={{ background: "linear-gradient(135deg,#ff3645,#b3121d)", boxShadow: "0 0 22px rgba(225,29,42,.55)" }}>R</Link>
        {NAV.map((n) => {
          const on = n.key === active;
          return (
            <Link
              key={n.key}
              href={n.href}
              title={n.title}
              className={`grid h-11 w-11 place-items-center rounded-xl transition-colors ${n.bottom ? "mt-auto" : ""} ${on ? "" : "hover:bg-[rgba(255,70,85,.08)]"}`}
              style={on ? { color: "#ff5663", background: "rgba(255,70,85,.14)", border: "1px solid rgba(255,70,85,.3)" } : { color: "#9a8b8d" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
            </Link>
          );
        })}
      </aside>

      <main className="relative z-[1] max-w-[1200px] flex-1 px-5 py-7 sm:px-9 sm:py-[30px]">{children}</main>
    </div>
  );
}
