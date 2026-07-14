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
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      "></div>
    `,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[markers[0], markers[1]]} icon={CustomMarkerIcon(color)}>
        {label && <Popup>{label}</Popup>}
      </Marker>
    </MapContainer>
  );
};

export default DetailMap;
