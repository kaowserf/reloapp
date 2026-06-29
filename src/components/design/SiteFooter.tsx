import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative z-[4]" style={{ borderTop: "1px solid rgba(255,70,85,.1)" }}>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-8 py-[30px] text-[13.5px] sm:flex-row" style={{ color: "#7e7173" }}>
        <span>© 2026 Reelo. AI video creation, reimagined.</span>
        <div className="flex flex-wrap gap-[22px]">
          <Link href="/#features" className="transition-colors hover:text-white">Features</Link>
          <Link href="/#pricing" className="transition-colors hover:text-white">Pricing</Link>
          <Link href="/dashboard" className="transition-colors hover:text-white">Dashboard</Link>
          <Link href="/business-center" className="transition-colors hover:text-white">Business Center</Link>
          <Link href="/#faq" className="transition-colors hover:text-white">Support</Link>
        </div>
      </div>
    </footer>
  );
}
