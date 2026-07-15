"use client";

import { useCallback, useState } from "react";

import { WisataCardDark } from "@/components/molecules/WisataCardDark";
import { WisataFilter } from "@/components/molecules/WisataFilter";
import type { Wisata } from "@/lib/schemas/wisata";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface WisataGridDarkProps {
  items: Wisata[];
  className?: string;
}

export function WisataGridDark({ items, className }: WisataGridDarkProps) {
  const [filtered, setFiltered] = useState<Wisata[]>(items);
  const { t } = useLanguage();

  const handleFilter = useCallback((result: Wisata[]) => {
    setFiltered(result);
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <WisataFilter items={items} onFilter={handleFilter} />

      {filtered.length === 0 ? (
        <p className="py-12 text-center font-[family-name:var(--font-dm-sans)] text-sm text-[#737373]">
          {t("filter.noResult") !== "filter.noResult"
            ? t("filter.noResult")
            : "Tidak ada wisata yang ditemukan."}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((wisata, index) => (
            <li key={wisata.slug} className="flex">
              <WisataCardDark wisata={wisata} imagePriority={index < 4} className="w-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
