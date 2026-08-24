"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import { Tag } from "@/components/atoms/Tag";
import { formatFileSize, formatLabel } from "@/lib/schemas/peta-tematik";
import type { PetaTematik } from "@/lib/schemas/peta-tematik";
import { cardElevation, cn } from "@/lib/utils";

interface MapDocumentCardProps {
  document: PetaTematik;
  ctaLabel?: string;
  className?: string;
}

export function MapDocumentCard({
  document,
  ctaLabel = "Lihat Selengkapnya",
  className,
}: MapDocumentCardProps) {
  const { t } = useLanguage();
  const { slug, title, preview, format, sizeBytes, downloadUrl } = document;

  const titleKey = `peta-tematik.title.${slug}`;
  const finalTitle = t(titleKey) !== titleKey ? t(titleKey) : title;
  const finalCta = t("destinasi.cta") !== "destinasi.cta" ? t("destinasi.cta") : ctaLabel;

  return (
    <Link
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title}, unduh ${formatLabel(format)} ${formatFileSize(sizeBytes)}`}
      className={cn(
        "group flex h-full w-full max-w-[384px] flex-col overflow-hidden rounded-2xl bg-white pb-6",
        cardElevation,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d71] focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="relative aspect-[384/152] w-full bg-zinc-200">
        <Image
          src={preview}
          alt={`Pratinjau peta tematik geospasial ${title} Kabupaten Banggai Kepulauan`}
          fill
          sizes="(min-width: 1024px) 384px, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-[family-name:var(--font-dm-sans)] text-[20px] font-bold leading-[28px] text-[#111827]">
            {finalTitle}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="neutral" size="sm">
              {formatLabel(format)}
            </Tag>
            <Tag variant="neutral" size="sm">
              {formatFileSize(sizeBytes)}
            </Tag>
          </div>
        </div>

        <span
          className={cn(
            "mt-auto inline-flex w-full items-center justify-center rounded-[7px] bg-[#004d71] px-6 py-[11px]",
            "font-[family-name:var(--font-dm-sans)] text-base font-bold text-white",
            "drop-shadow-[0px_10px_10px_rgba(0,0,0,0.25)]",
            "transition-colors group-hover:bg-[#003d5a]",
          )}
        >
          {finalCta}
        </span>
      </div>
    </Link>
  );
}
