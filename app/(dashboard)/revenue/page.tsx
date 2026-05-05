"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, ArrowUpRight } from "lucide-react";
import StatCard from "@/components/StatCard";
import { revenueData, platformData, formatCurrency, formatNumber } from "@/lib/data";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const COLORS = {
  spotify: "#1DB954",
  appleMusic: "#FC3C44",
  youtubeMusic: "#FF4444",
  amazonMusic: "#00A8E1",
  tidal: "#8b8b8b",
  deezer: "#EF5466",
};

export default function RevenuePage() {
  const latestMonth = revenueData[revenueData.length - 1];
  const prevMonth = revenueData[revenueData.length - 2];
  const totalAllTime = revenueData.reduce((s, d) => s + d.total, 0);
  const growthRate = (((latestMonth.total - prevMonth.total) / prevMonth.total) * 100).toFixed(1);

  const topPlatform = platformData.sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-white mb-2">Ingresos</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Análisis detallado de ganancias por plataforma y período de tiempo</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard title="Ingresos este mes" value={formatCurrency(latestMonth.total)} change={parseFloat(growthRate)} icon={DollarSign} accent="#10b981" />
        <StatCard title="Ingresos acumulados" value={formatCurrency(totalAllTime)} change={22.1} icon={TrendingUp} accent="#7c3aed" sub="Últimos 11 meses" />
        <StatCard title="Mayor fuente" value="Spotify" change={18.4} icon={CreditCard} accent="#1DB954" sub={`${formatCurrency(latestMonth.spotify)} este mes`} />
        <StatCard title="Promedio mensual" value={formatCurrency(Math.round(totalAllTime / revenueData.length))} change={8.2} icon={ArrowUpRight} accent="#f59e0b" />
      </div>

      {/* Revenue over time stacked bar */}
      <div className="rounded-3xl p-8 relative overflow-hidden mt-8" style={{
        ...glassCard,
        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(16,185,129,0.2) inset",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #10b981, transparent)", opacity: 0.8 }} />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Ingresos por Plataforma</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Desglose de ganancias en los últimos 11 meses</p>
            <p className="text-sm" style={{ color: "var(--muted-text)" }}>Desglose mensual por servicio de streaming</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-emerald-400 text-sm"
            style={{ background: "rgba(16,185,129,0.1)" }}>
            <TrendingUp size={14} />
            Total: {formatCurrency(totalAllTime)}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e30" />
            <XAxis dataKey="month" tick={{ fill: "#6b6b8a", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: "#6b6b8a", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }}
              formatter={(v, name) => [formatCurrency(Number(v)), String(name)]}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "#6b6b8a" }} />
            <Bar dataKey="spotify" stackId="a" fill={COLORS.spotify} name="Spotify" radius={[0, 0, 0, 0]} />
            <Bar dataKey="appleMusic" stackId="a" fill={COLORS.appleMusic} name="Apple Music" />
            <Bar dataKey="youtubeMusic" stackId="a" fill={COLORS.youtubeMusic} name="YouTube Music" />
            <Bar dataKey="amazonMusic" stackId="a" fill={COLORS.amazonMusic} name="Amazon Music" />
            <Bar dataKey="tidal" stackId="a" fill={COLORS.tidal} name="Tidal" />
            <Bar dataKey="deezer" stackId="a" fill={COLORS.deezer} name="Deezer" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line chart + platform table */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 rounded-2xl p-6" style={glassCard}>
          <h2 className="text-base font-semibold text-white mb-1">Tendencia de Ingresos</h2>
          <p className="text-sm mb-5" style={{ color: "var(--muted-text)" }}>Línea de tendencia mensual total</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e30" />
              <XAxis dataKey="month" tick={{ fill: "#6b6b8a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: "#6b6b8a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [formatCurrency(Number(v)), "Total"]}
              />
              <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Platform revenue table */}
        <div className="rounded-2xl p-6" style={glassCard}>
          <h2 className="text-base font-semibold text-white mb-5">Ingresos por Plataforma</h2>
          <div className="space-y-4">
            {platformData.sort((a, b) => b.revenue - a.revenue).map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-xs font-medium text-white">{p.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{formatCurrency(p.revenue)}</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${(p.revenue / platformData[0].revenue) * 100}%`, background: p.color, opacity: 0.85 }} />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[11px]" style={{ color: "var(--muted-text)" }}>{p.share}% del total</span>
                  <span className={`text-[11px] ${p.growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {p.growth >= 0 ? "+" : ""}{p.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="rounded-2xl p-6" style={glassCard}>
        <h2 className="text-base font-semibold text-white mb-5">Historial Mensual Detallado</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs" style={{ color: "var(--muted-text)" }}>
                <th className="text-left pb-3 font-medium">Mes</th>
                <th className="text-right pb-3 font-medium">Spotify</th>
                <th className="text-right pb-3 font-medium">Apple Music</th>
                <th className="text-right pb-3 font-medium">YouTube</th>
                <th className="text-right pb-3 font-medium">Amazon</th>
                <th className="text-right pb-3 font-medium">Tidal</th>
                <th className="text-right pb-3 font-medium">Deezer</th>
                <th className="text-right pb-3 font-medium text-white">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--card-border)" }}>
              {[...revenueData].reverse().map((row) => (
                <tr key={row.month} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-medium text-white">{row.month}</td>
                  <td className="py-3 text-right" style={{ color: COLORS.spotify }}>{formatCurrency(row.spotify)}</td>
                  <td className="py-3 text-right" style={{ color: COLORS.appleMusic }}>{formatCurrency(row.appleMusic)}</td>
                  <td className="py-3 text-right" style={{ color: "#6b6b8a" }}>{formatCurrency(row.youtubeMusic)}</td>
                  <td className="py-3 text-right" style={{ color: "#6b6b8a" }}>{formatCurrency(row.amazonMusic)}</td>
                  <td className="py-3 text-right" style={{ color: "#6b6b8a" }}>{formatCurrency(row.tidal)}</td>
                  <td className="py-3 text-right" style={{ color: "#6b6b8a" }}>{formatCurrency(row.deezer)}</td>
                  <td className="py-3 text-right font-bold text-white">{formatCurrency(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
