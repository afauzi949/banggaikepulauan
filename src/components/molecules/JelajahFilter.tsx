"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface JelajahFilterProps {
  locations: string[];
  categories: string[];
  onSearchChange?: (value: string) => void;
  onLocationChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  className?: string;
}

export function JelajahFilter({
  locations,
  categories,
  onSearchChange,
  onLocationChange,
  onCategoryChange,
  className,
}: JelajahFilterProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6", className)}>
      <div className="flex flex-col gap-1.5">
        <label className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#111827]">
          Nama
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Cari nama..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full rounded-lg border border-[#d1d5db] bg-white py-2.5 pl-10 pr-4 font-[family-name:var(--font-dm-sans)] text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#004d71] focus:outline-none focus:ring-1 focus:ring-[#004d71]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#111827]">
          Lokasi
        </label>
        <select
          onChange={(e) => onLocationChange?.(e.target.value)}
          className="w-full rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 font-[family-name:var(--font-dm-sans)] text-sm text-[#111827] focus:border-[#004d71] focus:outline-none focus:ring-1 focus:ring-[#004d71]"
        >
          <option value="">Pilih lokasi</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#111827]">
          Kategori
        </label>
        <select
          onChange={(e) => onCategoryChange?.(e.target.value)}
          className="w-full rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 font-[family-name:var(--font-dm-sans)] text-sm text-[#111827] focus:border-[#004d71] focus:outline-none focus:ring-1 focus:ring-[#004d71]"
        >
          <option value="">Pilih kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
