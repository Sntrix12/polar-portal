"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Activity, Users, FlaskConical, AlertCircle } from "lucide-react";
import { MapSite, CATEGORY_META } from "@/data/mapSites";

/**
 * Rendered as a fixed drawer at page level — deliberately NOT inside the map
 * container, so it never overlaps the map or creates a nested scroll context
 * over it.
 */
export default function SitePanel({
  site,
  onClose,
}: {
  site: MapSite | null;
  onClose: () => void;
}) {
  const meta = site ? CATEGORY_META[site.category] : null;

  return (
    <AnimatePresence>
      {site && meta && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1400] bg-secondary/20 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[440px] z-[1500] bg-surface shadow-cardHover overflow-y-auto overscroll-contain"
          >
            <div className="relative h-52">
              <Image
                src={site.image}
                alt={site.name}
                fill
                sizes="(max-width: 640px) 100vw, 440px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface shadow-card grid place-items-center text-ink/80 hover:text-secondary transition-colors"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-10 -mt-8 relative">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-surface shadow-card px-3.5 py-1.5 text-[11px] font-bold"
                style={{ color: meta.color }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: meta.color }}
                />
                {meta.label}
              </span>

              <h2 className="heading-serif mt-3 text-3xl leading-tight">{site.name}</h2>
              <p className="mt-1 text-sm font-semibold text-primary-dark">{site.region}</p>

              {!site.verified && (
                <div className="mt-4 flex gap-2.5 rounded-xl bg-accent/12 px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" />
                  <p className="text-[12px] leading-relaxed text-ink">
                    <strong>Illustrative.</strong> The site type is real, but this exact position —
                    or India&apos;s presence at it — is indicative rather than verified.
                  </p>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Fact icon={MapPin} label="Coordinates">
                  {Math.abs(site.lat).toFixed(3)}°{site.lat < 0 ? "S" : "N"}
                  <br />
                  {Math.abs(site.lng).toFixed(3)}°{site.lng < 0 ? "W" : "E"}
                </Fact>

                {site.established && (
                  <Fact icon={Calendar} label="Established">
                    {site.established}
                  </Fact>
                )}

                {site.status && (
                  <Fact icon={Activity} label="Status">
                    {site.status === "decommissioned"
                      ? `Closed ${site.decommissioned ?? ""}`
                      : site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                  </Fact>
                )}

                {site.capacity && (
                  <Fact icon={Users} label="Capacity">
                    {site.capacity}
                  </Fact>
                )}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink">{site.description}</p>

              <div className="mt-6">
                <h3 className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink/75">
                  <FlaskConical className="w-3.5 h-3.5" /> Research here
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {site.research.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-wash px-3 py-1.5 text-xs font-semibold text-secondary"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Fact({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-surface-soft p-4">
      <Icon className="w-4 h-4 text-secondary" />
      <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-ink/70">{label}</div>
      <div className="mt-1 text-[13px] font-semibold text-ink leading-snug">{children}</div>
    </div>
  );
}
