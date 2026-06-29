import DesignShell from "@/components/design/DesignShell";
import FeaturesSection from "@/components/sections/FeaturesSection";

export const metadata = { title: "Features — Reelo" };

export default function FeaturesPage() {
  return (
    <DesignShell glow="radial-gradient(800px 500px at 50% -5%,rgba(225,29,42,.16),transparent 60%),radial-gradient(700px 500px at 90% 25%,rgba(140,12,20,.14),transparent 60%)">
      <FeaturesSection />
      <div className="h-12" />
    </DesignShell>
  );
}
