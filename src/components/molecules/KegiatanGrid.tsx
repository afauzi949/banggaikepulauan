import { KegiatanCard } from "@/components/molecules/KegiatanCard";
import type { Kegiatan } from "@/lib/schemas/kegiatan";
import { cn } from "@/lib/utils";

interface KegiatanGridProps {
  items: Kegiatan[];
  className?: string;
}

export function KegiatanGrid({ items, className }: KegiatanGridProps) {
  if (items.length === 0) {
    return (
      <p className="py-16 text-center font-[family-name:var(--font-dm-sans)] text-[#737373]">
        Tidak ada kegiatan ditemukan.
      </p>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item, i) => (
        <KegiatanCard key={item.slug} kegiatan={item} imagePriority={i < 4} />
      ))}
    </div>
  );
}
