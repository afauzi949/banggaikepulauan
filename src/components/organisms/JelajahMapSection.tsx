"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Container } from "@/components/atoms/Container";
import { JelajahFilter } from "@/components/molecules/JelajahFilter";
import type { Umkm } from "@/lib/schemas/umkm";
import { cn } from "@/lib/utils";

const LeafletMap = dynamic(
  () =>
    import("@/components/organisms/maps/JelajahLeafletMap") as Promise<{
      default: React.ComponentType<{
        markers: {
          slug: string;
          name: string;
          position: [number, number];
          village: string;
        }[];
      }>;
    }>,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-zinc-200">
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-zinc-500">
          Memuat peta...
        </p>
      </div>
    ),
  },
);

interface JelajahMapSectionProps {
  items: Umkm[];
  locations: string[];
  categories: string[];
  className?: string;
}

export function JelajahMapSection({
  items,
  locations,
  categories,
  className,
}: JelajahMapSectionProps) {
  const markers = useMemo(
    () =>
      items.map((item) => ({
        slug: item.slug,
        name: item.name,
        position: item.location.coordinates as [number, number],
        village: item.location.village,
      })),
    [items],
  );

  return (
    <section className={cn("w-full", className)}>
      <Container className="py-4">
        <JelajahFilter locations={locations} categories={categories} />
      </Container>
      <div className="h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <LeafletMap markers={markers} />
      </div>
    </section>
  );
}
