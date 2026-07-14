import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/atoms/TransitionLink";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { TranslatableText } from "@/components/atoms/TranslatableText";

import { Container } from "@/components/atoms/Container";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { getWisataBySlug } from "@/lib/wisata";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/organisms/maps/DetailMap"), {
  ssr: false,
});

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getWisataBySlug(params.slug);
  if (!data) return { title: "Tidak ditemukan" };

  return { title: data.title, description: data.excerpt };
}

export default async function WisataDetailPage({ params }: Props) {
  const data = await getWisataBySlug(params.slug);

  if (!data) {
    notFound();
  }

  // Fallback to gallery or just use cover if gallery is missing
  const images = data.gallery && data.gallery.length > 0 ? data.gallery : [data.cover];

  return (
    <main className="bg-white text-zinc-900 pb-16">
      <Navbar activeHref="/wisata-dan-budaya" />

      {/* Spacer to push content below fixed navbar */}
      <div className="h-20" />

      {/* Back Button */}
      <Container className="mt-8">
        <Link
          href="/wisata-dan-budaya"
          className="w-fit flex gap-2 hover:gap-4 transition-all bg-zinc-100 font-medium text-zinc-700 rounded-md px-4 py-2 items-center cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
          <p className="leading-[-4px]">Kembali</p>
        </Link>
      </Container>

      {/* Hero & Gallery */}
      <Container>
        <div className="flex flex-col gap-4 mt-6">
          {images.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              className="h-full w-full rounded-xl overflow-hidden aspect-video relative"
            >
              <Image
                src={img}
                alt={`${data.title} preview ${idx + 1}`}
                fill
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>

      {/* Main Content */}
      <Container className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.tags?.map((cat, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium"
              >
                <TranslatableText dictKey={`tag.${cat}`} idText={cat} />
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 mt-2">
            <TranslatableText dictKey={`wisata.title.${data.slug}`} idText={data.title} />
          </h1>

          <div className="flex items-center text-sm text-zinc-600 gap-2 font-medium">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <TranslatableText
              dictKey={`location.${data.location.village.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
              idText={`${data.location.village}, Kec. ${data.location.subdistrict}, Kab. ${data.location.regency}`}
            />
          </div>

          <div className="text-zinc-700 text-base leading-relaxed whitespace-pre-wrap mt-6">
            <TranslatableText
              dictKey={`wisata.description.${data.slug}`}
              idText={data.description}
            />
          </div>

          {data.nilaiBudaya && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mt-6">
              <p className="text-zinc-700 font-semibold mb-2">
                🌀 <TranslatableText dictKey="detail.nilaiBudaya" idText="Nilai Budaya:" />
              </p>
              <p className="text-zinc-600 italic leading-relaxed">
                <TranslatableText
                  dictKey={`wisata.nilaibudaya.${data.slug}`}
                  idText={data.nilaiBudaya}
                />
              </p>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="border border-zinc-200 rounded-xl p-5 shadow-sm bg-white">
            <h3 className="font-semibold text-zinc-800 mb-2 flex items-center gap-2">
              🎫 <TranslatableText dictKey="detail.tiketMasuk" idText="Tiket Masuk" />
            </h3>
            <p className="text-zinc-600 font-medium">
              <TranslatableText
                dictKey={data.tiketMasuk?.toLowerCase() === "gratis" ? "detail.gratis" : ""}
                idText={data.tiketMasuk || "Gratis"}
              />
            </p>
          </div>

          {data.fasilitas && data.fasilitas.length > 0 && (
            <div className="border border-zinc-200 rounded-xl p-5 shadow-sm bg-white">
              <h3 className="font-semibold text-zinc-800 mb-2 flex items-center gap-2">
                🏕️ Fasilitas
              </h3>
              <ul className="list-disc pl-5 text-zinc-600 text-sm space-y-1 mt-3">
                {data.fasilitas.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {data.waktuKunjunganTerbaik && (
            <div className="border border-zinc-200 rounded-xl p-5 shadow-sm bg-white">
              <h3 className="font-semibold text-zinc-800 mb-2 flex items-center gap-2">
                🕰️ Waktu Kunjungan Terbaik
              </h3>
              <p className="text-zinc-600 text-sm font-medium mt-1">{data.waktuKunjunganTerbaik}</p>
            </div>
          )}

          {data.narahubung && (
            <div className="border border-zinc-200 rounded-xl p-5 shadow-sm bg-white">
              <h3 className="font-semibold text-zinc-800 mb-3 flex gap-2 items-center">
                ☎️ Narahubung
              </h3>
              <p className="text-zinc-700 font-semibold">{data.narahubung.nama}</p>
              <p className="text-blue-600 font-medium">{data.narahubung.kontak}</p>
            </div>
          )}
        </div>
      </Container>

      {/* Map */}
      {data.location.coordinates && (
        <Container className="mt-12">
          <h3 className="text-2xl font-bold text-zinc-800 mb-6">🗺️ Lokasi di Peta</h3>
          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-zinc-200">
            <Map markers={[data.location.coordinates[0], data.location.coordinates[1]]} label={data.title} />
          </div>
        </Container>
      )}

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
