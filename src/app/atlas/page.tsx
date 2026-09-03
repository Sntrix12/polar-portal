"use client";

import { useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Layers, Flag, Building2 } from "lucide-react";
import TimelineSlider from "@/components/TimelineSlider";
import StationPanel from "@/components/StationPanel";
import DecadeChart from "@/components/DecadeChart";
import { useLanguage } from "@/components/LanguageProvider";
import { stations } from "@/data/stations";
import { expeditions } from "@/data/expeditions";
import type { Station } from "@/lib/types";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-navy-deep">
      <div className="text-sm text-ice/40">Loading map…</div>
    </div>
  ),
});

const MIN_YEAR = 1981;
const MAX_YEAR = 2026;

const MILESTONES = [
  { year: 1981, label: "First expedition" },
  { year: 1983, label: "Dakshin Gangotri" },
  { year: 1989, label: "Maitri" },
  { year: 2008, label: "Himadri" },
  { year: 2012, label: "Bharati" },
  { year: 2022, label: "Antarctic Act" },
];

export default function AtlasPage() {
  const { t } = useLanguage();
  const [year, setYear] = useState(MAX_YEAR);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<Station | null>(null);

  const visibleStations = useMemo(
    () => stations.filter((s) => s.established <= year),
    [year]
  );

  const visibleExpeditions = useMemo(
    () => expeditions.filter((e) => e.startYear <= year),
    [year]
  );

  const handleSelect = useCallback((station: Station) => setSelected(station), []);
  const handleYearChange = useCallback((next: number) => setYear(next), []);

  return (
    <div className="aurora-wash min-h-screen">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-14 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] uppercase tracking-[0.24em] text-frost/60">
            {t("section_timeline")}
          </div>
          <h1 className="heading-serif mt-4 text-5xl lg:text-6xl font-semibold text-ice">
            {t("atlas_title")}
          </h1>
          <p className="mt-4 text-ice/55 max-w-2xl">{t("atlas_subtitle")}</p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-16 space-y-6">
        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative h-[540px] lg:h-[620px] rounded-2xl overflow-hidden border border-white/10"
        >
          <MapView
            stations={visibleStations}
            selectedId={selected?.id ?? null}
            onSelect={handleSelect}
            year={year}
          />

          {/* floating counters */}
          <div className="absolute top-5 left-5 z-[500] flex gap-3">
            {[
              { icon: Building2, value: visibleStations.length, label: "Stations" },
              { icon: Flag, value: visibleExpeditions.length, label: "Expeditions" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                  <Icon className="w-4 h-4 text-frost/70" />
                  <div>
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0.3, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl text-ice tabular-nums leading-none"
                    >
                      {item.value}
                    </motion.div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-ice/40 mt-1">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-5 left-5 z-[500] glass rounded-xl px-4 py-3 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ice/40 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" /> Legend
            </div>
            <div className="flex items-center gap-2 text-xs text-ice/70">
              <span className="w-2.5 h-2.5 rounded-full bg-amber shadow-amberGlow" /> Active station
            </div>
            <div className="flex items-center gap-2 text-xs text-ice/70">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Decommissioned
            </div>
          </div>

          <StationPanel station={selected} onClose={() => setSelected(null)} />
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TimelineSlider
            year={year}
            onChange={handleYearChange}
            min={MIN_YEAR}
            max={MAX_YEAR}
            playing={playing}
            onTogglePlay={() => setPlaying((v) => !v)}
            markers={MILESTONES}
          />
        </motion.div>

        {/* STATS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-frost/60">
              {t("section_stats")}
            </h3>
            <div className="h-52 mt-5">
              <DecadeChart upToYear={year} />
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-frost/60">
              Stations by {year}
            </h3>
            <div className="mt-5 space-y-3">
              {stations.map((station) => {
                const exists = station.established <= year;
                const closed =
                  station.decommissioned !== undefined && year >= station.decommissioned;
                return (
                  <button
                    key={station.id}
                    onClick={() => exists && setSelected(station)}
                    disabled={!exists}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                      exists
                        ? "bg-white/[0.04] hover:bg-white/[0.08] cursor-pointer"
                        : "opacity-25 cursor-default"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          !exists ? "bg-white/25" : closed ? "bg-slate-500" : "bg-amber"
                        }`}
                      />
                      <span className="text-sm text-ice/85">{station.name}</span>
                    </div>
                    <span className="text-xs text-ice/35 tabular-nums">{station.established}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
