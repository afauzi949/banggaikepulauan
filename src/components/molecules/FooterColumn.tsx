import { cn } from "@/lib/utils";

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h3 className="font-[family-name:var(--font-dm-sans)] text-[16px] font-semibold leading-[24px] text-[#27272a]">
        {title}
      </h3>
      {children}
    </div>
  );
}
