import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { MapDocumentCard } from "@/components/molecules/MapDocumentCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { TranslatableText } from "@/components/atoms/TranslatableText";
import { getPetaTematikList } from "@/lib/peta-tematik";
import type { PetaTematik } from "@/lib/schemas/peta-tematik";

interface PetaTematikSectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items?: PetaTematik[];
  limit?: number;
}

export async function PetaTematikSection({
  title = "Dokumen Peta Tematik",
  subtitle = "Data pemetaan geospasial hasil kolaborasi mahasiswa KKN UGM untuk keperluan administrasi dan tata ruang daerah.",
  ctaLabel = "Lihat Selengkapnya",
  ctaHref = "/peta-tematik",
  items: providedItems,
  limit = 3,
}: PetaTematikSectionProps = {}) {
  const items = providedItems ?? (await getPetaTematikList({ featured: true, limit }));

  if (items.length === 0) {
    return null;
  }

  return (
    <Container as="section" className="flex flex-col items-center gap-10 py-16 md:py-20">
      <SectionHeader
        title={<TranslatableText dictKey="peta-tematik.sectionTitle" idText={title} />}
        subtitle={<TranslatableText dictKey="peta-tematik.sectionSubtitle" idText={subtitle} />}
        align="center"
        weight="bold"
        subtitleSize="sm"
        className="max-w-[640px]"
      />

      <ul className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((doc) => (
          <li key={doc.slug} className="flex justify-center">
            <MapDocumentCard document={doc} />
          </li>
        ))}
      </ul>

      <Button href={ctaHref} variant="primary" size="lg">
        <TranslatableText dictKey="peta-tematik.cta" idText={ctaLabel} />
      </Button>
    </Container>
  );
}
