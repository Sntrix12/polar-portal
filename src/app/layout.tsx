import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
// Leaflet's stylesheet must come first so globals.css can override its defaults
// (notably .leaflet-container's light #ddd background).
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Polar India — NCPOR Science Outreach Portal",
  description:
    "Four decades of Indian polar science across Antarctica, the Arctic and the Southern Ocean. A public outreach portal and knowledge repository for NCPOR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased bg-page text-ink min-h-screen">
        <LanguageProvider>
          <Navbar />
          <main className="pt-[72px]">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
