import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/atoms/TransitionLink";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";

import { Container } from "@/components/atoms/Container";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { getWisataBySlug } from "@/lib/wisata";
import dynamic from "next/dynamic";

import { PetaZona } from "@/components/organisms/buloling/PetaZona";
import { ProfilKedalaman } from "@/components/organisms/buloling/ProfilKedalaman";
import { StepperGeologi } from "@/components/organisms/buloling/StepperGeologi";
import { GaleriDokumentasi } from "@/components/organisms/buloling/GaleriDokumentasi";
import { KonservasiEkologis } from "@/components/organisms/buloling/KonservasiEkologis";

const Map = dynamic(() => import("@/components/organisms/maps/DetailMap"), {
  ssr: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWisataBySlug("buloling");
  if (!data) return { title: "Tidak ditemukan" };

  return {
    title: data.seo?.title ?? `${data.title} — Banggai Kepulauan`,
    description:
      data.seo?.description ??
      "Jelajahi Goa Buloling, fenomena cenote langka di Desa Sambulangan, Banggai Kepulauan.",
    openGraph: {
      title: data.seo?.title ?? data.title,
      description: data.seo?.description ?? data.excerpt,
      images: [data.seo?.ogImage ?? data.cover],
    },
  };
}

export default async function GoaBulolingPage() {
  const data = await getWisataBySlug("buloling");

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-white text-zinc-900">
      <Navbar activeHref="/wisata-dan-budaya" />

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Back Button */}
      <Container className="mt-4 mb-0">
        <Link
          href="/wisata-dan-budaya"
          className="w-fit flex gap-2 hover:gap-4 transition-all bg-zinc-100 font-medium text-zinc-700 rounded-md px-4 py-2 items-center cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <p>Kembali</p>
        </Link>
      </Container>

      {/* ─── Hero & Gallery (Standard) ─── */}
      <Container>
        <div className="flex flex-col gap-4 mt-6">
          <div className="h-full w-full rounded-xl overflow-hidden aspect-video relative">
            <Image
              src={data.cover}
              alt={`${data.title} preview`}
              fill
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>

      {/* ─── Main Content (Standard) ─── */}
      <Container className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.tags?.map((cat, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 mt-2">{data.title}</h1>

          <div className="flex items-center text-sm text-zinc-600 gap-2 font-medium">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>
              {data.location.village}, Kec. {data.location.subdistrict}, Kab. {data.location.regency}
            </span>
          </div>

          <div className="text-zinc-700 text-base leading-relaxed whitespace-pre-wrap mt-6">
            <p>
              Goa Buloling adalah fenomena geologi langka berupa <strong>cenote</strong> — gua amblesan bawah
              air yang dikelilingi rimbunnya hutan mangrove asri. Berbentuk sumuran vertikal yang
              melebar di kedalaman, gua ini membentuk ruang bawah air raksasa yang telah
              terpetakan hingga <strong>42 meter</strong>, dengan lorong yang diperkirakan masih berlanjut jauh lebih
              dalam.
            </p>
            <p className="mt-4">
              Airnya berasal langsung dari <strong>akuifer air tawar bawah tanah</strong> yang tenang, tanpa
              pengaruh arus laut — menghasilkan kejernihan luar biasa dan gradasi warna air yang
              memukau, dari hijau tosca di zona dangkal hingga biru pekat di kedalaman cenote.
            </p>
          </div>
        </div>

        {/* Info Panel (Standard) */}
        <div className="space-y-4">
          <div className="border border-zinc-200 rounded-xl p-5 shadow-sm bg-white">
            <h3 className="font-semibold text-zinc-800 mb-2 flex items-center gap-2">
              🎫 Tiket Masuk
            </h3>
            <p className="text-zinc-600 font-medium">{data.tiketMasuk || "Gratis"}</p>
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
                🕰️ Waktu Terbaik
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

      <div className="h-12" />

      {/* ─── Peta Zona Interaktif ─── */}
      <PetaZona />

      {/* ─── Profil Kedalaman + Slider ─── */}
      <ProfilKedalaman />

      {/* ─── Stepper Proses Geologi ─── */}
      <StepperGeologi />

      {/* ─── Galeri Dokumentasi ─── */}
      <GaleriDokumentasi />

      {/* ─── Konservasi & Ekologi ─── */}
      <KonservasiEkologis />

      {/* ─── Peta Lokasi ─── */}
      {data.location.coordinates && (
        <Container className="mt-12">
          <h3 className="text-2xl font-bold text-zinc-800 mb-6">🗺️ Lokasi di Peta</h3>

          {/* Scientific disclaimer */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>📍 Catatan Ilmiah:</strong> Goa Buloling diyakini memiliki koneksi
              bawah tanah dengan Sumur O&#39;ang, meski hingga kini belum ada studi definitif
              yang membuktikan hubungan geologis keduanya.
            </p>
          </div>

          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-zinc-200">
            <Map
              markers={[data.location.coordinates[0], data.location.coordinates[1]]}
              label={data.title}
            />
          </div>
        </Container>
      )}

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
