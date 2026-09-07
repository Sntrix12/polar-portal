"use client";

import { useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MousePointerClick, Layers } from "lucide-react";
import SitePanel from "@/components/SitePanel";
import StationProfiles from "@/components/StationProfiles";
import { useLanguage } from "@/components/LanguageProvider";
import { MAP_SITES, CATEGORY_META, SiteCategory, MapSite } from "@/data/mapSites";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center bg-surface-soft text-sm text-ink/70">
      Loading map…
    </div>
  ),
});

const CATEGORIES = Object.keys(CATEGORY_META) as SiteCategory[];

export default function AtlasPage() {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState<SiteCategory[]>([]);
  const [selected, setSelected] = useState<MapSite | null>(null);

  const visible = useMemo(
    () => MAP_SITES.filter((s) => !hidden.includes(s.category)),
    [hidden]
  );

  const toggle = useCallback((cat: SiteCategory) => {
    setHidden((h) => (h.includes(cat) ? h.filter((c) => c !== cat) : [...h, cat]));
  }, []);

  const handleSelect = useCallback((site: MapSite) => setSelected(site), []);

  return (
    <div className="aurora-wash min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-14 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] uppercase tracking-[0.24em] text-secondary font-semibold">
            Atlas
          </div>
          <h1 className="heading-serif mt-4 text-5xl lg:text-6xl font-semibold">
            {t("atlas_title")}
          </h1>
          <p className="mt-4 text-lg text-ink/85 max-w-2xl">
            {MAP_SITES.length} stations, field camps, ocean sites and route waypoints across
            India&apos;s polar programme. Click any marker for detail.
          </p>
        </motion.div>
      </div>

      {/* MAP + LEGEND — the map has a fixed height and nothing is layered on top
          of it, so the page keeps a single scroll context. */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="grid lg:grid-cols-[1fr_260px] gap-5"
        >
          <div>
            <div className="h-[70vh] min-h-[420px] rounded-2xl overflow-hidden shadow-card">
              <MapView sites={visible} selectedId={selected?.id ?? null} onSelect={handleSelect} />
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-ink/75">
              <MousePointerClick className="w-3.5 h-3.5 text-secondary" />
              Use the + / − buttons to zoom. The mouse wheel scrolls the page.
            </p>
          </div>

          {/* LEGEND */}
          <div className="card p-5 self-start">
            <h2 className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink/75">
              <Layers className="w-3.5 h-3.5" /> Legend
            </h2>
            <p className="mt-2 text-xs text-ink/75">Tap a category to show or hide it.</p>

            <div className="mt-4 space-y-2">
              {CATEGORIES.map((cat) => {
                const meta = CATEGORY_META[cat];
                const off = hidden.includes(cat);
                const count = MAP_SITES.filter((s) => s.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => toggle(cat)}
                    aria-pressed={!off}
                    className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all ${
                      off ? "bg-surface-soft opacity-55" : "bg-surface-soft hover:bg-wash"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{
                        background: off ? "transparent" : meta.color,
                        border: `2px solid ${meta.color}`,
                      }}
                    />
                    <span className="flex-1 text-[13px] font-semibold text-ink leading-tight">
                      {meta.label}
                    </span>
                    <span className="text-xs font-bold text-ink/70 tabular-nums">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-line space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-ink/85">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: "#FFFFFF", border: "3px dashed #F59E0B" }}
                />
                Decommissioned station
              </div>
              <div className="text-[11px] text-ink/70 leading-relaxed">
                Showing <strong className="text-ink">{visible.length}</strong> of{" "}
                {MAP_SITES.length} sites.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* STATION PROFILES */}
      <StationProfiles />

      {/* Drawer lives at page level so it never overlaps the map. */}
      <SitePanel site={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
