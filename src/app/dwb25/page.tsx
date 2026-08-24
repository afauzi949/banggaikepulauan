import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { TransitionLink as Link } from "@/components/atoms/TransitionLink";
import { TranslatableText } from "@/components/atoms/TranslatableText";

export const metadata: Metadata = {
  title: "DWB 2025 | Dokumen Warisan Bangkep",
  description: "Dokumen Warisan Banggai Kepulauan Tahun 2025.",
};

const VILLAGES = [
  {
    id: "bungin",
    name: "Bungin",
    desc: "Desa Bungin, Kecamatan Tinangkung, Banggai Kepulauan",
    image: "/images/dwb/dwb-bungin.webp",
    href: "https://drive.google.com/file/d/1LdQi5QzKUoJ658sMtthdOANqZiTqN2Sl/view",
  },
  {
    id: "bakalan",
    name: "Bakalan",
    desc: "Desa Bakalan, Kecamatan Tinangkung, Banggai Kepulauan",
    image: "/images/dwb/dwb-bakalan.webp",
    href: "https://drive.google.com/file/d/1Tno51U74kk4lS3-8FtRphZ7ZEWMTeE_n/view",
  },
  {
    id: "buko",
    name: "Buko",
    desc: "Desa Buko, Kecamatan Buko Selatan, Banggai Kepulauan",
    image: "/images/dwb/dwb-buko.webp",
    href: "https://drive.google.com/file/d/1qFlCywEO65eLO6NsoBlK3nsC_wTnEdHq/view",
  },
  {
    id: "lukpanenteng",
    name: "Lukpanenteng",
    desc: "Desa Lukpanenteng, Kecamatan Bulagi Utara, Banggai Kepulauan",
    image: "/images/dwb/dwb-lukpanenteng.webp",
    href: "https://drive.google.com/file/d/10RMFOc_XJ_5QzSl2sZnvwh609IxOoEGn/view",
  },
  {
    id: "lumbi-lumbia",
    name: "Lumbi Lumbia",
    desc: "Desa Lumbi-Lumbia, Kecamatan Buko Selatan, Banggai Kepulauan",
    image: "/images/dwb/dwb-lumbilumbia.webp",
    href: "https://drive.google.com/file/d/1MI-fzPROSX93LazJ3Khid_6cw-6m14AE/view",
  },
  {
    id: "sambulangan",
    name: "Sambulangan",
    desc: "Desa Sambulangan, Kecamatan Bulagi Utara, Banggai Kepulauan",
    image: "/images/dwb/dwb-sambulangan.webp",
    href: "https://drive.google.com/file/d/1TlF6FXUFOXeTRtDNs1Uv296K8h8fE5bo/view",
  },
];

export default function Dwb25Page() {
  return (
    <main className="bg-[#fcfdfd]">
      <Navbar activeHref="/dwb25" />
      {/* Hero Section */}
      <Container as="section" className="pt-24 md:pt-32">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl lg:aspect-[1440/810]">
          <Image
            src="/images/dwb/dwb25.webp"
            alt="Dokumen Warisan Banggai Kepulauan 2025"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-4 text-center">
            <h1 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
              <TranslatableText
                dictKey="dwb25.heroTitle"
                idText="Dokumen Warisan"
                enText="Heritage Document"
              />
              <br />
              <TranslatableText
                dictKey="dwb25.heroSubtitle"
                idText="Banggai Kepulauan 2025"
                enText="Banggai Kepulauan 2025"
              />
            </h1>
          </div>
        </div>
      </Container>

      {/* Intro Section */}
      <Container as="section" className="py-10 md:py-16">
        <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold leading-tight text-[#0a0a0a] md:text-[30px] md:leading-[36px]">
          <TranslatableText
            dictKey="dwb25.introTitle"
            idText="Kapten Pengabdi Kebanggaan 2025"
            enText="Pride Volunteer Captains 2025"
          />
        </h2>
        <div className="mt-4 flex w-full flex-col gap-4 text-justify font-[family-name:var(--font-dm-sans)] text-base leading-7 text-[#0a0a0a] md:mt-6 md:gap-6 md:text-lg md:leading-[28px]">
          <p>
            <TranslatableText
              dictKey="dwb25.introP1"
              idText="melakukan pendokumentasian lapangan di sejumlah desa untuk memetakan potensi wisata, ragam kuliner lokal, pemanfaatan tanaman obat, serta budaya dan adat yang masih dijalankan masyarakat. Setiap desa menawarkan karakter tersendiri yang terlihat dari lanskap, aktivitas harian, hingga tradisi yang terus dipertahankan."
              enText="conducted field documentation in several villages to map tourism potential, diverse local culinary traditions, the utilization of medicinal plants, and the culture and customs still practiced by the community. Each village offers its own distinct character, visible from its landscapes, daily activities, to the traditions that continue to be preserved."
            />
          </p>
          <p>
            <TranslatableText
              dictKey="dwb25.introP2"
              idText="Uraian lengkap tersebut kami rangkum secara lebih sistematis dalam Dokumen Warisan Banggai Kepulauan. Jelajahi selengkapnya di sini."
              enText="This comprehensive overview is systematically summarized in the Banggai Kepulauan Heritage Document. Explore the full details here."
            />
          </p>
        </div>
      </Container>

      {/* Grid Section */}
      <Container as="section" className="pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-6">
          {VILLAGES.map((village) => (
            <Link
              key={village.id}
              href={village.href}
              className="group flex flex-col overflow-hidden rounded-[16px] transition-transform hover:scale-[1.02] shadow-sm"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full bg-white">
                <Image
                  src={village.image}
                  alt={`Dokumen Warisan ${village.name}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              
              {/* Text Container */}
              <div className="flex flex-1 flex-col bg-[#3a4454] p-5 text-white">
                <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold mb-1">
                  {village.name}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-xs font-light text-gray-200 leading-relaxed">
                  {village.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      <Footer />
    </main>
  );
}
