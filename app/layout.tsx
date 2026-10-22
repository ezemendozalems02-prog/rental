import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GT Rental — Alquiler de vehículos para trabajar con aplicaciones",
    template: "%s · GT Rental",
  },
  description: site.description,
  applicationName: "GT Rental",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "GT Rental",
    images: [{ url: "/img/hero.jpg", width: 2200, height: 1467, alt: "Vehículo de GT Rental recorriendo la ciudad" }],
  },
  twitter: { card: "summary_large_image" },
  // Versión demo: no indexar hasta publicar con datos confirmados.
  robots: site.demo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0A0D14",
  width: "device-width",
  initialScale: 1,
};

// Si el preloader ya se mostró en esta sesión, se omite antes del primer pintado.
const preloadScript = `try{if(sessionStorage.getItem('gt-pre')){document.documentElement.dataset.preloaded='1'}else{sessionStorage.setItem('gt-pre','1')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${archivo.variable} ${inter.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
