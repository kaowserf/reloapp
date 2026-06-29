import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STUDIOS, getStudio } from "@/lib/studios";
import StudioShell from "@/components/studio/StudioShell";

export function generateStaticParams() {
  return STUDIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const studio = getStudio(slug);
  if (!studio) return { title: "Studio — Reelo" };
  return {
    title: `${studio.title} Studio — Reelo`,
    description: studio.tagline,
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const studio = getStudio(slug);
  if (!studio) notFound();
  return <StudioShell studio={studio} />;
}
