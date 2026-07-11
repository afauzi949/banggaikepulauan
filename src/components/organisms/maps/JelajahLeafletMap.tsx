"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MarkerData {
  slug: string;
  name: string;
  position: [number, number];
  village: string;
}

interface JelajahLeafletMapProps {
  markers: MarkerData[];
}

export default function JelajahLeafletMap({ markers }: JelajahLeafletMapProps) {
  const center: [number, number] = markers.length > 0 ? markers[0].position : [-1.5195, 123.5218];

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        url="https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
      />
      {markers.map((marker) => (
        <Marker key={marker.slug} position={marker.position}>
          <Popup>
            <div className="font-[family-name:var(--font-dm-sans)]">
              <p className="text-sm font-bold">{marker.name}</p>
              <p className="text-xs text-zinc-600">{marker.village}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
