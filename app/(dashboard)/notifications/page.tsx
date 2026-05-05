"use client";

import { Bell, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";
import { notifications } from "@/lib/data";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const typeConfig = {
  success: { icon: CheckCircle, color: "text-emerald-400", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)" },
  warning: { icon: AlertCircle, color: "text-amber-400", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" },
  info: { icon: Info, color: "text-blue-400", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)" },
  error: { icon: XCircle, color: "text-red-400", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" },
};

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-white mb-2">Centro de Notificaciones</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Mantente actualizado sobre tu música y distribución</p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white">{unread.length} sin leer</span>
          <span className="text-xs px-3 py-1.5 rounded-lg text-white font-bold" style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 2px 8px rgba(124,58,237,0.3)" }}>{unread.length}</span>
        </div>
        <button className="text-sm font-bold px-4 py-2 rounded-lg transition-all hover:bg-purple-500/20" style={{ color: "#a855f7" }}>✓ Marcar todo como leído</button>
      </div>

      {unread.length > 0 && (
        <div>
          <p className="text-xs font-bold mb-4 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>Sin Leer ({unread.length})</p>
          <div className="space-y-2.5">
            {unread.map((n) => {
              const cfg = typeConfig[n.type];
              const Icon = cfg.icon;
              return (
                <div key={n.id} className="flex gap-4 p-4 rounded-xl transition-all hover:bg-white/[0.08] hover:-translate-x-1 cursor-pointer"
                  style={{
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                    borderLeft: `3px solid ${cfg.border}`,
                    backdropFilter: "blur(10px)",
                  }}>
                  <Icon size={18} className={`mt-0.5 shrink-0 ${cfg.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{n.title}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--muted-text)" }}>{n.message}</p>
                    <p className="text-xs mt-1.5" style={{ color: "var(--muted-text)" }}>{n.time}</p>
                  </div>
                  <div className="w-2 h-2 mt-1.5 rounded-full shrink-0" style={{ background: "#a855f7" }} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div className="mt-12">
          <p className="text-xs font-bold mb-4 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>Leídas ({read.length})</p>
          <div className="space-y-2.5">
            {read.map((n) => {
              const cfg = typeConfig[n.type];
              const Icon = cfg.icon;
              return (
                <div key={n.id} className="flex gap-4 p-4 rounded-xl transition-all hover:bg-white/[0.04]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    opacity: 0.8,
                  }}>
                  <Icon size={18} className={`mt-0.5 shrink-0 ${cfg.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--muted-text)" }}>{n.message}</p>
                    <p className="text-xs mt-1.5" style={{ color: "var(--muted-text)" }}>{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
