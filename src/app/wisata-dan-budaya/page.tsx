import type { Metadata } from "next";

import { Container } from "@/components/atoms/Container";
import { WisataGridDark } from "@/components/molecules/WisataGridDark";
import { Footer } from "@/components/organisms/Footer";
import { KolaborasiSection } from "@/components/organisms/KolaborasiSection";
import { Navbar } from "@/components/organisms/Navbar";
import { getWisataList } from "@/lib/wisata";

export const metadata: Metadata = {
  title: "Wisata & Budaya",
  description:
    "Jelajahi destinasi wisata alam, budaya, dan sejarah di Kabupaten Banggai Kepulauan.",
};

export default async function WisataDanBudayaPage() {
  const items = await getWisataList();

  return (
    <main>
      <Navbar activeHref="/wisata-dan-budaya" />

      <Container as="section" className="py-10 md:py-16">
        <WisataGridDark items={items} />
      </Container>

      <KolaborasiSection />
      <KolaborasiSection
        eyebrow="Kolaborasi Eksklusif"
        title="Rahasia Geologis di Balik 'Perahu Melayang' Danau Paisu Pok"
        description="Pernah ngelihat perahu kayu yang seolah-olah melayang bebas di udara? Di pedalaman Banggai Kepulauan, ilusi optik ini nyata terjadi. Airnya yang berwarna biru kehitaman punya tingkat kejernihan yang nggak masuk akal, sampai dasar danau terlihat jelas. Sebenarnya, fenomena alam apa yang bikin air di danau karst ini bisa terus sebening kaca?"
        linkLabel="Baca penelusuran lengkap di Sainreka"
        linkHref="https://sainreka.com/banggai-kepulauan/paisu-pok"
      />

      <Footer />
    </main>
  );
}
