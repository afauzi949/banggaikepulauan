"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Zone = {
  id: string;
  label: string;
  color: string;
  textColor: string;
  desc: string;
  detail: string;
};

const zones: Zone[] = [
  {
    id: "mangrove",
    label: "Pohon Mangrove",
    color: "bg-emerald-600",
    textColor: "text-emerald-700",
    desc: "Kanopi hutan bakau yang menaungi cenote",
    detail:
      "Hutan mangrove lebat yang mengelilingi Goa Buloling berfungsi sebagai penyangga ekosistem pesisir dan menjaga kualitas air cenote dari sedimen luar.",
  },
  {
    id: "dangkal",
    label: "Zona Dangkal",
    color: "bg-teal-400",
    textColor: "text-teal-700",
    desc: "Kedalaman 0–5 m, teduh & terlindungi",
    detail:
      "Zona dangkal (0–5m) adalah area transisi antara permukaan dan cenote dalam. Cahaya matahari masih menembus dengan baik, menciptakan warna hijau tosca yang memesona.",
  },
  {
    id: "dropoff",
    label: "Drop-Off Vertikal",
    color: "bg-cyan-700",
    textColor: "text-cyan-700",
    desc: "Batas tajam antara zona dangkal dan dalam (5–20 m)",
    detail:
      "Drop-off adalah titik peralihan dramatis dari lantai batu kapur ke jurang vertikal. Di sinilah warna air berubah drastis dari tosca cerah menjadi biru gelap yang misterius.",
  },
  {
    id: "cenote",
    label: "Zona Dalam (Cenote)",
    color: "bg-[#0d3b4f]",
    textColor: "text-[#0d3b4f]",
    desc: "Kedalaman 20m–42m+ — jantung fenomena geologi",
    detail:
      "Zona dalam adalah inti dari fenomena cenote Goa Buloling. Kedalaman terpetakan mencapai 42 meter, namun lorong-lorong di dasarnya diperkirakan masih berlanjut lebih jauh. Area bertanda '????' ini masih menjadi misteri bagi para penyelam.",
  },
  {
    id: "jalur",
    label: "Jalur Wisatawan",
    color: "bg-amber-500",
    textColor: "text-amber-700",
    desc: "Jalur akses aman menuju tepian cenote",
    detail:
      "Jalur wisatawan mengikuti kontur alam di sekitar cenote, memungkinkan pengunjung menikmati pemandangan dari tepian dengan aman tanpa merusak ekosistem yang rentan.",
  },
];

