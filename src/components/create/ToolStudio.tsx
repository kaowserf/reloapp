"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Tool, Field } from "@/lib/tools";

type Status = "idle" | "generating" | "done";

export default function ToolStudio({ tool }: { tool: Tool }) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    for (const f of tool.fields) {
      if (f.kind === "select" || f.kind === "segment") v[f.name] = f.options[0];
      if (f.kind === "slider") v[f.name] = String(f.default);
    }
    return v;
  });
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [multi, setMulti] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const scriptField = tool.fields.find((f) => f.name === "script" || f.name === "prompt");
  const caption = scriptField ? (values[scriptField.name]?.trim() || `Hello! Welcome to ${tool.title}.`) : null;

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));
  const toggleMulti = (name: string, opt: string) =>
    setMulti((m) => {
      const cur = m[name] ?? [];
      return { ...m, [name]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });
  const onFile = (name: string, file?: File) => {
    if (!file) return;
    setPreviews((p) => ({ ...p, [name]: URL.createObjectURL(file) }));
    set(name, file.name);
  };

  const generate = () => {
    setStatus("generating");
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (timer.current) clearInterval(timer.current);
          setStatus("done");
          setPlaying(true);
          return 100;
        }
        return p + 4;
      });
    }, 90);
  };
  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    setStatus("idle");
    setProgress(0);
    setPlaying(false);
  };
  const copyLink = () => {
    try {
      navigator.clipboard?.writeText(`https://reelo.app/v/${tool.slug}-${Math.floor(progress)}demo`);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="relative min-h-screen text-white" style={{ background: "#0a0607" }}>
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{ backgroundImage: "radial-gradient(900px 500px at 70% -5%,rgba(225,29,42,.16),transparent 60%)" }} />
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,70,85,.05) 1px,transparent 1px)", backgroundSize: "26px 26px" }} />

      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/create" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-display grid h-7 w-7 place-items-center rounded-lg text-xs font-bold" style={{ background: "linear-gradient(135deg,#ff3645,#b3121d)" }}>R</span>
            Create
          </Link>
          <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ border: "1px solid rgba(255,70,85,.2)", color: "#cabcbe" }}>{tool.credits}</span>
        </div>
      </header>

      <div className="relative z-[1] mx-auto max-w-6xl px-4 py-9 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#ff5663" }}>Studio</p>
        <h1 className="font-display mt-1 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{tool.title}</h1>
        <p className="mt-2" style={{ color: "#a99a9c" }}>{tool.tagline}</p>

        <div className="mt-7 grid gap-6 lg:grid-cols-5">
          {/* form */}
          <div className="lg:col-span-3">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md sm:p-7">
              {tool.fields.map((f) => (
                <FieldView key={f.name} field={f} value={values[f.name] ?? ""} preview={previews[f.name]} selected={multi[f.name] ?? []} onChange={(v) => set(f.name, v)} onFile={(file) => onFile(f.name, file)} onToggle={(opt) => toggleMulti(f.name, opt)} />
              ))}
              <button onClick={generate} disabled={status === "generating"} className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.01] disabled:opacity-60" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 28px -8px rgba(225,29,42,.6)" }}>
                {status === "generating" ? <><Spinner /> Generating…</> : <><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>{tool.cta}</>}
              </button>
            </div>
          </div>

          {/* preview / result */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
              <p className="mb-3 px-2 text-sm font-semibold text-white/70">Preview</p>
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black">
                <Image src={tool.poster} alt="" fill className={`object-cover transition ${status === "generating" ? "opacity-30" : "opacity-100"}`} />

                {/* caption speech bubble */}
                {caption && status !== "generating" && (
                  <div className="absolute right-3 top-3 flex max-w-[80%] items-start gap-2 rounded-2xl px-3 py-2 shadow-xl" style={{ background: "rgba(255,255,255,.95)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff3645" strokeWidth="2" strokeLinecap="round" className="mt-px shrink-0"><path d="M4 10v4M8 7v10M12 9v6M16 6v12M20 10v4" /></svg>
                    <span className="text-[12px] font-medium leading-snug" style={{ color: "#1a1018" }}>{caption}</span>
                  </div>
                )}

                {/* generating overlay */}
                {status === "generating" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/45">
                    <Spinner large />
                    <div className="w-2/3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#ff3645,#c4101c)" }} /></div>
                      <p className="mt-2 text-center text-xs text-white/60">Rendering {progress}%</p>
                    </div>
                  </div>
                )}

                {/* center play button (paused) */}
                {status !== "generating" && !playing && (
                  <button onClick={() => setPlaying(true)} className="absolute inset-0 grid place-items-center" aria-label="Play">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-lg transition hover:scale-105"><svg width="22" height="22" viewBox="0 0 24 24" fill="#c4101c" className="ml-1"><polygon points="6 4 20 12 6 20 6 4" /></svg></span>
                  </button>
                )}

                {/* player control bar */}
                {status !== "generating" && (
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 backdrop-blur-md" style={{ background: "rgba(10,6,8,.55)", border: "1px solid rgba(255,255,255,.1)" }}>
                      <button onClick={() => setPlaying((p) => !p)} className="shrink-0 text-white" aria-label={playing ? "Pause" : "Play"}>
                        {playing ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
                        )}
                      </button>
                      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                        <div key={playing ? "on" : "off"} className="h-full rounded-full" style={{ width: playing ? "0%" : "42%", background: "linear-gradient(90deg,#ff3645,#c4101c)", animation: playing ? "playbar 8s linear infinite" : "none" }} />
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M11 5L6 9H3v6h3l5 4z" /><path d="M16 9a4 4 0 0 1 0 6" /></svg>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" /></svg>
                    </div>
                  </div>
                )}
              </div>

              {status === "done" && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm" style={{ border: "1px solid rgba(255,70,85,.3)", background: "rgba(255,70,85,.1)", color: "#ffb3b9" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Your {tool.title.toLowerCase()} is ready!
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Action label="Download" icon={<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />} primary />
                    <Action label="Share" icon={<><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" /></>} />
                    <button onClick={copyLink} className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                    <button onClick={reset} className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 4v4h-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Create Another
                    </button>
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs text-white/45">Share to</p>
                    <div className="flex gap-2">
                      {["TikTok", "Instagram", "Facebook", "YouTube"].map((s) => (
                        <span key={s} className="font-display grid h-9 flex-1 place-items-center rounded-lg text-xs font-bold" style={{ border: "1px solid rgba(255,70,85,.2)", background: "rgba(255,60,75,.04)", color: "#cabcbe" }}>{s[0]}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Action({ label, icon, primary }: { label: string; icon: React.ReactNode; primary?: boolean }) {
  return (
    <button className="flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02]" style={primary ? { background: "linear-gradient(135deg,#ff3645,#c4101c)", color: "#fff" } : { border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.05)" }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      {label}
    </button>
  );
}

function FieldView({ field, value, preview, selected, onChange, onFile, onToggle }: {
  field: Field; value: string; preview?: string; selected: string[];
  onChange: (v: string) => void; onFile: (f?: File) => void; onToggle: (opt: string) => void;
}) {
  const label = <label className="mb-2 block text-sm font-semibold text-white/85">{"label" in field ? field.label : ""}</label>;
  const inputCls = "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition focus:border-[rgba(255,70,85,.6)]";
  const inputStyle = { border: "1px solid rgba(255,70,85,.22)", background: "rgba(255,60,75,.04)" } as const;

  switch (field.kind) {
    case "url":
    case "text":
      return <div>{label}<input type={field.kind === "url" ? "url" : "text"} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} style={inputStyle} />{field.hint && <p className="mt-1.5 text-xs text-white/40">{field.hint}</p>}</div>;
    case "textarea":
      return <div>{label}<textarea rows={4} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={`${inputCls} resize-none`} style={inputStyle} />{field.hint && <p className="mt-1.5 text-xs text-white/40">{field.hint}</p>}</div>;
    case "select":
      return <div>{label}<select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} appearance-none`} style={inputStyle}>{field.options.map((o) => <option key={o} value={o} className="bg-[#140a0c]">{o}</option>)}</select></div>;
    case "segment":
      return (
        <div>{label}
          <div className="inline-flex w-full gap-1 rounded-xl p-1" style={inputStyle}>
            {field.options.map((o) => <button key={o} onClick={() => onChange(o)} className="flex-1 rounded-lg py-2 text-sm font-semibold transition-colors" style={value === o ? { background: "linear-gradient(135deg,#ff3645,#c4101c)", color: "#fff" } : { color: "#b9a9ab" }}>{o}</button>)}
          </div>
        </div>
      );
    case "slider":
      return (
        <div>
          <div className="mb-2 flex items-center justify-between"><label className="text-sm font-semibold text-white/85">{field.label}</label><span className="rounded-md px-2 py-0.5 text-sm font-medium" style={{ background: "rgba(255,70,85,.12)", color: "#ff8a92" }}>{value || field.default}{field.unit ?? ""}</span></div>
          <input type="range" min={field.min} max={field.max} step={field.step} value={value || field.default} onChange={(e) => onChange(e.target.value)} className="w-full accent-[#ff3645]" />
        </div>
      );
    case "multi":
      return (
        <div>{label}
          <div className="flex flex-wrap gap-2">
            {field.options.map((o) => { const on = selected.includes(o); return <button key={o} onClick={() => onToggle(o)} className="rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors" style={on ? { background: "linear-gradient(135deg,#ff3645,#c4101c)", color: "#fff" } : { border: "1px solid rgba(255,70,85,.2)", color: "#b9a9ab" }}>{o}</button>; })}
          </div>
        </div>
      );
    case "upload":
      return (
        <div>{label}
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl px-4 py-8 text-center transition hover:border-[rgba(255,70,85,.5)]" style={{ border: "2px dashed rgba(255,70,85,.3)", background: "rgba(255,60,75,.02)" }}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="h-28 w-28 rounded-xl object-cover" />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff5663" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
            )}
            <span className="text-sm font-medium text-white/70">{preview ? value : "Click to upload"}</span>
            <span className="text-xs text-white/40">{preview ? "Change file" : field.hint ?? "PNG, JPG or MP4"}</span>
            <input type="file" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        </div>
      );
    case "choices":
      return (
        <div>{label}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {field.options.map((o) => { const on = value === o.value; return (
              <button key={o.value} onClick={() => onChange(o.value)} className="flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center transition" style={on ? { border: "1px solid #ff3645", background: "rgba(255,70,85,.1)" } : { border: "1px solid rgba(255,70,85,.15)", background: "rgba(255,60,75,.03)" }}>
                {o.img ? <span className="h-14 w-14 overflow-hidden rounded-xl">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={o.img} alt={o.label} className="h-full w-full object-cover" /></span> : <span className="text-2xl">{o.icon}</span>}
                <span className="text-xs font-medium" style={{ color: on ? "#ffb3b9" : "#b9a9ab" }}>{o.label}</span>
              </button>
            ); })}
          </div>
        </div>
      );
  }
}

function Spinner({ large }: { large?: boolean }) {
  const s = large ? 46 : 18;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
