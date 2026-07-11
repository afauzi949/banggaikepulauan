import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/atoms/Container";
import { DwbCard } from "@/components/molecules/DwbCard";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { getAllDwb } from "@/lib/dwb";

export const metadata: Metadata = {
  title: "Dokumen Warisan Bangkep",
  description:
    "Dokumentasi warisan budaya, sejarah, dan tradisi Kabupaten Banggai Kepulauan.",
};

const HERO_IMAGE = "/images/dwb/hero.jpg";

export default function DwbPage() {
  const items = getAllDwb();

  return (
    <main>
      <Navbar activeHref="/dwb" />

      {/* Hero Section */}
      <Container as="section" className="pt-4 md:pt-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl lg:aspect-[1440/810]">
          <Image
            src={HERO_IMAGE}
            alt="Dokumentasi Warisan Banggai Kepulauan"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
      </Container>

      {/* Intro Section */}
      <Container as="section" className="py-10 md:py-16">
        <h1 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold leading-tight text-[#0a0a0a] md:text-[30px] md:leading-[36px]">
          Dokumen Warisan Banggai Kepulauan
        </h1>
        <p className="mt-4 max-w-5xl text-justify font-[family-name:var(--font-dm-sans)] text-base leading-7 text-[#0a0a0a] md:mt-6 md:text-lg md:leading-[28px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
          lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.
        </p>
      </Container>

      {/* DWB Card List */}
      <Container as="section" className="pb-16 md:pb-20">
        <div className="mx-auto flex max-w-[1313px] flex-col gap-4">
          {items.map((item) => (
            <DwbCard
              key={item.slug}
              title={item.title}
              cover={item.cover}
              href={`/dwb/${item.slug}`}
            />
          ))}
        </div>
      </Container>

      <Footer />
    </main>
  );
}
