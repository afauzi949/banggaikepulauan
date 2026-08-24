import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { HealthFacilities } from "@/components/organisms/HealthFacilities";

import { TranslatableText } from "@/components/atoms/TranslatableText";

export const metadata: Metadata = {
  title: "DWB 2026 | Dokumen Warisan Bangkep",
  description: "Dokumen Warisan Banggai Kepulauan Tahun 2026.",
};

export default function Dwb26Page() {
  return (
    <main className="bg-[#fcfdfd]">
      <Navbar activeHref="/dwb26" />
      {/* Hero Section */}
      <Container as="section" className="pt-24 md:pt-32">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl lg:aspect-[1440/810]">
          <Image
            src="/images/dwb/DWB.webp"
            alt="Dokumen Warisan Banggai Kepulauan 2026"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-4 text-center">
            <h1 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
              <TranslatableText
                dictKey="dwb26.heroTitle"
                idText="Dokumen Warisan"
                enText="Heritage Document"
              />
              <br />
              <TranslatableText
                dictKey="dwb26.heroSubtitle"
                idText="Banggai Kepulauan 2026"
                enText="Banggai Kepulauan 2026"
              />
            </h1>
          </div>
        </div>
      </Container>

      {/* Intro Section */}
      <Container as="section" className="py-10 md:py-16">
        <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold leading-tight text-[#0a0a0a] md:text-[30px] md:leading-[36px]">
          <TranslatableText
            dictKey="dwb26.introTitle"
            idText="Kapten Pengabdi Kebanggaan 2026"
            enText="Pride Volunteer Captains 2026"
          />
        </h2>
        <div className="mt-4 flex w-full flex-col gap-4 text-justify font-[family-name:var(--font-dm-sans)] text-base leading-7 text-[#0a0a0a] md:mt-6 md:gap-6 md:text-lg md:leading-[28px]">
          <p>
            <TranslatableText
              dictKey="dwb26.introP1"
              idText="Banggai Kepulauan menyimpan lebih dari sekadar keindahan bentang alam, ia merawat denyut kehidupan yang kaya akan nilai, kehangatan warga, serta cerita luhur yang diturunkan antar-generasi. Tim Kapten Pengabdi Kebanggaan 2026 telah turun langsung menyusuri sudut-sudut pulau, mendatangi berbagai desa dari wilayah pesisir hingga pedalaman, demi melakukan pendokumentasian lapangan secara intensif. Misi utama kami adalah menggali dan memetakan setiap potensi pariwisata yang tersembunyi agar kekayaan pesona daerah ini dapat dikenal luas oleh masyarakat umum maupun wisatawan dari berbagai penjuru."
              enText="Banggai Kepulauan holds more than just the beauty of its landscapes; it nurtures a pulse of life rich in values, the warmth of its people, and noble stories passed down through generations. The 2026 Pride Volunteer Captains team has gone directly to explore the corners of the island, visiting various villages from coastal areas to the hinterlands, to conduct intensive field documentation. Our main mission is to uncover and map every hidden tourism potential so that the richness of this region's charm can be widely known by the general public and tourists from all over."
            />
          </p>
          <p>
            <TranslatableText
              dictKey="dwb26.introP2"
              idText="Sepanjang eksplorasi tersebut, kami menyaksikan secara langsung bagaimana setiap desa tumbuh dengan karakteristik dan identitas uniknya masing-masing. Kami memetakan bentang alam yang memukau, mulai dari jernihnya perairan pesisir, danau-danau tersembunyi hingga keasrian wilayah tropis sekaligus mencicipi dan merekam keberagaman kuliner khas yang kaya akan cita rasa otentik. Lebih dari itu, interaksi dekat bersama warga lokal memungkinkan kami untuk merekam kehangatan tradisi, norma adat serta denyut kebudayaan yang tetap dijaga kelestariannya dalam kehidupan sehari-hari masyarakat Banggai Kepulauan."
              enText="Throughout this exploration, we witnessed firsthand how each village grows with its own unique characteristics and identity. We mapped stunning landscapes, ranging from crystal-clear coastal waters, hidden lakes, to the lushness of tropical areas, while also tasting and recording the diversity of signature culinary delights rich in authentic flavors. Moreover, close interactions with local residents allowed us to capture the warmth of traditions, customary norms, and the cultural pulse that continues to be preserved in the daily lives of the Banggai Kepulauan community."
            />
          </p>
          <p>
            <TranslatableText
              dictKey="dwb26.introP3"
              idText="Seluruh temuan ini telah kami susun secara sistematis ke dalam Dokumen Warisan Banggai Kepulauan. Silakan jelajahi selengkapnya di sini."
              enText="We have systematically compiled all these findings into the Banggai Kepulauan Heritage Document. Please explore the full details here."
            />
          </p>
        </div>
      </Container>

      {/* Coming Soon Section */}
      <Container as="section" className="pb-10 flex justify-center items-center">
        <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#0a0a0a] md:text-5xl">
          Coming Soon
        </h2>
      </Container>

      {/* Health Facilities Section */}
      <HealthFacilities />

      <Footer />
    </main>
  );
}
