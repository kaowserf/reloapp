import Link from "next/link";
import HeroChip from "@/components/design/HeroChip";

const LOGOS = ["TikTok", "YouTube", "Instagram", "Facebook", "Shopify"];

export default function HeroIndex() {
  return (
    <section className="relative z-[4] mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-8 pb-8 pt-12 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#ff5663" }}>
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#ff3645", boxShadow: "0 0 10px #ff3645" }} />
          AI Video Creation, Reimagined
        </div>

        <h1 className="font-display mb-5 text-5xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
          Create Stunning
          <br />
          Videos with
          <br />
          <span style={{ background: "linear-gradient(120deg,#ff4a57,#c4101c)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            AI Magic
          </span>
        </h1>

        <p className="mb-8 max-w-[430px] text-[17px] leading-[1.6]" style={{ color: "#a99a9c" }}>
          Transform ideas, photos, and scripts into professional videos in
          minutes. No editing skills required.
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-3.5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-[15px] text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 30px rgba(225,29,42,.45)" }}
          >
            Start Creating for Free →
          </Link>
          <Link
            href="/examples"
            className="rounded-xl px-6 py-[15px] text-[15px] font-semibold transition-colors"
            style={{ color: "#e7dada", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,70,85,.22)" }}
          >
            See Examples
          </Link>
        </div>

        <div className="mb-3.5 text-[12.5px] tracking-[0.04em]" style={{ color: "#7e7173" }}>
          Trusted by creators and businesses worldwide
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold" style={{ color: "#9a8b8d" }}>
          {LOGOS.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>

      {/* hero circuit-board chip */}
      <HeroChip />
    </section>
  );
}
