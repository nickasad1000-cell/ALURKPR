import Link from "next/link";
import { Container, btnPrimary } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-semibold text-primary/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
        Halaman yang kamu cari tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        Mungkin tautannya berubah, atau halamannya memang belum ada. Mulai lagi
        dari panduan atau kalkulator.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={btnPrimary}>
          Kembali ke beranda
        </Link>
        <Link href="/panduan" className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-6 text-sm font-bold">
          Lihat panduan
        </Link>
      </div>
    </Container>
  );
}