"use client";

import { motion } from "framer-motion";
import { Droplets, Mountain, ArrowDown } from "lucide-react";

interface DeskripsiUtamaProps {
  onScrollToPeta?: () => void;
}

export function DeskripsiUtama({ onScrollToPeta }: DeskripsiUtamaProps) {
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
            Fenomena Geologi Langka
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
              Apa Itu Goa Buloling?
            </h2>
            <p className="text-zinc-700 text-base leading-relaxed mb-5">
              Goa Buloling adalah fenomena geologi langka berupa{" "}
              <strong className="text-teal-700">cenote</strong> — gua amblesan bawah air
              yang dikelilingi rimbunnya hutan mangrove asri. Berbentuk sumuran vertikal
              yang melebar di kedalaman, gua ini membentuk ruang bawah air raksasa yang
              telah terpetakan hingga{" "}
              <strong className="text-[#c8922a]">42 meter</strong>, dengan lorong yang
              diperkirakan masih berlanjut jauh lebih dalam.
            </p>
            <p className="text-zinc-700 text-base leading-relaxed mb-8">
              Airnya berasal langsung dari{" "}
              <strong className="text-teal-700">akuifer air tawar bawah tanah</strong>{" "}
              yang tenang, tanpa pengaruh arus laut — menghasilkan kejernihan luar biasa
              dan gradasi warna air yang memukau, dari hijau tosca di zona dangkal hingga
              biru pekat di kedalaman cenote.
            </p>

            <button
              onClick={onScrollToPeta}
              className="group inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-800 transition-colors"
            >
              Lihat peta kedalaman
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
              <p className="text-[#0d3b4f] font-bold text-2xl mb-1">Air Tawar</p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Sumber akuifer murni bebas pengaruh arus laut
              </p>
            </div>

            <div className="group rounded-2xl bg-white border border-amber-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Mountain className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-[#0d3b4f] font-bold text-2xl mb-1">42 m+</p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Kedalaman terpetakan, dengan lorong yang masih menjadi misteri
              </p>
            </div>

            <div className="group sm:col-span-2 rounded-2xl bg-gradient-to-br from-[#0d3b4f] to-[#0a6e7c] p-6 text-white hover:shadow-lg transition-shadow">
              <p className="text-white/70 text-sm mb-2 font-medium tracking-wide uppercase">
                Tagline
              </p>
              <p className="text-lg font-semibold leading-relaxed italic">
                &ldquo;Jendela alami menuju dunia bawah tanah — kolam air tawar tersembunyi
                di jantung hutan mangrove Sambulangan.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
