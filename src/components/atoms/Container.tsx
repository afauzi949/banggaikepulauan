import { cn } from "@/lib/utils";

type ContainerTag =
  | "div"
  | "section"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "article";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: ContainerTag;
}

export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-16", className)}>
      {children}
    </Tag>
  );
}
