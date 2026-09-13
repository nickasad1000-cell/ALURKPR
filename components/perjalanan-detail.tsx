import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CircleDot,
  FileText,
  KeyRound,
  ListChecks,
  MessageCircle,
  Target,
  Wallet,
} from "lucide-react";
import type { Tahap } from "@/lib/types";
import { KELOMPOK_DOKUMEN_LABEL } from "@/lib/types";
import { tahapKpr } from "@/content/tahap";
import { PelatTahap } from "@/components/blueprint-icons";
import { PerjalananKontrol } from "@/components/perjalanan-kontrol";
import { ProfilKamu } from "@/components/profil-kamu";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { Breadcrumb, Container, DisclaimerNasihat, Eyebrow } from "@/components/ui";

const urutanKelompok = Object.keys(KELOMPOK_DOKUMEN_LABEL) as (keyof typeof KELOMPOK_DOKUMEN_LABEL)[];

export function PerjalananDetail({ tahap }: { tahap: Tahap }) {
  const index = tahap.nomor - 1;
  const prev = index > 0 ? tahapKpr[index - 1] : null;
  const next = index < tahapKpr.length - 1 ? tahapKpr[index + 1] : null;
  const terakhir = !next;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tahap.judul,
    description: tahap.ringkasan,
    step: tahap.lakukan.map((langkah, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Langkah ${i + 1}`,
      text: langkah,
    })),
    inLanguage: "id-ID",
  };

  return (
    <Container className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Perjalanan", href: "/perjalanan" },
          { label: tahap.judulSingkat },
        ]}
      />
      <Link
        href="/perjalanan"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Semua tahap
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex items-end gap-4">
          <PelatTahap index={index} className="size-14 sm:size-16 [&>svg]:size-7 sm:[&>svg]:size-8" />
          <div>
            <Eyebrow>
              Tahap {String(tahap.nomor).padStart(2, "0")} dari 08
            </Eyebrow>
            <p className="mt-1 text-xs font-semibold text-ink-soft">
              Estimasi {tahap.estimasiWaktu}
            </p>
          </div>
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          {tahap.judul}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{tahap.ringkasan}</p>

        {tahap.fakta ? (
          <div className="mt-6 rounded-[2px] border border-line bg-surface px-4 py-3 max-w-md">
            <p className="font-display text-2xl font-bold leading-none text-primary">
              {tahap.fakta.nilai}
            </p>
            <p className="mt-1.5 text-[11px] uppercase leading-tight tracking-[0.14em] text-ink-soft">
              {tahap.fakta.label}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
              {tahap.fakta.sumber ? `Sumber: ${tahap.fakta.sumber}. ` : ""}
              {tahap.fakta.terakhirDicek
                ? `Dicek ${new Date(`${tahap.fakta.terakhirDicek}T00:00:00`).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}.`
                : ""}
            </p>
          </div>
        ) : null}
      </header>

      <div className="mx-auto mt-10 max-w-3xl space-y-5">
        <section className="rounded-3xl border border-line bg-surface p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <Target className="size-5 text-primary" aria-hidden="true" />
            Tujuan tahap ini
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">{tahap.tujuan}</p>
        </section>

        <section className="rounded-3xl border border-line bg-surface p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <ListChecks className="size-5 text-primary" aria-hidden="true" />
            Siapkan ini dulu
          </h2>
          <ul className="mt-5 space-y-3">
            {tahap.siapkanIni.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                <CircleDot className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-line bg-surface p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <KeyRound className="size-5 text-primary" aria-hidden="true" />
            Lakukan langkah ini
          </h2>
          <ol className="mt-5 space-y-4">
            {tahap.lakukan.map((langkah, i) => (
              <li key={langkah} className="flex items-start gap-3.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary-deep">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed sm:text-base">{langkah}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl border border-line bg-surface p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <Wallet className="size-5 text-primary" aria-hidden="true" />
            Uang yang keluar di tahap ini
          </h2>
          <ul className="mt-5 space-y-3">
            {tahap.uang.map((u) => (
              <li key={u} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                <Wallet className="mt-0.5 size-[18px] shrink-0 text-accent-ink" aria-hidden="true" />
                {u}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-line bg-surface p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
              <FileText className="size-5 text-primary" aria-hidden="true" />
              Dokumen (5 kelompok master)
            </h2>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
            >
              Checklist cetak
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {urutanKelompok.map((kelompok) => {
              const daftar = tahap.dokumen.filter((d) => d.kelompok === kelompok);
              if (daftar.length === 0) return null;
              return (
                <div key={kelompok}>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-deep">
                    {KELOMPOK_DOKUMEN_LABEL[kelompok]}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {daftar.map((d) => (
                      <li key={d.nama} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                        <FileText className="mt-0.5 size-[18px] shrink-0 text-ink-soft" aria-hidden="true" />
                        {d.nama}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-accent-soft/70 p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <AlertTriangle className="size-5 text-accent-ink" aria-hidden="true" />
            Perlu diperhatikan
          </h2>
          <ul className="mt-5 space-y-3">
            {tahap.perhatikan.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
                <AlertTriangle className="mt-0.5 size-[18px] shrink-0 text-accent-ink" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <PerjalananKontrol slug={tahap.slug} hasilTahap={tahap.hasilTahap} />

        {tahap.slug === "03-skema" ? (
          <section className="rounded-3xl border border-line bg-surface p-7">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
              <ListChecks className="size-5 text-primary" aria-hidden="true" />
              Cek: skema mana yang cocok untukmu?
            </h2>
            <p className="mt-4 text-sm leading-relaxed sm:text-base">
              Jawab lima pertanyaan singkat. Rekomendasi di bawah ini adalah
              titik awal — keputusan final tetap di kamu dan bank penyalur.
            </p>
            <div className="mt-6">
              <ProfilKamu />
            </div>
          </section>
        ) : null}

        <section className="rounded-3xl bg-primary-soft p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-primary-deep">
            <KeyRound className="size-5 text-primary" aria-hidden="true" />
            Siap lanjut?
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{tahap.siapLanjut}</p>
          {(terakhir || next) && (
            <div className="mt-5">
              {!terakhir && next ? (
                <Link
                  href={`/perjalanan/${next.slug}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white transition hover:bg-primary-deep"
                >
                  Lanjut: {next.judulSingkat}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <WhatsAppLink
                  source="perjalanan_tahap8"
                  pesan="Halo, saya baru saja melewati seluruh alur 8 tahap KPR di AlurKPR dan kunci sudah di tangan. Saya ingin konsultasi kelanjutan / pertanyaan."
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-wa px-6 text-sm font-bold text-white transition hover:bg-wa-deep"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Konsultasi via WhatsApp
                </WhatsAppLink>
              )}
            </div>
          )}
        </section>

        <div className="rounded-2xl bg-accent-soft/60 p-5">
          <DisclaimerNasihat />
        </div>
      </div>

      <nav className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/perjalanan/${prev.slug}`}
            className="group flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 transition hover:border-primary/40"
          >
            <ArrowLeft className="mt-0.5 size-5 shrink-0 text-primary transition group-hover:-translate-x-0.5" aria-hidden="true" />
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">
                Tahap sebelumnya
              </span>
              <span className="mt-1 block text-sm font-semibold">{prev.judulSingkat}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/perjalanan/${next.slug}`}
            className="group flex items-start justify-end gap-3 rounded-2xl border border-line bg-surface p-5 text-right transition hover:border-primary/40"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">
                Tahap berikutnya
              </span>
              <span className="mt-1 block text-sm font-semibold">{next.judulSingkat}</span>
            </span>
            <ArrowRight className="mt-0.5 size-5 shrink-0 text-primary transition group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ) : null}
      </nav>
    </Container>
  );
}