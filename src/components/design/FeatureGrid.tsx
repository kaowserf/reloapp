type IconKey = "avatar" | "mic" | "dance" | "video" | "ad" | "voice";

function Icon({ name }: { name: IconKey }) {
  const c = {
    width: 40,
    height: 40,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ff3645",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { filter: "drop-shadow(0 0 9px rgba(255,54,69,.75))" },
  };
  switch (name) {
    case "avatar":
      return (
        <svg {...c}>
          <path d="M7 9a5 5 0 0 1 10 0" />
          <circle cx="12" cy="9.5" r="3.5" />
          <path d="M7 9v3M17 9v3" />
          <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "mic":
      return (
        <svg {...c}>
          <rect x="9" y="2.5" width="6" height="11" rx="3" />
          <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
        </svg>
      );
    case "dance":
      return (
        <svg {...c}>
          <circle cx="14.5" cy="4" r="2" />
          <path d="M14.5 6.2L12 11l3 2.5-1.2 7.3M12 11L7.5 9.6M14.6 8.2L19 9.5" />
        </svg>
      );
    case "video":
      return (
        <svg {...c}>
          <rect x="3" y="8" width="18" height="12" rx="1.5" />
          <path d="M3 8l2.2-3 3.6 1-2.2 3M9.2 6l3.6 1-2.2 3M15 7l3.6 1-2.2 3" />
          <polygon points="10.5 12 15 14.5 10.5 17" fill="#ff3645" stroke="none" />
        </svg>
      );
    case "ad":
      return (
        <svg {...c}>
          <path d="M3 10.5v3a1 1 0 0 0 1 1h2l8 4V5.5l-8 4H4a1 1 0 0 0-1 1z" />
          <path d="M18 9a4 4 0 0 1 0 6" />
        </svg>
      );
    case "voice":
      return (
        <svg {...c}>
          <path d="M3 11v2M7 8v8M11 4v16M15 7v10M19 10v4M23 11v2" />
        </svg>
      );
  }
}

const FEATURES: { icon: IconKey; title: string; desc: string }[] = [
  { icon: "avatar", title: "AI Avatars", desc: "Realistic AI avatars that talk and engage." },
  { icon: "mic", title: "Talking Photos", desc: "Make any photo speak naturally." },
  { icon: "dance", title: "Dancing Photos", desc: "Bring any photo to life with dance." },
  { icon: "video", title: "AI Videos", desc: "Generate stunning videos with AI." },
  { icon: "ad", title: "Commercials", desc: "High-converting ads in minutes." },
  { icon: "voice", title: "AI Voices", desc: "Natural voices in multiple languages." },
];

export default function FeatureGrid() {
  return (
    <section
      className="relative z-[4] mx-auto mt-8 max-w-[1080px] rounded-[26px] px-9 pb-[52px] pt-[46px]"
      style={{
        border: "1px solid rgba(255,70,85,.14)",
        background: "linear-gradient(180deg,rgba(30,9,12,.55),rgba(12,6,8,.4))",
        backdropFilter: "blur(4px)",
      }}
    >
      <h2 className="font-display text-center text-3xl font-bold tracking-[-0.02em] sm:text-[34px]">
        Everything You Need
      </h2>
      <p className="font-display mb-9 text-center text-3xl font-bold tracking-[-0.02em] sm:text-[34px]">
        to Create <span style={{ color: "#ff4a57" }}>Amazing</span> Videos
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group flex flex-col items-center rounded-2xl px-5 py-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(255,70,85,.4)]"
            style={{ border: "1px solid rgba(255,70,85,.14)", background: "rgba(255,60,75,.04)" }}
          >
            <div className="mb-4 flex h-12 items-center justify-center">
              <Icon name={f.icon} />
            </div>
            <h3 className="font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-1.5 max-w-[200px] text-sm leading-[1.5]" style={{ color: "#9a8b8d" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
