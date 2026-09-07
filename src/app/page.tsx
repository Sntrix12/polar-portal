"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Map, BookOpen, Compass, GraduationCap, ScrollText } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/components/LanguageProvider";
import { stations } from "@/data/stations";
import { expeditions } from "@/data/expeditions";
import { publications } from "@/data/publications";
import type { TranslationKey } from "@/data/translations";

const MODULES: {
  href: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: typeof Map;
  image: string;
}[] = [
  {
    href: "/atlas",
    titleKey: "preview_atlas_title",
    descKey: "preview_atlas_desc",
    icon: Map,
    image: "/images/iceberg-satellite.jpg",
  },
  {
    href: "/research",
    titleKey: "preview_research_title",
    descKey: "preview_research_desc",
    icon: BookOpen,
    image: "/images/glacier-iceberg.jpg",
  },
  {
    href: "/expeditions",
    titleKey: "preview_expeditions_title",
    descKey: "preview_expeditions_desc",
    icon: Compass,
    image: "/images/second-expedition-team.jpg",
  },
  {
    href: "/learn",
    titleKey: "preview_learn_title",
    descKey: "preview_learn_desc",
    icon: GraduationCap,
    image: "/images/aurora-polar-sky.jpg",
  },
];

export default function LandingPage() {
  const { t } = useLanguage();
  const activeStations = stations.filter((s) => s.status === "active").length;

  return (
    <div className="aurora-wash">
      {/* HERO — text beside the photograph, so the image keeps its full colour
          instead of sitting under a scrim (a light-site pattern, per BAS/AAD). */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-16 pb-20">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-surface shadow-card px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              National Centre for Polar and Ocean Research
            </div>

            <h1 className="heading-serif mt-7 text-5xl lg:text-7xl font-semibold leading-[1.02]">
              {t("hero_title")}
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-ink/90 max-w-xl leading-relaxed">
              {t("hero_subtitle")}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/atlas"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-ink font-bold text-sm shadow-accentGlow transition-transform hover:scale-[1.03]"
              >
                {t("hero_cta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-3 rounded-full bg-surface shadow-card px-8 py-4 text-secondary font-semibold text-sm hover:shadow-cardHover transition-shadow"
              >
                {t("nav_research")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-[340px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-cardHover">
              <Image
                src="/images/antarctic-landscape-2.jpg"
                alt="Antarctic landscape"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-surface rounded-2xl shadow-cardHover px-6 py-4 flex items-center gap-4">
              <div>
                <div className="text-2xl font-bold text-secondary tabular-nums leading-none">4</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/75">
                  Stations
                </div>
              </div>
              <div className="w-px h-9 bg-line" />
              <div>
                <div className="text-2xl font-bold text-secondary tabular-nums leading-none">2</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/75">Poles</div>
              </div>
              <div className="w-px h-9 bg-line" />
              <div>
                <div className="text-2xl font-bold text-secondary tabular-nums leading-none">45+</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/75">Years</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="relative border-y border-line bg-surface/40 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-20 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <AnimatedCounter value={expeditions.length} label={t("stat_expeditions")} delay={0} />
          <AnimatedCounter value={45} label={t("stat_years")} suffix="+" delay={0.12} />
          <AnimatedCounter value={activeStations} label={t("stat_stations")} delay={0.24} />
          <AnimatedCounter value={publications.length} label={t("stat_publications")} suffix="+" delay={0.36} />
        </div>
      </section>

      {/* STATIONS STRIP */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[11px] uppercase tracking-[0.24em] text-secondary">
            {t("section_stations")}
          </div>
          <h2 className="heading-serif mt-4 text-4xl lg:text-5xl font-semibold max-w-2xl">
            Four outposts, two poles
          </h2>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stations.map((station, i) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden glass"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={station.image}
                  alt={station.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-page via-page/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium ${
                      station.status === "active"
                        ? "bg-accent/90 text-ink"
                        : "bg-slate-100 text-ink/80"
                    }`}
                  >
                    {station.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="heading-serif text-2xl">{station.name}</h3>
                  <span className="text-primary text-sm tabular-nums">{station.established}</span>
                </div>
                <p className="mt-2 text-xs text-ink/65 uppercase tracking-wider">{station.region}</p>
                <p className="mt-4 text-sm text-ink/75 leading-relaxed line-clamp-3">
                  {station.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODULE PREVIEWS */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-28">
        <div className="grid md:grid-cols-2 gap-6">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <Link
                  href={mod.href}
                  className="group card overflow-hidden flex flex-col h-full hover:shadow-cardHover transition-shadow"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={mod.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-surface/95 shadow-card grid place-items-center">
                      <Icon className="w-5 h-5 text-secondary" />
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="heading-serif text-2xl lg:text-3xl">{t(mod.titleKey)}</h3>
                    <p className="mt-3 text-sm text-ink/85 max-w-md leading-relaxed">
                      {t(mod.descKey)}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-secondary text-sm font-bold">
                      Open
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ACT BANNER */}
      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-10 lg:p-14 flex flex-col lg:flex-row gap-10 lg:items-center"
        >
          <ScrollText className="w-12 h-12 text-accent-ink shrink-0" />
          <div>
            <h3 className="heading-serif text-3xl">The Indian Antarctic Act, 2022</h3>
            <p className="mt-4 text-ink/75 leading-relaxed max-w-4xl">
              Act No. 13 of 2022 gives domestic legal effect to India&apos;s obligations under the Antarctic
              Treaty, CCAMLR and the Environmental Protocol. It requires a permit for every Indian
              expedition, station, vessel and aircraft in Antarctica, and prohibits mining, nuclear
              explosions and harmful waste disposal on the continent.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
