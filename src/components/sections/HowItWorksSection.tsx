import Image from "next/image";

const card = { border: "1px solid rgba(255,70,85,.3)", background: "linear-gradient(180deg,rgba(26,9,12,.6),rgba(10,5,7,.55))", boxShadow: "0 0 40px -16px rgba(225,29,42,.5)" } as const;
const field = { border: "1px solid rgba(255,70,85,.22)" } as const;

const AVATARS = ["/assets/talking-selfie.jpg", "/assets/spokesperson.jpg", "/assets/avatar-business.jpg", "/assets/talking-photo.jpg"];

function StepNum({ n }: { n: number }) {
  return (
    <div className="font-display grid h-[60px] w-[60px] place-items-center rounded-full text-2xl font-bold" style={{ border: "2px solid rgba(255,45,63,.7)", boxShadow: "0 0 22px rgba(225,29,42,.5),inset 0 0 14px rgba(225,29,42,.35)" }}>{n}</div>
  );
}
function PlayBtn({ size = 56 }: { size?: number }) {
  return (
    <span className="grid place-items-center rounded-full" style={{ width: size, height: size, background: "rgba(255,255,255,.16)", border: "1.5px solid rgba(255,255,255,.55)", backdropFilter: "blur(3px)" }}>
      <svg width={size * 0.32} height={size * 0.32} viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
    </span>
  );
}
function Step1Card() {
  return (
    <div className="rounded-[20px] p-5 sm:p-6" style={card}>
      <div className="mb-4 text-[15px] font-bold">Choose Your Content</div>
      <div className="mb-4 flex gap-2.5">
        <div className="flex-1 rounded-[10px] py-2.5 text-center text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)" }}>Upload Photo</div>
        <div className="flex-1 rounded-[10px] py-2.5 text-center text-sm" style={{ ...field, color: "#b9a9ab" }}>AI Avatar</div>
        <div className="flex-1 rounded-[10px] py-2.5 text-center text-sm" style={{ ...field, color: "#b9a9ab" }}>Text/Script</div>
      </div>
      <div className="mb-4 grid grid-cols-4 gap-2.5">
        {AVATARS.map((src) => <div key={src} className="relative aspect-[5/6] overflow-hidden rounded-xl" style={field}><Image src={src} alt="" fill sizes="120px" className="object-cover" /></div>)}
      </div>
      <div className="flex flex-col items-center justify-center gap-1 rounded-xl py-6 text-center" style={{ border: "1.5px dashed rgba(255,70,85,.35)" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff3645" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 6px rgba(225,29,42,.6))" }}><path d="M12 16V8m0 0L8.5 11.5M12 8l3.5 3.5" /><path d="M6 16a4 4 0 0 1-.5-7.96 5.5 5.5 0 0 1 10.8-1A4.5 4.5 0 0 1 18 16" /></svg>
        <div className="text-[15px] font-semibold">Upload Your Photo</div>
        <div className="text-xs" style={{ color: "#8e7f81" }}>or drag and drop</div>
      </div>
    </div>
  );
}
function Step2Card() {
  const selects = [{ l: "Voice", v: "Natural (Female)" }, { l: "Style", v: "Professional" }, { l: "Music", v: "Upbeat Corporate" }];
  return (
    <div className="rounded-[20px] p-5 sm:p-6" style={card}>
      <div className="mb-4 text-[15px] font-bold">Customize Your Video</div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_minmax(0,200px)]">
        <div className="flex flex-col gap-2.5">
          {selects.map((s) => (
            <div key={s.l}>
              <div className="mb-1 text-xs" style={{ color: "#8e7f81" }}>{s.l}</div>
              <div className="flex items-center justify-between rounded-[10px] px-3.5 py-2.5 text-sm" style={field}>{s.v}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8b8d" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg></div>
            </div>
          ))}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-auto" style={field}>
          <Image src="/assets/talking-selfie.jpg" alt="" fill sizes="220px" className="object-cover" />
          <div className="absolute inset-0 grid place-items-center"><PlayBtn /></div>
        </div>
      </div>
      <div className="mt-4 flex items-end gap-[3px]" style={{ filter: "drop-shadow(0 0 5px rgba(225,29,42,.5))" }}>
        {Array.from({ length: 64 }).map((_, i) => <span key={i} className="flex-1 rounded-sm" style={{ height: `${5 + Math.abs(Math.sin(i * 0.9)) * 22}px`, background: "#ff3645", opacity: 0.55 + Math.abs(Math.sin(i * 0.5)) * 0.45 }} />)}
      </div>
    </div>
  );
}
function Step3Card() {
  return (
    <div className="rounded-[20px] p-5 sm:p-6" style={card}>
      <div className="mb-4 text-[15px] font-bold">Your Video is Ready!</div>
      <div className="relative mb-4 aspect-video overflow-hidden rounded-xl" style={field}>
        <Image src="/assets/talking-photo.jpg" alt="" fill sizes="600px" className="object-cover" />
        <div className="absolute inset-0 grid place-items-center"><PlayBtn size={60} /></div>
      </div>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "rgba(255,70,85,.15)" }}><div className="h-full w-full rounded-full" style={{ background: "linear-gradient(90deg,#ff3645,#c4101c)" }} /></div>
        <span className="text-sm font-bold" style={{ color: "#cfbfc1" }}>100%</span>
      </div>
      <button className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-bold text-white" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 26px -8px rgba(225,29,42,.6)" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
        Download Video
      </button>
    </div>
  );
}

