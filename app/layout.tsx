import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dipclub.nl"),
  title: "Dip Club Amsterdam — Seek Discomfort. Find Yourself.",
  description:
    "Amsterdam's urban wellness community. Ice baths, breathwork, and outdoor adventures. Join 200+ brave souls who chose discomfort over comfort.",
  // No openGraph.title/description here on purpose: Next falls back to each
  // page's own title and description, so sub-pages get accurate share cards
  // while inheriting the image below.
  openGraph: {
    type: "website",
    siteName: "Dip Club Amsterdam",
    locale: "en_GB",
    // No `url` here: it would be inherited verbatim, making every sub-page
    // claim to be the homepage. Crawlers fall back to the fetched URL.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dip Club Amsterdam — Reset. Your. Mind.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={switzer.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
