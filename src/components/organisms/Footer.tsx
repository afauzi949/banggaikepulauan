import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { type SponsorLogoProps } from "@/components/atoms/SponsorLogo";
import { FooterColumn } from "@/components/molecules/FooterColumn";
import { SponsorLogoGroup } from "@/components/molecules/SponsorLogoGroup";
import { cn } from "@/lib/utils";

export interface FooterNavItem {
  href: string;
  label: string;
}

export interface FooterContactItem {
  label: string;
  value: string;
  href?: string;
}

interface FooterProps {
  tagline?: string;
  navItems?: FooterNavItem[];
  contactItems?: FooterContactItem[];
  copyright?: string;
  supportedByLabel?: string;
  supportedByLogos?: React.ReactNode;
  mediaPartnerLabel?: string;
  mediaPartnerLogos?: React.ReactNode;
  className?: string;
}

const DEFAULT_NAV_ITEMS: FooterNavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/wisata-dan-budaya", label: "Wisata & Budaya" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/peta-tematik", label: "Peta Tematik" },
  { href: "/akses", label: "Transportasi" },
  { href: "/jelajah", label: "Jelajah UMKM" },
  { href: "/dwb", label: "DWB" },
];

const DEFAULT_CONTACT_ITEMS: FooterContactItem[] = [
  {
    label: "Email",
    value: "kknbangkep.ugm@gmail.com",
    href: "mailto:kknbangkep.ugm@gmail.com",
  },
  {
    label: "Instagram",
    value: "@pengabdikebanggaan",
    href: "https://instagram.com/pengabdikebanggaan",
  },
];



/**
 * TIER L - logo utama.
 */
const SUPPORTED_BY_TIER_1: SponsorLogoProps[] = [
  { name: "ParagonCorp", src: "/images/sponsor/paragon.svg", size: "lg",

   },
];

/** TIER M - logo medium. Hanya sponsor non-media-partner. */
const SUPPORTED_BY_TIER_2: SponsorLogoProps[] = [
  { name: "JNE Express", src: "/images/sponsor/jne.svg", size: "md" },
  { name: "FIFGROUP", src: "/images/sponsor/fifgroup.svg", size: "md",
        className: "h-35 sm:h-[75px] md:h-20",
   },
];

/** TIER S - logo pendukung */
const SUPPORTED_BY_TIER_3: SponsorLogoProps[] = [
  { name: "Taspen", src: "/images/sponsor/taspen.svg", size: "sm" },
  { name: "GIK UGM", src: "/images/sponsor/gik-ugm.svg", size: "sm" },
  { name: "Jasa Marga", src: "/images/sponsor/jasamarga.svg", size: "sm" },
  { name: "Pepsodent", src: "/images/sponsor/pepsodent.svg", size: "sm",
        className: "h-14 sm:h-[36px] md:h-10",
   },
  { name: "Rexona", src: "/images/sponsor/rexona.svg", size: "sm" },
  {
    name: "Tunas Honda",
    src: "/images/sponsor/tunas-honda.svg",
    size: "sm",
    // Override manual: artwork-nya bold/tebal jadi keliatan lebih "berat" dari
    // logo sm-tier lain walau box height-nya sama. Turunin 1-2 notch dari default sm.
    className: "h-2 sm:h-[15px] md:h-3",
   },
  { name: "Blue Alliance", src: "/images/sponsor/blue-alliance.svg", size: "sm",
        className: "h-10 sm:h-[25px] md:h-12",

   },
  { name: "Bank Sulteng", src: "/images/sponsor/bank-sulteng.svg", size: "sm" },
  { name: "Wiar Sinergi Prima", src: "/images/sponsor/wiar-sinergi-prima.svg", size: "sm",
            className: "h-14 sm:h-[35px] md:h-10",

   },
  { name: "Tradco Synergi Indonesia", src: "/images/sponsor/tradco-synergi-indonesia.svg", size: "sm",
        className: "h-4 sm:h-[45px] md:h-10",

   },
  { name: "PT JIP", src: "/images/sponsor/pt-jip.svg", size: "sm",
        className: "h-2 sm:h-[15px] md:h-3",

   },
  { name: "Waroeng SS", src: "/images/sponsor/ss.svg", size: "sm" },
];

