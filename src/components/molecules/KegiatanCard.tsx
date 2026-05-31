import Image from "next/image";
import { TransitionLink as Link } from "@/components/atoms/TransitionLink";

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
  const { slug, title, cover, tags = [], date, excerpt } = kegiatan;
  const url = href ?? `/kegiatan/${slug}`;

  // Truncate excerpt cleanly
  const shortExcerpt = excerpt && excerpt.length > 80 ? excerpt.slice(0, 80) + "..." : excerpt;

  return (
    <Link
      href={url}
      aria-label={title}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[14px]",
        "bg-[#004d71] transition-colors duration-500 hover:bg-[#F9CA04]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d71] focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="relative aspect-[316/270] w-full overflow-hidden shrink-0">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={imagePriority}
        />
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4 pt-3 flex-grow transition-all duration-500 text-white group-hover:text-zinc-900">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold group-hover:bg-white/80 group-hover:text-zinc-800 transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold leading-7">
          {title}
        </h3>

        <div className="relative w-full h-[60px] overflow-hidden">
          {/* Default Content (Date) - Visible normally, hides on hover */}
          <p className="absolute inset-0 font-[family-name:var(--font-dm-sans)] text-sm leading-5 text-white/80 transition-all duration-500 group-hover:-translate-y-4 group-hover:opacity-0">
            {date}
          </p>

          {/* Hover Content (Overview) - Hidden normally, visible on hover */}
          <p className="absolute inset-0 font-[family-name:var(--font-dm-sans)] text-sm leading-5 opacity-0 translate-y-4 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {shortExcerpt} <span className="font-semibold underline decoration-zinc-900 decoration-1 underline-offset-2">View More</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
