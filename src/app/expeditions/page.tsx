"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Target, Award } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { expeditions } from "@/data/expeditions";

const DECADES = [
  { label: "All", min: 1981, max: 2026 },
  { label: "1980s", min: 1980, max: 1989 },
  { label: "1990s", min: 1990, max: 1999 },
  { label: "2000s", min: 2000, max: 2009 },
  { label: "2010s", min: 2010, max: 2019 },
  { label: "2020s", min: 2020, max: 2029 },
];

export default function ExpeditionsPage() {
  const { t } = useLanguage();
  const [decadeIndex, setDecadeIndex] = useState(0);

  const filtered = useMemo(() => {
    const d = DECADES[decadeIndex];
    return expeditions.filter((e) => e.startYear >= d.min && e.startYear <= d.max);
  }, [decadeIndex]);

  return (
    <div className="aurora-wash min-h-screen">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-14 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-[11px] uppercase tracking-[0.24em] text-frost/60">Archive</div>
          <h1 className="heading-serif mt-4 text-5xl lg:text-6xl font-semibold text-ice">
            {t("expeditions_title")}
          </h1>
          <p className="mt-4 text-ice/55 max-w-2xl">{t("expeditions_subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          {DECADES.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setDecadeIndex(i)}
              className={`px-4 py-2 rounded-full text-xs transition-all border ${
                decadeIndex === i
                  ? "bg-amber/15 border-amber/40 text-amber-soft"
                  : "border-white/10 text-ice/50 hover:text-ice/80 hover:border-white/20"
              }`}
            >
              {d.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-ice/40 tabular-nums">
            <span className="text-ice font-medium">{filtered.length}</span> expeditions
          </span>
        </motion.div>
      </div>

      {/* TIMELINE */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 pb-28">
        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-frost/40 via-white/10 to-transparent" />

          <div className="space-y-10">
            {filtered.map((exp, i) => {
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40, x: alignRight ? 20 : -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative pl-14 md:pl-0 md:w-1/2 ${
                    alignRight ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"
                  }`}
                >
                  {/* node */}
                  <div
                    className={`absolute top-7 w-[14px] h-[14px] rounded-full bg-amber border-[3px] border-navy-deep shadow-amberGlow left-[13px] ${
                      alignRight ? "md:-left-[7px]" : "md:left-auto md:-right-[7px]"
                    }`}
                  />

                  <div className="glass rounded-2xl overflow-hidden group hover:border-frost/25 transition-colors">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={exp.image}
                        alt={exp.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={i < 2}
                        className="object-cover opacity-60 transition-all duration-700 group-hover:opacity-80 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6">
                        <div className={`flex items-baseline gap-3 flex-wrap ${alignRight ? "" : "md:justify-end"}`}>
                          <span className="heading-serif text-4xl text-ice">{exp.number}</span>
                          <span className="text-sm text-amber tabular-nums">{exp.yearsLabel}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 space-y-3 ${alignRight ? "" : "md:text-right"}`}>
                      <h3 className="text-sm text-ice/85 leading-snug">{exp.label}</h3>

                      <div className={`flex items-center gap-2 text-xs text-ice/45 ${alignRight ? "" : "md:justify-end"}`}>
                        <User className="w-3.5 h-3.5 shrink-0" />
                        {exp.leader}
                      </div>

                      <div className={`flex items-center gap-2 text-xs text-frost/70 ${alignRight ? "" : "md:justify-end"}`}>
                        <Target className="w-3.5 h-3.5 shrink-0" />
                        {exp.focusArea}
                      </div>

                      <div className={`flex gap-2 text-xs text-ice/55 leading-relaxed pt-2 border-t border-white/8 ${alignRight ? "" : "md:flex-row-reverse md:text-right"}`}>
                        <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber/60" />
                        <p>{exp.achievement}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
