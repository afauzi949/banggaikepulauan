import { cn } from "@/lib/utils";

interface MapInfoCardProps {
  title: string;
  description: React.ReactNode;
  className?: string;
}

export function MapInfoCard({
  title,
  description,
  className,
}: MapInfoCardProps) {
  return (
    <article
      className={cn(
        "flex w-full max-w-[384px] flex-col items-start gap-2 rounded-[14px] bg-white p-4",
        "shadow-[0px_8px_10px_rgba(0,0,0,0.1),0px_20px_25px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      <h3 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-semibold leading-[28px] text-black">
        {title}
      </h3>
      <div className="font-[family-name:var(--font-dm-sans)] text-[16px] leading-[24px] text-[#364153]">
        {description}
      </div>
    </article>
  );
}

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function Highlight({ children, className }: HighlightProps) {
  return (
    <span className={cn("font-semibold text-[#fb2c36]", className)}>
      {children}
    </span>
  );
}
