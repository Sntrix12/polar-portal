"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export default function AnimatedCounter({ value, label, suffix = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now() + delay * 1000;
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="text-center"
    >
      <div className="heading-serif text-5xl lg:text-6xl font-semibold tabular-nums">
        {display}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">{label}</div>
    </motion.div>
  );
}
