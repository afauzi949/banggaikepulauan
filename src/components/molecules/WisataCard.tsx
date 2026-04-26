import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/components/atoms/Heading";
import { Tag } from "@/components/atoms/Tag";
import type { Wisata } from "@/lib/schemas/wisata";
import { cn } from "@/lib/utils";

interface WisataCardProps {
  wisata: Wisata;
  href?: string;
  imagePriority?: boolean;
  className?: string;
}

export function WisataCard({
  wisata,
  href,
  imagePriority = false,
  className,
}: WisataCardProps) {
  const { slug, title, excerpt, cover, location, tags = [] } = wisata;
  const url = href ?? `/wisata-dan-budaya/${slug}`;

  return (
    <Link
      href={url}
      aria-label={`${title}, ${location.village}`}
      className={cn(
        "group relative block aspect-[297/507] w-full overflow-hidden rounded-[24px] border border-[#e5e5e5] bg-zinc-100",
        "transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d71] focus-visible:ring-offset-2",
        className,
      )}
    >
      <Image
        src={cover}
        alt={title}
        fill
        sizes="(min-width: 1280px) 297px, (min-width: 768px) 33vw, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={imagePriority}
      />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 rounded-tl-[16px] rounded-tr-[16px] bg-white p-4">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} variant="primary" size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Heading
            as="h3"
            size="xs"
            weight="semibold"
            className="text-[#0a0a0a]"
          >
            {title}
          </Heading>
          <p className="font-[family-name:var(--font-dm-sans)] text-[11px] leading-[20px] text-[#27272a]">
            {location.village}
          </p>
        </div>

        <div className="relative">
          <p className="line-clamp-2 pr-16 font-[family-name:var(--font-dm-sans)] text-[14px] leading-[20px] text-[#27272a]">
            {excerpt}
          </p>
          <span
            aria-hidden
            className="absolute bottom-0 right-0 bg-white pl-2 font-[family-name:var(--font-dm-sans)] text-[14px] font-medium leading-[20px] text-[#155dfc] group-hover:underline"
          >
            View More
          </span>
        </div>
      </div>
    </Link>
  );
}
