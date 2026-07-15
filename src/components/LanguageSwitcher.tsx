"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[70]" ref={dropdownRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col w-32"
          >
            <button
              onClick={() => {
                setLanguage("id");
                setIsOpen(false);
              }}
              className={cn(
                "px-4 py-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors",
                language === "id"
                  ? "font-semibold text-blue-600 dark:text-blue-400"
                  : "text-zinc-700 dark:text-zinc-300",
              )}
            >
              Indonesia
            </button>
            <button
              onClick={() => {
                setLanguage("en");
                setIsOpen(false);
              }}
              className={cn(
                "px-4 py-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors",
                language === "en"
                  ? "font-semibold text-blue-600 dark:text-blue-400"
                  : "text-zinc-700 dark:text-zinc-300",
              )}
            >
              English
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 font-semibold"
        aria-label="Toggle Language"
      >
        {language === "id" ? (
          <>
            <span>🇮🇩</span> <span>IDN</span>
          </>
        ) : (
          <>
            <span>🇬🇧</span> <span>ENG</span>
          </>
        )}
      </button>
    </div>
  );
}
