"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
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
  imageAlt = "Pemandangan udara gugusan pulau, lautan biru jernih, dan keindahan pesona alam Kabupaten Banggai Kepulauan",
  ctaHref = "#",
  eyebrow,
  title,
  ctaLabel,
}: HeroSectionProps) {
  const { t } = useLanguage();

  const finalEyebrow = eyebrow || t("hero.eyebrow");
  const finalTitle = title || t("hero.title");
  const finalCtaLabel = ctaLabel || t("hero.cta");
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
        <HeroContent
          eyebrow={finalEyebrow}
          title={finalTitle}
          ctaLabel={finalCtaLabel}
          ctaHref={ctaHref}
        />
      </Container>
    </section>
  );
}
