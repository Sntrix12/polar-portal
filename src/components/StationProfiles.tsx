"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Activity, Users, Star } from "lucide-react";
import { MAP_SITES } from "@/data/mapSites";

interface Profile {
  id: string;
  location: string;
  significance: string;
  pillTone: string;
}

/** Editorial detail that only belongs in the long-form profiles. */
const PROFILE_COPY: Record<string, Profile> = {
  maitri: {
    id: "maitri",
    location: "Schirmacher Oasis, Queen Maud Land",
    significance:
      "Maitri carried India's Antarctic programme for more than three decades after Dakshin Gangotri was lost to the ice. Building on bare rock rather than snow was the lesson learned from that failure, and it is why Maitri is still standing and staffed today.",
    pillTone: "bg-wash text-secondary",
  },
  bharati: {
    id: "bharati",
    location: "Grovnes peninsula, Larsemann Hills",
    significance:
      "Bharati gave India a second, geographically separate Antarctic foothold — roughly 65° of longitude east of Maitri. That spread matters scientifically: two stations on opposite sides of the continent's Indian Ocean sector sample very different ice, ocean and geology.",
    pillTone: "bg-primary/10 text-secondary",
  },
  himadri: {
    id: "himadri",
    location: "Ny-Ålesund, Svalbard, Norway",
    significance:
      "Himadri made India a two-pole research nation in 2008. Working in the Arctic lets Indian scientists compare both polar regions directly — important because the Arctic is warming far faster than the global average and its changes reach the monsoon.",
    pillTone: "bg-teal-500/10 text-teal-700",
  },
  "dakshin-gangotri": {
    id: "dakshin-gangotri",
    location: "Princess Astrid Coast, Queen Maud Land",
    significance:
      "India's first Antarctic station, and now buried beneath the ice sheet. Built on the shelf ice itself, it was slowly entombed by accumulating snow until it had to be abandoned in 1990. It survives as a supply depot and transit camp — and as the reason every later Indian station was founded on exposed rock.",
    pillTone: "bg-slate-100 text-ink",
  },
};

const ORDER = ["maitri", "bharati", "himadri", "dakshin-gangotri"];

export default function StationProfiles() {
  const stations = ORDER.map((id) => MAP_SITES.find((s) => s.id === id)!).filter(Boolean);

  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[11px] uppercase tracking-[0.24em] text-secondary font-semibold">
          Stations
        </div>
        <h2 className="heading-serif mt-4 text-4xl lg:text-5xl font-semibold">
          India&apos;s Polar Research Stations
        </h2>
        <p className="mt-4 text-lg text-ink/85 max-w-2xl">
          Four outposts across two poles — three still working, one lost to the ice.
        </p>
      </motion.div>

      <div className="mt-14 space-y-10">
        {stations.map((station, i) => {
          const copy = PROFILE_COPY[station.id];
          const imageRight = i % 2 === 1;
          const closed = station.status === "decommissioned";

          return (
            <motion.article
              key={station.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="card overflow-hidden"
            >
              <div
                className={`grid lg:grid-cols-2 gap-0 ${
                  imageRight ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* PHOTO */}
                <div className="relative h-64 lg:h-auto lg:min-h-[420px]">
                  <Image
                    src={station.image}
                    alt={station.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover ${closed ? "grayscale-[35%]" : ""}`}
                  />
                  <span
                    className={`absolute top-5 left-5 rounded-full px-3.5 py-1.5 text-[11px] font-bold shadow-card ${
                      closed ? "bg-surface text-ink" : "bg-accent text-ink"
                    }`}
                  >
                    {closed ? "Decommissioned 1990" : "Operational"}
                  </span>
                </div>

                {/* DETAIL */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="heading-serif text-3xl lg:text-4xl">{station.name}</h3>
                    <span className="rounded-full bg-wash px-3 py-1 text-[11px] font-bold text-secondary">
                      {station.region}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-primary-dark">{copy.location}</p>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Stat icon={Calendar} label="Established">
                      {station.established}
                    </Stat>
                    <Stat icon={Activity} label="Status">
                      {closed ? "Closed" : "Active"}
                    </Stat>
                    <Stat icon={MapPin} label="Coordinates">
                      {Math.abs(station.lat).toFixed(2)}°{station.lat < 0 ? "S" : "N"},{" "}
                      {Math.abs(station.lng).toFixed(2)}°{station.lng < 0 ? "W" : "E"}
                    </Stat>
                    <Stat icon={Users} label="Capacity">
                      {station.capacity?.replace(/^~/, "") ?? "—"}
                    </Stat>
                  </div>

                  <p className="mt-6 text-[15px] leading-relaxed text-ink">{station.description}</p>

                  <div className="mt-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink/75">
                      Research conducted here
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {station.research.map((r) => (
                        <span
                          key={r}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${copy.pillTone}`}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 flex gap-3 rounded-2xl bg-surface-soft p-5">
                    <Star className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" />
                    <p className="text-[14px] leading-relaxed text-ink">{copy.significance}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Icon className="w-4 h-4 text-secondary" />
      <div className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-ink/70">{label}</div>
      <div className="mt-0.5 text-[13px] font-bold text-ink leading-snug">{children}</div>
    </div>
  );
}
