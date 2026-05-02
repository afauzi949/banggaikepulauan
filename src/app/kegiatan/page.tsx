import type { Metadata } from "next";

import { Container } from "@/components/atoms/Container";
import { Footer } from "@/components/organisms/Footer";
import { KegiatanContent } from "@/components/organisms/KegiatanContent";
import { Navbar } from "@/components/organisms/Navbar";
import { getAllKegiatan, getAllKegiatanTags } from "@/lib/kegiatan";

export const metadata: Metadata = {
  title: "Kegiatan",
};

export default function KegiatanPage() {
  const items = getAllKegiatan();
  const categories = getAllKegiatanTags(items);

  return (
    <main>
      <Navbar activeHref="/kegiatan" />
      <Container as="section" className="py-8 md:py-12">
        <KegiatanContent items={items} categories={categories} />
      </Container>
      <Footer />
    </main>
  );
}
