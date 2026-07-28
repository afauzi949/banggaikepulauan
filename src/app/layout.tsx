import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SmoothScroll } from "@/components/SmoothScroll";
import ChatWidget from "@/components/ChatWidget";
import { Preloader } from "@/components/organisms/Preloader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wisata & Budaya Banggai Kepulauan | Pengabdi Kebanggaan",
    template: "%s | Pengabdi Kebanggaan",
  },
  description:
    "Portal wisata, budaya, kegiatan, dan UMKM Kabupaten Banggai Kepulauan, Sulawesi Tengah.",
  icons: {
    icon: [
      { url: "/brand/logo-bangkep.svg", type: "image/svg+xml" },
    ],
    shortcut: "/brand/logo-bangkep.svg",
    apple: "/brand/logo-bangkep.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}
      >
        <Preloader />
        <SmoothScroll>
          <LanguageProvider>
            {children}
            <LanguageSwitcher />
            <ChatWidget />
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
