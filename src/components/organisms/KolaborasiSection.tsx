import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Tag } from "@/components/atoms/Tag";
import { TranslatableText } from "@/components/atoms/TranslatableText";
import { cn } from "@/lib/utils";

interface KolaborasiSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  linkLabel?: string;
  linkHref?: string;
  className?: string;
}

export function KolaborasiSection({
  eyebrow = "Kolaborasi Eksklusif",
  title = "Rahasia Geologis di Balik 'Perahu Melayang' Danau Paisu Pok",
  description = "Pernah ngelihat perahu kayu yang seolah-olah melayang bebas di udara? Di pedalaman Banggai Kepulauan, ilusi optik ini nyata terjadi. Airnya yang berwarna biru kehitaman punya tingkat kejernihan yang nggak masuk akal, sampai dasar danau terlihat jelas. Sebenarnya, fenomena alam apa yang bikin air di danau karst ini bisa terus sebening kaca?",
  imageSrc = "/images/wisata/paisu-batango.jpg",
  imageAlt = "Pemandangan udara Danau Paisu Pok",
  linkLabel = "Baca penelusuran lengkap di Sainreka",
  linkHref = "https://sainreka.com/banggai-kepulauan/paisu-pok",
  className,
}: KolaborasiSectionProps = {}) {
  const isExternal = /^https?:\/\//.test(linkHref);

  return (
    <Container as="section" className={cn("py-16 md:py-20", className)}>
      <article
        className={cn(
          "flex flex-col items-stretch gap-8 overflow-hidden rounded-3xl p-8 lg:flex-row lg:items-center lg:gap-[34px] lg:p-8",
          "bg-gradient-to-r from-[#3e87aa] via-[#3e87aa] to-white",
        )}
      >
        <div className="relative aspect-[640/476] w-full shrink-0 overflow-hidden rounded-3xl lg:w-[640px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start gap-5 lg:w-[535px]">
          <Tag variant="accent" size="lg">
            <TranslatableText dictKey="kolaborasi.eyebrow" idText={eyebrow} />
          </Tag>
          <Heading as="h2" size="md" weight="extrabold" className="text-[#111827]">
            <TranslatableText dictKey="kolaborasi.title" idText={title} />
          </Heading>
          <p className="font-[family-name:var(--font-dm-sans)] text-[18px] leading-[29px] text-[#4b5563]">
            <TranslatableText dictKey="kolaborasi.description" idText={description} />
          </p>
          {isExternal ? (
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-dm-sans)] text-[20px] font-medium leading-[20px] text-[#155dfc] hover:underline"
            >
              <TranslatableText dictKey="kolaborasi.linkLabel" idText={linkLabel} />{" "}
              <span aria-hidden>→</span>
            </a>
          ) : (
            <Link
              href={linkHref}
              className="font-[family-name:var(--font-dm-sans)] text-[20px] font-medium leading-[20px] text-[#155dfc] hover:underline"
            >
              <TranslatableText dictKey="kolaborasi.linkLabel" idText={linkLabel} />{" "}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </article>
    </Container>
  );
}
