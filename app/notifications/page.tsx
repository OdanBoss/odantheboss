"use client";

import { Bell, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";
import { notifications } from "@/lib/data";

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
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{unread.length} sin leer</span>
          <span className="text-xs px-2 py-0.5 rounded-md text-white" style={{ background: "#7c3aed" }}>{unread.length}</span>
        </div>
        <button className="text-sm font-medium" style={{ color: "#a855f7" }}>Marcar todo como leído</button>
      </div>

      {unread.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>Sin Leer</p>
          <div className="space-y-2">
            {unread.map((n) => {
              const cfg = typeConfig[n.type];
              const Icon = cfg.icon;
              return (
                <div key={n.id} className="flex gap-4 p-4 rounded-2xl"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
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
        <div>
          <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>Leídas</p>
          <div className="space-y-2">
            {read.map((n) => {
              const cfg = typeConfig[n.type];
              const Icon = cfg.icon;
              return (
                <div key={n.id} className="flex gap-4 p-4 rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--card-border)", opacity: 0.7 }}>
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
