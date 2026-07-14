"use client";

import { usePathname, useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import React from "react";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export function animatePageOut(href: string, router: ReturnType<typeof useRouter>) {
  const banner = document.getElementById("transition-banner");
  if (banner) {
    // Force start at -100%
    banner.style.transition = "none";
    banner.style.transform = "translateY(-100%)";

    // Force reflow
    void banner.offsetHeight;

    // Animate to 0%
    banner.style.transition = "transform 1.25s cubic-bezier(0.22, 1, 0.36, 1)";
    banner.style.transform = "translateY(0%)";

    setTimeout(() => {
      router.push(href);

      // Fallback: If for some reason the page doesn't navigate (e.g. hash link), slide it back up
      setTimeout(() => {
        const checkBanner = document.getElementById("transition-banner");
        if (checkBanner && checkBanner.style.transform === "translateY(0%)") {
          checkBanner.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
          checkBanner.style.transform = "translateY(-100%)";
        }
      }, 500);
    }, 1250);
  } else {
    router.push(href);
  }
}

export const TransitionLink = ({ children, href, className, ...props }: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
