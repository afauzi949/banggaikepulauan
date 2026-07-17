import { cn } from "@/lib/utils";

export type SponsorLogoSize = "sm" | "md" | "lg";

export interface SponsorLogoProps {
  name: string;
  src: string;
  href?: string;
  /**
   * Tier ukuran sesuai kesepakatan sponsorship (kolom "Logo Website" di MOU):
   * lg = L, md = M, sm = S.
   * Lebar dihitung OTOMATIS oleh browser dari rasio asli file gambar,
   * jadi tidak akan pernah kepotong / gepeng walau file logo beda-beda proporsi.
   */
  size?: SponsorLogoSize;
  className?: string;
}

const SIZE_CLASS: Record<SponsorLogoSize, string> = {
  lg: "h-20 sm:h-28 md:h-32",
  md: "h-9 sm:h-12 md:h-14",
  sm: "h-5 sm:h-6 md:h-7",
};

export function SponsorLogo({
  name,
  src,
  href,
  size = "sm",
  className,
}: SponsorLogoProps) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      // Sengaja TIDAK diberi width/height manual.
      // Browser otomatis pakai rasio asli file untuk resolve lebar,
      // dikombinasikan dengan w-auto + object-contain di bawah.
      className={cn(SIZE_CLASS[size], "w-auto object-contain", className)}
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="flex shrink-0 items-center transition-opacity hover:opacity-80"
      >
        {image}
      </a>
    );
  }

  return (
    <span className="flex shrink-0 items-center" aria-label={name}>
      {image}
    </span>
  );
}