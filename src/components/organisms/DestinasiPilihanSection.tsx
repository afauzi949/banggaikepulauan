import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { WisataGrid } from "@/components/molecules/WisataGrid";
import { getWisataList } from "@/lib/wisata";
import type { Wisata } from "@/lib/schemas/wisata";
import { ReactNode } from "react";

interface DestinasiPilihanSectionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  ctaLabel?: ReactNode;
  ctaHref?: string;
  items?: Wisata[];
  limit?: number;
  cols?: 2 | 3 | 4 | 5;
}

export async function DestinasiPilihanSection({
  title = "Destinasi Pilihan",
  subtitle = "Telusuri keindahan tersembunyi Banggai Kepulauan.",
  ctaLabel = "Lihat Selengkapnya",
  ctaHref = "/wisata-dan-budaya",
  items: providedItems,
  limit = 4,
  cols = 4,
}: DestinasiPilihanSectionProps = {}) {
  const items = providedItems ?? (await getWisataList({ featured: true, limit }));

  if (items.length === 0) {
    return null;
  }

  return (
    <Container as="section" className="flex flex-col items-center gap-10 py-16 md:py-20 max-w-[1800px]">
      <SectionHeader title={title} subtitle={subtitle} align="center" />

      <WisataGrid items={items} cols={cols} />

      <Button href={ctaHref} variant="primary" size="lg">
        {ctaLabel}
      </Button>
    </Container>
  );
}
