"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Snowflake, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import type { TranslationKey } from "@/data/translations";

const LINKS: { href: string; key: TranslationKey }[] = [
  { href: "/", key: "nav_home" },
  { href: "/atlas", key: "nav_atlas" },
  { href: "/research", key: "nav_research" },
  { href: "/expeditions", key: "nav_expeditions" },
  { href: "/learn", key: "nav_learn" },
  { href: "/admin", key: "nav_admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[1000]">
      <div className="glass border-x-0 border-t-0">
        <nav className="mx-auto max-w-[1600px] px-6 lg:px-10 h-[72px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Snowflake className="w-6 h-6 text-primary transition-transform duration-500 group-hover:rotate-90" />
            <div className="leading-none">
              <div className="heading-serif text-lg font-semibold">Polar India</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-secondary mt-1">NCPOR · MoES</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                    active ? "text-ink" : "text-ink/75 hover:text-ink/95"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary/12 border border-primary/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(link.key)}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-line p-0.5 text-xs">
              {(["en", "hi"] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    lang === code
                      ? "bg-accent text-ink font-semibold"
                      : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {code === "en" ? "EN" : "हिंदी"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-ink/85 hover:text-ink"
              aria-label="Toggle navigation"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass border-x-0 border-t-0 px-6 py-4 flex flex-col gap-1"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm ${
                pathname === link.href ? "bg-primary/12 text-ink" : "text-ink/80"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
