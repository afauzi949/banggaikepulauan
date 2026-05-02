import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/atoms/Tag";
import type { Kegiatan } from "@/lib/schemas/kegiatan";
import { cn } from "@/lib/utils";

interface KegiatanCardProps {
  kegiatan: Kegiatan;
  href?: string;
  imagePriority?: boolean;
  className?: string;
}

export function KegiatanCard({
  kegiatan,
  href,
  imagePriority = false,
  className,
}: KegiatanCardProps) {
  const { slug, title, cover, tags = [], date } = kegiatan;
  const url = href ?? `/kegiatan/${slug}`;

  return (
    <Link
      href={url}
      aria-label={title}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[14px] bg-[#004d71]",
        "transition-transform duration-300 motion-safe:hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d71] focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="relative aspect-[316/270] w-full overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={imagePriority}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} variant="primary" size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-5 text-white/80">
          {date}
        </p>

        <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold leading-7 text-white">
          {title}
        </h3>
      </div>
    </Link>
  );
}
