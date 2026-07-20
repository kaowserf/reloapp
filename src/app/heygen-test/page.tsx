"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "submitting" | "processing" | "completed" | "failed";

const DEFAULT_SCRIPT =
  "Welcome to Reelo, where your ideas become studio-quality videos in minutes. " +
  "Just type your message and press generate — no cameras, no editing.";

export default function HeyGenTestPage() {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [phase, setPhase] = useState<Phase>("idle");
  const [status, setStatus] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [truncated, setTruncated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up any active poll on unmount.
  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  function stopPolling() {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }

  async function poll(id: string) {
    try {
      const res = await fetch(`/api/heygen-video?video_id=${id}`);
      const data = await res.json();
      setStatus(data.status || "unknown");
      if (data.status === "completed" && data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setPhase("completed");
        stopPolling();
      } else if (data.status === "failed") {
        setError(data.error?.detail || data.error?.message || "HeyGen reported the video as failed.");
        setPhase("failed");
        stopPolling();
      }
    } catch {
      /* transient network blip — keep polling */
    }
  }

  async function generate() {
    setPhase("submitting");
    setError(null); setVideoUrl(null); setVideoId(null); setStatus(""); setTruncated(false);
    stopPolling();
    try {
      const res = await fetch("/api/heygen-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Request failed (${res.status}).`);
        setPhase("failed");
        return;
      }
      setVideoId(data.videoId);
      setRemaining(data.remainingToday);
      setTruncated(!!data.truncated);
      setStatus(data.status || "processing");
      setPhase("processing");
      // Poll every 5s until completed/failed.
      poll(data.videoId);
      pollRef.current = setInterval(() => poll(data.videoId), 5000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
      setPhase("failed");
    }
  }

  const busy = phase === "submitting" || phase === "processing";

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px", color: "#f5f5f7", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>HeyGen Video — Test</h1>
      <p style={{ color: "#a1a1aa", marginBottom: 24, fontSize: 14 }}>
        Type a script and generate an avatar video. Capped at 30 seconds · limit 5 videos per day.
      </p>

      <label style={{ display: "block", fontSize: 13, color: "#a1a1aa", marginBottom: 8 }}>Script</label>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        rows={5}
        disabled={busy}
        style={{
          width: "100%", padding: 14, borderRadius: 12, fontSize: 15, lineHeight: 1.5,
          background: "rgba(255,60,75,.04)", border: "1px solid rgba(255,70,85,.22)",
          color: "#f5f5f7", resize: "vertical", outline: "none",
        }}
      />

      <button
        onClick={generate}
        disabled={busy || !script.trim()}
        style={{
          marginTop: 16, padding: "12px 22px", borderRadius: 999, border: "none",
          fontSize: 15, fontWeight: 600, cursor: busy ? "not-allowed" : "pointer",
          background: busy ? "#3f3f46" : "linear-gradient(90deg,#ff4655,#ff2d55)",
          color: "#fff", opacity: busy ? 0.7 : 1,
        }}
      >
        {phase === "submitting" ? "Submitting…" : phase === "processing" ? "Generating…" : "Generate video"}
      </button>

      {/* Status / progress */}
      {phase !== "idle" && (
        <div style={{ marginTop: 24, padding: 16, borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", fontSize: 14 }}>
          {remaining !== null && <div style={{ color: "#a1a1aa" }}>Videos remaining today: <b style={{ color: "#f5f5f7" }}>{remaining}</b></div>}
          {videoId && <div style={{ color: "#a1a1aa", marginTop: 4 }}>Video ID: <code style={{ color: "#f5f5f7" }}>{videoId}</code></div>}
          {truncated && <div style={{ color: "#fbbf24", marginTop: 4 }}>⚠ Script was truncated to fit the 30-second cap.</div>}
          {busy && (
            <div style={{ marginTop: 8, color: "#f5f5f7" }}>
              Status: <b>{status || "processing"}</b> — this can take a few minutes on HeyGen&apos;s side. Polling…
            </div>
          )}
          {error && <div style={{ marginTop: 8, color: "#ff6b6b" }}>Error: {error}</div>}
        </div>
      )}

      {/* Result */}
      {videoUrl && (
        <div style={{ marginTop: 24 }}>
          <video src={videoUrl} controls autoPlay style={{ width: "100%", borderRadius: 12, background: "#000" }} />
          <a href={videoUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 10, color: "#ff4655", fontSize: 14 }}>
            Open video in new tab ↗
          </a>
        </div>
      )}
    </main>
  );
}
