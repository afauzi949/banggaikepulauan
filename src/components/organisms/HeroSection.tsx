import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { HeroContent } from "@/components/molecules/HeroContent";

// TODO: replace with Cloudinary public ID once media is migrated
const HERO_IMAGE_SRC =
  "https://www.figma.com/api/mcp/asset/a30cc7e2-74f3-439a-ae4a-1b0b8bf14401";

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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Centered content */}
      <Container className="absolute inset-0 flex items-center justify-center">
        <HeroContent
          eyebrow={eyebrow}
          title={title}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </Container>
    </section>
  );
}