const STEPS = [
  { n: 1, t: "Choose Your Content", d: "Upload a photo, write a script, or choose an avatar.", Card: Step1Card },
  { n: 2, t: "Customize Your Video", d: "Pick a voice, style, music, and customize your video.", Card: Step2Card },
  { n: 3, t: "Generate & Download", d: "Let AI create your video in minutes. Download and share anywhere.", Card: Step3Card },
];

const BADGES = [
  { t: "Fast", d: "Videos in minutes", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { t: "Easy", d: "No skills needed", icon: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></> },
  { t: "AI Powered", d: "Advanced technology", icon: <><circle cx="12" cy="12" r="2.5" /><circle cx="12" cy="4.5" r="1.4" /><circle cx="12" cy="19.5" r="1.4" /><circle cx="4.5" cy="12" r="1.4" /><circle cx="19.5" cy="12" r="1.4" /><path d="M12 7v2.5M12 14.5V17M7 12H9.5M14.5 12H17" /></> },
  { t: "High Quality", d: "Professional results", icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.2" /><path d="M8 7l1.5-2h5L16 7" /></> },
];

export default function HowItWorksSection() {
  return (
    <div id="how-it-works" className="scroll-mt-24">
      <section className="mx-auto max-w-[1000px] px-8 pb-2 pt-8 text-center">
        <h2 className="font-display text-4xl font-bold tracking-[-0.02em] sm:text-[44px] sm:leading-[1.08]">
          Create Videos in
          <br />
          <span style={{ color: "#ff2d3f" }}>3 Easy</span> Steps
        </h2>
        <p className="mx-auto mt-3 max-w-[440px] text-base leading-[1.6]" style={{ color: "#a99a9c" }}>It&apos;s that simple. No complicated software. Just your ideas and Reelo.</p>
      </section>

      <section className="mx-auto flex max-w-[1000px] flex-col gap-7 px-6 pb-10 pt-6">
        {STEPS.map(({ n, t, d, Card }) => (
          <div key={n} className="grid grid-cols-1 items-center gap-7 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <StepNum n={n} />
              <h3 className="font-display mt-4 text-[26px] font-bold leading-tight tracking-[-0.01em]">{t}</h3>
              <p className="mt-2.5 max-w-[260px] text-[15px] leading-[1.6]" style={{ color: "#a99a9c" }}>{d}</p>
            </div>
            <Card />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-5 rounded-[20px] px-6 py-6 sm:grid-cols-4" style={{ border: "1px solid rgba(255,70,85,.25)", background: "rgba(14,6,8,.5)" }}>
          {BADGES.map((b) => (
            <div key={b.t} className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full" style={{ border: "1.5px solid rgba(255,70,85,.45)", boxShadow: "0 0 16px -4px rgba(225,29,42,.6)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3645" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
              </span>
              <div><div className="text-[15px] font-bold">{b.t}</div><div className="text-xs" style={{ color: "#8e7f81" }}>{b.d}</div></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
