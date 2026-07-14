"use client";

import { useLanguage } from "@/context/LanguageContext";

interface TranslatableTextProps {
  idText?: string;
  enText?: string;
  dictKey?: string;
}

export function TranslatableText({ idText, enText, dictKey }: TranslatableTextProps) {
  const { language, t } = useLanguage();

  if (dictKey) {
    const translated = t(dictKey);
    // If the translation exists and is not just the key itself
    if (translated !== dictKey) {
      return <>{translated}</>;
    }
  }

  if (language === "en" && enText) {
    return <>{enText}</>;
  }

  return <>{idText}</>;
}
