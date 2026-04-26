import { NavLink } from "@/components/atoms/NavLink";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  items: NavItem[];
  activeHref?: string;
  className?: string;
}

export function NavLinks({ items, activeHref, className }: NavLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <NavLink href={item.href} active={item.href === activeHref}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
