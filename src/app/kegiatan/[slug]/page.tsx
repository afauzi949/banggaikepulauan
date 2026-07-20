import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { Container } from "@/components/atoms/Container";
import { PdfPreview } from "@/components/atoms/PdfPreview";
import { TransitionLink as Link } from "@/components/atoms/TransitionLink";
import { TranslatableText } from "@/components/atoms/TranslatableText";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { PeluncuranDokumenDescription } from "@/components/organisms/PeluncuranDokumenDescription";
import { getKegiatanBySlug } from "@/lib/kegiatan";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getKegiatanBySlug(params.slug);
  if (!data) return { title: "Not Found" };

  return { title: data.title, description: data.excerpt };
}

export default function KegiatanDetailPage({ params }: Props) {
  const data = getKegiatanBySlug(params.slug);

  if (!data) {
    notFound();
  }

  // We will let TranslatableText handle the description string with whitespace-pre-wrap

  return (
    <main className="bg-white">
      <Navbar activeHref="/kegiatan" />

      <Container className="pt-24 pb-8 md:pt-32 md:pb-12">
        {/* Back Button */}
        <Link
          href="/kegiatan"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 font-medium text-zinc-700 transition-all hover:gap-4 cursor-pointer"
        >
          <ArrowLeft className="h-6 w-6" />
          <p className="leading-[-4px]">
            <TranslatableText dictKey="nav.kembali" idText="Kembali" />
          </p>
        </Link>
      </Container>

      {/* Hero Image */}
      <Container>
        {data.images && data.images.length > 0 && data.slug !== "peluncuran-dokumen-warisan-2025" ? (
          <div className="columns-1 md:columns-2 gap-6 space-y-6 mb-12">
            {data.images.map((img, idx) => (
              <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={img}
                  alt={`${data.title} - ${idx + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl md:h-[60vh] md:aspect-auto">
            <Image
              src={data.cover}
              alt={data.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        )}
      </Container>

      {/* Content */}
      <Container className="mb-20 max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl md:text-4xl">
          <TranslatableText dictKey={`kegiatan.title.${data.slug}`} idText={data.title} />
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {data.date}
          </div>
        </div>

        {data.excerpt && (
          <p className="text-lg font-medium italic text-zinc-800">
            &quot;
            <TranslatableText dictKey={`kegiatan.excerpt.${data.slug}`} idText={data.excerpt} />
            &quot;
          </p>
        )}

        {/* Paragraphs */}
        <div className="space-y-4 pt-4 text-base leading-relaxed text-zinc-700 whitespace-pre-wrap">
          {data.slug === "peluncuran-dokumen-warisan-2025" ? (
            <PeluncuranDokumenDescription
              dictKey={`kegiatan.description.${data.slug}`}
              defaultText={data.description}
            />
          ) : (
            <TranslatableText
              dictKey={`kegiatan.description.${data.slug}`}
              idText={data.description}
            />
          )}
        </div>

        {/* Link For DWB */}
        {data.title === "Peluncuran Dokumen Warisan Banggai Kepulauan 2025" && (
          <div className="my-8">
            <a
              className="block rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4 text-xs font-semibold text-yellow-950 underline sm:text-base w-fit"
              href="https://drive.google.com/file/d/1nolF2TyEd7SCmIClPBgtqn9Zai8SjANy/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dokumen Warisan Banggai Kepulauan 2025
            </a>
          </div>
        )}
        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {data.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800"
              >
                <TranslatableText dictKey={`tag.${tag}`} idText={tag} />
              </span>
            ))}
          </div>
        )}
      </Container>

      <Footer />
    </main>
  );
}
