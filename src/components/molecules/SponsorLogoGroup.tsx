import { SponsorLogo, type SponsorLogoProps } from "@/components/atoms/SponsorLogo";
import { cn } from "@/lib/utils";

export interface SponsorLogoGroupProps {
  logos: SponsorLogoProps[];
  className?: string;
}

export function SponsorLogoGroup({ logos, className }: SponsorLogoGroupProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-6",
        className,
      )}
    >
      {logos.map((logo) => (
        <SponsorLogo key={logo.name} {...logo} />
      ))}
    </div>
  );
}