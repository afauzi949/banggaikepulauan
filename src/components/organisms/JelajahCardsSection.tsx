import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { JelajahCard } from "@/components/molecules/JelajahCard";
import type { Umkm } from "@/lib/schemas/umkm";
import { cn } from "@/lib/utils";

interface JelajahCardsSectionProps {
  items: Umkm[];
  className?: string;
}

export function JelajahCardsSection({ items, className }: JelajahCardsSectionProps) {
  return (
    <section className={cn("relative w-full bg-white pb-20 pt-16 md:pb-28 md:pt-20", className)}>
      <Container>
        <Heading as="h2" size="md" weight="bold" className="mb-12 text-center text-[#111827]">
          Jelajah Usaha Lokal
        </Heading>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {items.map((item) => (
              <JelajahCard key={item.slug} umkm={item} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center font-[family-name:var(--font-dm-sans)] text-base text-[#6b7280]">
            Tidak ada usaha yang ditemukan.
          </p>
        )}
      </Container>
    </section>
  );
}
