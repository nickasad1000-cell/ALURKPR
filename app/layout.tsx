import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GtagInit } from "@/components/gtag-init";
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

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AlurKPR",
    url: SITE_ORIGIN,
    inLanguage: "id-ID",
    description: "Panduan KPR rumah pertama di Indonesia.",
    publisher: { "@type": "Organization", name: "AlurKPR", url: SITE_ORIGIN },
  };
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Langsung ke konten
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <GtagInit />
      </body>
    </html>
  );
}