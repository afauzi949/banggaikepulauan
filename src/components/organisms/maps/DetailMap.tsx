"use client";

import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const CustomMarkerIcon = (
  color: string = "#059669", // emerald-600 to match new theme
) =>
  L.divIcon({
    html: `
      <div class="map-marker-container" style="display: flex; justify-content: center; align-items: flex-end; width: 100%; height: 100%;">
        <style>
          @keyframes bounce-marker {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .map-marker-container svg {
            animation: bounce-marker 2s infinite ease-in-out;
            filter: drop-shadow(0px 6px 4px rgba(0,0,0,0.5));
            transition: transform 0.2s;
            cursor: pointer;
          }
          .map-marker-container:hover svg {
            transform: scale(1.15);
            animation: none;
          }
        </style>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="36" height="48">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="white"/>
          <circle cx="18" cy="18" r="11" fill="${color}"/>
        </svg>
      </div>
    `,
    className: "", // Empty to override default Leaflet styles
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -48],
  });

const DetailMap: React.FC<{
  markers: number[];
  label?: string;
  color?: string;
}> = ({ markers, label, color = "#059669" }) => {
  return (
    <MapContainer
      center={[markers[0], markers[1]]} // Note: The prop passed from page is [lat, lng], so we use it directly here
      zoom={13}
      scrollWheelZoom={true}
      className="h-[400px] w-full rounded-xl overflow-hidden z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        url="https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
      />

      <Marker position={[markers[0], markers[1]]} icon={CustomMarkerIcon(color)}>
        <Popup>
          <div className="flex flex-col gap-1 font-[family-name:var(--font-dm-sans)]">
            {label && <p className="font-bold text-sm m-0">{label}</p>}
            <a
              href={`https://www.google.com/maps?q=${markers[0]},${markers[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline m-0"
            >
              Buka di Google Maps
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DetailMap;
