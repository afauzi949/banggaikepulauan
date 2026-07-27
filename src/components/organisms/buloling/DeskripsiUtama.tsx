"use client";

import { motion } from "framer-motion";
import { Droplets, Mountain, ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DeskripsiUtamaProps {
  onScrollToPeta?: () => void;
}

export function DeskripsiUtama({ onScrollToPeta }: DeskripsiUtamaProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-[#f0fafb]">
      {/* Background decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-0.5 bg-teal-500" />
          <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase">
            {t("buloling.deskripsi.eyebrow")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0d3b4f] leading-tight mb-6">
              {t("buloling.deskripsi.title")}
            </h2>
            <p className="text-zinc-700 text-base leading-relaxed mb-5">
              {t("buloling.deskripsi.p1")}
            </p>
            <p className="text-zinc-700 text-base leading-relaxed mb-8">
              {t("buloling.deskripsi.p2")}
            </p>

            <button
              onClick={onScrollToPeta}
              className="group inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-800 transition-colors"
            >
              {t("buloling.deskripsi.cta")}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="group rounded-2xl bg-white border border-teal-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                <Droplets className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-[#0d3b4f] font-bold text-2xl mb-1">
                {t("buloling.deskripsi.stat1.title")}
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t("buloling.deskripsi.stat1.desc")}
              </p>
            </div>

            <div className="group rounded-2xl bg-white border border-amber-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Mountain className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-[#0d3b4f] font-bold text-2xl mb-1">42 m+</p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t("buloling.deskripsi.stat2.desc")}
              </p>
            </div>

            <div className="group sm:col-span-2 rounded-2xl bg-gradient-to-br from-[#0d3b4f] to-[#0a6e7c] p-6 text-white hover:shadow-lg transition-shadow">
              <p className="text-white/70 text-sm mb-2 font-medium tracking-wide uppercase">
                Tagline
              </p>
              <p className="text-lg font-semibold leading-relaxed italic">
                {t("buloling.deskripsi.tagline")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
