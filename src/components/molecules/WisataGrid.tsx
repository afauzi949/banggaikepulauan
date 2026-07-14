import { WisataCard } from "@/components/molecules/WisataCard";
import type { Wisata } from "@/lib/schemas/wisata";
import { cn } from "@/lib/utils";

type Cols = 2 | 3 | 4 | 5;

interface WisataGridProps {
  items: Wisata[];
  cols?: Cols;
  prioritizeFirst?: boolean;
  className?: string;
}

const colsMap: Record<Cols, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
};

export function WisataGrid({
  items,
  cols = 4,
  prioritizeFirst = false,
  className,
}: WisataGridProps) {
  return (
    <ul className={cn("grid w-full gap-6", colsMap[cols], className)}>
      {items.map((wisata, index) => (
        <li key={wisata.slug} className="flex">
          <WisataCard wisata={wisata} imagePriority={prioritizeFirst && index === 0} />
        </li>
      ))}
    </ul>
  );
}
