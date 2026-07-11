import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface DwbCardProps {
  title: string;
  cover: string;
  href: string;
  className?: string;
}

export function DwbCard({ title, cover, href, className }: DwbCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block aspect-[1313/380] w-full overflow-hidden rounded-3xl",
        className,
      )}
    >
      {/* Background image */}
      <Image
        src={cover}
        alt={title}
        fill
        sizes="(min-width: 1024px) 1313px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        unoptimized
      />

      {/* Decorative overlay gradient */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Title overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-[family-name:var(--font-dm-sans)] text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl lg:leading-[40px]">
          {title}
        </h3>
      </div>
    </Link>
  );
}
