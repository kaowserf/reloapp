export type Field =
  | { kind: "url"; name: string; label: string; placeholder: string; hint?: string }
  | { kind: "text"; name: string; label: string; placeholder: string; hint?: string }
  | { kind: "textarea"; name: string; label: string; placeholder: string; hint?: string }
  | { kind: "upload"; name: string; label: string; hint?: string }
  | { kind: "select"; name: string; label: string; options: string[] }
  | { kind: "slider"; name: string; label: string; min: number; max: number; step: number; default: number; unit?: string }
  | { kind: "choices"; name: string; label: string; options: { label: string; value: string; icon?: string; img?: string }[] };

export type Studio = {
  slug: string;
  title: string;
  tagline: string;
  poster: string;
  cta: string;
  credits: string;
  fields: Field[];
};

export const STUDIOS: Studio[] = [
  {
    slug: "commercials",
    title: "Commercials",
    tagline: "Paste a URL. Get a cinematic ad.",
    poster: "/assets/commercials.jpg",
    cta: "Generate commercial",
    credits: "Uses 1 credit",
    fields: [
      { kind: "url", name: "url", label: "Website URL", placeholder: "https://yourbrand.com", hint: "We scrape your site for copy, colors, and product shots." },
      { kind: "select", name: "tone", label: "Style", options: ["Cinematic", "Energetic", "Luxury", "Playful", "Minimal"] },
      { kind: "select", name: "ratio", label: "Aspect ratio", options: ["9:16 (Vertical)", "1:1 (Square)", "16:9 (Wide)"] },
      { kind: "slider", name: "duration", label: "Duration", min: 15, max: 45, step: 15, default: 30, unit: "s" },
    ],
  },
  {
    slug: "shorts",
    title: "20 Shorts",
    tagline: "A month of TikToks in one batch.",
    poster: "/assets/shorts.jpg",
    cta: "Generate 20 shorts",
    credits: "Uses 1 credit each",
    fields: [
      { kind: "text", name: "topic", label: "Topic or niche", placeholder: "e.g. healthy meal-prep for busy parents", hint: "We write hooks, scripts, and captions around this." },
      { kind: "slider", name: "count", label: "How many shorts", min: 5, max: 30, step: 5, default: 20 },
      { kind: "select", name: "platform", label: "Platform", options: ["TikTok", "Reels", "Shorts", "All of them"] },
      { kind: "select", name: "tone", label: "Tone", options: ["Punchy", "Educational", "Funny", "Inspirational"] },
    ],
  },
  {
    slug: "talking-photo",
    title: "Talking Photo",
    tagline: "Your photo, talking on camera.",
    poster: "/assets/talking-photo.jpg",
    cta: "Generate talking video",
    credits: "Uses 1 credit",
    fields: [
      { kind: "upload", name: "photo", label: "Upload a photo", hint: "Front-facing, clear face works best." },
      { kind: "textarea", name: "script", label: "What should they say?", placeholder: "Hey everyone! Today I want to show you something incredible..." },
      { kind: "select", name: "voice", label: "Voice", options: ["Natural — Female", "Natural — Male", "Warm — Female", "Deep — Male", "Clone my voice"] },
    ],
  },
  {
    slug: "dancing",
    title: "Dancing Videos",
    tagline: "Any photo. Any move. Instantly.",
    poster: "/assets/dancing.jpg",
    cta: "Make it dance",
    credits: "Uses 1 credit · max 10s",
    fields: [
      { kind: "upload", name: "photo", label: "Upload a photo", hint: "Full body or upper body both work." },
      {
        kind: "choices",
        name: "move",
        label: "Pick a move",
        options: [
          { label: "Hip Shake", value: "hip-shake", icon: "💃" },
          { label: "Moonwalk", value: "moonwalk", icon: "🕺" },
          { label: "Twerk", value: "twerk", icon: "🍑" },
          { label: "Robot", value: "robot", icon: "🤖" },
          { label: "Spin", value: "spin", icon: "🌀" },
          { label: "Jump Sway", value: "jump", icon: "⚡" },
        ],
      },
    ],
  },
  {
    slug: "product",
    title: "Product Videos",
    tagline: "Cinematic product videos that sell.",
    poster: "/assets/product.jpg",
    cta: "Generate product video",
    credits: "Uses 1 credit",
    fields: [
      { kind: "upload", name: "image", label: "Upload product image", hint: "Or paste a product URL below." },
      { kind: "url", name: "url", label: "Product URL (optional)", placeholder: "https://store.com/product" },
      { kind: "select", name: "style", label: "Look", options: ["Studio", "Lifestyle", "Outdoor", "Neon", "Marble & gold"] },
    ],
  },
  {
    slug: "spokesperson",
    title: "AI Spokesperson",
    tagline: "AI avatars. Real voice. Real impact.",
    poster: "/assets/spokesperson.jpg",
    cta: "Generate spokesperson",
    credits: "Uses 1 credit",
    fields: [
      {
        kind: "choices",
        name: "avatar",
        label: "Choose an avatar",
        options: [
          { label: "Ava", value: "ava", img: "/assets/talking-selfie.jpg" },
          { label: "Nina", value: "nina", img: "/assets/avatar-business.jpg" },
          { label: "Leo", value: "leo", img: "/assets/spokesperson.jpg" },
          { label: "Maya", value: "maya", img: "/assets/talking-photo.jpg" },
        ],
      },
      { kind: "textarea", name: "script", label: "Script", placeholder: "Introducing the easiest way to create videos that convert..." },
      { kind: "select", name: "voice", label: "Voice", options: ["Confident — Female", "Confident — Male", "Friendly — Female", "Authoritative — Male"] },
    ],
  },
];

export function getStudio(slug: string): Studio | undefined {
  return STUDIOS.find((s) => s.slug === slug);
}
