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
      {/* HERO */}
      <section className="relative h-[calc(100vh-72px)] min-h-[620px] flex items-center overflow-hidden">
        <Image
          src="/images/antarctic-landscape-2.jpg"
          alt="Antarctic landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/40 to-transparent" />

        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-frost/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber shadow-amberGlow" />
              National Centre for Polar and Ocean Research
            </div>

            <h1 className="heading-serif mt-8 text-6xl lg:text-8xl font-semibold leading-[0.95] text-ice">
              {t("hero_title")}
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-ice/65 max-w-2xl leading-relaxed">
              {t("hero_subtitle")}
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/atlas"
                className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-navy-deep font-semibold text-sm shadow-amberGlow transition-transform hover:scale-[1.03]"
              >
                {t("hero_cta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-3 rounded-full glass px-8 py-4 text-ice/80 text-sm hover:text-ice transition-colors"
              >
                {t("nav_research")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="relative border-y border-white/8 bg-navy/40 backdrop-blur-sm">
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
          <div className="text-[11px] uppercase tracking-[0.24em] text-frost/60">
            {t("section_stations")}
          </div>
          <h2 className="heading-serif mt-4 text-4xl lg:text-5xl font-semibold text-ice max-w-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium ${
                      station.status === "active"
                        ? "bg-amber/90 text-navy-deep"
                        : "bg-white/12 text-ice/60"
                    }`}
                  >
                    {station.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="heading-serif text-2xl text-ice">{station.name}</h3>
                  <span className="text-frost text-sm tabular-nums">{station.established}</span>
                </div>
                <p className="mt-2 text-xs text-ice/40 uppercase tracking-wider">{station.region}</p>
                <p className="mt-4 text-sm text-ice/55 leading-relaxed line-clamp-3">
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
                  className="group relative block h-72 rounded-2xl overflow-hidden glass"
                >
                  <Image
                    src={mod.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-40 transition-all duration-700 group-hover:opacity-60 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep via-navy-deep/80 to-transparent" />
                  <div className="relative h-full p-10 flex flex-col justify-end">
                    <Icon className="w-8 h-8 text-frost mb-5" />
                    <h3 className="heading-serif text-3xl text-ice">{t(mod.titleKey)}</h3>
                    <p className="mt-3 text-sm text-ice/55 max-w-md leading-relaxed">
                      {t(mod.descKey)}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-amber text-sm font-medium">
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
          <ScrollText className="w-12 h-12 text-amber shrink-0" />
          <div>
            <h3 className="heading-serif text-3xl text-ice">The Indian Antarctic Act, 2022</h3>
            <p className="mt-4 text-ice/55 leading-relaxed max-w-4xl">
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
