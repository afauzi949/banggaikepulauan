"use client";

import { useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { Wisata } from "@/lib/schemas/wisata";
import { useLanguage } from "@/context/LanguageContext";

interface WisataFilterProps {
  items: Wisata[];
  onFilter: (filtered: Wisata[]) => void;
  className?: string;
}

export function WisataFilter({ items, onFilter, className }: WisataFilterProps) {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { t } = useLanguage();

  const locations = useMemo(() => {
    const set = new Set(items.map((w) => w.location.subdistrict));
    return Array.from(set).sort();
  }, [items]);

  const categories = useMemo(() => {
    const set = new Set(items.flatMap((w) => w.tags ?? []));
    return Array.from(set).sort();
  }, [items]);

  const applyFilter = useCallback(
    (q: string, loc: string, cat: string) => {
      let result = items;
      if (q.trim()) {
        const lower = q.toLowerCase();
        result = result.filter((w) => w.title.toLowerCase().includes(lower));
      }
      if (loc) {
        result = result.filter((w) => w.location.subdistrict === loc);
      }
      if (cat) {
        result = result.filter((w) => w.tags?.includes(cat));
      }
      onFilter(result);
    },
    [items, onFilter],
  );

  const inputBase =
    "h-9 w-full rounded-lg border border-[#e5e5e5] bg-white px-3 font-[family-name:var(--font-dm-sans)] text-sm text-[#0a0a0a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] placeholder:text-[#737373] focus:border-[#004d71] focus:outline-none focus:ring-1 focus:ring-[#004d71]";

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end", className)}>
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          {t("filter.title") !== "filter.title" ? t("filter.title") : "Judul"}
        </span>
        <input
          type="text"
          placeholder={
            t("filter.searchTitle") !== "filter.searchTitle"
              ? t("filter.searchTitle")
              : "Cari Judul..."
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            applyFilter(e.target.value, selectedLocation, selectedCategory);
          }}
          className={inputBase}
        />
      </label>

      <label className="flex flex-1 flex-col gap-1.5">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          {t("filter.location") !== "filter.location" ? t("filter.location") : "Lokasi"}
        </span>
        <select
          value={selectedLocation}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
            applyFilter(query, e.target.value, selectedCategory);
          }}
          className={cn(inputBase, "appearance-none")}
        >
          <option value="">
            {t("filter.selectLocation") !== "filter.selectLocation"
              ? t("filter.selectLocation")
              : "Pilih lokasi"}
          </option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </label>

      <label className="flex w-full flex-col gap-1.5 sm:w-auto sm:min-w-[200px]">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          {t("filter.category") !== "filter.category" ? t("filter.category") : "Kategori"}
        </span>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            applyFilter(query, selectedLocation, e.target.value);
          }}
          className={cn(inputBase, "appearance-none")}
        >
          <option value="">
            {t("filter.selectCategory") !== "filter.selectCategory"
              ? t("filter.selectCategory")
              : "Pilih kategori"}
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t(`tag.${cat}`) !== `tag.${cat}` ? t(`tag.${cat}`) : cat}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
