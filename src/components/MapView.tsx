"use client";

import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { MapSite, CATEGORY_META, MAP_SITES } from "@/data/mapSites";

interface Props {
  sites: MapSite[];
  selectedId: string | null;
  onSelect: (site: MapSite) => void;
}

function markerIcon(site: MapSite, selected: boolean) {
  const color = CATEGORY_META[site.category].color;
  const decommissioned = site.status === "decommissioned";
  const size = selected ? 24 : site.category === "station" ? 20 : 16;

  // Decommissioned sites read as a hollow outline rather than a solid dot.
  const inner = decommissioned
    ? `background:#FFFFFF;border:3px dashed ${color};`
    : `background:${color};border:2px solid #FFFFFF;`;

  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        ${
          site.category === "station" && !decommissioned
            ? `<span class="station-marker-pulse" style="position:absolute;inset:-4px;border-radius:9999px;background:${color};opacity:.35;"></span>`
            : ""
        }
        <span style="position:absolute;inset:0;border-radius:9999px;${inner}
          box-shadow:0 2px 8px rgba(15,23,42,.35);${
            selected ? "outline:3px solid #0369A1;outline-offset:2px;" : ""
          }"></span>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/**
 * Leaflet measures the container on mount; re-measure once it has settled, then
 * frame every site so the Arctic cluster (Himadri, Kongsfjorden) is visible
 * alongside the Antarctic ones without the user having to pan.
 * Runs once on mount only — refitting on every legend toggle would be jumpy.
 */
function MapReady() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      const bounds = L.latLngBounds(
        MAP_SITES.map((s) => [s.lat, s.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50], animate: false });
    }, 220);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function MapView({ sites, selectedId, onSelect }: Props) {
  return (
    <MapContainer
      center={[-20, 40]}
      zoom={2}
      minZoom={1}
      maxZoom={9}
      /* Wheel zoom OFF so the mouse wheel scrolls the PAGE, not the map.
         Zooming happens through the +/- control instead. */
      scrollWheelZoom={false}
      doubleClickZoom
      worldCopyJump
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >
      <ZoomControl position="topright" />

      {/* Esri light canvas — no API key required. */}
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri"
        maxZoom={16}
      />
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />

      <MapReady />

      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.lat, site.lng]}
          icon={markerIcon(site, selectedId === site.id)}
          eventHandlers={{ click: () => onSelect(site) }}
        >
          <Tooltip direction="top" offset={[0, -12]} opacity={1}>
            <span style={{ fontWeight: 700 }}>{site.name}</span>
            <br />
            <span style={{ fontSize: 11, opacity: 0.75 }}>
              {CATEGORY_META[site.category].label}
            </span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
