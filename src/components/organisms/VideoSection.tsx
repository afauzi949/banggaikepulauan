"use client";

import { useState } from "react";
import { Container } from "@/components/atoms/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { TranslatableText } from "@/components/atoms/TranslatableText";
import { Play } from "lucide-react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Container as="section" className="py-16 md:py-20 flex flex-col items-center gap-10">
      <SectionHeader
        title={
          <TranslatableText dictKey="video.title" idText="Dokumenter Banggai Kepulauan 2025" />
        }
        align="center"
      />
      <div
        className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative bg-neutral-900 flex items-center justify-center group cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.youtube.com/vi/V0sy8D4PoD4/maxresdefault.jpg"
              alt="Dokumenter Banggai Kepulauan 2025 Thumbnail"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="w-10 h-10 md:w-12 md:h-12 text-blue-600 ml-2" fill="currentColor" />
            </div>
          </>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/V0sy8D4PoD4?autoplay=1"
            title="Dokumenter Banggai Kepulauan 2025"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        )}
      </div>
    </Container>
  );
}
