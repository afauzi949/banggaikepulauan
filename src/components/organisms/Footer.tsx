import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { FooterColumn } from "@/components/molecules/FooterColumn";
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

export function Footer({
  tagline = "Jelajahi keindahan Banggai Kepulauan dan temukan keistimewaan tersembunyi disini!",
  navItems = DEFAULT_NAV_ITEMS,
  contactItems = DEFAULT_CONTACT_ITEMS,
  copyright = `\u00A9 ${new Date().getFullYear()} Banggai Kepulauan. All rights reserved.`,
  supportedByLabel = "Supported by:",
  supportedByLogos,
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
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
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

        <div className="border-t border-[#bedbff] pt-6 text-center">
          <p className="font-[family-name:var(--font-dm-sans)] text-[12px] leading-[16px] text-[#52525c]">
            {copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
