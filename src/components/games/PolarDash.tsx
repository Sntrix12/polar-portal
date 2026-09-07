"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Trophy, Snowflake, ArrowLeft, Lightbulb } from "lucide-react";
import { REGIONS, Region, POLAR_FACTS } from "@/data/learnGames";

/* ---------------- world constants (logical pixels) ---------------- */
const W = 900;
const H = 320;
const GROUND_Y = 250;
const GRAVITY = 0.62;
const JUMP_V = -12.4;
const RUNNER_X = 110;
const BASE_SPEED = 5.2;
const MAX_SPEED = 12.5;
const METRES_PER_PX = 0.12;
const FACT_EVERY = 500; // metres

type Phase = "menu" | "running" | "fact" | "over";

interface Obstacle {
  x: number;
  w: number;
  h: number;
  kind: "boulder" | "drift" | "crevasse" | "flyer";
}
interface Collectible {
  x: number;
  y: number;
  kind: "core" | "balloon";
  taken: boolean;
}

interface World {
  t: number;
  speed: number;
  distance: number;
  score: number;
  y: number;
  vy: number;
  onGround: boolean;
  ducking: boolean;
  legPhase: number;
  obstacles: Obstacle[];
  collectibles: Collectible[];
  nextObstacleIn: number;
  nextCollectibleIn: number;
  parallax: [number, number, number];
  nextFactAt: number;
  pops: { x: number; y: number; life: number; text: string }[];
}

const freshWorld = (): World => ({
  t: 0,
  speed: BASE_SPEED,
  distance: 0,
  score: 0,
  y: GROUND_Y,
  vy: 0,
  onGround: true,
  ducking: false,
  legPhase: 0,
  obstacles: [],
  collectibles: [],
  nextObstacleIn: 460,
  nextCollectibleIn: 260,
  parallax: [0, 0, 0],
  nextFactAt: FACT_EVERY,
  pops: [],
});

