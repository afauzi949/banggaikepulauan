import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { NavLinks, type NavItem } from "@/components/molecules/NavLinks";

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Wisata & Budaya", href: "/wisata-dan-budaya" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Peta Tematik", href: "/peta-tematik" },
  { label: "DWB", href: "/dwb" },
  { label: "Jelajah Bangkep", href: "/jelajah" },
];

interface NavbarProps {
  activeHref?: string;
  items?: NavItem[];
}

export function Navbar({ activeHref = "/", items = DEFAULT_ITEMS }: NavbarProps) {
  return (
    <Container as="nav" className="flex items-center justify-between rounded-[20px] bg-white py-4">
      <Logo />
      <NavLinks items={items} activeHref={activeHref} />
    </Container>
  );
}
