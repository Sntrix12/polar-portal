"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Compass,
  Image as ImageIcon,
  Video,
  FileText,
  Database,
  BookOpen,
  Trophy,
  RotateCcw,
  Timer,
  Lightbulb,
  Search,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { MAP_SITES, CATEGORY_META, MapSite } from "@/data/mapSites";
import { holdingsFor, HUNT_ROUNDS, HUNT_RANKS, ROUND_SECONDS } from "@/data/treasureHunt";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center bg-surface-soft text-sm text-ink/70">
      Loading map…
    </div>
  ),
});

type Mode = "explore" | "hunt" | "over";

export default function TreasureHunt({ onExit }: { onExit: () => void }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [selected, setSelected] = useState<MapSite | null>(null);

  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "revealed" | null>(null);
  const [remaining, setRemaining] = useState(ROUND_SECONDS);
  const [timerOn, setTimerOn] = useState(true);
  const tickRef = useRef<number | null>(null);

  const current = HUNT_ROUNDS[round];
  const answered = feedback === "correct" || feedback === "revealed";

  const stopTimer = useCallback(() => {
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (mode !== "hunt" || answered || !timerOn) return;
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return stopTimer;
  }, [mode, answered, timerOn, round, stopTimer]);

  const startHunt = () => {
    setMode("hunt");
    setRound(0);
    setPoints(0);
    setWrongCount(0);
    setSolvedIds([]);
    setFeedback(null);
    setRemaining(ROUND_SECONDS);
    setSelected(null);
  };

  const handleSelect = useCallback(
    (site: MapSite) => {
      setSelected(site);

      if (mode !== "hunt" || answered) return;

      if (site.id === current.answerId) {
        stopTimer();
        const speedBonus = timerOn ? Math.round(remaining * 4) : 0;
        setPoints((p) => p + 100 + speedBonus);
        setSolvedIds((s) => [...s, current.answerId]);
        setFeedback("correct");
      } else {
        const next = wrongCount + 1;
        setWrongCount(next);
        setPoints((p) => Math.max(0, p - 25));
        if (next >= 2) {
          stopTimer();
          setFeedback("revealed");
        } else {
          setFeedback("wrong");
        }
      }
    },
    [mode, answered, current, wrongCount, remaining, timerOn, stopTimer]
  );

  const nextRound = () => {
    if (round === HUNT_ROUNDS.length - 1) {
      setMode("over");
      return;
    }
    setRound((r) => r + 1);
    setWrongCount(0);
    setFeedback(null);
    setRemaining(ROUND_SECONDS);
    setSelected(null);
  };

  const rank = HUNT_RANKS.find((r) => points >= r.min) ?? HUNT_RANKS[HUNT_RANKS.length - 1];
  const holdings = useMemo(() => (selected ? holdingsFor(selected) : null), [selected]);

  /* ---------------- results ---------------- */
  if (mode === "over") {
    return (
      <div>
        <BackBar onExit={onExit} />
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="card mx-auto max-w-xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-primary to-secondary p-8 text-center text-white">
            <Trophy className="w-12 h-12 mx-auto" />
            <h3 className="heading-serif mt-3 text-3xl text-white">{rank.title}</h3>
            <div className="mt-4 text-5xl font-bold tabular-nums">{points}</div>
            <div className="text-sm opacity-90">Polar Points</div>
          </div>
          <div className="p-7 text-center">
            <p className="text-sm font-semibold text-ink">
              {solvedIds.length} of {HUNT_ROUNDS.length} sites identified correctly
            </p>
            <p className="mt-2 text-ink/85">{rank.note}</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                onClick={startHunt}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-ink shadow-accentGlow hover:scale-105 transition-transform"
              >
                <RotateCcw className="w-4 h-4" /> Hunt again
              </button>
              <button
                onClick={() => {
                  setMode("explore");
                  setSelected(null);
                }}
                className="rounded-full border-2 border-line px-7 py-3.5 font-bold text-ink/85 hover:border-primary hover:text-secondary transition-colors"
              >
                Free explore
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ---------------- explore / hunt ---------------- */
  return (
    <div>
      <BackBar onExit={onExit} />

      {/* mode switch + HUD */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="inline-flex rounded-2xl bg-surface shadow-card p-1">
          {(["explore", "hunt"] as const).map((m) => (
            <button
              key={m}
              onClick={() => (m === "hunt" ? startHunt() : setMode("explore"))}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                mode === m ? "bg-secondary text-white" : "text-ink/75 hover:text-secondary"
              }`}
            >
              {m === "explore" ? "Free explore" : "Treasure hunt"}
            </button>
          ))}
        </div>

        {mode === "hunt" && (
          <>
            <div className="rounded-2xl bg-accent/20 px-4 py-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/75">Points </span>
              <span className="text-sm font-bold text-ink tabular-nums">{points}</span>
            </div>
            <div className="rounded-2xl bg-wash px-4 py-2.5 text-sm font-bold text-secondary tabular-nums">
              Round {round + 1} / {HUNT_ROUNDS.length}
            </div>
            {timerOn && (
              <div
                className={`rounded-2xl px-4 py-2.5 inline-flex items-center gap-2 ${
                  remaining <= 8 && !answered ? "bg-highlight/15" : "bg-surface shadow-card"
                }`}
              >
                <Timer className="w-4 h-4 text-secondary" />
                <span className="text-sm font-bold text-ink tabular-nums">{remaining}s</span>
              </div>
            )}
            <button
              onClick={() => setTimerOn((t) => !t)}
              className="rounded-2xl border-2 border-line px-3 py-2 text-xs font-bold text-ink/75 hover:border-primary transition-colors"
            >
              {timerOn ? "Timer on" : "Timer off"}
            </button>
          </>
        )}
      </div>

      {/* hunt progress */}
      {mode === "hunt" && (
        <div className="h-2 rounded-full bg-line overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={false}
            animate={{ width: `${((round + (answered ? 1 : 0)) / HUNT_ROUNDS.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          />
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* MAP */}
        <div>
          <div className="h-[62vh] min-h-[420px] rounded-2xl overflow-hidden shadow-card">
            <MapView sites={MAP_SITES} selectedId={selected?.id ?? null} onSelect={handleSelect} />
          </div>
          <p className="mt-3 text-xs text-ink/75">
            Use the + / − buttons to zoom. The mouse wheel scrolls the page.
          </p>
        </div>

        {/* SIDE PANEL */}
        <div className="space-y-4">
          {/* clue */}
          {mode === "hunt" && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card p-5 ${
                feedback === "correct"
                  ? "ring-2 ring-mint"
                  : feedback === "wrong"
                  ? "ring-2 ring-highlight"
                  : ""
              }`}
            >
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-secondary">
                <Search className="w-3.5 h-3.5" /> Clue {round + 1}
              </div>
              <p className="mt-2.5 text-[15px] font-semibold leading-snug text-ink">
                {current.clue}
              </p>

              <AnimatePresence mode="wait">
                {feedback === "wrong" && (
                  <motion.div
                    key="wrong"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                    exit={{ opacity: 0 }}
                    className="mt-4 rounded-xl bg-accent/12 p-4"
                  >
                    <p className="inline-flex items-center gap-2 text-xs font-bold text-accent-ink">
                      <Lightbulb className="w-3.5 h-3.5" /> Not that one — hint
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{current.hint}</p>
                    <p className="mt-2 text-[11px] font-bold text-ink/70">
                      One more wrong guess reveals the answer. −25 points
                    </p>
                  </motion.div>
                )}

                {(feedback === "correct" || feedback === "revealed") && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 rounded-xl p-4 ${
                      feedback === "correct" ? "bg-mint/15" : "bg-surface-soft"
                    }`}
                  >
                    <p className="text-sm font-bold text-ink">
                      {feedback === "correct" ? "Correct!" : "The answer was:"}{" "}
                      {MAP_SITES.find((s) => s.id === current.answerId)?.name}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink/90">
                      {current.reveal}
                    </p>
                    <button
                      onClick={nextRound}
                      className="mt-4 w-full rounded-xl bg-secondary py-3 font-bold text-white inline-flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                    >
                      {round === HUNT_ROUNDS.length - 1 ? "See results" : "Next clue"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* site card */}
          <AnimatePresence mode="wait">
            {selected && holdings ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="card p-5"
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold"
                  style={{
                    color: CATEGORY_META[selected.category].color,
                    background: `${CATEGORY_META[selected.category].color}1A`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: CATEGORY_META[selected.category].color }}
                  />
                  {CATEGORY_META[selected.category].label}
                </span>

                <h3 className="heading-serif mt-3 text-2xl leading-tight">{selected.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-dark">
                  <MapPin className="w-3 h-3" />
                  {selected.region}
                  {selected.established ? ` · Est. ${selected.established}` : ""}
                  {selected.status === "decommissioned" ? " · Decommissioned" : ""}
                </p>

                <p className="mt-3 text-[13px] leading-relaxed text-ink/90">{selected.description}</p>

                <h4 className="mt-5 text-[11px] font-bold uppercase tracking-wider text-ink/70">
                  Archive holdings
                </h4>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <Chip icon={ImageIcon} n={holdings.photographs} label="photographs" tone="bg-primary/10 text-secondary" />
                  <Chip icon={Video} n={holdings.videos} label="videos" tone="bg-highlight/10 text-highlight" />
                  <Chip icon={FileText} n={holdings.reports} label="reports" tone="bg-accent/15 text-accent-ink" />
                  <Chip icon={Database} n={holdings.datasets} label="datasets" tone="bg-mint/15 text-ink" />
                  <Chip
                    icon={BookOpen}
                    n={holdings.publications}
                    label="publications"
                    tone="bg-secondary/10 text-secondary"
                  />
                </div>

                <h4 className="mt-5 text-[11px] font-bold uppercase tracking-wider text-ink/70">
                  Research areas
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {selected.research.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-wash px-3 py-1 text-[11px] font-semibold text-secondary"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {!selected.verified && (
                  <p className="mt-4 rounded-lg bg-accent/12 px-3 py-2 text-[11px] text-ink">
                    <strong>Illustrative</strong> — indicative position rather than a verified one.
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card p-6 text-center"
              >
                <Compass className="w-8 h-8 text-secondary mx-auto" />
                <p className="mt-3 text-sm font-semibold text-ink">
                  {mode === "hunt" ? "Click the marker you think matches the clue" : "Click any marker"}
                </p>
                <p className="mt-1.5 text-xs text-ink/75">
                  {mode === "hunt"
                    ? "Every clue can be answered from what the site cards show."
                    : `Explore all ${MAP_SITES.length} sites and see what each archive holds.`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Chip({
  icon: Icon,
  n,
  label,
  tone,
}: {
  icon: typeof ImageIcon;
  n: number;
  label: string;
  tone: string;
}) {
  return (
    <div className={`rounded-xl px-3 py-2.5 ${tone}`}>
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-sm font-bold tabular-nums">{n}</span>
      </div>
      <div className="mt-0.5 text-[10px] font-semibold opacity-80">{label}</div>
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
