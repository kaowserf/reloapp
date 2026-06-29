"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Studio, Field } from "@/lib/studios";

type Status = "idle" | "generating" | "done";

export default function StudioShell({ studio }: { studio: Studio }) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of studio.fields) {
      if (f.kind === "select") init[f.name] = f.options[0];
      if (f.kind === "slider") init[f.name] = String(f.default);
    }
    return init;
  });
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);

  const set = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }));

  const onFile = (name: string, file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviews((p) => ({ ...p, [name]: url }));
    set(name, file.name);
  };

  const generate = () => {
    setStatus("generating");
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setStatus("done");
          return 100;
        }
        return p + 4;
      });
    }, 90);
  };

  const reset = () => {
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="min-h-screen text-white">
      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold">R</span>
              Reelo
            </span>
          </Link>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            {studio.credits}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* title */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Studio</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{studio.title}</h1>
          <p className="mt-2 text-white/55">{studio.tagline}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* form */}
          <div className="lg:col-span-3">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8">
              {studio.fields.map((f) => (
                <FieldRenderer
                  key={f.name}
                  field={f}
                  value={values[f.name] ?? ""}
                  preview={previews[f.name]}
                  onChange={(v) => set(f.name, v)}
                  onFile={(file) => onFile(f.name, file)}
                />
              ))}

              <button
                onClick={generate}
                disabled={status === "generating"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                {status === "generating" ? (
                  <>
                    <Spinner /> Generating…
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l1.6 4.8L18 8.4l-4.4 1.6L12 15l-1.6-5L6 8.4l4.4-1.6L12 2z" />
                    </svg>
                    {studio.cta}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
              <p className="mb-3 px-2 text-sm font-semibold text-white/70">Preview</p>
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black">
                <Image src={studio.poster} alt="" fill className={`object-cover transition ${status === "done" ? "opacity-100" : "opacity-40"}`} />

                {status === "idle" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-white/50">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="m9 9 6 3-6 3V9z" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="px-6 text-sm">Your video will appear here</span>
                  </div>
                )}

                {status === "generating" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40">
                    <div className="h-12 w-12">
                      <Spinner large />
                    </div>
                    <div className="w-2/3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="mt-2 text-center text-xs text-white/60">Rendering {progress}%</p>
                    </div>
                  </div>
                )}

                {status === "done" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition hover:scale-105">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-blue-600">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {status === "done" && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Your {studio.title.toLowerCase()} is ready!
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#04060c] hover:bg-white/90">Download</button>
                    <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Share</button>
                  </div>
                  <button onClick={reset} className="w-full rounded-full px-4 py-2 text-sm font-medium text-white/60 hover:text-white">
                    ↺ Start over
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  preview,
  onChange,
  onFile,
}: {
  field: Field;
  value: string;
  preview?: string;
  onChange: (v: string) => void;
  onFile: (file?: File) => void;
}) {
  const label = (
    <label className="mb-2 block text-sm font-semibold text-white/85">
      {"label" in field ? field.label : ""}
    </label>
  );
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

  switch (field.kind) {
    case "url":
    case "text":
      return (
        <div>
          {label}
          <input type={field.kind === "url" ? "url" : "text"} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
          {field.hint && <p className="mt-1.5 text-xs text-white/40">{field.hint}</p>}
        </div>
      );

    case "textarea":
      return (
        <div>
          {label}
          <textarea value={value} placeholder={field.placeholder} rows={4} onChange={(e) => onChange(e.target.value)} className={`${inputClass} resize-none`} />
          {field.hint && <p className="mt-1.5 text-xs text-white/40">{field.hint}</p>}
        </div>
      );

    case "select":
      return (
        <div>
          {label}
          <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} appearance-none`}>
            {field.options.map((o) => (
              <option key={o} value={o} className="bg-[#0c0f17]">
                {o}
              </option>
            ))}
          </select>
        </div>
      );

    case "slider":
      return (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-white/85">{field.label}</label>
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-sm font-medium text-cyan-300">
              {value || field.default}
              {field.unit ?? ""}
            </span>
          </div>
          <input type="range" min={field.min} max={field.max} step={field.step} value={value || field.default} onChange={(e) => onChange(e.target.value)} className="w-full accent-cyan-400" />
        </div>
      );

    case "upload":
      return (
        <div>
          {label}
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-4 py-8 text-center transition hover:border-cyan-400/50 hover:bg-white/[0.04]">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="upload preview" className="h-28 w-28 rounded-xl object-cover" />
            ) : (
              <>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50">
                  <path d="M12 16V4m0 0L8 8m4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-medium text-white/70">Click to upload</span>
              </>
            )}
            <span className="text-xs text-white/40">{preview ? value : field.hint ?? "PNG or JPG"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        </div>
      );

    case "choices":
      return (
        <div>
          {label}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {field.options.map((o) => {
              const active = value === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => onChange(o.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition ${
                    active ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-black/40 backdrop-blur-md hover:border-white/25"
                  }`}
                >
                  {o.img ? (
                    <span className="h-14 w-14 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={o.img} alt={o.label} className="h-full w-full object-cover" />
                    </span>
                  ) : (
                    <span className="text-2xl">{o.icon}</span>
                  )}
                  <span className={`text-xs font-medium ${active ? "text-cyan-200" : "text-white/70"}`}>{o.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
  }
}

function Spinner({ large }: { large?: boolean }) {
  const s = large ? 48 : 18;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
