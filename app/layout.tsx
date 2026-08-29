import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE_ORIGIN } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plusjakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "AlurKPR — Panduan KPR Rumah Pertama dari A sampai Z",
    template: "%s | AlurKPR",
  },
  description:
    "Panduan langkah demi langkah mengurus KPR subsidi & komersial di Indonesia: simulasi angsuran, cek kelayakan FLPP, perbandingan bank, biaya awal, FAQ dan glosarium.",
  keywords: [
    "KPR",
    "KPR subsidi",
    "FLPP",
    "simulasi KPR",
    "kredit pemilikan rumah",
    "rumah pertama",
    "BPHTB",
    "perbandingan bank",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "AlurKPR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}