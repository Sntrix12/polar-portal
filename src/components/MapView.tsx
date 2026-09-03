"use client";

import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { Station } from "@/lib/types";
import { stations as allStations } from "@/data/stations";

interface Props {
  stations: Station[];
  selectedId: string | null;
  onSelect: (station: Station) => void;
  year: number;
}

function markerIcon(active: boolean, selected: boolean) {
  const color = active ? "#FBBF24" : "#64748B";
  const size = selected ? 26 : 20;
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        <span class="station-marker-pulse" style="position:absolute;inset:0;border-radius:9999px;background:${color};opacity:.5;"></span>
        <span style="position:absolute;inset:${size * 0.22}px;border-radius:9999px;background:${color};
          border:2px solid #050C17;box-shadow:0 0 14px ${color}99;"></span>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/**
 * Leaflet measures the container on mount. Inside an animated panel the size can
 * still be settling, so re-measure once, then frame both poles so every station
 * is visible without the user having to pan.
 */
function MapFramer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      const bounds = L.latLngBounds(
        allStations.map((s) => [s.lat, s.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [70, 70], animate: false });
    }, 220);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function MapView({ stations, selectedId, onSelect, year }: Props) {
  return (
    <MapContainer
      center={[-20, 40]}
      zoom={2}
      minZoom={1}
      maxZoom={8}
      scrollWheelZoom
      worldCopyJump
      style={{ height: "100%", width: "100%" }}
      attributionControl
      zoomControl={false}
    >
      {/* moved off the top-left, where the stat chips sit */}
      <ZoomControl position="topright" />
      {/* Esri's dark canvas needs no API key. Base layer carries the geometry,
          reference layer carries place labels. */}
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        maxZoom={16}
      />
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />
      <MapFramer />
      {stations.map((station) => {
        const decommissioned =
          station.decommissioned !== undefined && year >= station.decommissioned;
        return (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={markerIcon(!decommissioned, selectedId === station.id)}
            eventHandlers={{ click: () => onSelect(station) }}
          >
            <Tooltip direction="top" offset={[0, -14]} opacity={1}>
              <span style={{ fontWeight: 600 }}>{station.name}</span> · {station.established}
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
