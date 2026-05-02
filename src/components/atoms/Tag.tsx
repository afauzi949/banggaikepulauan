import { cn } from "@/lib/utils";

type TagVariant = "primary" | "neutral" | "info" | "success" | "accent";
type TagSize = "sm" | "md" | "lg";

interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center rounded-full font-[family-name:var(--font-dm-sans)] font-bold whitespace-nowrap";

const variantMap: Record<TagVariant, string> = {
  primary: "bg-[#d7f8f7] text-[#004d71]",
  neutral: "bg-zinc-100 text-zinc-700",
  info: "bg-[#dbeafe] text-[#1e40af]",
  success: "bg-[#dcfce7] text-[#166534]",
  accent: "bg-[#febf34] text-[#004d71]",
};

const sizeMap: Record<TagSize, string> = {
  sm: "px-[7px] pt-[4px] pb-[2px] text-[12px] leading-[16px]",
  md: "px-3 py-1 text-sm leading-5",
  lg: "px-4 py-2 text-[16px] leading-[20px]",
};

export function Tag({ variant = "primary", size = "sm", className, children }: TagProps) {
  return (
    <span className={cn(base, variantMap[variant], sizeMap[size], className)}>{children}</span>
  );
}
