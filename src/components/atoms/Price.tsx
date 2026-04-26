import { cn } from "@/lib/utils";

interface PriceProps {
  amount: number;
  currency?: "IDR";
  className?: string;
}

export function Price({ amount, currency = "IDR", className }: PriceProps) {
  const symbolMap: Record<NonNullable<PriceProps["currency"]>, string> = {
    IDR: "Rp",
  };
  const formatted = `${symbolMap[currency]} ${new Intl.NumberFormat("id-ID").format(amount)}`;

  return (
    <span
      className={cn(
        "font-[family-name:var(--font-dm-sans)] font-bold text-[#004d71]",
        className,
      )}
    >
      {formatted}
    </span>
  );
}
