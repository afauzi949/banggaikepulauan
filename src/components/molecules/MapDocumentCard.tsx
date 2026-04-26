import Image from "next/image";

import { Button } from "@/components/atoms/Button";
import { Tag } from "@/components/atoms/Tag";
import { formatFileSize, formatLabel } from "@/lib/peta-tematik";
import type { PetaTematik } from "@/lib/schemas/peta-tematik";
import { cn } from "@/lib/utils";

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
  const { title, preview, format, sizeBytes, downloadUrl } = document;

  return (
    <article
      className={cn(
        "flex w-full max-w-[384px] flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white pb-6",
        "shadow-[0px_8px_4px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      <div className="relative aspect-[384/152] w-full bg-zinc-200">
        <Image
          src={preview}
          alt={`Pratinjau ${title}`}
          fill
          sizes="(min-width: 1024px) 384px, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 px-6 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-[family-name:var(--font-dm-sans)] text-[20px] font-bold leading-[28px] text-[#111827]">
            {title}
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

        <Button
          href={downloadUrl}
          variant="primary"
          size="md"
          className="w-full justify-center rounded-[7px] py-[11px] text-base"
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
