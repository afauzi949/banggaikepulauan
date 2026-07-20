"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PdfPreview } from "../atoms/PdfPreview";

export function PeluncuranDokumenDescription({ dictKey, defaultText }: { dictKey: string, defaultText: string }) {
  const { t, language } = useLanguage();
  const text = t(dictKey) !== dictKey ? t(dictKey) : defaultText;

  const idDelimiter = "sekaligus menjadi referensi bagi masyarakat, wisatawan, dan pemandu wisata.";
  const enDelimiter = "serving as a reference for the community, tourists, and tour guides.";
  const delimiter = language === "en" ? enDelimiter : idDelimiter;

  const parts = text.split(delimiter);

  return (
    <>
      {parts.length > 1 ? (
        <>
          {parts[0]}
          {delimiter}
          <div className="my-8 block">
            <PdfPreview
              url="https://drive.google.com/file/d/1nolF2TyEd7SCmIClPBgtqn9Zai8SjANy/view?usp=drive_link"
              title="Dokumen Warisan Banggai Kepulauan 2025"
            />
          </div>
          {parts[1].trimStart()}
        </>
      ) : (
        text
      )}
    </>
  );
}
