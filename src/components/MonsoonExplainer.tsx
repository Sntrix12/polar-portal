"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RotateCcw } from "lucide-react";

const STEPS = [
  {
    title: "Sea ice reflects sunlight",
    body: "Antarctic sea ice is bright white. It bounces most incoming sunlight straight back to space, keeping the Southern Ocean cold.",
  },
  {
    title: "Less ice means more heat absorbed",
    body: "As sea ice shrinks, dark ocean water is exposed. Water absorbs sunlight instead of reflecting it, and the Southern Ocean warms.",
  },
  {
    title: "Ocean heat moves north",
    body: "A warmer Southern Ocean shifts the temperature difference between the hemispheres, nudging wind belts and pressure systems northward.",
  },
  {
    title: "The monsoon responds",
    body: "The Indian summer monsoon is driven by that land-sea temperature contrast. Shifts in the Southern Ocean change how much moisture reaches India — which is why NCPOR studies polar ice to understand Indian rainfall.",
  },
];

export default function MonsoonExplainer() {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* DIAGRAM */}
        <div className="relative bg-navy-deep/60 p-8 min-h-[340px] flex items-center justify-center">
          <svg viewBox="0 0 320 280" className="w-full max-w-[320px]">
            {/* India landmass */}
            <motion.path
              d="M120 40 L200 40 L188 82 L160 108 L132 82 Z"
              fill={step >= 3 ? "#FBBF24" : "#1E3A5F"}
              stroke="rgba(240,247,255,0.25)"
              strokeWidth="1.5"
              animate={{ opacity: step >= 3 ? 1 : 0.55 }}
              transition={{ duration: 0.6 }}
            />
            <text x="160" y="70" textAnchor="middle" fill="#F0F7FF" fontSize="11" opacity="0.85">
              India
            </text>

            {/* Ocean band */}
            <rect x="20" y="120" width="280" height="90" rx="8" fill="#0C2440" opacity="0.85" />
            <motion.rect
              x="20"
              y="120"
              width="280"
              height="90"
              rx="8"
              fill="#0EA5E9"
              initial={{ opacity: 0.08 }}
              animate={{ opacity: step >= 1 ? 0.28 : 0.08 }}
              transition={{ duration: 0.7 }}
            />
            <text x="160" y="170" textAnchor="middle" fill="#7DD3FC" fontSize="10" opacity="0.7">
              Southern Ocean
            </text>

            {/* Antarctic ice sheet */}
            <motion.rect
              x="20"
              y="212"
              width={280}
              height="46"
              rx="8"
              fill="#F0F7FF"
              // Motion drives the SVG `width` attribute, so it needs an explicit
              // starting value — without `initial` it paints width="undefined" once.
              initial={{ width: 280, opacity: 0.92 }}
              animate={{
                width: step >= 1 ? 170 : 280,
                opacity: step >= 1 ? 0.75 : 0.92,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <text x="70" y="240" fill="#0A1628" fontSize="10" fontWeight="600">
              Sea ice
            </text>

            {/* Sunlight rays reflecting (step 0) */}
            <AnimatePresence>
              {step === 0 && (
                <>
                  {[60, 110, 160].map((x, i) => (
                    <motion.line
                      key={x}
                      x1={x + 30}
                      y1={100}
                      x2={x}
                      y2={208}
                      stroke="#FBBF24"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.4, 1] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Heat absorbed (step 1) */}
            <AnimatePresence>
              {step === 1 && (
                <>
                  {[200, 235, 270].map((x, i) => (
                    <motion.circle
                      key={x}
                      cx={x}
                      cy={230}
                      r="6"
                      fill="#FBBF24"
                      initial={{ opacity: 0, cy: 250 }}
                      animate={{ opacity: [0, 0.9, 0], cy: [250, 200, 170] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Heat transport north (step 2) */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.path
                  d="M160 200 C 160 175, 160 150, 160 118"
                  stroke="#7DD3FC"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#arrow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              )}
            </AnimatePresence>

            {/* Monsoon rain (step 3) */}
            <AnimatePresence>
              {step === 3 && (
                <>
                  {[132, 148, 164, 180].map((x, i) => (
                    <motion.line
                      key={x}
                      x1={x}
                      y1={92}
                      x2={x - 4}
                      y2={112}
                      stroke="#7DD3FC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0], y1: [88, 100], y2: [108, 120] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" fill="#7DD3FC" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* TEXT */}
        <div className="p-8 lg:p-10 flex flex-col">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-1 rounded-full transition-all ${
                  i <= step ? "bg-amber" : "bg-white/12"
                } ${i === step ? "w-10" : "w-6"}`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-frost/60">
                  Step {step + 1} of {STEPS.length}
                </div>
                <h3 className="heading-serif mt-4 text-2xl lg:text-3xl text-ice leading-snug">
                  {STEPS[step].title}
                </h3>
                <p className="mt-4 text-sm text-ice/60 leading-relaxed">{STEPS[step].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => setStep(isLast ? 0 : step + 1)}
            className="mt-8 self-start inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-navy-deep text-sm font-semibold shadow-amberGlow transition-transform hover:scale-105"
          >
            {isLast ? (
              <>
                Replay <RotateCcw className="w-4 h-4" />
              </>
            ) : (
              <>
                Next step <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
