"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

type Props = {
  url: string;
  title: string;
};

export function PdfPreview({ url }: Props) {
  const [showPreview, setShowPreview] = useState(false);

  // Convert Google Drive view URL to preview URL
  const previewUrl = url.replace("/view?usp=drive_link", "/preview").replace("/view", "/preview");

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="group relative flex w-fit items-center justify-center gap-2 rounded-full border-2 border-zinc-900 bg-white px-8 py-3 text-lg font-bold text-zinc-900 shadow-sm transition-all hover:bg-zinc-100 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
      >
        <Eye className="h-5 w-5" />
        <span>{showPreview ? "Tutup Document Content" : "View Document Content"}</span>
      </button>

      {showPreview && (
        <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-2xl" style={{ aspectRatio: "1/1.4" }}>
          <iframe
            src={previewUrl}
            className="absolute top-0 left-0 h-full w-full border-0"
            allow="autoplay"
          ></iframe>
        </div>
      )}
    </div>
  );
}
