"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DesignShell from "@/components/design/DesignShell";

const CATS = ["All", "AI Avatars", "Talking Photos", "Dancing Photos", "Commercials", "AI Videos"];

const ALL = [
  { tag: "Avatar", cat: "AI Avatars", title: "AI Avatar Video", sub: "Business Spokesperson", img: "/assets/spokesperson.jpg" },
  { tag: "Talking", cat: "Talking Photos", title: "Talking Photo", sub: "Bring Photos to Life", img: "/assets/talking-photo.jpg" },
  { tag: "Dancing", cat: "Dancing Photos", title: "Dancing Photo", sub: "Fun & Engaging", img: "/assets/dancing.jpg" },
  { tag: "Commercial", cat: "Commercials", title: "Product Commercial", sub: "Boost Sales", img: "/assets/product.jpg" },
  { tag: "Commercial", cat: "Commercials", title: "Website Commercial", sub: "Promote Your Business", img: "/assets/commercials.jpg" },
  { tag: "AI Video", cat: "AI Videos", title: "AI Video", sub: "Text to Video", img: "/assets/shorts.jpg" },
  { tag: "AI Video", cat: "AI Videos", title: "Real Estate Video", sub: "Property Walkthrough", img: "/assets/product-skincare.jpg" },
  { tag: "20 Pack", cat: "AI Videos", title: "Shorts (20 Pack)", sub: "One Prompt, 20 Shorts", img: "/assets/dancing-grandpa.jpg" },
  { tag: "Ad", cat: "Commercials", title: "Social Media Ad", sub: "Convert & Engage", img: "/assets/talking-selfie.jpg" },
];

export default function ExamplesPage() {
  const [active, setActive] = useState("All");
  const cards = active === "All" ? ALL : ALL.filter((c) => c.cat === active);

  return (
    <DesignShell glow="radial-gradient(800px 500px at 50% -5%,rgba(225,29,42,.16),transparent 60%),radial-gradient(700px 500px at 0% 50%,rgba(140,12,20,.12),transparent 60%)">
      <section className="mx-auto max-w-[1200px] px-8 pb-1.5 pt-[34px] text-center">
        <h1 className="font-display mb-2.5 text-4xl font-bold tracking-[-0.02em] sm:text-[46px]">See Reelo in Action</h1>
        <p className="mb-[26px] text-base" style={{ color: "#a99a9c" }}>Real examples. Real results.</p>
        <div className="inline-flex flex-wrap justify-center gap-[9px]">
          {CATS.map((label) => {
            const on = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className="cursor-pointer rounded-[9px] px-4 py-2 text-[13px] font-semibold transition-all"
                style={{
                  border: `1px solid ${on ? "transparent" : "rgba(255,70,85,.2)"}`,
                  color: on ? "#fff" : "#b9a9ab",
                  background: on ? "linear-gradient(135deg,#ff3645,#c4101c)" : "transparent",
                  boxShadow: on ? "0 6px 18px rgba(225,29,42,.35)" : undefined,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-8 pb-4 pt-[30px]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1"
              style={{ border: "1px solid rgba(255,70,85,.14)", background: "rgba(255,60,75,.03)" }}
            >
              <div className="relative grid h-[170px] place-items-center overflow-hidden">
                <Image src={c.img} alt={c.title} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%,transparent 35%,rgba(8,4,5,.7))" }} />
                <div className="relative grid h-[50px] w-[50px] place-items-center rounded-full" style={{ background: "rgba(255,255,255,.14)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,.3)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
                </div>
                <div className="absolute left-[11px] top-[11px] rounded-md px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.05em] text-white" style={{ background: "rgba(225,29,42,.85)" }}>
                  {c.tag}
                </div>
              </div>
              <div className="px-4 pb-[17px] pt-[15px]">
                <div className="font-display mb-[3px] text-[15.5px] font-semibold">{c.title}</div>
                <div className="text-[12.5px]" style={{ color: "#9a8b8d" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-[34px] mb-[70px] text-center">
          <Link href="/pricing" className="inline-block rounded-xl px-[30px] py-[13px] text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#ff3645,#c4101c)", boxShadow: "0 10px 28px rgba(225,29,42,.4)" }}>
            View More Examples
          </Link>
        </div>
      </section>
    </DesignShell>
  );
}