/** MEDIA PARTNER - semua tier M sesuai spreadsheet */
const DEFAULT_MEDIA_PARTNER_LOGOS: SponsorLogoProps[] = [
  { name: "KR Jogja", src: "/images/sponsor/krjogja.svg", href: "https://krjogja.com", size: "md" },
  { name: "RRI Yogyakarta", src: "/images/sponsor/rri-yogyakarta.svg", size: "md" },
  { name: "Bangkep News", src: "/images/sponsor/bangkep-news.svg", size: "md" },
];





// /**
//  * TIER L - logo utama.
//  */
// const SUPPORTED_BY_TIER_1: SponsorLogoProps[] = [
//   { name: "ParagonCorp", src: "/images/sponsor/paragon.svg", size: "lg" },
// ];

// /** TIER M - logo medium. Hanya sponsor non-media-partner. */
// const SUPPORTED_BY_TIER_2: SponsorLogoProps[] = [
//   { name: "JNE Express", src: "/images/sponsor/jne.svg", size: "md" },
//   { name: "FIFGROUP", src: "/images/sponsor/fifgroup.svg", size: "md" },
// ];

// /**
//  * TIER S - logo pendukung, sengaja dipecah jadi 2 baris TETAP (bukan flex-wrap otomatis)
//  * biar susunannya konsisten di semua lebar layar, nggak gonta-ganti jumlah per baris.
//  */
// const SUPPORTED_BY_TIER_3_ROW_1: SponsorLogoProps[] = [
//   { name: "Taspen", src: "/images/sponsor/taspen.svg", size: "sm" },
//   { name: "GIK UGM", src: "/images/sponsor/gik-ugm.svg", size: "sm" },
//   { name: "Jasa Marga", src: "/images/sponsor/jasamarga.svg", size: "sm" },
//   { name: "Pepsodent", src: "/images/sponsor/pepsodent.svg", size: "sm" },
//   { name: "Rexona", src: "/images/sponsor/rexona.svg", size: "sm" },
//   {
//     name: "Tunas Honda",
//     src: "/images/sponsor/tunas-honda.svg",
//     size: "sm",
//     // Override manual: artwork-nya bold/tebal jadi keliatan lebih "berat" dari
//     // logo sm-tier lain walau box height-nya sama. Turunin 1-2 notch dari default sm.
//     className: "h-3.5 sm:h-[18px] md:h-5",
//   },
// ];

// const SUPPORTED_BY_TIER_3_ROW_2: SponsorLogoProps[] = [
//   { name: "Blue Alliance", src: "/images/sponsor/blue-alliance.svg", size: "sm" },
//   { name: "Bank Sulteng", src: "/images/sponsor/bank-sulteng.svg", size: "sm" },
//   { name: "Wiar Sinergi Prima", src: "/images/sponsor/wiar-sinergi-prima.svg", size: "sm" },
//   { name: "Tradco Synergi Indonesia", src: "/images/sponsor/tradco-synergi-indonesia.svg", size: "sm" },
//   // Kolom "Logo Website" keduanya "-" di spreadsheet. Default size "sm".
//   // Hapus baris ini kalau ternyata mereka tidak wajib tampil di footer.
//   { name: "PT JIP", src: "/images/sponsor/pt-jip.svg", size: "sm" },
//   { name: "Waroeng SS", src: "/images/sponsor/ss.svg", size: "sm" },
// ];

