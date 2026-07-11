import type { Metadata } from "next";

import { Footer } from "@/components/organisms/Footer";
import { JelajahCardsSection } from "@/components/organisms/JelajahCardsSection";
import { JelajahMapSection } from "@/components/organisms/JelajahMapSection";
import { Navbar } from "@/components/organisms/Navbar";
import { getUmkmCategories, getUmkmList, getUmkmLocations } from "@/lib/umkm";

export const metadata: Metadata = {
  title: "Jelajah Bangkep — Direktori Usaha Lokal",
  description: "Temukan usaha lokal, kuliner, dan layanan di Banggai Kepulauan.",
};

export default async function JelajahPage() {
  const [items, locations, categories] = await Promise.all([
    getUmkmList(),
    getUmkmLocations(),
    getUmkmCategories(),
  ]);

  return (
    <main>
      <div className="bg-white">
        <Navbar activeHref="/jelajah" />
        <JelajahMapSection items={items} locations={locations} categories={categories} />
      </div>
      <JelajahCardsSection items={items} />
      <Footer />
    </main>
  );
}
