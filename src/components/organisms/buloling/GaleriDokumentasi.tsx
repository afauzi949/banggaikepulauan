"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
};

export function GaleriDokumentasi() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/images/wisata/buloling.webp",
      alt: t("buloling.galeri.item1.alt"),
      caption: t("buloling.galeri.item1.caption"),
      credit: "Dokumentasi Tim Eksplorasi",
    },
    {
      id: 2,
      src: "/images/wisata/buloling.webp",
      alt: t("buloling.galeri.item2.alt"),
      caption: t("buloling.galeri.item2.caption"),
      credit: "Sulawesi Dive Trek",
    },
    {
      id: 3,
      src: "/images/wisata/buloling.webp",
      alt: t("buloling.galeri.item3.alt"),
      caption: t("buloling.galeri.item3.caption"),
    },
    {
      id: 4,
      src: "/images/wisata/buloling.webp",
      alt: t("buloling.galeri.item4.alt"),
      caption: t("buloling.galeri.item4.caption"),
    },
    {
      id: 5,
      src: "/images/wisata/buloling.webp",
      alt: t("buloling.galeri.item5.alt"),
      caption: t("buloling.galeri.item5.caption"),
      credit: "Sulawesi Dive Trek",
    },
    {
      id: 6,
      src: "/images/wisata/buloling.webp",
      alt: t("buloling.galeri.item6.alt"),
      caption: t("buloling.galeri.item6.caption"),
      credit: "Tim Eksplorasi",
    },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-zinc-100">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-zinc-300" />
            <span className="text-zinc-500 text-sm font-semibold tracking-widest uppercase">
              {t("buloling.galeri.eyebrow")}
            </span>
            <div className="w-8 h-0.5 bg-zinc-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
            {t("buloling.galeri.title")}
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            {t("buloling.galeri.clickHint")}
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setLightbox(item)}
                className="group relative w-full overflow-hidden rounded-xl block focus:outline-none focus:ring-2 focus:ring-zinc-400"
                aria-label={`${t("buloling.galeri.openPhoto")} ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={i % 2 === 0 ? 400 : 300}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">
                        {item.caption}
                      </p>
                      {item.credit && (
                        <p className="text-blue-300 text-xs mt-1">📷 {item.credit}</p>
                      )}
                    </div>
                    <ZoomIn className="w-5 h-5 text-white flex-shrink-0 ml-2" />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center text-zinc-400 text-xs mt-8"
        >
          {t("buloling.galeri.note")}
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={900}
                height={600}
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-5">
                <p className="text-white font-semibold">{lightbox.caption}</p>
                {lightbox.credit && (
                  <p className="text-blue-300 text-sm mt-1">📷 {lightbox.credit}</p>
                )}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label={t("buloling.galeri.closeLabel")}
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
