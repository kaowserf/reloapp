export type IconKey =
  | "home" | "pen" | "film" | "palette" | "folder" | "share" | "rocket" | "calendar"
  | "chart" | "dollar" | "brain" | "crown" | "chip" | "users" | "lock" | "layers"
  | "grid" | "cc" | "mic" | "globe" | "scissors" | "image" | "stack" | "magic"
  | "refresh" | "target" | "contact" | "tag" | "code" | "plug" | "cloud" | "gauge"
  | "doc" | "headset" | "infinity" | "hd" | "bolt" | "growth" | "clock" | "trophy"
  | "eye" | "heart" | "play" | "upload" | "scissors2" | "sparkle";

export default function BIcon({ name, size = 22, color = "#ff3645", glow = true }: { name: IconKey; size?: number; color?: string; glow?: boolean }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color,
    strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    style: glow ? { filter: `drop-shadow(0 0 6px ${color}aa)` } : undefined,
  };
  const I: Record<string, React.ReactNode> = {
    home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
    film: <><rect x="3" y="5" width="14" height="14" rx="2" /><path d="M21 7l-4 3 4 3z" /></>,
    palette: <><circle cx="12" cy="12" r="9" /><circle cx="8" cy="9" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16" cy="9" r="1" /><path d="M12 21a3 3 0 0 0 0-6" /></>,
    folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    share: <><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" /></>,
    rocket: <><path d="M5 15c-1 2-1 5-1 5s3 0 5-1m-4-4a8 8 0 0 1 2-5c2.5-3 6-4 9-4 0 3-1 6.5-4 9a8 8 0 0 1-5 2m-2-2l2 2" /><circle cx="14.5" cy="9.5" r="1.4" /></>,
    calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    dollar: <><circle cx="12" cy="12" r="9" /><path d="M15 9a3 3 0 0 0-3-2c-1.7 0-3 1-3 2.3 0 3 6 1.7 6 4.7 0 1.3-1.3 2.3-3 2.3a3 3 0 0 1-3-2M12 6v12" /></>,
    brain: <><path d="M9 7a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 9 18V7zM15 7a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 15 18V7z" /></>,
    crown: <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />,
    chip: <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M18 20a5 5 0 0 0-3-4.6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    cc: <><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M9 10a2 2 0 0 0-2 2 2 2 0 0 0 2 2M16 10a2 2 0 0 0-2 2 2 2 0 0 0 2 2" /></>,
    mic: <><rect x="9" y="2.5" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    scissors: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8 8l12 10M8 16L20 6" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5L5 20" /></>,
    stack: <><path d="M12 3l8 4-8 4-8-4 8-4z" /><path d="M4 11l8 4 8-4M4 15l8 4 8-4" /></>,
    magic: <><path d="M15 4V2M15 10V8M11 6h2M17 6h2M5 19l9-9 1.5 1.5-9 9zM18 14l.7 1.8L20.5 16l-1.8.7L18 18.5l-.7-1.8L15.5 16l1.8-.7z" /></>,
    refresh: <><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 4v4h-4" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>,
    contact: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2.4" /><path d="M5 17a4 4 0 0 1 8 0M15 9h3M15 13h3" /></>,
    tag: <><path d="M3 12l9-9 9 9-9 9-9-9z" /><circle cx="9" cy="9" r="1.3" /></>,
    code: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13 4l-2 16" /></>,
    plug: <><path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0zM12 16v6" /></>,
    cloud: <><path d="M6 18a4 4 0 0 1-.5-7.96 5.5 5.5 0 0 1 10.8-1A4.5 4.5 0 0 1 18 18zM12 12v6m0-6l-2.5 2.5M12 12l2.5 2.5" /></>,
    gauge: <><path d="M3 16a9 9 0 1 1 18 0" /><path d="M12 16l4-4" /></>,
    doc: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4M9 13h6M9 17h6" /></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2.5" y="13" width="4" height="7" rx="1.6" /><rect x="17.5" y="13" width="4" height="7" rx="1.6" /><path d="M20 20a4 4 0 0 1-4 3h-2" /></>,
    infinity: <path d="M7 9a3 3 0 1 0 0 6c2 0 3-2 5-3 2-1 3-3 5-3a3 3 0 1 1 0 6c-2 0-3-2-5-3-2-1-3-3-5-3z" />,
    hd: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 9v6M7 12h3M10 9v6M14 9v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" /></>,
    bolt: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color} stroke="none" />,
    growth: <><path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    trophy: <><path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 14h6v3H9zM8 21h8" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
    heart: <path d="M12 21C5 16 3 12 3 8.5 3 6 5 4 7.5 4c1.7 0 3 1 4.5 3 1.5-2 2.8-3 4.5-3C19 4 21 6 21 8.5 21 12 19 16 12 21z" />,
    play: <polygon points="6 4 20 12 6 20 6 4" fill={color} stroke="none" />,
    upload: <><path d="M12 16V8m0 0L8.5 11.5M12 8l3.5 3.5" /><path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" /></>,
    scissors2: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8 8l12 10M8 16L20 6" /></>,
    sparkle: <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />,
  };
  return <svg {...p}>{I[name]}</svg>;
}
