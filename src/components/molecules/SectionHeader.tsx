import { Heading } from "@/components/atoms/Heading";
import { cn } from "@/lib/utils";

type Align = "left" | "center";
type HeadingWeight = "bold" | "extrabold";
type HeadingSize = "md" | "lg";
type SubtitleSize = "sm" | "md";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: Align;
  size?: HeadingSize;
  weight?: HeadingWeight;
  subtitleSize?: SubtitleSize;
  className?: string;
  id?: string;
}

const alignMap: Record<Align, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const subtitleSizeMap: Record<SubtitleSize, string> = {
  sm: "text-[16px] leading-[24px]",
  md: "text-[20px] leading-[28px]",
};

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  size = "lg",
  weight = "extrabold",
  subtitleSize = "md",
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", alignMap[align], className)}>
      <Heading as="h2" size={size} weight={weight} className="text-[#111827]" id={id}>
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "font-[family-name:var(--font-dm-sans)] text-[#4b5563]",
            subtitleSizeMap[subtitleSize],
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
