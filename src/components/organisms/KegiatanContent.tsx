"use client";

import { useCallback, useState } from "react";

import { KegiatanFilter } from "@/components/molecules/KegiatanFilter";
import { KegiatanGrid } from "@/components/molecules/KegiatanGrid";
import type { Kegiatan } from "@/lib/schemas/kegiatan";

interface KegiatanContentProps {
  items: Kegiatan[];
  categories: string[];
  className?: string;
}

export function KegiatanContent({ items, categories, className }: KegiatanContentProps) {
  const [filtered, setFiltered] = useState<Kegiatan[]>(items);

  const handleFilter = useCallback((result: Kegiatan[]) => {
    setFiltered(result);
  }, []);

  return (
    <div className={className}>
      <KegiatanFilter items={items} categories={categories} onFilter={handleFilter} />
      <KegiatanGrid items={filtered} className="mt-10" />
    </div>
  );
}
