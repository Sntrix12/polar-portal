"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Plus,
  UploadCloud,
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { publications } from "@/data/publications";
import { stations } from "@/data/stations";
import { expeditions } from "@/data/expeditions";

export default function AdminPage() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const rows = publications.slice(0, 8);

  return (
    <div className="aurora-wash min-h-screen">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-14 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-frost/60">
            <LayoutDashboard className="w-3.5 h-3.5" /> Internal Preview
          </div>
          <h1 className="heading-serif mt-4 text-5xl lg:text-6xl font-semibold text-ice">
            {t("admin_title")}
          </h1>
          <p className="mt-4 text-ice/55 max-w-2xl">{t("admin_subtitle")}</p>
          <div className="mt-5 inline-block rounded-lg border border-amber/25 bg-amber/8 px-4 py-2.5 text-xs text-amber/80">
            Demonstration only — this dashboard is non-functional in the prototype.
          </div>
        </motion.div>
      </div>

      {/* STAT TILES */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: FileText, label: "Publications", value: publications.length },
            { icon: ImageIcon, label: "Media assets", value: 14 },
            { icon: Users, label: "Expeditions", value: expeditions.length },
            { icon: LayoutDashboard, label: "Stations", value: stations.length },
          ].map((tile, i) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass rounded-2xl p-6"
              >
                <Icon className="w-5 h-5 text-frost/70" />
                <div className="mt-4 heading-serif text-3xl text-ice tabular-nums">{tile.value}</div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-ice/40">
                  {tile.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* TABLE + FORM */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-28 grid xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="xl:col-span-2 glass rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 p-6 border-b border-white/8">
            <h2 className="text-sm text-ice/85">Publications</h2>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-navy-deep text-xs font-semibold transition-transform hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" /> Add new
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.16em] text-ice/35">
                  <th className="px-6 py-4 font-normal">Title</th>
                  <th className="px-6 py-4 font-normal">Area</th>
                  <th className="px-6 py-4 font-normal">Year</th>
                  <th className="px-6 py-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((pub) => (
                  <tr
                    key={pub.id}
                    className="border-t border-white/6 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4 text-xs text-ice/80 max-w-[380px]">
                      <span className="line-clamp-2">{pub.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-frost/10 border border-frost/20 text-[10px] text-frost/80 whitespace-nowrap">
                        {pub.area}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-ice/50 tabular-nums">{pub.year}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-frost/15 flex items-center justify-center text-ice/50 hover:text-frost transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/15 flex items-center justify-center text-ice/50 hover:text-red-400 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="space-y-6"
        >
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm text-ice/85">
              {showForm ? "New publication" : "Quick add"}
            </h2>
            <div className="mt-5 space-y-4">
              {[
                { label: "Title", placeholder: "Publication title" },
                { label: "Authors", placeholder: "Surname, A.; Surname, B." },
                { label: "Year", placeholder: "2026" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-[10px] uppercase tracking-[0.16em] text-ice/40">
                    {field.label}
                  </label>
                  <input
                    placeholder={field.placeholder}
                    className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-xs text-ice placeholder:text-ice/25 outline-none focus:border-frost/40 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="text-[10px] uppercase tracking-[0.16em] text-ice/40">
                  Research area
                </label>
                <select className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-xs text-ice/80 outline-none focus:border-frost/40 transition-colors">
                  {["Glaciology", "Atmospheric Science", "Marine Biology", "Geology", "Oceanography"].map(
                    (area) => (
                      <option key={area} className="bg-navy">
                        {area}
                      </option>
                    )
                  )}
                </select>
              </div>

              <button className="w-full rounded-xl bg-amber py-3 text-navy-deep text-xs font-semibold transition-transform hover:scale-[1.02]">
                Save publication
              </button>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm text-ice/85">Media upload</h2>
            <div className="mt-5 rounded-xl border border-dashed border-white/15 p-8 text-center hover:border-frost/30 transition-colors cursor-pointer">
              <UploadCloud className="w-7 h-7 text-ice/30 mx-auto" />
              <p className="mt-3 text-xs text-ice/45">Drop station or expedition photos here</p>
              <p className="mt-1.5 text-[10px] text-ice/25">JPG, PNG up to 10 MB</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
