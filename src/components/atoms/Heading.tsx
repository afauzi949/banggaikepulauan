import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type HeadingWeight = "semibold" | "bold" | "extrabold";

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color"> {
  as?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  children: React.ReactNode;
}

const sizeMap: Record<HeadingSize, string> = {
  xs: "text-[20px] leading-[24px]",
  sm: "text-2xl leading-tight",
  md: "text-4xl leading-tight",
  lg: "text-5xl leading-tight",
  xl: "text-6xl leading-[60px]",
  "2xl": "text-7xl leading-[72px]",
};

const weightMap: Record<HeadingWeight, string> = {
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

export function Heading({
  as: Tag = "h2",
  size = "xl",
  weight = "bold",
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-[family-name:var(--font-dm-sans)]",
        sizeMap[size],
        weightMap[weight],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
