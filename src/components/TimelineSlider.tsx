"use client";

import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  year: number;
  onChange: (year: number) => void;
  min: number;
  max: number;
  playing: boolean;
  onTogglePlay: () => void;
  markers: { year: number; label: string }[];
}

export default function TimelineSlider({
  year,
  onChange,
  min,
  max,
  playing,
  onTogglePlay,
  markers,
}: Props) {
  const yearRef = useRef(year);
  yearRef.current = year;

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const next = yearRef.current >= max ? min : yearRef.current + 1;
      onChange(next);
    }, 380);
    return () => clearInterval(interval);
  }, [playing, min, max, onChange]);

  const progress = ((year - min) / (max - min)) * 100;

  return (
    <div className="glass rounded-2xl px-6 lg:px-10 py-7">
      <div className="flex items-center gap-6">
        <button
          onClick={onTogglePlay}
          className="shrink-0 w-12 h-12 rounded-full bg-amber text-navy-deep flex items-center justify-center shadow-amberGlow transition-transform hover:scale-105"
          aria-label={playing ? "Pause timeline" : "Play timeline"}
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="shrink-0 w-[130px]">
          <div className="text-[10px] uppercase tracking-[0.22em] text-frost/60">Year</div>
          <motion.div
            key={year}
            initial={{ opacity: 0.4, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="heading-serif text-4xl font-semibold text-ice tabular-nums leading-none mt-1"
          >
            {year}
          </motion.div>
        </div>

        <div className="flex-1 relative pt-2">
          <div className="relative h-[6px] rounded-full bg-white/12 overflow-visible">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-frost/60 to-amber"
              style={{ width: `${progress}%` }}
            />
            {markers.map((m) => {
              const pos = ((m.year - min) / (max - min)) * 100;
              const reached = year >= m.year;
              return (
                <div
                  key={`${m.year}-${m.label}`}
                  className="absolute -translate-x-1/2 group"
                  style={{ left: `${pos}%`, top: "-4px" }}
                >
                  <div
                    className={`w-[14px] h-[14px] rounded-full border-2 transition-all duration-300 ${
                      reached
                        ? "bg-amber border-navy-deep scale-100"
                        : "bg-navy border-white/25 scale-75"
                    }`}
                  />
                  <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-md bg-navy px-2.5 py-1.5 text-[11px] text-ice border border-white/12 shadow-lg">
                      {m.label} · {m.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <input
            type="range"
            min={min}
            max={max}
            value={year}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-x-0 top-[-6px] w-full"
            aria-label="Timeline year selector"
          />

          <div className="flex justify-between mt-5 text-[11px] text-ice/35 tabular-nums">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
