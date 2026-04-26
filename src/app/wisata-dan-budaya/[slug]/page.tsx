import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: params.slug };
}

export default function WisataDetailPage({ params }: Props) {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{params.slug}</h1>
      <p className="mt-4 text-muted-foreground">Halaman dalam pengembangan.</p>
    </main>
  );
}
