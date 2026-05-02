import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardElevation =
  "border border-[#e5e5e5] shadow-[0_2px_8px_rgba(15,23,42,0.06)] " +
  "transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 " +
  "hover:shadow-[0_12px_28px_rgba(15,23,42,0.10)]";
