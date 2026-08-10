import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { MapDocumentCard } from "@/components/molecules/MapDocumentCard";
import { TranslatableText } from "@/components/atoms/TranslatableText";
import { getPetaTematikList } from "@/lib/peta-tematik";

export const metadata: Metadata = {
  title: "Peta Tematik | Banggai Kepulauan",
  description: "Kumpulan peta tematik dan geospasial Kabupaten Banggai Kepulauan.",
};

export default async function PetaTematikPage() {
  const items = await getPetaTematikList();

  return (
    <main className="bg-white text-zinc-900 min-h-screen flex flex-col">
      <Navbar activeHref="/peta-tematik" />
      
      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      <Container as="section" className="py-12 md:py-20 flex-grow">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold md:text-5xl lg:text-6xl text-[#0a0a0a]">
            <TranslatableText dictKey="peta-tematik.pageTitle" idText="Peta Tematik" />
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600">
            <TranslatableText 
              dictKey="peta-tematik.pageSubtitle" 
              idText="Jelajahi berbagai data geospasial dan peta tematik untuk keperluan administrasi, mitigasi bencana, serta tata ruang di Banggai Kepulauan." 
            />
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((doc) => (
              <div key={doc.slug} className="flex justify-center">
                <MapDocumentCard document={doc} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500 py-20">
            <p>Belum ada data peta tematik yang tersedia.</p>
          </div>
        )}
      </Container>

      <Footer />
    </main>
  );
}
