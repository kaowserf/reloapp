const FEATURES: { icon: string; title: string; desc: string }[] = [
  { icon: "/assets/lady icon.png", title: "AI Avatars", desc: "Realistic AI avatars that talk and engage." },
  { icon: "/assets/record.png", title: "Talking Photos", desc: "Make any photo speak naturally." },
  { icon: "/assets/man winigng.png", title: "Dancing Photos", desc: "Bring any photo to life with dance." },
  { icon: "/assets/video.png", title: "AI Videos", desc: "Generate stunning videos with AI." },
  { icon: "/assets/mike.png", title: "Commercials", desc: "High-converting ads in minutes." },
  { icon: "/assets/sound icon.png", title: "AI Voices", desc: "Natural voices in multiple languages." },
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
            <div
              className="mb-4 h-16 w-16 overflow-hidden rounded-2xl"
              style={{
                border: "1px solid rgba(255,70,85,.3)",
                boxShadow: "0 0 22px -6px rgba(255,54,69,.6)",
              }}
            >
              <img
                src={f.icon}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
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
