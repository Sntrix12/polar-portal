"use client";

import { Snowflake } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/8 mt-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Snowflake className="w-5 h-5 text-frost/70" />
          <div>
            <div className="heading-serif text-base text-ice">Polar India</div>
            <p className="text-xs text-ice/40 mt-1 max-w-md">{t("footer_tagline")}</p>
          </div>
        </div>
        <div className="text-xs text-ice/35 leading-relaxed md:text-right">
          <p>National Centre for Polar and Ocean Research · Vasco da Gama, Goa</p>
          <p className="mt-1">Ministry of Earth Sciences, Government of India</p>
          <p className="mt-1 text-ice/25">Imagery: Wikimedia Commons · Demo prototype</p>
        </div>
      </div>
    </footer>
  );
}
