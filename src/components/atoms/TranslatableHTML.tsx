"use client";

import { useLanguage } from "@/context/LanguageContext";

interface TranslatableHTMLProps {
  idText?: string;
  enText?: string;
  dictKey?: string;
}

export function TranslatableHTML({ idText, enText, dictKey }: TranslatableHTMLProps) {
  const { language, t } = useLanguage();

  let htmlContent = idText || "";

  if (dictKey) {
    const translated = t(dictKey);
    if (translated !== dictKey) {
      htmlContent = translated;
    } else if (language === "en" && enText) {
      htmlContent = enText;
    }
  } else if (language === "en" && enText) {
    htmlContent = enText;
  }

  return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
