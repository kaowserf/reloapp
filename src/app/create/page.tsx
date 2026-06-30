import DesignShell from "@/components/design/DesignShell";
import FeaturedTool from "@/components/create/FeaturedTool";
import { TOOLS } from "@/lib/tools";

export const metadata = { title: "Create — Reelo" };

const DETAILS: Record<string, { features: string[]; caption?: string }> = {
  "talking-photo": { features: ["Realistic Lip Sync", "Natural Expressions", "Powered by AI"], caption: "Hello! Welcome to Talking Photo." },
  "dancing-photo": { features: ["Any Photo, Any Move", "Beat-Synced Motion", "Up to 10 Seconds"], caption: "Watch me dance! 💃" },
  "ai-avatar-studio": { features: ["Lifelike AI Avatars", "Any Voice & Language", "Studio Quality"], caption: "Meet your AI spokesperson." },
  "custom-avatar-creator": { features: ["Your Face, Reusable", "Multiple Styles", "One-Time Setup"], caption: "Your custom avatar is ready." },
  "revoice": { features: ["Swap Any Voice", "100+ Voices", "Keeps Lip Sync"], caption: "Same video, brand-new voice." },
  "website-commercial": { features: ["URL → Cinematic Ad", "AI Script & Scenes", "Ready in Minutes"], caption: "Your brand, in 30 seconds." },
  "shorts-20": { features: ["20 Shorts at Once", "From URL or Prompt", "Auto Captions"], caption: "A month of content, instantly." },
  "product-commercial": { features: ["Cinematic Product Shots", "5 Premium Looks", "Built to Sell"], caption: "Make your product shine." },
  "ai-story-maker": { features: ["Multi-Episode Stories", "Character Memory", "6 Genres"], caption: "Once upon a time…" },
  "translate-videos": { features: ["100+ Languages", "Voice Cloning", "Perfect Lip Sync"], caption: "Now in every language. 🌍" },
  "ai-quality-enhancement": { features: ["4K Upscaling", "Face & Motion Boost", "Premium Render"], caption: "Crisp, studio-grade quality." },
  "story-memory-generator": { features: ["Cinematic Stories", "From Your Photos", "Multi-Episode"], caption: "Your memories, reimagined." },
};

export default function CreatePage() {
  return (
    <DesignShell glow="radial-gradient(900px 450px at 50% -10%,rgba(225,29,42,.22),transparent 65%),radial-gradient(700px 500px at 95% 30%,rgba(140,12,20,.12),transparent 60%)">
      <section className="mx-auto max-w-[1100px] px-8 pb-2 pt-10 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#ff5663" }}>AI Creation Studio</div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          What do you want to <span style={{ color: "#ff2d3f" }}>create?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[480px] text-[16px]" style={{ color: "#a99a9c" }}>
          Pick a tool, add your idea, and Reelo builds the video — ready in 3–4 clicks.
        </p>
      </section>

      <section className="mx-auto flex max-w-[1100px] flex-col gap-6 px-6 pb-16 pt-8">
        {TOOLS.map((t, i) => (
          <FeaturedTool key={t.slug} tool={t} features={DETAILS[t.slug]?.features ?? []} caption={DETAILS[t.slug]?.caption} reverse={i % 2 === 1} />
        ))}
      </section>
    </DesignShell>
  );
}
