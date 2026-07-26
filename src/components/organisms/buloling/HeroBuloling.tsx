"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const tags = ["Nature Tourism", "Ecotourism", "Geowisata", "Cenote"];

interface HeroBulolingProps {
  onScrollToContent?: () => void;
}

export function HeroBuloling({ onScrollToContent }: HeroBulolingProps) {
  return (
    <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/wisata/buloling.webp"
        alt="Goa Buloling, Cenote di Hutan Mangrove Sambulangan"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d3b4f]/90 via-[#0d3b4f]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b4f]/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 md:px-10 lg:px-16 mx-auto max-w-[1440px] w-full left-1/2 -translate-x-1/2">
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-teal-500/30 backdrop-blur-sm border border-teal-400/40 text-teal-200 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-3"
        >
          Goa Buloling
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-lg text-white/80 max-w-xl leading-relaxed mb-5 italic"
        >
          Jendela alami menuju dunia bawah tanah, kolam air tawar tersembunyi di jantung
          hutan mangrove Sambulangan.
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-2 text-white/70 text-sm"
        >
          <MapPin className="w-4 h-4 text-teal-400" />
          <span>Desa Sambulangan, Kec. Bulagi Utara, Kab. Banggai Kepulauan</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={onScrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-6 right-6 sm:right-10 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Scroll ke konten"
      >
        <span className="text-xs">Jelajahi</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-5"
        >
          ↓
        </motion.div>
      </motion.button>
    </div>
  );
}
