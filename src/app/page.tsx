import { AksesSection } from "@/components/organisms/AksesSection";
import { Container } from "@/components/atoms/Container";
import { TranslatableText } from "@/components/atoms/TranslatableText";
import { DestinasiPilihanSection } from "@/components/organisms/DestinasiPilihanSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { Footer } from "@/components/organisms/Footer";
import { JelajahTeaserSection } from "@/components/organisms/JelajahTeaserSection";

import { Navbar } from "@/components/organisms/Navbar";
import { PetaInteraktifSection } from "@/components/organisms/PetaInteraktifSection";
import { PetaTematikSection } from "@/components/organisms/PetaTematikSection";
import { SponsorSection } from "@/components/organisms/SponsorSection";

export default function HomePage() {
  return (
    <main>
      <Navbar activeHref="/" />
      <HeroSection />
      <DestinasiPilihanSection
        title={<TranslatableText dictKey="destinasi.title" idText="Destinasi Pilihan" />}
        subtitle={
          <TranslatableText
            dictKey="destinasi.subtitle"
            idText="Telusuri keindahan tersembunyi Banggai Kepulauan."
          />
        }
        ctaLabel={<TranslatableText dictKey="destinasi.cta" idText="Lihat Selengkapnya" />}
        limit={4}
        cols={4}
      />
      <PetaInteraktifSection />
      <Container
        as="section"
        className="grid items-start gap-10 py-16 md:gap-12 md:py-20 lg:grid-cols-2"
      >
        <AksesSection />
        <JelajahTeaserSection />
      </Container>
      <PetaTematikSection />

      <SponsorSection />
      <Footer />
    </main>
  );
}
