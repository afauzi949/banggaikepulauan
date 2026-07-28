"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type DepthZone = {
  range: [number, number];
  label: string;
  color: string;
  highlight: string;
  desc: string;
};

export function ProfilKedalaman() {
  const { t } = useLanguage();
  const [depth, setDepth] = useState(0);

  const depthZones: DepthZone[] = [
    {
      range: [0, 5],
      label: t("buloling.profil.zone.dangkal.label"),
      color: "#4dd0e1",
      highlight: "bg-teal-400",
      desc: t("buloling.profil.zone.dangkal.desc"),
    },
    {
      range: [5, 42],
      label: t("buloling.profil.zone.cenote.label"),
      color: "#01579b",
      highlight: "bg-blue-800",
      desc: t("buloling.profil.zone.cenote.desc"),
    },
    {
      range: [42, 60],
      label: t("buloling.profil.zone.mystery.label"),
      color: "#1a1a2e",
      highlight: "bg-slate-900",
      desc: t("buloling.profil.zone.mystery.desc"),
    },
  ];

  function getActiveZone(depth: number): DepthZone {
    return (
      depthZones.find((z) => depth >= z.range[0] && depth < z.range[1]) ??
      depthZones[depthZones.length - 1]
    );
  }

  const activeZone = getActiveZone(depth);

  // Calculate fill percentages for SVG
  const totalH = 280; // total SVG height for water column
  const zoneHeights = [
    { zone: depthZones[0], h: (5 / 60) * totalH, y: 0 },
    { zone: depthZones[1], h: (37 / 60) * totalH, y: (5 / 60) * totalH },
    { zone: depthZones[2], h: (18 / 60) * totalH, y: (42 / 60) * totalH },
  ];

  const sliderY = (depth / 60) * totalH;

  return (
    <section className="py-16 bg-zinc-50 overflow-hidden border-t border-zinc-100">
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
              {t("buloling.profil.eyebrow")}
            </span>
            <div className="w-8 h-0.5 bg-zinc-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
            {t("buloling.profil.title")}
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto">{t("buloling.profil.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Cross-section SVG + slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-6 items-stretch"
          >
            {/* SVG Diagram */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white">
              <svg viewBox="0 0 200 340" className="w-full" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <rect width="200" height="340" fill="#f8fafc" />

                {/* Ground / terrain */}
                <rect x="40" y="10" width="120" height="30" fill="#a57d4a" rx="4" />

                {/* Water column zones */}
                {zoneHeights.map(({ zone, h, y }) => (
                  <rect
                    key={zone.label}
                    x="60"
                    y={40 + y}
                    width="80"
                    height={h}
                    fill={zone.color}
                    opacity={activeZone.label === zone.label ? 1 : 0.45}
                    className="transition-opacity duration-300"
                  />
                ))}

                {/* Cave walls */}
                <path
                  d="M60 40 L55 100 L50 200 L47 320 L60 330 L60 320"
                  fill="none"
                  stroke="#78350f"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
                <path
                  d="M140 40 L145 100 L150 200 L153 320 L140 330 L140 320"
                  fill="none"
                  stroke="#78350f"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />

                {/* Slider line indicator */}
                <line
                  x1="50"
                  y1={40 + sliderY}
                  x2="150"
                  y2={40 + sliderY}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                />
                <circle cx="50" cy={40 + sliderY} r="4" fill="#f59e0b" />
                <circle cx="150" cy={40 + sliderY} r="4" fill="#f59e0b" />

                {/* Depth labels */}
                <text x="22" y="45" fontSize="7" fill="#64748b" textAnchor="middle">
                  0m
                </text>
                <text
                  x="22"
                  y={40 + (5 / 60) * totalH + 5}
                  fontSize="7"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  5m
                </text>
                <text
                  x="22"
                  y={40 + (42 / 60) * totalH + 5}
                  fontSize="7"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  42m
                </text>

                {/* Mystery text */}
                <text
                  x="100"
                  y={40 + (50 / 60) * totalH}
                  textAnchor="middle"
                  fontSize="14"
                  fill="white"
                  opacity={0.6}
                  fontWeight="bold"
                >
                  ????
                </text>

                {/* Ground label */}
                <text
                  x="100"
                  y="28"
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  fontWeight="bold"
                >
                  {t("buloling.profil.groundLabel")}
                </text>

                {/* Current depth indicator */}
                <rect
                  x="55"
                  y={32 + sliderY}
                  width="90"
                  height="14"
                  rx="3"
                  fill="#f59e0b"
                  opacity="0.9"
                />
                <text
                  x="100"
                  y={41 + sliderY}
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  fontWeight="bold"
                >
                  {depth}m
                </text>
              </svg>
            </div>

            {/* Slider control */}
            <div className="flex flex-col items-center justify-center gap-2 py-4 min-w-[56px]">
              <span className="text-[10px] text-zinc-600 font-bold">0m</span>
              <div
                className="relative flex items-center justify-center"
                style={{ height: "260px", width: "32px" }}
              >
                <input
                  type="range"
                  min={0}
                  max={59}
                  step={1}
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  aria-label={t("buloling.profil.sliderAriaLabel")}
                  className="absolute cursor-pointer accent-emerald-600"
                  style={{
                    width: "260px",
                    transform: "rotate(90deg)",
                    transformOrigin: "center center",
                  }}
                />
              </div>
              <span className="text-[10px] text-zinc-600 font-bold">60m+</span>
            </div>
          </motion.div>

          {/* Zone info panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Current depth display */}
            <div className="rounded-2xl bg-zinc-900 p-6 text-white">
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-2">
                {t("buloling.profil.currentDepth")}
              </p>
              <p className="text-5xl font-bold mb-1">
                {depth}
                <span className="text-2xl ml-1">m</span>
              </p>
              <p className="text-emerald-400 font-semibold">{activeZone.label}</p>
            </div>

            {/* Zone description */}
            <div
              className="rounded-2xl p-6 border transition-all duration-300"
              style={{ borderColor: activeZone.color, backgroundColor: `${activeZone.color}10` }}
            >
              <p className="font-semibold text-zinc-900 mb-2">{activeZone.label}</p>
              <p className="text-zinc-600 text-sm leading-relaxed">{activeZone.desc}</p>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-3">
                {t("buloling.profil.legend")}
              </p>
              {depthZones.map((z) => (
                <div
                  key={z.label}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeZone.label === z.label ? "bg-white shadow-sm" : "opacity-60"
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: z.color }}
                  />
                  <p className="text-zinc-700 text-sm font-medium">{z.label}</p>
                  <p className="text-zinc-400 text-xs ml-auto">
                    {z.range[0]}–{z.range[1] === 60 ? "60+" : z.range[1]}m
                  </p>
                </div>
              ))}
            </div>

            {/* Scientific note */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong className="text-amber-900">{t("buloling.profil.scientificNote")}</strong>{" "}
                {t("buloling.profil.scientificNoteText")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
