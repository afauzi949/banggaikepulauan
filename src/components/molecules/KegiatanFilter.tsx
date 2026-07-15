"use client";

import { useCallback, useState } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Kegiatan } from "@/lib/schemas/kegiatan";
import { useLanguage } from "@/context/LanguageContext";

interface KegiatanFilterProps {
  items: Kegiatan[];
  categories: string[];
  onFilter: (filtered: Kegiatan[]) => void;
  className?: string;
}

export function KegiatanFilter({ items, categories, onFilter, className }: KegiatanFilterProps) {
  const [query, setQuery] = useState("");
  const { t } = useLanguage();
  const [dateFrom, setDateFrom] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const applyFilter = useCallback(
    (q: string, from: string, cat: string) => {
      let result = items;
      if (q.trim()) {
        const lower = q.toLowerCase();
        result = result.filter((k) => k.title.toLowerCase().includes(lower));
      }
      if (from) {
        result = result.filter((k) => k.date >= from);
      }
      if (cat) {
        result = result.filter((k) => k.tags?.includes(cat));
      }
      onFilter(result);
    },
    [items, onFilter],
  );

  const clearQuery = () => {
    setQuery("");
    applyFilter("", dateFrom, selectedCategory);
  };

  const inputBase =
    "h-9 w-full rounded-lg border border-[#e5e5e5] bg-white px-3 font-[family-name:var(--font-dm-sans)] text-sm text-[#0a0a0a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] placeholder:text-[#737373] focus:border-[#004d71] focus:outline-none focus:ring-1 focus:ring-[#004d71]";

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end", className)}>
      {/* Judul */}
      <label className="flex flex-[2] flex-col gap-1.5">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          {t("filter.title") !== "filter.title" ? t("filter.title") : "Judul"}
        </span>
        <div className="relative">
          <input
            type="text"
            placeholder={
              t("filter.searchTitle") !== "filter.searchTitle"
                ? t("filter.searchTitle")
                : "Cari judul..."
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              applyFilter(e.target.value, dateFrom, selectedCategory);
            }}
            className={cn(inputBase, "pr-9")}
          />
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              aria-label="Hapus pencarian"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-[#737373] hover:text-[#0a0a0a]"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </label>

      {/* Tanggal */}
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          {t("filter.tanggal") !== "filter.tanggal" ? t("filter.tanggal") : "Tanggal"}
        </span>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#737373]" />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              applyFilter(query, e.target.value, selectedCategory);
            }}
            className={cn(inputBase, "pl-9")}
          />
        </div>
      </label>

      {/* Kategori */}
      <label className="flex w-full flex-col gap-1.5 sm:w-auto sm:min-w-[200px]">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          {t("filter.kategori") !== "filter.kategori" ? t("filter.kategori") : "Kategori"}
        </span>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              applyFilter(query, dateFrom, e.target.value);
            }}
            className={cn(inputBase, "appearance-none pr-9")}
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
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#737373]" />
        </div>
      </label>
    </div>
  );
}
