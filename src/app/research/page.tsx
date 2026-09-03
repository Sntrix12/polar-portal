"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, MapPin, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { publications } from "@/data/publications";
import { stations } from "@/data/stations";
import type { Publication, ResearchArea } from "@/lib/types";

const AREAS: ResearchArea[] = [
  "Glaciology",
  "Atmospheric Science",
  "Marine Biology",
  "Geology",
  "Oceanography",
];

const YEAR_RANGES = [
  { label: "All years", min: 0, max: 9999 },
  { label: "2020-2026", min: 2020, max: 2026 },
  { label: "2015-2019", min: 2015, max: 2019 },
  { label: "Before 2015", min: 0, max: 2014 },
];

const stationName = (id: string | null) =>
  id ? stations.find((s) => s.id === id)?.name ?? "—" : "Multiple / field";

export default function ResearchPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeAreas, setActiveAreas] = useState<ResearchArea[]>([]);
  const [rangeIndex, setRangeIndex] = useState(0);
  const [selected, setSelected] = useState<Publication | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const range = YEAR_RANGES[rangeIndex];
    return publications.filter((pub) => {
      const matchesQuery =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.abstract.toLowerCase().includes(q) ||
        pub.authors.join(" ").toLowerCase().includes(q) ||
        pub.area.toLowerCase().includes(q);
      const matchesArea = activeAreas.length === 0 || activeAreas.includes(pub.area);
      const matchesYear = pub.year >= range.min && pub.year <= range.max;
      return matchesQuery && matchesArea && matchesYear;
    });
  }, [query, activeAreas, rangeIndex]);

  const toggleArea = (area: ResearchArea) =>
    setActiveAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );

  return (
    <div className="aurora-wash min-h-screen">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-14 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-[11px] uppercase tracking-[0.24em] text-frost/60">Repository</div>
          <h1 className="heading-serif mt-4 text-5xl lg:text-6xl font-semibold text-ice">
            {t("research_title")}
          </h1>
          <p className="mt-4 text-ice/55 max-w-2xl">{t("research_subtitle")}</p>
        </motion.div>

        {/* CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 space-y-5"
        >
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ice/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("research_search_placeholder")}
              className="w-full glass rounded-full pl-14 pr-12 py-4 text-sm text-ice placeholder:text-ice/30 outline-none focus:border-frost/40 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-ice/35 hover:text-ice"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {AREAS.map((area) => {
              const active = activeAreas.includes(area);
              return (
                <button
                  key={area}
                  onClick={() => toggleArea(area)}
                  className={`px-4 py-2 rounded-full text-xs transition-all border ${
                    active
                      ? "bg-frost/15 border-frost/40 text-ice"
                      : "border-white/10 text-ice/50 hover:text-ice/80 hover:border-white/20"
                  }`}
                >
                  {area}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {YEAR_RANGES.map((range, i) => (
              <button
                key={range.label}
                onClick={() => setRangeIndex(i)}
                className={`px-4 py-2 rounded-full text-xs transition-all border ${
                  rangeIndex === i
                    ? "bg-amber/15 border-amber/40 text-amber-soft"
                    : "border-white/10 text-ice/50 hover:text-ice/80 hover:border-white/20"
                }`}
              >
                {range.label}
              </button>
            ))}

            <div className="ml-auto text-sm text-ice/45 tabular-nums">
              <motion.span
                key={filtered.length}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                className="text-ice font-medium"
              >
                {filtered.length}
              </motion.span>{" "}
              {t("research_results")}
            </div>
          </div>
        </motion.div>
      </div>

      {/* GRID */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((pub, i) => (
              <motion.button
                key={pub.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(pub)}
                className="glass rounded-2xl p-6 text-left group hover:border-frost/25 transition-colors"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-frost/10 border border-frost/20 text-[10px] uppercase tracking-wider text-frost/80">
                    {pub.area}
                  </span>
                  {pub.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber/70">
                      <BadgeCheck className="w-3 h-3" /> NCPOR
                    </span>
                  )}
                  <span className="ml-auto text-sm text-ice/40 tabular-nums">{pub.year}</span>
                </div>

                <h3 className="mt-4 text-[15px] leading-snug text-ice/90 group-hover:text-ice transition-colors line-clamp-3">
                  {pub.title}
                </h3>

                <p className="mt-3 text-xs text-ice/40 line-clamp-1">{pub.authors.join(", ")}</p>

                <p className="mt-4 text-xs text-ice/45 leading-relaxed line-clamp-3">{pub.abstract}</p>

                <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-2 text-[11px] text-ice/35">
                  <MapPin className="w-3 h-3" />
                  {stationName(pub.stationId)}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <FileText className="w-8 h-8 text-ice/20 mx-auto" />
            <p className="mt-4 text-ice/40 text-sm">No publications match these filters.</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[2000] bg-navy-deep/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl bg-navy border border-white/12 p-8 lg:p-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center text-ice/60 hover:text-ice"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 flex-wrap pr-12">
                <span className="px-3 py-1 rounded-full bg-frost/10 border border-frost/20 text-[10px] uppercase tracking-wider text-frost/80">
                  {selected.area}
                </span>
                <span className="text-sm text-ice/40 tabular-nums">{selected.year}</span>
                {selected.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber/70">
                    <BadgeCheck className="w-3.5 h-3.5" /> Verified NCPOR publication
                  </span>
                )}
              </div>

              <h2 className="heading-serif mt-6 text-2xl lg:text-3xl leading-snug text-ice">
                {selected.title}
              </h2>

              <p className="mt-4 text-sm text-ice/55">{selected.authors.join(", ")}</p>

              <div className="mt-8">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-frost/60">Abstract</h3>
                <p className="mt-3 text-sm text-ice/65 leading-relaxed">{selected.abstract}</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-ice/40">Station</div>
                  <div className="mt-1.5 text-sm text-ice/85">{stationName(selected.stationId)}</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-ice/40">Research area</div>
                  <div className="mt-1.5 text-sm text-ice/85">{selected.area}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
