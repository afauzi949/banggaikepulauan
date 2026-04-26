import Link from "next/link";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { TransportCard } from "@/components/molecules/TransportCard";
import { getTransportList } from "@/lib/transport";
import type { Transport } from "@/lib/schemas/transport";
import { cn } from "@/lib/utils";

interface AksesSectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items?: Transport[];
  limit?: number;
  className?: string;
}

export async function AksesSection({
  title = "Akses Menuju Bangkep",
  subtitle = "Pilihan transportasi laut terdekat dari Pelabuhan Luwuk.",
  ctaLabel = "Lihat Semua Jadwal",
  ctaHref = "/akses",
  items: providedItems,
  limit,
  className,
}: AksesSectionProps = {}) {
  const items = providedItems ?? (await getTransportList({ limit }));

  return (
    <section
      className={cn("flex w-full flex-col gap-6", className)}
      aria-labelledby="akses-heading"
    >
      <SectionHeader
        id="akses-heading"
        title={title}
        subtitle={subtitle}
        align="left"
        size="md"
        weight="bold"
        subtitleSize="md"
      />

      <div className="flex flex-col gap-4">
        {items.map((transport) => (
          <TransportCard key={transport.slug} transport={transport} />
        ))}
      </div>

      <Link
        href={ctaHref}
        className="font-[family-name:var(--font-dm-sans)] text-[16px] font-bold leading-[24px] text-[#2563eb] hover:underline"
      >
        {ctaLabel} <span aria-hidden>➔</span>
      </Link>
    </section>
  );
}
