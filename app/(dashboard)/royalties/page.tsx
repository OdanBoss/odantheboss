"use client";

import { DollarSign, CheckCircle, Clock, AlertCircle, Download, TrendingUp, Calendar } from "lucide-react";
import { royaltyStatements, revenueData, formatCurrency, tracks } from "@/lib/data";
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

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const statusConfig = {
  paid: { label: "Pagado", color: "text-emerald-400", bg: "rgba(52,211,153,0.1)", icon: CheckCircle },
  pending: { label: "Pendiente", color: "text-amber-400", bg: "rgba(251,191,36,0.1)", icon: Clock },
  processing: { label: "Procesando", color: "text-blue-400", bg: "rgba(96,165,250,0.1)", icon: AlertCircle },
};

export default function RoyaltiesPage() {
  const totalPaid = royaltyStatements.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);
  const totalPending = royaltyStatements.filter((r) => r.status !== "paid").reduce((s, r) => s + r.amount, 0);
  const latestPaid = royaltyStatements.find((r) => r.status === "paid");

  const barData = revenueData.map((r) => ({
    month: r.month,
    amount: r.total,
    paid: r.total > 32000,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-white mb-2">Tus Regalías</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Seguimiento detallado de pagos y estados de tus ganancias</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Total Pagado", value: formatCurrency(totalPaid), icon: CheckCircle, accent: "#10b981", sub: `${royaltyStatements.filter(r => r.status === "paid").length} períodos` },
          { label: "Por Cobrar", value: formatCurrency(totalPending), icon: Clock, accent: "#f59e0b", sub: "En proceso" },
          { label: "Último Pago", value: latestPaid ? formatCurrency(latestPaid.amount) : "—", icon: DollarSign, accent: "#7c3aed", sub: latestPaid?.period ?? "" },
          { label: "Canciones en Regalías", value: tracks.filter(t => t.status === "active").length.toString(), icon: TrendingUp, accent: "#ec4899", sub: "Generando ingresos" },
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

      {/* Bar chart + breakdown */}
      <div className="grid grid-cols-3 gap-5 mt-8">
        <div className="col-span-2 rounded-3xl p-8 relative overflow-hidden" style={{
          ...glassCard,
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(16,185,129,0.2) inset",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #10b981, transparent)", opacity: 0.8 }} />
          <h2 className="text-xl font-bold text-white mb-1">Historial de Regalías</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>Ganancias mensuales con estado de pago</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e30" />
              <XAxis dataKey="month" tick={{ fill: "#6b6b8a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: "#6b6b8a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [formatCurrency(Number(v)), "Regalías"]}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.paid ? "#7c3aed" : "#a855f7"} fillOpacity={entry.paid ? 1 : 0.5} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-text)" }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: "#7c3aed" }} />Pagado
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-text)" }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: "#a855f7", opacity: 0.5 }} />Estimado
            </div>
          </div>
        </div>

        {/* Rate breakdown */}
        <div className="rounded-2xl p-6" style={glassCard}>
          <h2 className="text-base font-semibold text-white mb-5">Tarifas por Stream</h2>
          <div className="space-y-4">
            {[
              { platform: "Tidal", rate: "$0.0100", color: "#8b8b8b", share: 28 },
              { platform: "Apple Music", rate: "$0.0076", color: "#FC3C44", share: 21 },
              { platform: "Spotify", rate: "$0.0042", color: "#1DB954", share: 12 },
              { platform: "Amazon Music", rate: "$0.0040", color: "#00A8E1", share: 11 },
              { platform: "Deezer", rate: "$0.0035", color: "#EF5466", share: 10 },
              { platform: "YouTube Music", rate: "$0.0018", color: "#FF4444", share: 5 },
            ].map((p) => (
              <div key={p.platform}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-xs font-medium text-white">{p.platform}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400">{p.rate}</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${p.share * 3}%`, background: p.color, opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--muted-text)" }}>* Tarifas promedio por stream</p>
        </div>
      </div>

      {/* Statements table */}
      <div className="rounded-2xl overflow-hidden" style={glassCard}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--card-border)" }}>
          <h2 className="text-base font-semibold text-white">Declaraciones de Regalías</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: "var(--muted)", color: "var(--muted-text)" }}>
            <Download size={14} />
            Exportar CSV
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs" style={{ color: "var(--muted-text)", background: "rgba(255,255,255,0.02)" }}>
              <th className="text-left px-6 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Período</th>
              <th className="text-right px-4 py-3 font-medium">Monto</th>
              <th className="text-center px-4 py-3 font-medium">Canciones</th>
              <th className="text-center px-4 py-3 font-medium">Plataformas</th>
              <th className="text-center px-4 py-3 font-medium">Estado</th>
              <th className="text-right px-6 py-3 font-medium">Fecha de Pago</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--card-border)" }}>
            {royaltyStatements.map((stmt) => {
              const st = statusConfig[stmt.status];
              const StatusIcon = st.icon;
              return (
                <tr key={stmt.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs" style={{ color: "#a855f7" }}>{stmt.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} style={{ color: "var(--muted-text)" }} />
                      <span className="text-white font-medium">{stmt.period}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-emerald-400">{formatCurrency(stmt.amount)}</td>
                  <td className="px-4 py-4 text-center" style={{ color: "var(--muted-text)" }}>{stmt.tracks}</td>
                  <td className="px-4 py-4 text-center" style={{ color: "var(--muted-text)" }}>{stmt.platforms}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${st.color}`} style={{ background: st.bg }}>
                      <StatusIcon size={11} />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-xs" style={{ color: "var(--muted-text)" }}>{stmt.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pro tips */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { title: "Maximiza tus regalías", desc: "Distribuye en Tidal y Apple Music donde la tarifa por stream es más alta", accent: "#10b981" },
          { title: "Sincronización de letras", desc: "Registra tu música en ASCAP o BMI para recibir regalías de sincronización adicionales", accent: "#7c3aed" },
          { title: "Próximo pago", desc: "Las regalías de Mayo 2025 ($46,100) están en procesamiento — esperado el 15 de junio", accent: "#f59e0b" },
        ].map((tip) => (
          <div key={tip.title} className="rounded-2xl p-5" style={{ background: "var(--card)", border: `1px solid ${tip.accent}33` }}>
            <h3 className="font-semibold mb-2" style={{ color: tip.accent }}>{tip.title}</h3>
            <p className="text-sm" style={{ color: "var(--muted-text)" }}>{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
