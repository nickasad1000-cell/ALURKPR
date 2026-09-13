import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tahapKpr } from "@/content/tahap";
import { PerjalananDetail } from "@/components/perjalanan-detail";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return tahapKpr.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tahap = tahapKpr.find((t) => t.slug === slug);
  if (!tahap) return { title: "Tahap tidak ditemukan" };
  return {
    title: `${tahap.judul} · Alur 8 Tahap KPR`,
    description: tahap.ringkasan,
    alternates: { canonical: `/perjalanan/${slug}` },
  };
}

export default async function PerjalananTahapPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tahap = tahapKpr.find((t) => t.slug === slug);
  if (!tahap) notFound();
  return <PerjalananDetail tahap={tahap} />;
}