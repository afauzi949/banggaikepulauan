import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/atoms/Container";
import { DwbCard } from "@/components/molecules/DwbCard";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { TranslatableText } from "@/components/atoms/TranslatableText";

export const metadata: Metadata = {
  title: "Dokumen Warisan Bangkep",
  description: "Dokumentasi warisan budaya, sejarah, dan tradisi Kabupaten Banggai Kepulauan.",
};

const HERO_IMAGE = "/images/dwb/DWB.webp";

export default function DwbPage() {
  return (
    <main>
      <Navbar activeHref="/dwb" />

      {/* Hero Section */}
      <Container as="section" className="pt-4 md:pt-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl lg:aspect-[1440/810]">
          <Image
            src={HERO_IMAGE}
            alt="Rekam jejak dan dokumentasi warisan budaya, sejarah, pesona alam, dan kuliner lokal desa-desa di Kabupaten Banggai Kepulauan"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-4 text-center">
            <div className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
              Dokumen Warisan
              <br />
              Banggai Kepulauan
            </div>
          </div>
        </div>
      </Container>

      {/* Intro Section */}
      <Container as="section" className="py-10 md:py-16">
        <h1 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold leading-tight text-[#0a0a0a] md:text-[30px] md:leading-[36px]">
          <TranslatableText dictKey="dwb.pageTitle" idText="Dokumen Warisan Banggai Kepulauan" />
        </h1>
        <div className="mt-4 flex w-full flex-col gap-4 text-justify font-[family-name:var(--font-dm-sans)] text-base leading-7 text-[#0a0a0a] md:mt-6 md:gap-6 md:text-lg md:leading-[28px]">
          <p>
            <TranslatableText
              dictKey="dwb.pageDesc1"
              idText="Dokumen warisan ini merupakan rekam jejak pengabdian kami selama turun langsung ke berbagai desa di Banggai Kepulauan. Melalui pendokumentasian lapangan, kami memetakan berbagai kekayaan daerah yang patut menjadi kebanggaan, mulai dari pesona potensi wisata, ragam cita rasa kuliner lokal hingga kearifan masyarakat dalam memanfaatkan tanaman obat tradisional."
              enText="This heritage document is a record of our dedication while engaging directly with various villages across Banggai Kepulauan. Through field documentation, we mapped out various regional treasures to be proud of, ranging from the charm of tourism potential, the diverse flavors of local culinary traditions, to the community's wisdom in utilizing traditional medicinal plants."
            />
          </p>
          <p>
            <TranslatableText
              dictKey="dwb.pageDesc2"
              idText="Setiap desa yang kami singgahi memancarkan karakter dan keunikannya tersendiri. Nilai-nilai kehidupan tersebut tergambar jelas melalui keindahan lanskap alam, kehangatan aktivitas harian warga, serta denyut nadi budaya dan tradisi yang terus dipertahankan. Arsip ini hadir agar seluruh kekayaan warisan lokal tersebut dapat terus dikenal dan tak lekang oleh waktu."
              enText="Each village we visited radiates its own distinct character and uniqueness. These values of life are clearly reflected in the beauty of the natural landscapes, the warmth of the residents' daily activities, and the vibrant pulse of culture and traditions that continue to be preserved. This archive is presented so that all this rich local heritage remains recognized and timeless."
            />
          </p>
          <p>
            <TranslatableText
              dictKey="dwb.pageDesc3"
              idText="Kami telah menyusun seluruh jejak kearifan lokal dan cerita dari lapangan ini ke dalam satu catatan utuh yakni Dokumen Warisan Banggai Kepulauan. Mari telusuri dan jelajahi kekayaan budaya desa-desa ini selengkapnya di sini."
              enText="We have compiled all these traces of local wisdom and stories from the field into a comprehensive record, namely the Banggai Kepulauan Heritage Document. Let's explore and discover the rich cultural heritage of these villages in full here."
            />
          </p>
        </div>
      </Container>

      {/* DWB Card List */}
      <Container as="section" className="pb-16 md:pb-20">
        <div className="mx-auto flex max-w-[1313px] flex-col gap-4">
          <DwbCard
            slug="dwb-2025"
            title="DWB 2025"
            cover="/images/dwb/dwb25.webp"
            href="/dwb25"
          />
          <DwbCard
            slug="dwb-2026"
            title="DWB 2026"
            cover="/images/dwb/DWB.webp"
            href="#"
          />
        </div>
      </Container>

      <Footer />
    </main>
  );
}
