"use client";

import { motion } from "framer-motion";
import { Droplets, Trees, Fish, Leaf } from "lucide-react";

const items = [
  {
    icon: <Droplets className="w-7 h-7" />,
    color: "from-cyan-500 to-teal-600",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-100",
    title: "Air Tawar (Cenote)",
    desc: "Sumber akuifer murni yang menopang ekosistem sekitar dan menjadi cadangan air bersih alam yang tak ternilai.",
  },
  {
    icon: <Trees className="w-7 h-7" />,
    color: "from-emerald-500 to-green-700",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-100",
    title: "Ekosistem Mangrove",
    desc: "Benteng alami pesisir sekaligus rumah bagi beragam biota — melindungi garis pantai dari abrasi dan badai.",
  },
  {
    icon: <Fish className="w-7 h-7" />,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-100",
    title: "Habitat Biota Air",
    desc: "Rumah bagi coral dan kehidupan bawah air unik yang bergantung pada kejernihan dan kestabilan ekosistem cenote.",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-100",
    title: "Konservasi & Ekowisata",
    desc: "Menjaga keseimbangan antara pariwisata bertanggung jawab dan kelestarian alam demi generasi mendatang.",
  },
];

export function KonservasiEkologis() {
  return (
    <section className="py-16 bg-zinc-50 overflow-hidden border-t border-zinc-100">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-emerald-500" />
            <span className="text-emerald-600 text-sm font-semibold tracking-widest uppercase">
              Konservasi & Ekologi
            </span>
            <div className="w-8 h-0.5 bg-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
            Kenapa Goa Buloling Perlu Dijaga?
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto">
            Setiap elemen ekosistem Goa Buloling saling terhubung — menjaga satu berarti
            menjaga seluruhnya.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`group rounded-2xl ${item.bgLight} border ${item.borderColor} p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-base mb-2">{item.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-sm"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900" />
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-green-400/20 blur-3xl" />

          <div className="relative px-8 py-12 text-center">
            <p className="text-4xl mb-6">🌿</p>
            <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-relaxed italic max-w-2xl mx-auto">
              &ldquo;Mari bersama menjaga kelestarian dan keasrian alam Goa Buloling, demi masa
              depan Desa Sambulangan.&rdquo;
            </blockquote>
            <div className="mt-6 w-16 h-0.5 bg-emerald-300 mx-auto" />
            <p className="text-emerald-100 text-sm mt-4 font-medium">
              Desa Sambulangan, Kec. Bulagi Utara, Kab. Banggai Kepulauan
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
