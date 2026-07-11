import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";

interface HeroContentProps {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

export function HeroContent({ eyebrow, title, ctaLabel, ctaHref }: HeroContentProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Eyebrow className="text-[56px] leading-[60px] text-white">{eyebrow}</Eyebrow>
      <Heading as="h1" size="2xl" weight="extrabold" className="text-white">
        {title}
      </Heading>
      <Button href={ctaHref} variant="primary" size="lg" className="mt-3">
        {ctaLabel}
      </Button>
    </div>
  );
}
