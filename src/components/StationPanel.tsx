"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Activity, FileText, Compass } from "lucide-react";
import type { Station } from "@/lib/types";
import { expeditions } from "@/data/expeditions";
import { publications } from "@/data/publications";

interface Props {
  station: Station | null;
  onClose: () => void;
}

export default function StationPanel({ station, onClose }: Props) {
  const linkedExpeditions = station
    ? expeditions.filter((e) => station.linkedExpeditionIds.includes(e.id))
    : [];
  const linkedPublications = station
    ? publications.filter((p) => p.stationId === station.id)
    : [];

  return (
    <AnimatePresence>
      {station && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className="absolute top-0 right-0 h-full w-full sm:w-[440px] z-[500] bg-navy/95 backdrop-blur-2xl border-l border-white/10 overflow-y-auto"
        >
          <div className="relative h-56">
            <Image
              src={station.image}
              alt={station.name}
              fill
              sizes="(max-width: 640px) 100vw, 440px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-ice/70 hover:text-ice transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-5 left-6 right-6">
              <h2 className="heading-serif text-3xl text-ice">{station.name}</h2>
              <p className="text-xs uppercase tracking-[0.18em] text-frost/70 mt-1.5">
                {station.region}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-7">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Calendar, label: "Established", value: String(station.established) },
                {
                  icon: Activity,
                  label: "Status",
                  value: station.status === "active" ? "Active" : `Closed ${station.decommissioned}`,
                },
                {
                  icon: MapPin,
                  label: "Coordinates",
                  value: `${Math.abs(station.lat).toFixed(2)}°${station.lat < 0 ? "S" : "N"}, ${Math.abs(station.lng).toFixed(2)}°${station.lng < 0 ? "W" : "E"}`,
                },
                { icon: Compass, label: "Location", value: station.location },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="glass rounded-xl p-4">
                    <Icon className="w-4 h-4 text-frost/70" />
                    <div className="mt-2.5 text-[10px] uppercase tracking-[0.16em] text-ice/40">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm text-ice/85 leading-snug">{item.value}</div>
                  </div>
                );
              })}
            </div>

            <div>
              <p className="text-sm text-ice/65 leading-relaxed">{station.description}</p>
              <p className="mt-4 text-sm text-ice/45 leading-relaxed">{station.notes}</p>
            </div>

            {station.gallery.length > 0 && (
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-frost/60 mb-3">Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {station.gallery.map((src) => (
                    <div key={src} className="relative h-28 rounded-xl overflow-hidden group">
                      <Image
                        src={src}
                        alt={station.name}
                        fill
                        sizes="220px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {linkedExpeditions.length > 0 && (
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-frost/60 mb-3">
                  Linked Expeditions
                </h3>
                <div className="space-y-2">
                  {linkedExpeditions.map((exp) => (
                    <div key={exp.id} className="glass rounded-xl p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-ice/85">ISEA {exp.number}</span>
                        <span className="text-xs text-amber tabular-nums">{exp.yearsLabel}</span>
                      </div>
                      <p className="mt-1.5 text-xs text-ice/45 leading-relaxed">{exp.achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {linkedPublications.length > 0 && (
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-frost/60 mb-3">
                  Linked Publications
                </h3>
                <div className="space-y-2">
                  {linkedPublications.slice(0, 5).map((pub) => (
                    <div key={pub.id} className="glass rounded-xl p-4 flex gap-3">
                      <FileText className="w-4 h-4 text-frost/60 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-ice/80 leading-relaxed">{pub.title}</p>
                        <p className="mt-1.5 text-[11px] text-ice/35">
                          {pub.authors.join(", ")} · {pub.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