export default function PolarDash({ onExit }: { onExit: () => void }) {
  const [region, setRegion] = useState<Region>("antarctic");
  const [phase, setPhase] = useState<Phase>("menu");
  const [hud, setHud] = useState({ score: 0, distance: 0 });
  const [best, setBest] = useState(0); // React state only — no localStorage
  const [fact, setFact] = useState(POLAR_FACTS[0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const world = useRef<World>(freshWorld());
  const phaseRef = useRef<Phase>("menu");
  const regionRef = useRef<Region>("antarctic");
  const rafRef = useRef<number | null>(null);

  phaseRef.current = phase;
  regionRef.current = region;

  /* ---------------- input ---------------- */
  const jump = useCallback(() => {
    const w = world.current;
    if (phaseRef.current !== "running") return;
    if (w.onGround) {
      w.vy = JUMP_V;
      w.onGround = false;
    }
  }, []);

  const setDuck = useCallback((down: boolean) => {
    if (phaseRef.current !== "running") return;
    world.current.ducking = down;
  }, []);

  const start = useCallback(() => {
    world.current = freshWorld();
    setHud({ score: 0, distance: 0 });
    setPhase("running");
  }, []);

  const resumeFromFact = useCallback(() => setPhase("running"), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        if (phaseRef.current === "menu") start();
        else if (phaseRef.current === "over") start();
        else if (phaseRef.current === "fact") resumeFromFact();
        else jump();
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        setDuck(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") setDuck(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [jump, setDuck, start, resumeFromFact]);

  /* ---------------- game loop ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2.2); // frame-rate independent-ish
      last = now;
      const w = world.current;
      const theme = REGIONS[regionRef.current];
      const live = phaseRef.current === "running";

      if (live) step(w, dt, regionRef.current, () => {
        // collision -> game over
        setBest((b) => Math.max(b, Math.round(w.score)));
        setPhase("over");
        setFact(POLAR_FACTS[Math.floor(Math.random() * POLAR_FACTS.length)]);
      }, (metres) => {
        setFact(POLAR_FACTS[Math.floor(metres / FACT_EVERY) % POLAR_FACTS.length]);
        setPhase("fact");
      });

      draw(ctx, w, theme, phaseRef.current);

      if (live && Math.floor(w.t) % 6 === 0) {
        setHud({ score: Math.round(w.score), distance: Math.floor(w.distance) });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const theme = REGIONS[region];

  return (
    <div className="w-full">
      <button
        onClick={onExit}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-secondary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to games
      </button>

      <div className="relative rounded-2xl overflow-hidden shadow-card bg-surface">
        {/* HUD */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center gap-4 px-5 py-3.5 pointer-events-none">
          <div className="rounded-full bg-surface/90 backdrop-blur px-4 py-1.5 shadow-card">
            <span className="text-xs font-semibold text-ink/70">SCORE </span>
            <span className="text-sm font-bold text-secondary tabular-nums">{hud.score}</span>
          </div>
          <div className="rounded-full bg-surface/90 backdrop-blur px-4 py-1.5 shadow-card">
            <span className="text-xs font-semibold text-ink/70">DISTANCE </span>
            <span className="text-sm font-bold text-secondary tabular-nums">{hud.distance} m</span>
          </div>
          <div className="ml-auto rounded-full bg-accent/90 px-4 py-1.5 shadow-card">
            <span className="text-xs font-semibold text-ink/80">BEST </span>
            <span className="text-sm font-bold text-ink tabular-nums">{best}</span>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", display: "block", aspectRatio: `${W} / ${H}` }}
          onPointerDown={() => {
            if (phase === "menu" || phase === "over") start();
            else if (phase === "fact") resumeFromFact();
            else jump();
          }}
        />

        {/* ---------- MENU ---------- */}
        <AnimatePresence>
          {phase === "menu" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center px-6 text-center"
            >
              <h3 className="heading-serif text-3xl lg:text-4xl">Choose your expedition</h3>
              <p className="mt-2 text-sm text-ink/80 max-w-md">
                Two poles, two very different animals. Pick where you are running.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {(["arctic", "antarctic"] as Region[]).map((r) => {
                  const t = REGIONS[r];
                  const on = region === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`rounded-2xl p-5 text-left transition-all border-2 ${
                        on
                          ? "border-primary bg-wash shadow-card scale-[1.02]"
                          : "border-line bg-surface hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-4xl leading-none">{t.character}</span>
                        <div>
                          <div className="font-bold text-secondary">{t.label}</div>
                          <div className="text-xs text-ink/75">{t.characterName}</div>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-ink/80 leading-relaxed">{t.blurb}</p>
                      <p className="mt-2 text-[11px] font-semibold text-primary-dark">
                        Base: {t.station} · watch for {t.hazard}
                      </p>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={start}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-ink font-bold shadow-accentGlow hover:scale-105 transition-transform"
              >
                <Play className="w-5 h-5" /> Start running
              </button>
              <p className="mt-4 text-xs text-ink/70">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold">Space</kbd> /{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold">↑</kbd> jump ·{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold">↓</kbd> duck · or tap
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- POLAR FACT ---------- */}
        <AnimatePresence>
          {phase === "fact" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-secondary/25 backdrop-blur-sm flex items-center justify-center px-6"
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-surface rounded-2xl shadow-cardHover p-7 max-w-lg text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5">
                  <Lightbulb className="w-4 h-4 text-accent-ink" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">
                    Polar Fact!
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink">{fact}</p>
                <button
                  onClick={resumeFromFact}
                  className="mt-6 rounded-full bg-primary px-7 py-3 text-white font-bold shadow-primaryGlow hover:scale-105 transition-transform"
                >
                  Keep running →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- GAME OVER ---------- */}
        <AnimatePresence>
          {phase === "over" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-white/90 backdrop-blur-sm flex items-center justify-center px-6"
            >
              <motion.div
                initial={{ scale: 0.85, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="text-center max-w-lg"
              >
                <div className="text-5xl">{theme.character}</div>
                <h3 className="heading-serif mt-3 text-3xl">Run complete!</h3>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <div className="rounded-2xl bg-wash px-6 py-4">
                    <div className="text-3xl font-bold text-secondary tabular-nums">{hud.score}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/75">
                      Score
                    </div>
                  </div>
                  <div className="rounded-2xl bg-wash px-6 py-4">
                    <div className="text-3xl font-bold text-secondary tabular-nums">
                      {hud.distance}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/75">
                      Metres
                    </div>
                  </div>
                  <div className="rounded-2xl bg-accent/20 px-6 py-4">
                    <div className="text-3xl font-bold text-ink tabular-nums flex items-center gap-1.5">
                      <Trophy className="w-5 h-5 text-accent-ink" />
                      {best}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/75">
                      Best
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-surface-soft p-5 text-left flex gap-3">
                  <Snowflake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-ink">{fact}</p>
                </div>

                <button
                  onClick={start}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-ink font-bold shadow-accentGlow hover:scale-105 transition-transform"
                >
                  <RotateCcw className="w-5 h-5" /> Play again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* mobile controls */}
      <div className="mt-4 flex gap-3 sm:hidden">
        <button
          onPointerDown={jump}
          className="flex-1 rounded-2xl bg-primary py-4 text-white font-bold shadow-card"
        >
          Jump
        </button>
        <button
          onPointerDown={() => setDuck(true)}
          onPointerUp={() => setDuck(false)}
          onPointerLeave={() => setDuck(false)}
          className="flex-1 rounded-2xl bg-secondary py-4 text-white font-bold shadow-card"
        >
          Duck
        </button>
      </div>
    </div>
  );
}

/* ================= simulation ================= */

function step(
  w: World,
  dt: number,
  region: Region,
  onDeath: () => void,
  onFact: (metres: number) => void
) {
  w.t += dt;
  w.speed = Math.min(MAX_SPEED, BASE_SPEED + w.distance / 260);
  const dx = w.speed * dt;
  w.distance += dx * METRES_PER_PX;
  w.score += dx * METRES_PER_PX * 0.1;

  w.parallax[0] = (w.parallax[0] + dx * 0.12) % W;
  w.parallax[1] = (w.parallax[1] + dx * 0.35) % W;
  w.parallax[2] = (w.parallax[2] + dx) % 80;

  // vertical motion
  w.vy += GRAVITY * dt;
  w.y += w.vy * dt;
  if (w.y >= GROUND_Y) {
    w.y = GROUND_Y;
    w.vy = 0;
    w.onGround = true;
  }
  if (!w.onGround) w.ducking = false;
  w.legPhase += dx * 0.16;

  // spawn obstacles
  w.nextObstacleIn -= dx;
  if (w.nextObstacleIn <= 0) {
    const roll = Math.random();
    const kind: Obstacle["kind"] =
      roll < 0.28 ? "boulder" : roll < 0.52 ? "drift" : roll < 0.74 ? "crevasse" : "flyer";
    const spec =
      kind === "boulder"
        ? { w: 34, h: 40 }
        : kind === "drift"
        ? { w: 52, h: 26 }
        : kind === "crevasse"
        ? { w: 58, h: 18 }
        : { w: 42, h: 26 };
    w.obstacles.push({ x: W + 40, ...spec, kind });
    const gap = 300 + Math.random() * 210 - Math.min(110, w.distance / 12);
    w.nextObstacleIn = Math.max(205, gap);
  }

  // spawn collectibles
  w.nextCollectibleIn -= dx;
  if (w.nextCollectibleIn <= 0) {
    const balloon = Math.random() < 0.32;
    w.collectibles.push({
      x: W + 30,
      y: balloon ? GROUND_Y - 128 : GROUND_Y - 62,
      kind: balloon ? "balloon" : "core",
      taken: false,
    });
    w.nextCollectibleIn = 200 + Math.random() * 260;
  }

  for (const o of w.obstacles) o.x -= dx;
  for (const c of w.collectibles) c.x -= dx;
  w.obstacles = w.obstacles.filter((o) => o.x > -90);
  w.collectibles = w.collectibles.filter((c) => c.x > -60 && !c.taken);

  for (const p of w.pops) {
    p.y -= 0.8 * dt;
    p.life -= 0.02 * dt;
  }
  w.pops = w.pops.filter((p) => p.life > 0);

  // hitbox
  const bodyH = w.ducking ? 26 : 46;
  const bodyW = w.ducking ? 52 : 40;
  const bx = RUNNER_X - bodyW / 2 + 4;
  const by = w.y - bodyH;

  for (const o of w.obstacles) {
    const oy = o.kind === "flyer" ? GROUND_Y - 74 : GROUND_Y - o.h;
    const oh = o.h;
    if (
      bx + bodyW - 8 > o.x + 4 &&
      bx + 4 < o.x + o.w - 4 &&
      by + bodyH - 4 > oy + 3 &&
      by + 4 < oy + oh - 3
    ) {
      onDeath();
      return;
    }
  }

  for (const c of w.collectibles) {
    if (c.taken) continue;
    const cr = 15;
    if (
      Math.abs(c.x - RUNNER_X) < cr + bodyW / 2 &&
      Math.abs(c.y - (w.y - bodyH / 2)) < cr + bodyH / 2
    ) {
      c.taken = true;
      const gain = c.kind === "balloon" ? 25 : 10;
      w.score += gain;
      w.pops.push({ x: c.x, y: c.y, life: 1, text: `+${gain}` });
    }
  }

  if (w.distance >= w.nextFactAt) {
    w.nextFactAt += FACT_EVERY;
    onFact(w.distance);
  }
}

/* ================= rendering ================= */

function draw(
  ctx: CanvasRenderingContext2D,
  w: World,
  theme: (typeof REGIONS)[Region],
  phase: Phase
) {
  ctx.clearRect(0, 0, W, H);

  // sky
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  sky.addColorStop(0, theme.skyTop);
  sky.addColorStop(1, theme.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, GROUND_Y);

  // sun glow
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.beginPath();
  ctx.arc(W - 130, 62, 34, 0, Math.PI * 2);
  ctx.fill();

  // far mountains
  drawRidge(ctx, w.parallax[0], theme.mountainFar, 96, 150);
  // near mountains
  drawRidge(ctx, w.parallax[1], theme.mountain, 132, 118);

  // ground
  ctx.fillStyle = theme.ground;
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
  ctx.strokeStyle = "#CBD5E1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(W, GROUND_Y);
  ctx.stroke();

  // snow speckle on the ground, scrolling
  ctx.fillStyle = "#E2ECF3";
  for (let i = 0; i < 26; i++) {
    const x = ((i * 80 - w.parallax[2]) % (W + 80)) - 40;
    const y = GROUND_Y + 16 + ((i * 37) % 46);
    ctx.fillRect(x, y, 14, 3);
  }

  // obstacles
  for (const o of w.obstacles) drawObstacle(ctx, o, theme);

  // collectibles
  for (const c of w.collectibles) drawCollectible(ctx, c, w.t);

  // runner
  drawRunner(ctx, w, theme);

  // score pops
  ctx.font = "bold 16px system-ui, sans-serif";
  ctx.textAlign = "center";
  for (const p of w.pops) {
    ctx.fillStyle = `rgba(3,105,161,${Math.max(0, p.life)})`;
    ctx.fillText(p.text, p.x, p.y);
  }
  ctx.textAlign = "left";

  if (phase === "menu") {
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillRect(0, 0, W, H);
  }
}

function drawRidge(
  ctx: CanvasRenderingContext2D,
  offset: number,
  color: string,
  height: number,
  period: number
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-period, GROUND_Y);
  for (let x = -period; x <= W + period; x += period) {
    const peak = GROUND_Y - height - ((Math.sin(x * 0.37) + 1) / 2) * 26;
    ctx.lineTo(x - (offset % period) + period / 2, peak);
    ctx.lineTo(x - (offset % period) + period, GROUND_Y);
  }
  ctx.lineTo(W + period, GROUND_Y);
  ctx.closePath();
  ctx.fill();
}

function drawObstacle(
  ctx: CanvasRenderingContext2D,
  o: Obstacle,
  theme: (typeof REGIONS)[Region]
) {
  const baseY = GROUND_Y;

  if (o.kind === "crevasse") {
    // a dark blue gash in the ice
    const g = ctx.createLinearGradient(0, baseY, 0, baseY + 30);
    g.addColorStop(0, "#38BDF8");
    g.addColorStop(1, "#075985");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(o.x, baseY);
    ctx.lineTo(o.x + o.w, baseY);
    ctx.lineTo(o.x + o.w - 8, baseY + 34);
    ctx.lineTo(o.x + 8, baseY + 34);
    ctx.closePath();
    ctx.fill();
    // lip highlight so it reads as a hole to jump
    ctx.fillStyle = "#BAE6FD";
    ctx.fillRect(o.x - 3, baseY - 4, o.w + 6, 5);
    return;
  }

  if (o.kind === "boulder") {
    ctx.fillStyle = "#DCEAF4";
    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(o.x, baseY);
    ctx.lineTo(o.x + 7, baseY - o.h * 0.75);
    ctx.lineTo(o.x + o.w * 0.5, baseY - o.h);
    ctx.lineTo(o.x + o.w - 5, baseY - o.h * 0.6);
    ctx.lineTo(o.x + o.w, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    return;
  }

  if (o.kind === "drift") {
    ctx.fillStyle = "#EAF3FA";
    ctx.strokeStyle = "#A9C3D6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(o.x, baseY);
    ctx.quadraticCurveTo(o.x + o.w * 0.35, baseY - o.h * 1.5, o.x + o.w, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    return;
  }

  // flyer: skua (Antarctic) or snow gust (Arctic) — duck under it
  const fy = baseY - 74;
  if (theme.id === "antarctic") {
    ctx.fillStyle = "#5B6B7A";
    ctx.beginPath();
    ctx.ellipse(o.x + 20, fy + 12, 17, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    const flap = Math.sin(Date.now() / 90) * 9;
    ctx.beginPath();
    ctx.moveTo(o.x + 16, fy + 9);
    ctx.lineTo(o.x - 2, fy + 2 - flap);
    ctx.lineTo(o.x + 18, fy + 14);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(o.x + 22, fy + 9);
    ctx.lineTo(o.x + 42, fy + 2 + flap);
    ctx.lineTo(o.x + 24, fy + 14);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.moveTo(o.x + 4, fy + 11);
    ctx.lineTo(o.x - 5, fy + 13);
    ctx.lineTo(o.x + 4, fy + 15);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = "rgba(226,240,250,0.95)";
    ctx.strokeStyle = "#BBD4E6";
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(o.x + 8 + i * 13, fy + 8 + Math.sin(Date.now() / 160 + i) * 4, 13, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
}

function drawCollectible(ctx: CanvasRenderingContext2D, c: Collectible, t: number) {
  const bob = Math.sin(t * 0.08 + c.x * 0.02) * 4;
  const y = c.y + bob;

  if (c.kind === "core") {
    // glowing ice-core sample tube
    ctx.save();
    ctx.shadowColor = "rgba(14,165,233,0.75)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#BAE6FD";
    ctx.strokeStyle = "#0EA5E9";
    ctx.lineWidth = 2;
    roundRect(ctx, c.x - 7, y - 15, 14, 30, 6);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#0369A1";
    ctx.fillRect(c.x - 7, y - 4, 14, 3);
    ctx.fillRect(c.x - 7, y + 4, 14, 3);
    return;
  }

  // weather balloon
  ctx.save();
  ctx.shadowColor = "rgba(245,158,11,0.6)";
  ctx.shadowBlur = 14;
  ctx.fillStyle = "#FCD34D";
  ctx.strokeStyle = "#F59E0B";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(c.x, y - 6, 13, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.strokeStyle = "#94A3B8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(c.x, y + 9);
  ctx.lineTo(c.x, y + 20);
  ctx.stroke();
  ctx.fillStyle = "#E2E8F0";
  ctx.fillRect(c.x - 4, y + 20, 8, 6);
}

function drawRunner(
  ctx: CanvasRenderingContext2D,
  w: World,
  theme: (typeof REGIONS)[Region]
) {
  const x = RUNNER_X;
  const y = w.y;
  const duck = w.ducking;
  const legSwing = Math.sin(w.legPhase) * (w.onGround ? 7 : 0);

  ctx.save();

  // shadow
  ctx.fillStyle = "rgba(51,65,85,0.16)";
  ctx.beginPath();
  ctx.ellipse(x, GROUND_Y + 5, 24, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  if (theme.id === "antarctic") {
    // ---- emperor penguin ----
    const bodyH = duck ? 26 : 46;
    const bodyW = duck ? 46 : 34;
    const cx = x;
    const cy = y - bodyH / 2;

    // feet
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.ellipse(cx - 7 + legSwing * 0.5, y - 2, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 8 - legSwing * 0.5, y - 2, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // body
    ctx.fillStyle = "#1F2937";
    ctx.beginPath();
    ctx.ellipse(cx, cy, bodyW / 2, bodyH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // belly
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(cx + 2, cy + 3, bodyW / 2 - 8, bodyH / 2 - 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // flipper
    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.ellipse(cx - bodyW / 2 + 3, cy + 2, 5, bodyH / 3.2, duck ? 1.2 : 0.35, 0, Math.PI * 2);
    ctx.fill();

    // head
    const hx = duck ? cx + 16 : cx + 2;
    const hy = duck ? cy - 4 : cy - bodyH / 2 - 7;
    ctx.fillStyle = "#1F2937";
    ctx.beginPath();
    ctx.arc(hx, hy, 13, 0, Math.PI * 2);
    ctx.fill();
    // cheek patch
    ctx.fillStyle = "#FCD34D";
    ctx.beginPath();
    ctx.ellipse(hx + 5, hy + 3, 4.5, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // eye
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(hx + 5, hy - 3, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0F172A";
    ctx.beginPath();
    ctx.arc(hx + 6, hy - 3, 1.8, 0, Math.PI * 2);
    ctx.fill();
    // beak
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.moveTo(hx + 11, hy + 1);
    ctx.lineTo(hx + 23, hy + 4);
    ctx.lineTo(hx + 11, hy + 7);
    ctx.closePath();
    ctx.fill();
  } else {
    // ---- polar bear ----
    const bodyH = duck ? 26 : 40;
    const bodyW = duck ? 62 : 52;
    const cy = y - bodyH / 2;

    // legs
    ctx.strokeStyle = "#E8EEF3";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x - 14, cy + bodyH / 2 - 4);
    ctx.lineTo(x - 14 + legSwing, y - 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 14, cy + bodyH / 2 - 4);
    ctx.lineTo(x + 14 - legSwing, y - 3);
    ctx.stroke();

    // body
    ctx.fillStyle = "#FBFDFE";
    ctx.strokeStyle = "#CBD9E4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, cy, bodyW / 2, bodyH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // head
    const hx = duck ? x + 26 : x + 20;
    const hy = duck ? cy - 2 : cy - bodyH / 2 - 4;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(hx, hy, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // ears
    ctx.beginPath();
    ctx.arc(hx - 8, hy - 11, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(hx + 6, hy - 12, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // snout
    ctx.fillStyle = "#F1F7FB";
    ctx.beginPath();
    ctx.ellipse(hx + 9, hy + 4, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // nose + eye
    ctx.fillStyle = "#0F172A";
    ctx.beginPath();
    ctx.ellipse(hx + 15, hy + 3, 3.2, 2.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(hx + 4, hy - 3, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
