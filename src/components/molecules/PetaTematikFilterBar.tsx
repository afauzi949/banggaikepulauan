"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PetaTematik } from "@/lib/schemas/peta-tematik";

interface PetaTematikFilterBarProps {
  items: PetaTematik[];
  onFilter: (filtered: PetaTematik[]) => void;
  className?: string;
}

export function PetaTematikFilterBar({ items, onFilter, className }: PetaTematikFilterBarProps) {
  const [query, setQuery] = useState("");
  const [selectedLokasi, setSelectedLokasi] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");

  const applyFilter = useCallback(
    (q: string) => {
      let result = items;
      if (q.trim()) {
        const lower = q.toLowerCase();
        result = result.filter((p) => p.title.toLowerCase().includes(lower));
      }
      onFilter(result);
    },
    [items, onFilter],
  );

  const inputBase =
    "h-11 w-full rounded-lg border border-[#e5e5e5] bg-white px-3 font-[family-name:var(--font-dm-sans)] text-sm text-[#0a0a0a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] placeholder:text-[#a1a1aa] focus:border-[#004d71] focus:outline-none focus:ring-1 focus:ring-[#004d71]";

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      <label className="flex flex-col gap-1.5">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          Nama
        </span>
        <input
          type="text"
          placeholder="Cari nama..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            applyFilter(e.target.value);
          }}
          className={inputBase}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          Lokasi
        </span>
        <div className="relative">
          <select
            value={selectedLokasi}
            onChange={(e) => {
              setSelectedLokasi(e.target.value);
              applyFilter(query);
            }}
            className={cn(inputBase, "appearance-none pr-9")}
          >
            <option value="">Pilih lokasi</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#a1a1aa]" />
        </div>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#0a0a0a]">
          Kategori
        </span>
        <div className="relative">
          <select
            value={selectedKategori}
            onChange={(e) => {
              setSelectedKategori(e.target.value);
              applyFilter(query);
            }}
            className={cn(inputBase, "appearance-none pr-9")}
          >
            <option value="">Pilih kategori</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#a1a1aa]" />
        </div>
      </label>
    </div>
  );
}
