const SIZE = 460;
const C = SIZE / 2;
const HALF = 88; // chip half-size (trace start)

type Seg = { d: string; pad: [number, number]; dur: number; begin: number };

function buildTraces(): Seg[] {
  const segs: Seg[] = [];
  const edges: ("top" | "bottom" | "left" | "right")[] = ["top", "bottom", "left", "right"];
  const perEdge = 6;
  edges.forEach((edge, ei) => {
    for (let i = 0; i < perEdge; i++) {
      const t = (i + 1) / (perEdge + 1);
      let x = 0, y = 0, dx = 0, dy = 0;
      if (edge === "top") { x = C - HALF + t * HALF * 2; y = C - HALF; dy = -1; }
      if (edge === "bottom") { x = C - HALF + t * HALF * 2; y = C + HALF; dy = 1; }
      if (edge === "left") { x = C - HALF; y = C - HALF + t * HALF * 2; dx = -1; }
      if (edge === "right") { x = C + HALF; y = C - HALF + t * HALF * 2; dx = 1; }
      const L1 = 30 + ((i * 37 + ei * 17) % 50);
      const ex1 = x + dx * L1;
      const ey1 = y + dy * L1;
      const turn = i % 2 === 0 ? 1 : -1;
      const L2 = 20 + ((i * 53 + ei * 23) % 70);
      let ex2 = ex1, ey2 = ey1;
      if (dx === 0) ex2 = ex1 + turn * L2;
      else ey2 = ey1 + turn * L2;
      segs.push({
        d: `M ${x} ${y} L ${ex1} ${ey1} L ${ex2} ${ey2}`,
        pad: [ex2, ey2],
        dur: 1.7 + ((i * 7 + ei * 5) % 11) * 0.13,
        begin: ((i * 13 + ei * 29) % 23) * 0.1,
      });
    }
  });
  return segs;
}

function Pulse({ d, dur, begin }: { d: string; dur: number; begin: number }) {
  return (
    <circle r="2.6" fill="#ffe2da" style={{ filter: "drop-shadow(0 0 7px #ff3645)" }}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  );
}

const PINS = "repeating-linear-gradient(90deg,#ff5663 0 5px,transparent 5px 12px)";
const PINS_V = "repeating-linear-gradient(0deg,#ff5663 0 5px,transparent 5px 12px)";

export default function HeroChip() {
  const traces = buildTraces();
  const oct = "polygon(15% 0,85% 0,100% 15%,100% 85%,85% 100%,15% 100%,0 85%,0 15%)";

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* ambient heartbeat glow */}
      <div className="hb absolute inset-[14%] rounded-full" style={{ background: "radial-gradient(circle,rgba(225,29,42,.45),transparent 65%)", filter: "blur(16px)" }} />

      {/* circuit traces + lasers */}
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" style={{ filter: "drop-shadow(0 0 5px rgba(255,54,69,.5))" }}>
        <g className="hb" stroke="rgba(255,70,85,.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {traces.map((s, i) => <path key={i} d={s.d} />)}
        </g>
        {traces.map((s, i) => (
          <g key={`p${i}`}>
            <circle cx={s.pad[0]} cy={s.pad[1]} r="6.5" fill="rgba(255,70,85,.16)" />
            <circle cx={s.pad[0]} cy={s.pad[1]} r="3" fill="#ff5663" />
          </g>
        ))}
        {/* travelling lasers (two staggered streams per trace) */}
        {traces.map((s, i) => <Pulse key={`a${i}`} d={s.d} dur={s.dur} begin={s.begin} />)}
        {traces.map((s, i) => <Pulse key={`b${i}`} d={s.d} dur={s.dur} begin={s.begin + s.dur / 2} />)}
      </svg>

      {/* chip */}
      <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2">
        {/* outer frame */}
        <div className="relative grid h-full w-full place-items-center" style={{ clipPath: oct, background: "linear-gradient(150deg,#3a1014,#0a0405)", border: "2px solid rgba(255,70,85,.5)", boxShadow: "0 0 70px rgba(225,29,42,.5)" }}>
          {/* inner face */}
          <div className="relative grid place-items-center" style={{ width: "84%", height: "84%", clipPath: oct, background: "radial-gradient(circle at 50% 40%,#220a0d,#0a0405)", border: "1px solid rgba(255,70,85,.3)", boxShadow: "inset 0 0 34px rgba(225,29,42,.3)" }}>
            {/* hex/dot texture */}
            <div className="absolute inset-0 opacity-40" style={{ clipPath: oct, backgroundImage: "radial-gradient(rgba(255,70,85,.16) 1px,transparent 1px)", backgroundSize: "9px 9px" }} />
            {/* pin dashes */}
            <div className="hb absolute left-[16%] right-[16%] top-[7px] h-[3px]" style={{ background: PINS }} />
            <div className="hb absolute bottom-[7px] left-[16%] right-[16%] h-[3px]" style={{ background: PINS }} />
            <div className="hb absolute left-[7px] top-[16%] bottom-[16%] w-[3px]" style={{ background: PINS_V }} />
            <div className="hb absolute right-[7px] top-[16%] bottom-[16%] w-[3px]" style={{ background: PINS_V }} />

            {/* R logo */}
            <svg width="98" height="98" viewBox="0 0 130 130" style={{ filter: "drop-shadow(0 0 16px rgba(225,29,42,.85))" }}>
              <defs>
                <linearGradient id="rgrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff7a82" />
                  <stop offset="0.45" stopColor="#ff2d3f" />
                  <stop offset="1" stopColor="#a60d16" />
                </linearGradient>
              </defs>
              <path
                fillRule="evenodd"
                fill="url(#rgrad)"
                stroke="#ff9098"
                strokeWidth="1.4"
                d="M34 16 L34 114 L56 114 L56 76 L64 76 L92 114 L118 114 L86 71 C104 65 113 51 113 40 C113 24 99 16 79 16 Z M56 35 L77 35 C87 35 91 39 91 45 C91 51 87 57 77 57 L56 57 Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
