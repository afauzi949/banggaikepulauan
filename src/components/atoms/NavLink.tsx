import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

const base =
  "rounded-[10px] px-4 py-3 font-[family-name:var(--font-dm-sans)] text-[16px] leading-[24px] transition-colors";

const inactive = "font-medium text-[#0a0a0a] hover:bg-zinc-100";

const active = "bg-[#d7f8f7] font-bold text-[#1447e6]";

export function NavLink({ href, active: isActive = false, className, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(base, isActive ? active : inactive, className)}
    >
      {children}
    </Link>
  );
}
