"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import { Heading } from "@/components/atoms/Heading";
import { Tag } from "@/components/atoms/Tag";
import type { Wisata } from "@/lib/schemas/wisata";
import { cardElevation, cn } from "@/lib/utils";

interface WisataCardProps {
  wisata: Wisata;
  href?: string;
  imagePriority?: boolean;
  className?: string;
}

export function WisataCard({ wisata, href, imagePriority = false, className }: WisataCardProps) {
  const { t } = useLanguage();
  const { slug, title, excerpt, cover, location, tags = [] } = wisata;

  const finalTitle =
    t(`wisata.title.${slug}`) !== `wisata.title.${slug}` ? t(`wisata.title.${slug}`) : title;
  const finalExcerpt =
    t(`wisata.excerpt.${slug}`) !== `wisata.excerpt.${slug}`
      ? t(`wisata.excerpt.${slug}`)
      : excerpt;

  // Try to translate location.village if there's a specific key, otherwise just use it
  const locKey = `location.${location.village.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const finalLocation = t(locKey) !== locKey ? t(locKey) : location.village;

  const url = href ?? `/wisata-dan-budaya/${slug}`;

  return (
    <Link
      href={url}
      aria-label={`${title}, ${location.village}`}
      className={cn(
        "group relative block aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-zinc-100",
        cardElevation,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d71] focus-visible:ring-offset-2",
        className,
      )}
    >
      <Image
        src={cover}
        alt={`Pemandangan alam dan keindahan wisata ${title} di ${location.village}, Kabupaten Banggai Kepulauan`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={95}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={imagePriority}
      />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 rounded-tl-[16px] rounded-tr-[16px] bg-white p-4">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => {
              const tagKey = `tag.${tag}`;
              const finalTag = t(tagKey) !== tagKey ? t(tagKey) : tag;
              return (
                <Tag key={tag} variant="primary" size="sm">
                  {finalTag}
                </Tag>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Heading as="h3" size="xs" weight="semibold" className="text-[#0a0a0a]">
            {finalTitle}
          </Heading>
          <p className="font-[family-name:var(--font-dm-sans)] text-[11px] leading-[20px] text-[#27272a]">
            {finalLocation}
          </p>
        </div>

        <div className="relative">
          <p className="line-clamp-2 pr-16 font-[family-name:var(--font-dm-sans)] text-[14px] leading-[20px] text-[#27272a]">
            {finalExcerpt}
          </p>
          <span
            aria-hidden
            className="absolute bottom-0 right-0 bg-white pl-2 font-[family-name:var(--font-dm-sans)] text-[14px] font-medium leading-[20px] text-[#155dfc] group-hover:underline"
          >
            View More
          </span>
        </div>
      </div>
    </Link>
  );
}
