import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getTool } from "@/lib/tools";
import ToolStudio from "@/components/create/ToolStudio";
import WebsiteCommercial from "@/components/create/WebsiteCommercial";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  return { title: tool ? `${tool.title} — Reelo` : "Create — Reelo" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  if (slug === "website-commercial") return <WebsiteCommercial />;
  return <ToolStudio tool={tool} />;
}
