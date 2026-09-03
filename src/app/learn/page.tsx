"use client";

import { motion } from "framer-motion";
import { Download, GraduationCap } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { learnResources } from "@/data/learn";
import MonsoonExplainer from "@/components/MonsoonExplainer";

const GROUPS = [
  { id: "6-8" as const, label: "Classes 6–8", tint: "from-frost/20" },
  { id: "9-10" as const, label: "Classes 9–10", tint: "from-amber/20" },
  { id: "11-12" as const, label: "Classes 11–12", tint: "from-frost/20" },
];

export default function LearnPage() {
  const { t } = useLanguage();

  return (
    <div className="aurora-wash min-h-screen">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-14 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-[11px] uppercase tracking-[0.24em] text-frost/60">Schools Outreach</div>
          <h1 className="heading-serif mt-4 text-5xl lg:text-6xl font-semibold text-ice">
            {t("learn_title")}
          </h1>
          <p className="mt-4 text-ice/55 max-w-2xl">{t("learn_subtitle")}</p>
        </motion.div>
      </div>

      {/* CURRICULUM CARDS */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-3 gap-6">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className={`bg-gradient-to-b ${group.tint} to-transparent px-7 pt-7 pb-5`}>
                <GraduationCap className="w-6 h-6 text-frost" />
                <h2 className="heading-serif mt-4 text-2xl text-ice">{group.label}</h2>
              </div>

              <div className="p-7 pt-2 space-y-4">
                {learnResources
                  .filter((r) => r.ageGroup === group.id)
                  .map((resource) => (
                    <div
                      key={resource.id}
                      className="rounded-xl bg-white/[0.03] border border-white/8 p-5 hover:border-frost/25 transition-colors group"
                    >
                      <h3 className="text-sm text-ice/90">{resource.topic}</h3>
                      <p className="mt-2 text-xs text-ice/45 leading-relaxed">
                        {resource.description}
                      </p>
                      <button className="mt-4 inline-flex items-center gap-2 text-[11px] text-amber/80 hover:text-amber transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        {t("learn_download")}
                      </button>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE EXPLAINER */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[11px] uppercase tracking-[0.24em] text-frost/60">Interactive</div>
          <h2 className="heading-serif mt-4 text-4xl lg:text-5xl font-semibold text-ice max-w-3xl">
            Why polar ice matters to the Indian monsoon
          </h2>
          <p className="mt-4 text-ice/55 max-w-2xl">
            Step through the chain that connects Antarctic sea ice to rainfall over India.
          </p>

          <div className="mt-10">
            <MonsoonExplainer />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
