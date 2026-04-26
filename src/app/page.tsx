import { AksesSection } from "@/components/organisms/AksesSection";
import { Container } from "@/components/atoms/Container";
import { DestinasiPilihanSection } from "@/components/organisms/DestinasiPilihanSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { Footer } from "@/components/organisms/Footer";
import { JelajahTeaserSection } from "@/components/organisms/JelajahTeaserSection";
import { KolaborasiSection } from "@/components/organisms/KolaborasiSection";
import { Navbar } from "@/components/organisms/Navbar";
import { PetaInteraktifSection } from "@/components/organisms/PetaInteraktifSection";
import { PetaTematikSection } from "@/components/organisms/PetaTematikSection";

export default function HomePage() {
  return (
    <main>
      <Navbar activeHref="/" />
      <HeroSection />
      <DestinasiPilihanSection />
      <PetaInteraktifSection />
      <Container as="section" className="grid items-start gap-12 py-16 lg:grid-cols-2">
        <AksesSection />
        <JelajahTeaserSection />
      </Container>
      <PetaTematikSection />
      <KolaborasiSection />
      <Footer />
    </main>
  );
}
