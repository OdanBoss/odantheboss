"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Music2,
  TrendingUp,
  DollarSign,
  PlayCircle,
  Users,
  Star,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import PlatformBadge from "@/components/PlatformBadge";
import {
  streamData,
  platformData,
  tracks,
  formatNumber,
  formatCurrency,
  notifications,
} from "@/lib/data";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

export default function Dashboard() {
  const totalStreams = streamData.reduce((s, d) => s + d.streams, 0);
  const totalRevenue = 346100;
  const sortedTracks = [...tracks].filter((t) => t.status === "active").sort((a, b) => b.streams - a.streams);
  const topTrack = sortedTracks[0];

  const pieData = platformData.slice(0, 5).map((p) => ({ name: p.name, value: p.share, color: p.color }));

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        <div className="relative"><StatCard title="Reproducciones Totales" value={formatNumber(totalStreams)} change={18.4} icon={PlayCircle} accent="#7c3aed" sub="Últimos 11 meses" /></div>
        <div className="relative"><StatCard title="Ingresos Totales" value={formatCurrency(totalRevenue)} change={22.1} icon={DollarSign} accent="#10b981" sub="Acumulado 2024–2025" /></div>
        <div className="relative"><StatCard title="Oyentes Únicos" value={formatNumber(3450000)} change={15.2} icon={Users} accent="#f59e0b" sub="Este mes" /></div>
        <div className="relative"><StatCard title="Canciones Activas" value="7" change={16.7} icon={Music2} accent="#ec4899" sub="En todas las plataformas" /></div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Reproducciones Mensuales</h2>
              <p className="text-sm" style={{ color: "var(--muted-text)" }}>Últimos 11 meses</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <TrendingUp size={14} />
              +31.2% este mes
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={streamData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#6b6b8a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => formatNumber(v)} tick={{ fill: "#6b6b8a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "rgba(10,10,22,0.95)", backdropFilter: "blur(10px)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [formatNumber(Number(v)), "Streams"]}
              />
              <Area type="monotone" dataKey="streams" stroke="#a855f7" strokeWidth={2.5} fill="url(#streamGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ec489955, transparent)" }} />
          <h2 className="text-base font-semibold text-white mb-1">Por Plataforma</h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted-text)" }}>Distribución de streams</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v}%`, ""]}
                contentStyle={{ background: "rgba(10,10,22,0.95)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span style={{ color: "var(--muted-text)" }}>{p.name}</span>
                </div>
                <span className="font-semibold text-white">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Canciones Más Escuchadas</h2>
            <a href="/catalog" className="text-sm font-medium" style={{ color: "#a855f7" }}>Ver catálogo →</a>
          </div>
          <div className="space-y-3">
            {sortedTracks.slice(0, 5).map((track, i) => (
              <div key={track.id} className="flex items-center gap-4 px-2 py-1.5 rounded-xl transition-colors hover:bg-white/[0.03]">
                <span className="text-sm w-5 text-center font-bold" style={{ color: i === 0 ? "#f59e0b" : "var(--muted-text)" }}>
                  {i === 0 ? <Star size={14} className="inline text-amber-400" /> : i + 1}
                </span>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: `hsl(${i * 55 + 260}, 70%, 45%)` }}>
                  {track.title.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{track.title}</p>
                  <p className="text-xs truncate" style={{ color: "var(--muted-text)" }}>{track.album} · {track.duration}</p>
                </div>
                <div className="text-right mr-2">
                  <p className="text-sm font-semibold text-white">{formatNumber(track.streams)}</p>
                  <p className="text-xs" style={{ color: "var(--muted-text)" }}>{formatCurrency(track.revenue)}</p>
                </div>
                <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${(track.streams / topTrack.streams) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #a855f755, transparent)" }} />
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Actividad Reciente</h2>
            <a href="/notifications" className="text-sm font-medium" style={{ color: "#a855f7" }}>Ver todo →</a>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex gap-3 p-3 rounded-xl transition-colors"
                style={{
                  background: n.read ? "transparent" : "rgba(124,58,237,0.06)",
                  borderLeft: n.read ? "2px solid transparent" : "2px solid #a855f7",
                }}>
                <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.type === "success" ? "bg-emerald-400" : n.type === "warning" ? "bg-amber-400" : n.type === "error" ? "bg-red-400" : "bg-blue-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white">{n.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{n.message}</p>
                  <p className="text-[11px] mt-1" style={{ color: "var(--muted-text)" }}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))", border: "1px solid rgba(168,85,247,0.2)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs" style={{ color: "#c084fc" }}>Ingreso este mes</p>
                <p className="text-xl font-bold text-white mt-0.5">{formatCurrency(46100)}</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                <ArrowUpRight size={16} />
                +17.8%
              </div>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              {(["Spotify", "Apple Music", "YouTube Music"] as const).map((p) => (
                <PlatformBadge key={p} name={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