export function PetaZona() {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);

  return (
    <section id="peta-zona" className="py-16 bg-white border-t border-zinc-100">
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
              Visualisasi Zona
            </span>
            <div className="w-8 h-0.5 bg-zinc-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
            Jelajahi Zona Goa Buloling
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto">
            Goa Buloling terbagi menjadi dua zona utama: zona dangkal yang teduh oleh kanopi
            mangrove, dan zona dalam (cenote) — jantung dari fenomena geologi ini.
          </p>
          <p className="text-sm text-zinc-500 mt-2 font-medium">
            ↓ Klik zona untuk informasi lebih lanjut
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* SVG Cross-Section Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white"
          >
            <svg
              viewBox="0 0 480 360"
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sky/background */}
              <rect width="480" height="360" fill="#e0f7fa" />

              {/* Mangrove canopy left */}
              <ellipse cx="80" cy="60" rx="70" ry="45" fill="#2d6a4f" opacity="0.85" />
              <ellipse cx="60" cy="75" rx="50" ry="35" fill="#1b4332" opacity="0.7" />
              {/* Mangrove trunks left */}
              <rect x="72" y="100" width="6" height="60" fill="#6b4226" />
              <rect x="86" y="110" width="5" height="55" fill="#7a4f2e" />

              {/* Mangrove canopy right */}
              <ellipse cx="400" cy="60" rx="70" ry="45" fill="#2d6a4f" opacity="0.85" />
              <ellipse cx="420" cy="75" rx="50" ry="35" fill="#1b4332" opacity="0.7" />
              {/* Mangrove trunks right */}
              <rect x="396" y="100" width="6" height="60" fill="#6b4226" />
              <rect x="410" y="110" width="5" height="55" fill="#7a4f2e" />

              {/* Ground level */}
              <rect x="0" y="155" width="480" height="20" fill="#8B7355" />

              {/* Terrain body */}
              <rect x="0" y="175" width="480" height="185" fill="#d4b483" />

              {/* Cenote water basin - shallow zone */}
              <path
                d="M170 155 Q240 145 310 155 L315 200 Q240 195 165 200 Z"
                fill="#4dd0e1"
                opacity="0.85"
                className={`cursor-pointer transition-opacity ${activeZone?.id === "dangkal" ? "opacity-100" : "opacity-80"}`}
                onClick={() => setActiveZone(activeZone?.id === "dangkal" ? null : zones[1])}
              />

              {/* Transition zone drop-off */}
              <path
                d="M165 200 Q160 220 155 250 Q240 248 325 250 Q320 220 315 200 Q240 195 165 200 Z"
                fill="#0097a7"
                opacity="0.85"
                className={`cursor-pointer transition-opacity ${activeZone?.id === "dropoff" ? "opacity-100" : "opacity-75"}`}
                onClick={() => setActiveZone(activeZone?.id === "dropoff" ? null : zones[2])}
              />

              {/* Deep zone / cenote */}
              <path
                d="M155 250 Q148 285 145 330 Q240 340 335 330 Q332 285 325 250 Q240 248 155 250 Z"
                fill="#01579b"
                opacity="0.9"
                className={`cursor-pointer transition-opacity ${activeZone?.id === "cenote" ? "opacity-100" : "opacity-80"}`}
                onClick={() => setActiveZone(activeZone?.id === "cenote" ? null : zones[3])}
              />

              {/* Mystery depth indicator */}
              <text x="240" y="325" textAnchor="middle" fontSize="18" fill="white" opacity="0.6" fontWeight="bold">
                ????
              </text>

              {/* Jalur wisatawan indicator */}
              <path
                d="M10 140 Q80 130 155 155"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8,4"
                className={`cursor-pointer ${activeZone?.id === "jalur" ? "opacity-100" : "opacity-80"}`}
                onClick={() => setActiveZone(activeZone?.id === "jalur" ? null : zones[4])}
              />
              <path
                d="M325 155 Q400 130 470 140"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8,4"
                className={`cursor-pointer ${activeZone?.id === "jalur" ? "opacity-100" : "opacity-80"}`}
                onClick={() => setActiveZone(activeZone?.id === "jalur" ? null : zones[4])}
              />

              {/* Labels */}
              <text x="240" y="175" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Zona Dangkal</text>
              <text x="240" y="232" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Drop-Off</text>
              <text x="240" y="280" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Zona Dalam</text>
              <text x="240" y="295" textAnchor="middle" fontSize="9" fill="#a5d8ff" fontWeight="normal">(Cenote)</text>

              {/* Depth markers */}
              <line x1="120" y1="155" x2="120" y2="330" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" />
              <text x="115" y="170" textAnchor="end" fontSize="8" fill="#475569">0m</text>
              <text x="115" y="207" textAnchor="end" fontSize="8" fill="#475569">5m</text>
              <text x="115" y="253" textAnchor="end" fontSize="8" fill="#475569">20m</text>
              <text x="115" y="333" textAnchor="end" fontSize="8" fill="#475569">42m+</text>

              {/* Mangrove label */}
              <text x="80" y="42" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Mangrove</text>
              <text x="400" y="42" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Mangrove</text>
            </svg>
          </motion.div>

          {/* Zone legend + detail panel */}
          <div className="space-y-3">
            {zones.map((zone, i) => (
              <motion.button
                key={zone.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActiveZone(activeZone?.id === zone.id ? null : zone)}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                  activeZone?.id === zone.id
                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${zone.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm text-zinc-800`}>{zone.label}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{zone.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeZone?.id === zone.id ? "border-emerald-500 bg-emerald-500" : "border-zinc-300"
                    }`}
                  >
                    {activeZone?.id === zone.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              {activeZone && (
                <motion.div
                  key={activeZone.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl bg-zinc-900 p-5 text-white"
                >
                  <p className="font-semibold text-white mb-2">{activeZone.label}</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">{activeZone.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
