"use client";

import Image from "next/image";
import { MapPin, Phone, Map } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { Tag } from "@/components/atoms/Tag";
import type { Umkm } from "@/lib/schemas/umkm";
import { cn } from "@/lib/utils";

interface JelajahCardProps {
  umkm: Umkm;
  className?: string;
}

export function JelajahCard({ umkm, className }: JelajahCardProps) {
  const { t } = useLanguage();
  const { slug, name, tags = [], description, location, cover, operatingHours, contact } = umkm;

  const descKey = `umkm.description.${slug}`;
  const finalDesc = t(descKey) !== descKey ? t(descKey) : description;

  const locKey = `location.${location.village.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const finalVillage = t(locKey) !== locKey ? t(locKey) : location.village;

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-t-[32px] rounded-b-[14px] bg-[#004d71] p-4 shadow-[0px_25px_25px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      <div className="relative aspect-[397/239] w-full overflow-hidden rounded-t-[32px]">
        <Image
          src={cover}
          alt={`Foto usaha lokal dan layanan UMKM ${name} di ${location}, Banggai Kepulauan`}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {tags.slice(0, 3).map((tag) => {
            const tagKey = `tag.${tag}`;
            const finalTag = t(tagKey) !== tagKey ? t(tagKey) : tag;
            return (
              <Tag key={tag} variant="primary" size="sm" className="bg-white text-[#004d71]">
                {finalTag}
              </Tag>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold leading-7 text-white">
            {name}
          </h3>
          {operatingHours && (
            <span className="font-[family-name:var(--font-dm-sans)] text-[13px] leading-[13px] text-[#d9d7d7]">
              {operatingHours}
            </span>
          )}
        </div>

        <div className="flex items-start gap-1">
          <MapPin className="mt-0.5 size-4 shrink-0 text-white" />
          <p className="font-[family-name:var(--font-dm-sans)] text-[13px] leading-[17px] text-white">
            {finalVillage}, {location.subdistrict} Kab. {location.regency}
          </p>
        </div>
      </div>

      <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-5 text-white">
        {finalDesc}
      </p>

      {contact && (
        <div className="mt-auto flex flex-wrap gap-4">
          {contact.googleMapsUrl && (
            <a
              href={contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[7px] bg-white px-4 py-2"
            >
              <Map className="size-[18px] text-black" />
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-black">
                {t("jelajah.maps") !== "jelajah.maps" ? t("jelajah.maps") : "Rute Google Maps"}
              </span>
            </a>
          )}
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[7px] bg-white px-4 py-2"
            >
              <Phone className="size-4 text-black" />
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-black">
                {t("jelajah.whatsapp") !== "jelajah.whatsapp"
                  ? t("jelajah.whatsapp")
                  : "Kontak Whatsapp"}
              </span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
