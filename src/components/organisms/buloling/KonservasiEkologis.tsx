"use client";

import { motion } from "framer-motion";
import { Droplets, Trees, Fish, Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function KonservasiEkologis() {
  const { t } = useLanguage();

  const items = [
    {
      icon: <Droplets className="w-7 h-7" />,
      color: "from-cyan-500 to-teal-600",
      bgLight: "bg-cyan-50",
      borderColor: "border-cyan-100",
      title: t("buloling.konservasi.item1.title"),
      desc: t("buloling.konservasi.item1.desc"),
    },
    {
      icon: <Trees className="w-7 h-7" />,
      color: "from-emerald-500 to-green-700",
      bgLight: "bg-emerald-50",
      borderColor: "border-emerald-100",
      title: t("buloling.konservasi.item2.title"),
      desc: t("buloling.konservasi.item2.desc"),
    },
    {
      icon: <Fish className="w-7 h-7" />,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      borderColor: "border-blue-100",
      title: t("buloling.konservasi.item3.title"),
      desc: t("buloling.konservasi.item3.desc"),
    },
    {
      icon: <Leaf className="w-7 h-7" />,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      borderColor: "border-amber-100",
      title: t("buloling.konservasi.item4.title"),
      desc: t("buloling.konservasi.item4.desc"),
    },
  ];

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
              {t("buloling.konservasi.eyebrow")}
            </span>
            <div className="w-8 h-0.5 bg-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
            {t("buloling.konservasi.title")}
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto">
            {t("buloling.konservasi.subtitle")}
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
              {t("buloling.konservasi.quote")}
            </blockquote>
            <div className="mt-6 w-16 h-0.5 bg-emerald-300 mx-auto" />
            <p className="text-emerald-100 text-sm mt-4 font-medium">
              {t("buloling.konservasi.quoteCredit")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
