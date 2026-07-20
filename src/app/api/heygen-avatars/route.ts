import { NextResponse } from "next/server";

export const runtime = "nodejs";

// HeyGen's avatar catalog is large (1000+) and rarely changes, so fetch it once
// and cache in-module. Requests then filter/paginate the cached list — no repeat
// round-trips, small payloads.
type Avatar = { avatarId: string; name: string; gender: string; premium: boolean; image: string; video: string };
let cache: { at: number; avatars: Avatar[] } | null = null;
const TTL_MS = 60 * 60 * 1000; // 1 hour

async function loadAvatars(key: string): Promise<Avatar[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.avatars;
  const res = await fetch("https://api.heygen.com/v2/avatars", {
    headers: { "X-Api-Key": key },
    signal: AbortSignal.timeout(90000), // full catalog (1000+) is a large, slow payload
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to load avatars.");
  const raw = (data?.data?.avatars ?? []) as Array<Record<string, unknown>>;
  const avatars: Avatar[] = raw.map((a) => ({
    avatarId: String(a.avatar_id ?? ""),
    name: String(a.avatar_name ?? "Avatar"),
    gender: String(a.gender ?? ""),
    premium: Boolean(a.premium),
    image: String(a.preview_image_url ?? ""),
    video: String(a.preview_video_url ?? ""),
  })).filter((a) => a.avatarId && a.image);
  cache = { at: Date.now(), avatars };
  return avatars;
}

// GET /api/heygen-avatars?q=&offset=0&limit=48&gender=&includePremium=1
// Returns a paginated, searchable slice of the avatar catalog.
export async function GET(req: Request) {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) return NextResponse.json({ error: "HEYGEN_API_KEY is not set in .env.local" }, { status: 500 });

  try {
    const sp = new URL(req.url).searchParams;
    const q = (sp.get("q") ?? "").trim().toLowerCase();
    const gender = (sp.get("gender") ?? "").trim().toLowerCase();
    const includePremium = sp.get("includePremium") === "1";
    const offset = Math.max(0, Number(sp.get("offset") ?? 0) || 0);
    const limit = Math.min(96, Math.max(1, Number(sp.get("limit") ?? 48) || 48));

    let list = await loadAvatars(key);
    const totalAll = list.length;
    if (!includePremium) list = list.filter((a) => !a.premium); // free/trial-safe by default
    if (gender) list = list.filter((a) => a.gender.toLowerCase() === gender);
    if (q) list = list.filter((a) => a.name.toLowerCase().includes(q));

    const total = list.length;
    const page = list.slice(offset, offset + limit);
    return NextResponse.json({ ok: true, total, totalAll, offset, limit, avatars: page });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to load avatars." }, { status: 502 });
  }
}
