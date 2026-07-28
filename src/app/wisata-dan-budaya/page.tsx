import type { Metadata } from "next";

import { Container } from "@/components/atoms/Container";
import { WisataGridDark } from "@/components/molecules/WisataGridDark";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { getWisataList } from "@/lib/wisata";

export const metadata: Metadata = {
  title: "Wisata & Budaya Banggai Kepulauan",
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

      <Footer />
    </main>
  );
}
