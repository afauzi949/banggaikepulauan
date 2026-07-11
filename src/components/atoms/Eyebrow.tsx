import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("font-[family-name:var(--font-dm-sans)] font-semibold", className)}>
      {children}
    </p>
  );
}
