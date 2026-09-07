"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Zap,
  Trophy,
  RotateCcw,
  Target,
  Flame,
  Play,
  ChevronRight,
} from "lucide-react";
import {
  QUIZ_BANK,
  SEED_LEADERBOARD,
  QUIZ_TIERS,
  QUESTIONS_PER_RUN,
  STARTING_LIVES,
  SECONDS_PER_QUESTION,
  QuizQuestion,
} from "@/data/quizBank";

type Phase = "intro" | "playing" | "over";

const BASE_POINTS = 100;
const multiplierFor = (streak: number) =>
  streak >= 12 ? 5 : streak >= 8 ? 4 : streak >= 5 ? 3 : streak >= 2 ? 2 : 1;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function QuizBattle({ onExit }: { onExit: () => void }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [deck, setDeck] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [remaining, setRemaining] = useState(SECONDS_PER_QUESTION);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [banner, setBanner] = useState<string | null>(null);
  const [lastGain, setLastGain] = useState(0);

  const tickRef = useRef<number | null>(null);
  const q = deck[index];
  const locked = picked !== null || timedOut;

  const stopTimer = useCallback(() => {
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setDeck(shuffle(QUIZ_BANK).slice(0, QUESTIONS_PER_RUN));
    setIndex(0);
    setPicked(null);
    setTimedOut(false);
    setRemaining(SECONDS_PER_QUESTION);
    setLives(STARTING_LIVES);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setAnswered(0);
    setBanner(null);
    setPhase("playing");
  }, []);

  /* countdown */
  useEffect(() => {
    if (phase !== "playing" || locked) return;
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 0.1) {
          setTimedOut(true);
          return 0;
        }
        return +(r - 0.1).toFixed(1);
      });
    }, 100);
    return stopTimer;
  }, [phase, locked, index, stopTimer]);

  /* timeout costs a life */
  useEffect(() => {
    if (!timedOut) return;
    stopTimer();
    setAnswered((a) => a + 1);
    setStreak(0);
    setLives((l) => l - 1);
  }, [timedOut, stopTimer]);

  const choose = (i: number) => {
    if (locked || !q) return;
    stopTimer();
    setPicked(i);
    setAnswered((a) => a + 1);

    if (i === q.answer) {
      const nextStreak = streak + 1;
      const mult = multiplierFor(nextStreak);
      const speedBonus = Math.round(remaining * 8);
      const gain = (BASE_POINTS + speedBonus) * mult;
      setLastGain(gain);
      setScore((s) => s + gain);
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setCorrectCount((c) => c + 1);
      if (nextStreak === 5) setBanner("5x SCIENCE STREAK!");
      else if (nextStreak === 10) setBanner("10 IN A ROW — UNSTOPPABLE!");
      if (nextStreak === 5 || nextStreak === 10) setTimeout(() => setBanner(null), 1900);
    } else {
      setLastGain(0);
      setStreak(0);
      setLives((l) => l - 1);
    }
  };

  const next = () => {
    if (lives <= 0 || index === deck.length - 1) {
      setPhase("over");
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setTimedOut(false);
    setRemaining(SECONDS_PER_QUESTION);
  };

  const accuracy = answered > 0 ? Math.round((correctCount / answered) * 100) : 0;
  const tier = QUIZ_TIERS.find((t) => score >= t.min) ?? QUIZ_TIERS[QUIZ_TIERS.length - 1];

  const leaderboard = useMemo(() => {
    const rows = [...SEED_LEADERBOARD.map((r) => ({ ...r, you: false })), { name: "You", score, you: true }];
    return rows.sort((a, b) => b.score - a.score);
  }, [score]);

  const mult = multiplierFor(streak);
  const urgent = remaining <= 5;
  const ringPct = (remaining / SECONDS_PER_QUESTION) * 100;

  return (
    <div>
      <button
        onClick={onExit}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-secondary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to games
      </button>

      {/* streak banner */}
      <AnimatePresence>
        {banner && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] rounded-2xl bg-accent px-8 py-4 shadow-accentGlow"
          >
            <span className="inline-flex items-center gap-2 text-lg font-bold text-ink">
              <Flame className="w-5 h-5" /> {banner}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* ---------------- INTRO ---------------- */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="card mx-auto max-w-2xl p-8 lg:p-10 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center mx-auto">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="heading-serif mt-5 text-3xl lg:text-4xl">Polar Science Quiz Battle</h2>
            <p className="mt-3 text-ink/85 leading-relaxed">
              {QUESTIONS_PER_RUN} questions drawn from a pool of {QUIZ_BANK.length}, so no two runs
              are the same. {SECONDS_PER_QUESTION} seconds each, {STARTING_LIVES} lives, and a
              multiplier that climbs while you keep getting them right.
            </p>

            <div className="mt-7 grid sm:grid-cols-3 gap-3 text-left">
              {[
                { icon: Heart, label: `${STARTING_LIVES} lives`, sub: "Wrong answer or timeout costs one" },
                { icon: Zap, label: "Up to 5x", sub: "Streaks multiply your score" },
                { icon: Target, label: "Speed bonus", sub: "Answer fast, score more" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="rounded-2xl bg-surface-soft p-4">
                    <Icon className="w-5 h-5 text-secondary" />
                    <div className="mt-2 text-sm font-bold text-ink">{f.label}</div>
                    <div className="text-[11px] text-ink/75 leading-snug">{f.sub}</div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={start}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-9 py-4 font-bold text-ink shadow-accentGlow hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5" /> Start the battle
            </button>
          </motion.div>
        )}

        {/* ---------------- PLAYING ---------------- */}
        {phase === "playing" && q && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* HUD */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5 rounded-2xl bg-surface shadow-card px-4 py-2.5">
                {Array.from({ length: STARTING_LIVES }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 transition-all ${
                      i < lives ? "text-highlight fill-highlight" : "text-line"
                    }`}
                  />
                ))}
              </div>

              <div className="rounded-2xl bg-surface shadow-card px-4 py-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink/70">Score </span>
                <motion.span
                  key={score}
                  initial={{ scale: 1.25, color: "#F59E0B" }}
                  animate={{ scale: 1, color: "#0369A1" }}
                  className="text-sm font-bold tabular-nums"
                >
                  {score.toLocaleString()}
                </motion.span>
              </div>

              {mult > 1 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-2xl bg-accent px-4 py-2.5 inline-flex items-center gap-1.5"
                >
                  <Flame className="w-4 h-4 text-ink" />
                  <span className="text-sm font-bold text-ink">{mult}x</span>
                </motion.div>
              )}

              <div className="ml-auto rounded-2xl bg-wash px-4 py-2.5 text-sm font-bold text-secondary tabular-nums">
                {index + 1} / {deck.length}
              </div>

              {/* countdown ring */}
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="19" fill="none" stroke="#E2E8F0" strokeWidth="5" />
                  <circle
                    cx="22"
                    cy="22"
                    r="19"
                    fill="none"
                    stroke={urgent ? "#F59E0B" : "#0EA5E9"}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 19}
                    strokeDashoffset={2 * Math.PI * 19 * (1 - ringPct / 100)}
                    style={{ transition: "stroke-dashoffset 100ms linear" }}
                  />
                </svg>
                <span
                  className={`absolute inset-0 grid place-items-center text-sm font-bold tabular-nums ${
                    urgent ? "text-accent-ink" : "text-secondary"
                  }`}
                >
                  {Math.ceil(remaining)}
                </span>
              </div>
            </div>

            {/* progress */}
            <div className="h-2 rounded-full bg-line overflow-hidden mb-5">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={false}
                animate={{ width: `${((index + (locked ? 1 : 0)) / deck.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              />
            </div>

            {/* question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.26 }}
                className="card p-6 lg:p-8"
              >
                <span className="inline-block rounded-full bg-wash px-3 py-1 text-[11px] font-bold text-secondary">
                  {q.topic}
                </span>
                <h3 className="heading-serif mt-4 text-2xl lg:text-3xl leading-snug">{q.question}</h3>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {q.options.map((opt, i) => {
                    const isAnswer = i === q.answer;
                    const isPicked = picked === i;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => choose(i)}
                        disabled={locked}
                        whileHover={!locked ? { y: -3 } : {}}
                        whileTap={!locked ? { scale: 0.98 } : {}}
                        animate={locked && isPicked && !isAnswer ? { x: [0, -8, 8, -5, 5, 0] } : {}}
                        className={`rounded-2xl border-2 px-5 py-4 text-left font-semibold transition-colors ${
                          locked && isAnswer
                            ? "border-mint bg-mint/15 text-ink"
                            : locked && isPicked
                            ? "border-highlight bg-highlight/15 text-ink"
                            : locked
                            ? "border-line text-ink/55"
                            : "border-line text-ink hover:border-primary hover:bg-wash/60"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span
                            className={`w-7 h-7 shrink-0 rounded-full grid place-items-center text-xs font-bold ${
                              locked && isAnswer
                                ? "bg-mint text-white"
                                : locked && isPicked
                                ? "bg-highlight text-white"
                                : "bg-slate-100 text-ink/80"
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {locked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`mt-5 rounded-2xl p-5 ${
                          picked === q.answer ? "bg-mint/12" : "bg-accent/12"
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-ink">
                            {timedOut
                              ? "Out of time."
                              : picked === q.answer
                              ? "Correct!"
                              : "Not quite."}
                          </p>
                          {lastGain > 0 && picked === q.answer && (
                            <motion.span
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-bold text-white"
                            >
                              +{lastGain.toLocaleString()}
                            </motion.span>
                          )}
                        </div>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-ink/90">{q.explain}</p>
                      </div>

                      <button
                        onClick={next}
                        className="mt-5 w-full rounded-2xl bg-secondary py-4 font-bold text-white inline-flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                      >
                        {lives <= 0
                          ? "See results"
                          : index === deck.length - 1
                          ? "Finish"
                          : "Next question"}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ---------------- GAME OVER ---------------- */}
        {phase === "over" && (
          <motion.div
            key="over"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-secondary p-8 text-center text-white">
                <Trophy className="w-12 h-12 mx-auto" />
                <h3 className="heading-serif mt-3 text-3xl text-white">{tier.title}</h3>
                <div className="mt-4 text-5xl font-bold tabular-nums">{score.toLocaleString()}</div>
                <p className="mt-2 text-sm opacity-90">{tier.note}</p>
              </div>

              <div className="p-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Longest streak", value: bestStreak },
                  { label: "Accuracy", value: `${accuracy}%` },
                  { label: "Answered", value: `${answered}/${deck.length}` },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-surface-soft p-4 text-center">
                    <div className="text-2xl font-bold text-secondary tabular-nums">{s.value}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink/70">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={start}
                  className="w-full rounded-2xl bg-accent py-4 font-bold text-ink shadow-accentGlow inline-flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                >
                  <RotateCcw className="w-5 h-5" /> Play again — new questions
                </button>
              </div>
            </div>

            {/* leaderboard */}
            <div className="card p-6 lg:p-7">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <h3 className="heading-serif text-2xl">Leaderboard</h3>
                <span className="rounded-full bg-surface-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink/70">
                  Demo · this session only
                </span>
              </div>
              <p className="mt-1.5 text-xs text-ink/75">
                Sample scores for demonstration. Nothing is saved — refreshing resets it.
              </p>

              <div className="mt-5 space-y-2">
                {leaderboard.map((row, i) => (
                  <motion.div
                    key={`${row.name}-${i}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                      row.you ? "bg-accent/15 ring-2 ring-accent" : "bg-surface-soft"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 shrink-0 rounded-full grid place-items-center text-xs font-bold ${
                        i === 0
                          ? "bg-accent text-ink"
                          : row.you
                          ? "bg-secondary text-white"
                          : "bg-slate-200 text-ink/80"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={`flex-1 text-sm ${row.you ? "font-bold text-ink" : "text-ink/85"}`}>
                      {row.name}
                    </span>
                    <span className="text-sm font-bold text-secondary tabular-nums">
                      {row.score.toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
