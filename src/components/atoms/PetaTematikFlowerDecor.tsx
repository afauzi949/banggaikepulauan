import Image from "next/image";

import { cn } from "@/lib/utils";

interface PetaTematikFlowerDecorProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

const positionMap: Record<PetaTematikFlowerDecorProps["position"], string> = {
  "top-left": "-left-10 top-0 -rotate-12",
  "top-right": "-right-10 top-0 rotate-12",
  "bottom-left": "-left-10 bottom-0 rotate-12 -scale-y-100",
  "bottom-right": "-right-10 bottom-0 -rotate-12 -scale-y-100",
};

export function PetaTematikFlowerDecor({ position, className }: PetaTematikFlowerDecorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-0 hidden w-[120px] lg:block xl:w-[160px]",
        positionMap[position],
        className,
      )}
    >
      <Image
        src="/images/decorations/flower-yellow.svg"
        alt=""
        width={200}
        height={200}
        className="h-auto w-full"
        priority={false}
      />
    </div>
  );
}
