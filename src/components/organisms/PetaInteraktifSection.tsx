import Image from "next/image";

import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Highlight, MapInfoCard } from "@/components/molecules/MapInfoCard";

interface PetaInteraktifSectionProps {
  title?: string;
  description?: React.ReactNode;
  mapSrc?: string;
  mapAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULT_DESCRIPTION = (
  <p>
    <Highlight>Kabupaten Banggai Kepulauan</Highlight> adalah salah satu kabupaten yang terdapat di
    provinsi Sulawesi Tengah, Indonesia. <Highlight>Ibu kotanya</Highlight> adalah{" "}
    <Highlight>Salakan</Highlight>. Kabupaten ini sebelumnya merupakan kesatuan wilayah dengan
    Kabupaten Banggai. Berdasarkan Undang-Undang Nomor 51 Tahun 1999 menetapkan pulau-pulau di
    tengah lautan tersebut menjadi daerah otonom Banggai Kepulauan, sementara kabupaten induk tetap
    disebut Kabupaten Banggai dan pemekarannya disebut{" "}
    <Highlight>Kabupaten Banggai Kepulauan</Highlight> (Bangkep).
  </p>
);

export function PetaInteraktifSection({
  title = "Banggai Kepulauan",
  description = DEFAULT_DESCRIPTION,
  mapSrc = "/images/peta/banggai-kepulauan-map.svg",
  mapAlt = "Peta wilayah Kabupaten Banggai Kepulauan",
  ctaLabel = "Tap To Interact",
  ctaHref = "/jelajah",
}: PetaInteraktifSectionProps = {}) {
  return (
    <Container as="section" className="py-16 md:py-20">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12">
        <div className="relative w-full lg:max-w-none lg:flex-1">
          <Image
            src={mapSrc}
            alt={mapAlt}
            width={865}
            height={567}
            className="h-auto w-full"
            priority={false}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Button
              href={ctaHref}
              variant="primary"
              size="md"
              className="gap-3 rounded-full px-5 py-3 text-[17.5px] shadow-[0px_31px_62px_rgba(0,0,0,0.25)]"
            >
              <Image src="/images/peta/tap-icon.svg" alt="" width={24} height={24} aria-hidden />
              <span>{ctaLabel}</span>
            </Button>
          </div>
        </div>

        <MapInfoCard title={title} description={description} className="lg:w-[384px] lg:shrink-0" />
      </div>
    </Container>
  );
}
