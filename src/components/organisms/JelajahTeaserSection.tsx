import Image from "next/image";

import { Button } from "@/components/atoms/Button";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { TranslatableText } from "@/components/atoms/TranslatableText";
import { cn } from "@/lib/utils";

export interface UMKMTeaserItem {
  slug: string;
  name: string;
  meta: string;
  emoji: string;
  emojiBgClass: string;
}

interface JelajahTeaserSectionProps {
  title?: string;
  subtitle?: string;
  mapSrc?: string;
  totalLabel?: string;
  items?: UMKMTeaserItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const DEFAULT_ITEMS: UMKMTeaserItem[] = [
  {
    slug: "septo-bengkel",
    name: "Septo Bengkel",
    meta: "Salakan • Tambal ban tubeless & oli",
    emoji: "🔧",
    emojiBgClass: "bg-[#dbeafe]",
  },
  {
    slug: "soto-siti-situ",
    name: "Soto Siti Situ",
    meta: "Lumbi-Lumbia • Buka 24 Jam",
    emoji: "🍲",
    emojiBgClass: "bg-[#fef9c3]",
  },
];

export function JelajahTeaserSection({
  title = "Jelajah Usaha Lokal",
  subtitle = "Temukan fasilitas dan layanan warga di sekitar Anda.",
  mapSrc = "/images/umkm/map-preview.svg",
  totalLabel = "24 Usaha Lokal Terdaftar",
  items = DEFAULT_ITEMS,
  ctaLabel = "Buka Peta Direktori",
  ctaHref = "/jelajah",
  className,
}: JelajahTeaserSectionProps = {}) {
  return (
    <section
      className={cn("flex w-full flex-col gap-6", className)}
      aria-labelledby="jelajah-teaser-heading"
    >
      <SectionHeader
        id="jelajah-teaser-heading"
        title={<TranslatableText dictKey="jelajah-teaser.title" idText={title} />}
        subtitle={<TranslatableText dictKey="jelajah-teaser.subtitle" idText={subtitle} />}
        align="left"
        size="md"
        weight="bold"
        subtitleSize="sm"
      />

      <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
        <div className="relative aspect-[582/192] w-full bg-zinc-200">
          <Image
            src={mapSrc}
            alt="Pratinjau peta direktori usaha lokal Bangkep"
            fill
            sizes="(min-width: 1024px) 584px, 100vw"
            className="object-cover"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
            <p className="font-[family-name:var(--font-dm-sans)] text-[16px] font-bold leading-[24px] text-[#111827]">
              <span aria-hidden>📍 </span>
              <TranslatableText dictKey="jelajah-teaser.totalLabel" idText={totalLabel} />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-xl",
                    item.emojiBgClass,
                  )}
                  aria-hidden
                >
                  <span className="text-[24px]">{item.emoji}</span>
                </div>
                <div className="flex min-w-0 flex-col">
                  <h3 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-bold leading-[28px] text-[#111827]">
                    <TranslatableText dictKey={`umkm.name.${item.slug}`} idText={item.name} />
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[14px] leading-[20px] text-[#6b7280]">
                    <TranslatableText dictKey={`umkm.meta.${item.slug}`} idText={item.meta} />
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Button href={ctaHref} variant="primary" size="md" className="w-full justify-center">
            <TranslatableText dictKey="jelajah-teaser.cta" idText={ctaLabel} />
          </Button>
        </div>
      </div>
    </section>
  );
}
