"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    if (language === "id") {
      setLanguage("en");
    } else {
      setLanguage("id");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70]">
      <button
        onClick={toggleLanguage}
        className="h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 font-semibold"
        aria-label="Toggle Language"
      >
        {language === "id" ? (
          <>
            <img src="https://flagcdn.com/w40/gb.png" alt="English Flag" className="w-6 h-4 object-cover rounded-sm" />
            <span>ENG</span>
          </>
        ) : (
          <>
            <img src="https://flagcdn.com/w40/id.png" alt="Indonesian Flag" className="w-6 h-4 object-cover rounded-sm" />
            <span>IDN</span>
          </>
        )}
      </button>
    </div>
  );
}
