"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudRain, Mountain, AlertTriangle, Zap, Waves } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GeologyStep = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  visual: React.ReactNode;
};

export function StepperGeologi() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps: GeologyStep[] = [
    {
      id: 1,
      icon: <CloudRain className="w-5 h-5" />,
      title: t("buloling.stepper.step1.title"),
      description: t("buloling.stepper.step1.desc"),
      visual: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Sky */}
          <rect width="300" height="200" fill="#e0f7fa" />
          {/* Cloud */}
          <ellipse cx="150" cy="35" rx="60" ry="22" fill="#b2ebf2" />
          <ellipse cx="120" cy="40" rx="40" ry="18" fill="#b2ebf2" />
          <ellipse cx="180" cy="40" rx="40" ry="18" fill="#b2ebf2" />
          {/* Rain drops */}
          {[100, 120, 140, 160, 180].map((x, i) => (
            <line key={i} x1={x} y1={60 + (i % 3) * 8} x2={x - 3} y2={80 + (i % 3) * 8}
              stroke="#0097a7" strokeWidth="2" strokeLinecap="round" />
          ))}
          {/* Ground */}
          <rect x="0" y="110" width="300" height="90" fill="#d4b483" />
          {/* Limestone layer */}
          <rect x="0" y="130" width="300" height="70" fill="#c9a96e" />
          {/* Cracks */}
          <path d="M130 110 L125 140 L135 160 L128 190" stroke="#8B7355" strokeWidth="2" fill="none" />
          <path d="M160 110 L165 135 L155 155 L162 190" stroke="#8B7355" strokeWidth="2" fill="none" />
          {/* Water in cracks */}
          <path d="M130 120 L126 140 L134 158 L129 180" stroke="#0097a7" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M160 120 L164 138 L156 156 L161 178" stroke="#0097a7" strokeWidth="1.5" fill="none" opacity="0.7" />
          {/* Label */}
          <text x="150" y="100" textAnchor="middle" fontSize="10" fill="#01579b" fontWeight="bold">{t("buloling.stepper.step1.svgLabel")}</text>
        </svg>
      ),
    },
    {
      id: 2,
      icon: <Mountain className="w-5 h-5" />,
      title: t("buloling.stepper.step2.title"),
      description: t("buloling.stepper.step2.desc"),
      visual: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" fill="#f8fafc" />
          {/* Ground surface */}
          <rect x="0" y="0" width="300" height="70" fill="#d4b483" />
          {/* Underground cave */}
          <ellipse cx="150" cy="130" rx="100" ry="50" fill="#4dd0e1" opacity="0.4" />
          <ellipse cx="150" cy="135" rx="85" ry="38" fill="#4dd0e1" opacity="0.7" />
          {/* Water flow */}
          <path d="M50 130 Q150 120 250 130" stroke="#0097a7" strokeWidth="3" fill="none" />
          {/* Cave outline */}
          <path d="M50 100 Q50 85 65 80 Q150 75 235 80 Q250 85 250 100 L250 165 Q250 180 235 182 Q150 188 65 182 Q50 180 50 165 Z"
            fill="none" stroke="#78350f" strokeWidth="3" />
          {/* Stalactites */}
          {[80, 120, 150, 180, 220].map((x, i) => (
            <polygon key={i} points={`${x-6},80 ${x+6},80 ${x},${95 + (i % 2) * 10}`} fill="#a57d4a" />
          ))}
          <text x="150" y="20" textAnchor="middle" fontSize="9" fill="#6b4226" fontWeight="bold">{t("buloling.stepper.step2.svgLabel1")}</text>
          <text x="150" y="145" textAnchor="middle" fontSize="9" fill="#01579b" fontWeight="bold">{t("buloling.stepper.step2.svgLabel2")}</text>
        </svg>
      ),
    },
    {
      id: 3,
      icon: <AlertTriangle className="w-5 h-5" />,
      title: t("buloling.stepper.step3.title"),
      description: t("buloling.stepper.step3.desc"),
      visual: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" fill="#f8fafc" />
          {/* Thin roof */}
          <rect x="0" y="0" width="300" height="45" fill="#d4b483" />
          {/* Cracks */}
          <path d="M120 10 L115 30 L125 35 L118 45" stroke="#8B7355" strokeWidth="2.5" fill="none" />
          <path d="M170 5 L175 25 L165 30 L172 45" stroke="#8B7355" strokeWidth="2.5" fill="none" />
          <path d="M145 0 L140 45" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
          {/* Warning crack highlight */}
          <path d="M110 20 L190 20" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          {/* Cave body */}
          <ellipse cx="150" cy="120" rx="120" ry="65" fill="#4dd0e1" opacity="0.5" />
          <ellipse cx="150" cy="125" rx="100" ry="50" fill="#4dd0e1" opacity="0.8" />
          {/* Roof pieces falling hint */}
          <polygon points="130,45 145,45 137,62" fill="#c9a96e" opacity="0.6" />
          <polygon points="160,45 175,45 167,60" fill="#c9a96e" opacity="0.6" />
          <text x="150" y="28" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">{t("buloling.stepper.step3.svgLabel1")}</text>
          <text x="150" y="135" textAnchor="middle" fontSize="9" fill="#01579b">{t("buloling.stepper.step3.svgLabel2")}</text>
        </svg>
      ),
    },
    {
      id: 4,
      icon: <Zap className="w-5 h-5" />,
      title: t("buloling.stepper.step4.title"),
      description: t("buloling.stepper.step4.desc"),
      visual: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" fill="#e0f7fa" />
          {/* Ground sides */}
          <rect x="0" y="0" width="90" height="60" fill="#d4b483" />
          <rect x="210" y="0" width="90" height="60" fill="#d4b483" />
          {/* Collapsed rubble */}
          <polygon points="85,60 120,60 105,110 90,105" fill="#a57d4a" opacity="0.7" />
          <polygon points="180,60 215,60 210,105 195,110" fill="#a57d4a" opacity="0.7" />
          <polygon points="110,70 145,80 140,120 115,115" fill="#c9a96e" opacity="0.6" />
          <polygon points="155,80 190,70 185,115 160,120" fill="#c9a96e" opacity="0.6" />
          {/* Opening to sky */}
          <path d="M90 0 L90 60 L210 60 L210 0" fill="#e0f7fa" />
          {/* Water visible */}
          <ellipse cx="150" cy="155" rx="100" ry="35" fill="#0097a7" opacity="0.8" />
          <path d="M50 155 Q150 148 250 155" stroke="#4dd0e1" strokeWidth="2" fill="none" />
          {/* Collapse particles */}
          {[[110,40],[150,35],[185,42],[130,55],[170,50]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#a57d4a" opacity="0.5" />
          ))}
          <text x="150" y="20" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="bold">{t("buloling.stepper.step4.svgLabel1")}</text>
          <text x="150" y="145" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">{t("buloling.stepper.step4.svgLabel2")}</text>
        </svg>
      ),
    },
    {
      id: 5,
      icon: <Waves className="w-5 h-5" />,
      title: t("buloling.stepper.step5.title"),
      description: t("buloling.stepper.step5.desc"),
      visual: (
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Sky */}
          <rect width="300" height="200" fill="#e0f7fa" />
          {/* Ground */}
          <rect x="0" y="80" width="300" height="120" fill="#d4b483" />
          {/* Cenote water */}
          <ellipse cx="150" cy="130" rx="90" ry="55" fill="#0097a7" opacity="0.85" />
          <ellipse cx="150" cy="125" rx="85" ry="45" fill="#26c6da" opacity="0.7" />
          {/* Water reflection */}
          <path d="M80 125 Q150 115 220 125" stroke="#80deea" strokeWidth="2" fill="none" opacity="0.6" />
          {/* Mangrove/vegetation left */}
          <ellipse cx="60" cy="65" rx="45" ry="30" fill="#2d6a4f" />
          <rect x="58" y="88" width="5" height="30" fill="#6b4226" />
          {/* Mangrove/vegetation right */}
          <ellipse cx="240" cy="65" rx="45" ry="30" fill="#2d6a4f" />
          <rect x="238" y="88" width="5" height="30" fill="#6b4226" />
          {/* Coral in water */}
          <path d="M110 155 Q115 140 120 155" stroke="#e91e63" strokeWidth="3" fill="none" />
          <path d="M170 160 Q178 142 185 160" stroke="#ff6f00" strokeWidth="3" fill="none" />
          {/* Sun rays */}
          {[120,140,160,180].map((x, i) => (
            <line key={i} x1={x} y1={0} x2={x - 10} y2={50} stroke="#ffd54f" strokeWidth="1.5" opacity="0.4" />
          ))}
          {/* Labels */}
          <text x="150" y="125" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">{t("buloling.stepper.step5.svgLabel")}</text>
          <text x="60" y="50" textAnchor="middle" fontSize="8" fill="white">Mangrove</text>
          <text x="240" y="50" textAnchor="middle" fontSize="8" fill="white">Mangrove</text>
        </svg>
      ),
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
              {t("buloling.stepper.eyebrow")}
            </span>
            <div className="w-8 h-0.5 bg-zinc-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
            {t("buloling.stepper.title")}
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto">
            {t("buloling.stepper.subtitle")}
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="relative mb-10">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-200">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, i) => (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className="relative flex flex-col items-center gap-2 z-10 group"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    i === activeStep
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                      : i < activeStep
                      ? "bg-blue-50 border-blue-400 text-blue-600"
                      : "bg-white border-zinc-300 text-zinc-400 group-hover:border-blue-300"
                  }`}
                >
                  {i < activeStep ? (
                    <span className="text-blue-600 font-bold text-sm">✓</span>
                  ) : (
                    <span
                      className={`transition-colors ${
                        i === activeStep ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {step.icon}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs font-semibold hidden sm:block transition-colors text-center leading-tight max-w-[70px] ${
                    i === activeStep ? "text-blue-600" : "text-zinc-400"
                  }`}
                >
                  {step.title}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Illustration */}
            <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm bg-white p-4">
              {steps[activeStep].visual}
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
                    {t("buloling.stepper.step")} {steps[activeStep].id}
                  </p>
                  <h3 className="text-2xl font-bold text-zinc-900">
                    {steps[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-zinc-600 text-base leading-relaxed mb-8">
                {steps[activeStep].description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 text-sm font-medium hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {t("buloling.stepper.prev")}
                </button>
                <button
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {t("buloling.stepper.next")}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step dots mobile */}
        <div className="flex justify-center gap-2 mt-8 sm:hidden">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeStep ? "bg-blue-600 w-6" : "bg-zinc-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
