import Image from "next/image";
import { Download, Eye } from "lucide-react";
import { formatFileSize, formatLabel } from "@/lib/schemas/peta-tematik";
import type { PetaTematik } from "@/lib/schemas/peta-tematik";
import { cn } from "@/lib/utils";

interface PetaTematikMapCardProps {
  document: PetaTematik;
  className?: string;
}

export function PetaTematikMapCard({ document, className }: PetaTematikMapCardProps) {
  const { title, preview, year, format, sizeBytes, downloadUrl } = document;

  const scale = "1:50.000";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl lg:rounded-3xl",
        "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      <div className="relative aspect-[16/7] w-full bg-zinc-200 sm:aspect-[16/6]">
        <Image
          src={preview}
          alt={`Pratinjau peta tematik geospasial ${title} Kabupaten Banggai Kepulauan`}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-4 bg-[#1a3d5c] px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate font-[family-name:var(--font-dm-sans)] text-lg font-bold leading-tight text-white sm:text-xl lg:text-2xl">
            {title}
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed text-white/80 sm:text-sm">
            Skala {scale} | Tahun {year ?? "—"}
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium leading-relaxed text-white/90 sm:text-sm">
            {formatLabel(format)} {formatFileSize(sizeBytes)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label={`Lihat pratinjau ${title}`}
            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Eye className="size-5 sm:size-6" />
          </button>
          <a
            href={downloadUrl}
            download
            aria-label={`Unduh ${title}`}
            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Download className="size-5 sm:size-6" />
          </a>
        </div>
      </div>
    </article>
  );
}
