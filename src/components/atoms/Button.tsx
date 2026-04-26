import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-[#004d71] text-white drop-shadow-[0px_10px_10px_rgba(0,0,0,0.25)] hover:bg-[#003d5a]",
  secondary:
    "bg-white text-[#004d71] border border-[#004d71] hover:bg-[#f0f9ff]",
  ghost: "bg-transparent text-white hover:bg-white/10",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-base",
  md: "px-6 py-3 text-lg",
  lg: "px-[25px] py-[15px] text-2xl",
};

const base =
  "inline-flex items-center justify-center rounded-[50px] font-[family-name:var(--font-dm-sans)] font-bold transition-colors";

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonProps) {
  const classes = cn(base, variantMap[variant], sizeMap[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
