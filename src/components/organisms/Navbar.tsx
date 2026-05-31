"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { NavLinks, type NavItem } from "@/components/molecules/NavLinks";
import { NavLink } from "@/components/atoms/NavLink";
import { cn } from "@/lib/utils";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-300 ease-in-out",
          isScrolled ? "py-2" : "py-4 md:py-6"
        )}
      >
        <Container>
          <div
            className={cn(
              "flex items-center justify-between rounded-[20px] bg-white px-6 py-4 shadow-2xl transition-all duration-300",
              isScrolled ? "bg-opacity-95 backdrop-blur-md" : ""
            )}
          >
            <Logo />
            
            {/* Desktop Nav */}
            <div className="hidden lg:block">
              <NavLinks items={items} activeHref={activeHref} />
            </div>

            {/* Mobile Nav Toggle */}
            <button
              className="p-2 text-gray-700 hover:text-black transition-colors lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Buka menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] flex flex-col bg-white"
          >
            {/* Header of Mobile Menu */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shadow-sm">
              <Logo />
              <button
                className="p-2 text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Tutup menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Links in Mobile Menu */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-8">
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={activeHref === item.href}
                  className="w-full text-center text-xl"
                >
                  <span onClick={() => setIsMobileMenuOpen(false)}>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
