import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { HeroContent } from "@/components/molecules/HeroContent";

const HERO_IMAGE_SRC = "/images/hero.svg";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function HeroSection({
  imageSrc = HERO_IMAGE_SRC,
  imageAlt = "Pemandangan udara Banggai Kepulauan",
  eyebrow = "Pesona Kabupaten",
  title = "Banggai Kepulauan",
  ctaLabel = "Explore Now!",
  ctaHref = "#",
}: HeroSectionProps) {
  return (
    <section className="relative h-[810px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
        unoptimized
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50" />

      {/* Centered content */}
      <Container className="absolute inset-0 flex items-center justify-center">
        <HeroContent eyebrow={eyebrow} title={title} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      </Container>
    </section>
  );
}
