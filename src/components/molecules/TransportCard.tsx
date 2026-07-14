"use client";

import { Price } from "@/components/atoms/Price";
import { Tag } from "@/components/atoms/Tag";
import { useLanguage } from "@/context/LanguageContext";
import type { Transport, TransportType } from "@/lib/schemas/transport";
import { cardElevation, cn } from "@/lib/utils";

interface TransportCardProps {
  transport: Transport;
  className?: string;
}

const typeLabelMap: Record<TransportType, string> = {
  ferry: "Kapal Ferry",
  speedboat: "Kapal Cepat",
};

const typeVariantMap: Record<TransportType, "info" | "success"> = {
  ferry: "info",
  speedboat: "success",
};

export function TransportCard({ transport, className }: TransportCardProps) {
  const { t } = useLanguage();
  const { type, operator, origin, destination, price, currency, schedule } = transport;

  const typeKey = `transport.type.${type}`;
  const finalType = t(typeKey) !== typeKey ? t(typeKey) : typeLabelMap[type];

  // We can just use the schedule strings as keys for simplicity
  const daysKey = `transport.days.${schedule.days.replace(/\s+/g, "")}`;
  const finalDays = t(daysKey) !== daysKey ? t(daysKey) : schedule.days;

  const durationKey = `transport.duration.${schedule.durationLabel.replace(/\s+/g, "")}`;
  const finalDuration = t(durationKey) !== durationKey ? t(durationKey) : schedule.durationLabel;

  return (
    <article
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl bg-white p-5",
        cardElevation,
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <Tag variant={typeVariantMap[type]} size="sm">
          {finalType}
        </Tag>
        <Price amount={price} currency={currency} className="text-[16px]" />
      </header>

      <div className="flex flex-col gap-1">
        <h3 className="font-[family-name:var(--font-dm-sans)] text-[24px] font-bold leading-[32px] text-[#111827]">
          {origin} <span aria-hidden>➔</span> <span className="sr-only">menuju</span>
          {destination}
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-[16px] font-medium leading-[24px] text-[#6b7280]">
          {operator}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-[#f3f4f6] bg-[#ebfbfb] px-3 py-3">
        <span aria-hidden className="text-[14px]">
          🕒
        </span>
        <p className="font-[family-name:var(--font-dm-sans)] text-[14px] leading-[20px] text-[#4b5563]">
          {finalDays} | {schedule.departureTime} | {finalDuration}
        </p>
      </div>
    </article>
  );
}
