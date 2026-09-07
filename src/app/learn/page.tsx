"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Compass, Camera, Zap, Play, Download, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { TEACHER_RESOURCES } from "@/data/learnGames";
import PolarDash from "@/components/games/PolarDash";
import TreasureHunt from "@/components/games/TreasureHunt";
import PhotoDetective from "@/components/games/PhotoDetective";
import QuizBattle from "@/components/games/QuizBattle";

type GameId = "dash" | "hunt" | "photo" | "quiz" | null;

const GAMES = [
  {
    id: "dash" as const,
    ages: "Classes 6–8",
    title: "Polar Dash",
    tagline: "Run the ice as a polar bear or a penguin",
    detail:
      "An endless run across the sea ice. Jump crevasses, duck the wildlife, collect ice-core samples — with a real polar fact every 500 metres.",
    icon: Gamepad2,
    art: ["🐧", "🐻‍❄️"],
    from: "from-primary/15",
    dot: "bg-primary",
  },
  {
    id: "hunt" as const,
    ages: "Classes 6–8",
    title: "Polar Treasure Hunt",
    tagline: "Explore the archive, then race the clues",
    detail:
      "Browse all 27 research sites and what each archive holds, then take on eight clues and find the right marker on the map before the timer runs out.",
    icon: Compass,
    art: ["🗺️", "🧭"],
    from: "from-accent/20",
    dot: "bg-accent",
  },
  {
    id: "photo" as const,
    ages: "Classes 9–10",
    title: "Polar Photo Detective",
    tagline: "Read a polar scene like a scientist",
    detail:
      "Eight real photographs. Identify what you are looking at, and in the hotspot rounds click the features hidden in the scene — each one opens a science card.",
    icon: Camera,
    art: ["📷", "🧊"],
    from: "from-mint/20",
    dot: "bg-mint",
  },
  {
    id: "quiz" as const,
    ages: "Classes 11–12",
    title: "Polar Science Quiz Battle",
    tagline: "15 questions, 15 seconds, 3 lives",
    detail:
      "Fast-paced questions on polar science, the Antarctic Treaty and India's programme. Build a streak for a 5x multiplier — and lose a life if the clock beats you.",
    icon: Zap,
    art: ["⚡", "🏆"],
    from: "from-secondary/15",
    dot: "bg-secondary",
  },
];

export default function LearnPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<GameId>(null);

  const exit = () => setActive(null);

  return (
    <div className="aurora-wash min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-14 pb-20">
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.div
              key="hub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {/* HERO */}
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-surface shadow-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary">
                  <Sparkles className="w-4 h-4 text-accent-ink" /> Schools Outreach
                </span>
                <h1 className="heading-serif mt-6 text-5xl lg:text-6xl font-semibold leading-[1.05]">
                  {t("learn_title")}
                </h1>
                <p className="mt-5 text-lg text-ink/85 leading-relaxed">
                  Four games built on real research from India&apos;s National Centre for Polar and
                  Ocean Research. Pick your class group and start exploring.
                </p>
              </div>

              {/* GAME CARDS */}
              <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {GAMES.map((game, i) => {
                  const Icon = game.icon;
                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="card overflow-hidden flex flex-col hover:shadow-cardHover transition-shadow"
                    >
                      <div
                        className={`relative h-40 bg-gradient-to-br ${game.from} to-surface grid place-items-center`}
                      >
                        <div className="flex items-center gap-3">
                          {game.art.map((a) => (
                            <span key={a} className="text-5xl animate-bobble">
                              {a}
                            </span>
                          ))}
                        </div>
                        <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 text-[11px] font-bold text-secondary shadow-card">
                          <span className={`w-2 h-2 rounded-full ${game.dot}`} />
                          {game.ages}
                        </span>
                      </div>

                      <div className="p-7 flex flex-col flex-1">
                        <Icon className="w-6 h-6 text-secondary" />
                        <h2 className="heading-serif mt-4 text-2xl">{game.title}</h2>
                        <p className="mt-1 text-sm font-semibold text-primary-dark">
                          {game.tagline}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-ink/85 flex-1">
                          {game.detail}
                        </p>

                        <button
                          onClick={() => setActive(game.id)}
                          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-ink shadow-accentGlow hover:scale-[1.03] transition-transform"
                        >
                          <Play className="w-4 h-4" /> Play
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* TEACHER RESOURCES */}
              <div className="mt-20">
                <h2 className="heading-serif text-3xl">Teacher resources</h2>
                <p className="mt-2 text-ink/85">
                  Everything you need to run these games in a 40-minute period.
                </p>

                <div className="mt-7 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {TEACHER_RESOURCES.map((res, i) => (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                      className="card p-6 flex flex-col"
                    >
                      <div className="w-10 h-10 rounded-xl bg-wash grid place-items-center">
                        <Download className="w-5 h-5 text-secondary" />
                      </div>
                      <h3 className="mt-4 font-bold text-secondary leading-snug">{res.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/85 flex-1">
                        {res.detail}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-ink/70">{res.meta}</span>
                        <button className="rounded-full bg-surface-soft px-4 py-2 text-xs font-bold text-secondary hover:bg-wash transition-colors">
                          Download
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {active === "dash" && <PolarDash onExit={exit} />}
              {active === "hunt" && <TreasureHunt onExit={exit} />}
              {active === "photo" && <PhotoDetective onExit={exit} />}
              {active === "quiz" && <QuizBattle onExit={exit} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
