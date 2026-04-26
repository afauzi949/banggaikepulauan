import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kegiatan",
};

export default function KegiatanPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Kegiatan</h1>
      <p className="mt-4 text-muted-foreground">Halaman dalam pengembangan.</p>
    </main>
  );
}
