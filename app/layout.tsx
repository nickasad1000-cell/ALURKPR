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
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plusjakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "AlurKPR — Panduan KPR Rumah Pertama dari A sampai Z",
    template: "%s | AlurKPR",
  },
  description:
    "Panduan langkah demi langkah mengurus KPR subsidi & komersial di Indonesia: simulasi angsuran, cek kelayakan FLPP, perbandingan bank, biaya awal, FAQ dan glosarium.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "AlurKPR",
    url: "/",
    images: [{ url: "/logo.png", width: 635, height: 635, alt: "Logo AlurKPR" }],
  },
  twitter: {
    card: "summary",
    title: "AlurKPR — Panduan KPR Rumah Pertama dari A sampai Z",
    description:
      "Panduan langkah demi langkah mengurus KPR subsidi & komersial di Indonesia: simulasi angsuran, cek kelayakan FLPP, perbandingan bank, biaya awal, FAQ dan glosarium.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AlurKPR",
    url: SITE_ORIGIN,
    inLanguage: "id-ID",
    description: "Panduan KPR rumah pertama di Indonesia.",
    publisher: { "@type": "Organization", name: "AlurKPR", url: SITE_ORIGIN },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_ORIGIN}/panduan?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AlurKPR",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/logo.png`,
    description: "Panduan edukasi KPR rumah pertama di Indonesia — netral, gratis, tanpa bias produk.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-813-3337-2016",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: "Indonesian",
      description: "Konsultasi via WhatsApp (AlurKPR — bukan agen bank, edukasi netral).",
    },
  };
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
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