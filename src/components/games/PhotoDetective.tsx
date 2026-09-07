"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Microscope,
  Award,
  RotateCcw,
  ChevronRight,
  Flame,
  Search,
  SkipForward,
} from "lucide-react";
import { PHOTO_ROUNDS, PHOTO_BADGE_TIERS, Hotspot } from "@/data/photoRounds";

/** Set true while adjusting hotspot boxes in src/data/photoRounds.ts. */
const debugOutlines = false;

export default function PhotoDetective({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const [openSpot, setOpenSpot] = useState<Hotspot | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [featuresFound, setFeaturesFound] = useState(0);
  const [done, setDone] = useState(false);

  const round = PHOTO_ROUNDS[index];
  const isLast = index === PHOTO_ROUNDS.length - 1;

  const allFound =
    round.kind === "hotspot" && found.length === round.hotspots.length;

  const answerChoice = (i: number) => {
    if (round.kind !== "choice" || picked !== null) return;
    setPicked(i);
    if (i === round.answer) {
      const nextStreak = streak + 1;
      const bonus = nextStreak >= 3 ? 50 : nextStreak >= 2 ? 25 : 0;
      setScore((s) => s + 100 + bonus);
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setCorrectCount((c) => c + 1);
    } else {
      setStreak(0);
    }
  };

  const clickSpot = (spot: Hotspot) => {
    setOpenSpot(spot);
    if (found.includes(spot.id)) return;
    setFound((f) => [...f, spot.id]);
    setFeaturesFound((n) => n + 1);
    setScore((s) => s + 60);
  };

  const next = () => {
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setFound([]);
    setOpenSpot(null);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setFound([]);
    setOpenSpot(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setFeaturesFound(0);
    setDone(false);
  };

  const tier = useMemo(
    () => PHOTO_BADGE_TIERS.find((t) => score >= t.min) ?? PHOTO_BADGE_TIERS[PHOTO_BADGE_TIERS.length - 1],
    [score]
  );

  /* ---------------- results ---------------- */
  if (done) {
    return (
      <div>
        <BackBar onExit={onExit} />
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="card mx-auto max-w-xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-primary to-secondary p-8 text-center text-white">
            <Award className="w-12 h-12 mx-auto" />
            <h3 className="heading-serif mt-3 text-3xl text-white">{tier.title}</h3>
            <div className="mt-4 text-5xl font-bold tabular-nums">{score}</div>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Correct IDs", value: correctCount },
                { label: "Features found", value: featuresFound },
                { label: "Best streak", value: bestStreak },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-surface-soft p-4 text-center">
                  <div className="text-2xl font-bold text-secondary tabular-nums">{s.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-ink/85">{tier.note}</p>
            <button
              onClick={restart}
              className="mt-6 w-full rounded-2xl bg-accent py-4 font-bold text-ink shadow-accentGlow inline-flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
            >
              <RotateCcw className="w-5 h-5" /> Play again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ---------------- round ---------------- */
  return (
    <div>
      <BackBar onExit={onExit} />

      {/* HUD */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="rounded-2xl bg-surface shadow-card px-4 py-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink/70">Score </span>
          <span className="text-sm font-bold text-secondary tabular-nums">{score}</span>
        </div>
        {streak >= 2 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl bg-accent px-4 py-2.5 inline-flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 text-ink" />
            <span className="text-sm font-bold text-ink">{streak} streak</span>
          </motion.div>
        )}
        <div className="ml-auto rounded-2xl bg-wash px-4 py-2.5 text-sm font-bold text-secondary tabular-nums">
          Round {index + 1} / {PHOTO_ROUNDS.length}
        </div>
      </div>

      <div className="h-2 rounded-full bg-line overflow-hidden mb-5">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={false}
          animate={{
            width: `${((index + (picked !== null || allFound ? 1 : 0)) / PHOTO_ROUNDS.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28 }}
          className="grid lg:grid-cols-[1.6fr_1fr] gap-5"
        >
          {/* PHOTO */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[3/2] bg-surface-soft">
              <Image
                src={round.image}
                alt={round.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority={index === 0}
              />

              {/* hotspot regions */}
              {round.kind === "hotspot" &&
                round.hotspots.map((spot) => {
                  const isFound = found.includes(spot.id);
                  return (
                    <button
                      key={spot.id}
                      onClick={() => clickSpot(spot)}
                      aria-label={isFound ? spot.label : "Unidentified feature"}
                      className="absolute group"
                      style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        width: `${spot.w}%`,
                        height: `${spot.h}%`,
                      }}
                    >
                      <span
                        className={`absolute inset-0 rounded-xl transition-all ${
                          isFound
                            ? "ring-4 ring-mint bg-mint/15"
                            : debugOutlines
                            ? "ring-2 ring-highlight/70 bg-highlight/10"
                            : "group-hover:ring-4 group-hover:ring-white/80 group-hover:bg-white/15"
                        }`}
                      />
                      {isFound && (
                        <motion.span
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-surface px-3 py-1 text-[11px] font-bold text-secondary shadow-card"
                        >
                          {spot.label}
                        </motion.span>
                      )}
                    </button>
                  );
                })}

              {round.kind === "hotspot" && (
                <div className="absolute top-4 left-4 rounded-full bg-surface/95 px-4 py-2 text-xs font-bold text-secondary shadow-card">
                  {found.length} of {round.hotspots.length} features found
                </div>
              )}
            </div>

            {round.kind === "hotspot" && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {round.hotspots.map((s) => (
                  <span
                    key={s.id}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
                      found.includes(s.id)
                        ? "bg-mint/15 text-ink"
                        : "bg-surface-soft text-ink/50"
                    }`}
                  >
                    {found.includes(s.id) ? s.label : "???"}
                  </span>
                ))}
                {!allFound && (
                  <button
                    onClick={next}
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-ink/70 hover:text-secondary transition-colors"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> Skip round
                  </button>
                )}
              </div>
            )}
          </div>

          {/* PANEL */}
          <div className="space-y-4">
            {round.kind === "choice" ? (
              <div className="card p-6">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-secondary">
                  <Microscope className="w-3.5 h-3.5" /> Identify
                </div>
                <h3 className="heading-serif mt-2.5 text-2xl leading-snug">{round.question}</h3>

                <div className="mt-5 space-y-2.5">
                  {round.options.map((opt, i) => {
                    const isAnswer = i === round.answer;
                    const isPicked = picked === i;
                    const reveal = picked !== null;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => answerChoice(i)}
                        disabled={reveal}
                        whileHover={!reveal ? { x: 3 } : {}}
                        animate={reveal && isPicked && !isAnswer ? { x: [0, -7, 7, -4, 4, 0] } : {}}
                        className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors ${
                          reveal && isAnswer
                            ? "border-mint bg-mint/15 text-ink"
                            : reveal && isPicked
                            ? "border-accent bg-accent/15 text-ink"
                            : reveal
                            ? "border-line text-ink/55"
                            : "border-line text-ink hover:border-primary hover:bg-wash/60"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="card p-6">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-secondary">
                  <Search className="w-3.5 h-3.5" /> Spot the features
                </div>
                <p className="mt-2.5 text-[15px] font-semibold leading-snug text-ink">
                  {round.prompt}
                </p>
                <p className="mt-2 text-xs text-ink/75">
                  Click on the photograph where you think each feature is.
                </p>

                <AnimatePresence mode="wait">
                  {openSpot && (
                    <motion.div
                      key={openSpot.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-4 rounded-xl bg-wash p-4"
                    >
                      <h4 className="text-sm font-bold text-secondary">{openSpot.label}</h4>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{openSpot.info}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* science card */}
            <AnimatePresence>
              {round.kind === "choice" && picked !== null && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="card p-6"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1 text-[11px] font-bold text-ink">
                    {picked === round.answer ? "Correct" : "Not quite"} · Science card
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink">{round.science}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* advance */}
            {((round.kind === "choice" && picked !== null) || allFound) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={next}
                className="w-full rounded-2xl bg-secondary py-4 font-bold text-white inline-flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
              >
                {isLast ? "See results" : "Next photograph"}
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function BackBar({ onExit }: { onExit: () => void }) {
  return (
    <button
      onClick={onExit}
      className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-secondary transition-colors"
    >
      <ArrowLeft className="w-4 h-4" /> Back to games
    </button>
  );
}