// /** MEDIA PARTNER - semua tier M sesuai spreadsheet */
// const DEFAULT_MEDIA_PARTNER_LOGOS: SponsorLogoProps[] = [
//   { name: "KR Jogja", src: "/images/sponsor/krjogja.svg", href: "https://krjogja.com", size: "md" },
//   { name: "RRI Yogyakarta", src: "/images/sponsor/rri-yogyakarta.svg", size: "md" },
//   { name: "Bangkep News", src: "/images/sponsor/bangkep-news.svg", size: "md" },
// ];






/** Default node: 3 tingkat ukuran, masing-masing baris center & flex-wrap */
const DEFAULT_SUPPORTED_BY_LOGOS = (
  <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
    <SponsorLogoGroup logos={SUPPORTED_BY_TIER_1} className="gap-x-10 gap-y-6" />
    <SponsorLogoGroup logos={SUPPORTED_BY_TIER_2} />
    <SponsorLogoGroup logos={SUPPORTED_BY_TIER_3} />
  </div>
);

const DEFAULT_MEDIA_PARTNER_NODE = (
  <SponsorLogoGroup logos={DEFAULT_MEDIA_PARTNER_LOGOS} />
);

export function Footer({
  tagline = "Jelajahi keindahan Banggai Kepulauan dan temukan keistimewaan tersembunyi disini!",
  navItems = DEFAULT_NAV_ITEMS,
  contactItems = DEFAULT_CONTACT_ITEMS,
  copyright = `\u00A9 ${new Date().getFullYear()} Banggai Kepulauan. All rights reserved.`,
  supportedByLabel = "Supported by:",
  supportedByLogos = DEFAULT_SUPPORTED_BY_LOGOS,
  mediaPartnerLabel = "Media Partner:",
  mediaPartnerLogos = DEFAULT_MEDIA_PARTNER_NODE,
  className,
}: FooterProps = {}) {
  return (
    <footer
      className={cn(
        "mt-12 rounded-t-3xl border border-[#dbeafe] bg-gradient-to-t from-[#dbeafe] to-white",
        className,
      )}
    >
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3 md:max-w-[448px]">
            <Logo href="/" withWordmark />
            <p className="font-[family-name:var(--font-dm-sans)] text-[14px] leading-[20px] text-[#52525c]">
              {tagline}
            </p>
          </div>

          <FooterColumn title="Navigasi">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 sm:grid-flow-col sm:grid-rows-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-[family-name:var(--font-dm-sans)] text-[14px] leading-[20px] text-[#3f3f46] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Kontak" className="md:items-center md:text-center">
            <ul className="flex flex-col gap-2">
              {contactItems.map((item) => (
                <li
                  key={`${item.label}-${item.value}`}
                  className="font-[family-name:var(--font-dm-sans)] text-[14px] leading-[20px] text-[#52525c]"
                >
                  <span>{item.label}: </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[#52525c] hover:text-[#004d71] hover:underline"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {(supportedByLogos || supportedByLabel) && (
          <div className="flex flex-col items-center gap-4">
            {supportedByLabel && (
              <p className="font-[family-name:var(--font-dm-sans)] text-[14px] font-bold leading-[20px] text-[#3f3f46]">
                {supportedByLabel}
              </p>
            )}
            {supportedByLogos && (
              <div className="flex flex-wrap items-center justify-center gap-8">
                {supportedByLogos}
              </div>
            )}
          </div>
        )}

        {(mediaPartnerLogos || mediaPartnerLabel) && (
          <div className="flex flex-col items-center gap-4">
            {mediaPartnerLabel && (
              <p className="font-[family-name:var(--font-dm-sans)] text-[14px] font-bold leading-[20px] text-[#3f3f46]">
                {mediaPartnerLabel}
              </p>
            )}
            {mediaPartnerLogos && (
              <div className="flex flex-wrap items-center justify-center gap-8">
                {mediaPartnerLogos}
              </div>
            )}
          </div>
        )}

        <div className="border-t border-[#bedbff] pt-6 text-center">
          <p className="font-[family-name:var(--font-dm-sans)] text-[12px] leading-[16px] text-[#52525c]">
            {copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}