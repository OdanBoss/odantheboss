"use client";

import { Globe, CheckCircle, Clock, XCircle, TrendingUp, TrendingDown, Zap } from "lucide-react";
import PlatformBadge from "@/components/PlatformBadge";
import { platformData, tracks, formatNumber, formatCurrency } from "@/lib/data";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const statusIcons = {
  connected: { icon: CheckCircle, color: "text-emerald-400", bg: "rgba(52,211,153,0.1)", label: "Conectado" },
  pending: { icon: Clock, color: "text-amber-400", bg: "rgba(251,191,36,0.1)", label: "Pendiente" },
  disconnected: { icon: XCircle, color: "text-red-400", bg: "rgba(248,113,113,0.1)", label: "Desconectado" },
};

export default function DistributionPage() {
  const connected = platformData.filter((p) => p.status === "connected").length;
  const totalStreams = platformData.reduce((s, p) => s + p.streams, 0);
  const totalRevenue = platformData.reduce((s, p) => s + p.revenue, 0);

  const radarData = platformData.slice(0, 6).map((p) => ({
    platform: p.name.replace(" Music", "").replace("Amazon", "Amazon"),
    streams: Math.round((p.streams / totalStreams) * 100),
    revenue: Math.round((p.revenue / totalRevenue) * 100),
  }));

  return (
    <div className="space-y-8">
      {/* Status overview */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Plataformas Conectadas", value: `${connected}/${platformData.length}`, icon: Globe, accent: "#7c3aed", sub: "Activas ahora" },
          { label: "Total Reproducciones", value: formatNumber(totalStreams), icon: TrendingUp, accent: "#10b981", sub: "En todas las plataformas" },
          { label: "Ingresos Totales", value: formatCurrency(totalRevenue), icon: Zap, accent: "#f59e0b", sub: "Generado histórico" },
          { label: "Canciones Distribuidas", value: `${tracks.filter(t => t.status === "active").length}`, icon: CheckCircle, accent: "#ec4899", sub: `${tracks.filter(t => t.status === "pending").length} en proceso` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 flex items-start gap-4"
            style={glassCard}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${s.accent}22` }}>
              <s.icon size={18} style={{ color: s.accent }} />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{s.label}</p>
              <p className="text-xs mt-0.5" style={{ color: s.accent }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-3 gap-5">
        {platformData.map((p) => {
          const st = statusIcons[p.status];
          const StatusIcon = st.icon;
          return (
            <div key={p.name} className="rounded-2xl p-5"
              style={glassCard}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.color}22` }}>
                    <div className="w-5 h-5 rounded-full" style={{ background: p.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{p.name}</h3>
                    <div className={`flex items-center gap-1 text-xs mt-0.5 ${st.color}`}>
                      <StatusIcon size={11} />
                      {st.label}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${p.growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {p.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(p.growth)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-3 text-center" style={{ background: "var(--muted)" }}>
                  <p className="text-lg font-bold text-white">{formatNumber(p.streams)}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>Streams</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ background: "var(--muted)" }}>
                  <p className="text-lg font-bold text-emerald-400">{formatCurrency(p.revenue)}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>Ingresos</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "var(--muted-text)" }}>Participación</span>
                  <span className="font-semibold text-white">{p.share}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${p.share}%`, background: p.color }} />
                </div>
              </div>

              {p.status === "connected" && (
                <button className="mt-4 w-full py-2 rounded-xl text-xs font-medium transition-all hover:opacity-90"
                  style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>
                  Ver Analítica
                </button>
              )}
              {p.status === "pending" && (
                <button className="mt-4 w-full py-2 rounded-xl text-xs font-medium"
                  style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
                  Completar Configuración
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Radar + Track distribution */}
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-2xl p-6" style={glassCard}>
          <h2 className="text-base font-semibold text-white mb-1">Comparativa de Plataformas</h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted-text)" }}>Streams vs ingresos por plataforma (%)</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e1e30" />
              <PolarAngleAxis dataKey="platform" tick={{ fill: "#6b6b8a", fontSize: 11 }} />
              <Radar name="Streams" dataKey="streams" stroke="#a855f7" fill="#7c3aed" fillOpacity={0.3} />
              <Radar name="Ingresos" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-text)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#a855f7" }} />
              Streams
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-text)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
              Ingresos
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={glassCard}>
          <h2 className="text-base font-semibold text-white mb-5">Distribución de Canciones</h2>
          <div className="space-y-4">
            {tracks.map((track, i) => (
              <div key={track.id} className="p-4 rounded-xl" style={{ background: "var(--muted)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `hsl(${i * 40 + 260}, 65%, 45%)` }}>
                      {track.title.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{track.title}</p>
                      <p className="text-xs" style={{ color: "var(--muted-text)" }}>{track.genre}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${track.status === "active" ? "text-emerald-400" : "text-amber-400"}`}
                    style={{ background: track.status === "active" ? "rgba(52,211,153,0.1)" : "rgba(251,191,36,0.1)" }}>
                    {track.status === "active" ? "Activo" : "Pendiente"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {track.platforms.map((p) => <PlatformBadge key={p} name={p} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
