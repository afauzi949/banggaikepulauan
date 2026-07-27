"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GalleryItem = {
  id: number;
  type: "image" | "video";
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
      type: "image",
      src: "/images/wisata/buloling_1.webp",
      alt: t("buloling.galeri.item1.alt"),
      caption: t("buloling.galeri.item1.caption"),
      credit: "Dokumentasi Tim Eksplorasi",
    },
    {
      id: 2,
      type: "image",
      src: "/images/wisata/buloling_2.webp",
      alt: t("buloling.galeri.item2.alt"),
      caption: t("buloling.galeri.item2.caption"),
      credit: "Sulawesi Dive Trek",
    },
    {
      id: 3,
      type: "image",
      src: "/images/wisata/buloling_3.webp",
      alt: t("buloling.galeri.item3.alt"),
      caption: t("buloling.galeri.item3.caption"),
    },
    {
      id: 4,
      type: "image",
      src: "/images/wisata/buloling_4.webp",
      alt: t("buloling.galeri.item4.alt"),
      caption: t("buloling.galeri.item4.caption"),
    },
    {
      id: 5,
      type: "video",
      src: "/videos/vid_buloling_1.mp4",
      alt: t("buloling.galeri.item5.alt"),
      caption: t("buloling.galeri.item5.caption"),
      credit: "Sulawesi Dive Trek",
    },
    {
      id: 6,
      type: "video",
      src: "/videos/vid_buloling_2.mp4",
      alt: t("buloling.galeri.item6.alt"),
      caption: t("buloling.galeri.item6.caption"),
      credit: "Tim Eksplorasi",
    },
    {
      id: 7,
      type: "image",
      src: "/images/wisata/buloling_5.webp",
      alt: t("buloling.galeri.item7.alt"),
      caption: t("buloling.galeri.item7.caption"),
    },
    {
      id: 8,
      type: "image",
      src: "/images/wisata/buloling_6.webp",
      alt: t("buloling.galeri.item8.alt"),
      caption: t("buloling.galeri.item8.caption"),
    },
    {
      id: 9,
      type: "image",
      src: "/images/wisata/buloling_7.webp",
      alt: t("buloling.galeri.item9.alt"),
      caption: t("buloling.galeri.item9.caption"),
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
          <p className="text-zinc-500 max-w-xl mx-auto">{t("buloling.galeri.clickHint")}</p>
        </motion.div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <button
                onClick={() => setLightbox(item)}
                className="group relative w-full aspect-[4/3] overflow-hidden rounded-xl block focus:outline-none focus:ring-2 focus:ring-zinc-400"
                aria-label={`${t("buloling.galeri.openPhoto")} ${item.alt}`}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
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
              {lightbox.type === "video" ? (
                <video
                  src={lightbox.src}
                  className="w-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  width={900}
                  height={600}
                  className="w-full object-cover"
                />
              )}
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
