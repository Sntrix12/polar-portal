"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { expeditions } from "@/data/expeditions";

interface Props {
  upToYear: number;
}

function buildDecadeData(upToYear: number) {
  const decades = [1980, 1990, 2000, 2010, 2020];
  return decades.map((decade) => ({
    decade: `${decade}s`,
    count: expeditions.filter(
      (e) => e.startYear >= decade && e.startYear < decade + 10 && e.startYear <= upToYear
    ).length,
  }));
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/12 bg-navy px-3 py-2 shadow-xl">
      <div className="text-[11px] uppercase tracking-wider text-ice/45">{label}</div>
      <div className="text-sm text-ice mt-0.5">
        {payload[0].value} {payload[0].value === 1 ? "expedition" : "expeditions"}
      </div>
    </div>
  );
}

export default function DecadeChart({ upToYear }: Props) {
  const data = buildDecadeData(upToYear);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }} barCategoryGap="34%">
          <CartesianGrid
            vertical={false}
            stroke="rgba(240,247,255,0.07)"
            strokeDasharray="0"
          />
          <XAxis
            dataKey="decade"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "rgba(240,247,255,0.42)", fontSize: 11 }}
            dy={6}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "rgba(240,247,255,0.3)", fontSize: 11 }}
            allowDecimals={false}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(240,247,255,0.04)" }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={600}>
            {data.map((entry) => (
              <Cell
                key={entry.decade}
                fill={entry.count === 0 ? "rgba(125,211,252,0.15)" : "#7DD3FC"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
