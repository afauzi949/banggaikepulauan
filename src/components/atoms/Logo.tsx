import { TransitionLink as Link } from "@/components/atoms/TransitionLink";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  withWordmark?: boolean;
  className?: string;
}

export function Logo({ href = "/", withWordmark = true, className }: LogoProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)]",
        className,
      )}
    >
      <Image
        src="/brand/logo-bangkep.svg"
        alt="Banggai Kepulauan"
        width={25}
        height={31}
        priority
      />
      {withWordmark && (
        <span className="text-[20px] font-bold leading-[28px] text-[#1e2939]">
          Banggai Kepulauan
        </span>
      )}
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
