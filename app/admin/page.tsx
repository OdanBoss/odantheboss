"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { Music2, Disc3, DollarSign, FileText, Upload, CheckCircle, Clock, XCircle } from "lucide-react";
import { tracks, albums, labelApplications, releaseSubmissions, formatCurrency } from "@/lib/data";
import Link from "next/link";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

export default function AdminPage() {
  const totalRevenue = tracks.reduce((s, t) => s + t.revenue, 0) + albums.reduce((s, a) => s + a.revenue, 0);
  const pendingApps = labelApplications.filter((a) => a.status === "pending").length;
  const pendingReleases = releaseSubmissions.filter((r) => r.status === "submitted").length;

  const kpis = [
    { label: "Total Canciones", value: tracks.length, icon: Music2, accent: "#7c3aed", sub: `${tracks.filter(t => t.status === "active").length} activas` },
    { label: "Total Álbumes", value: albums.length, icon: Disc3, accent: "#ec4899", sub: `${albums.filter(a => a.status === "active").length} activos` },
    { label: "Ingresos Totales", value: formatCurrency(totalRevenue), icon: DollarSign, accent: "#10b981", sub: "Catálogo completo" },
    { label: "Solicitudes Pendientes", value: pendingApps, icon: FileText, accent: "#f59e0b", sub: "Requieren revisión" },
    { label: "Lanzamientos Pendientes", value: pendingReleases, icon: Upload, accent: "#a855f7", sub: "Esperando aprobación" },
  ];

  const recentApps = [...labelApplications].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).slice(0, 5);

  const statusIcon = {
    pending: { icon: Clock, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
    approved: { icon: CheckCircle, color: "#34d399", bg: "rgba(52,211,153,0.1)" },
    rejected: { icon: XCircle, color: "#f87171", bg: "rgba(248,113,113,0.1)" },
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="mb-2">
          <h1 className="text-4xl font-bold text-white mb-2">Panel de Administración</h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>Gestión completa del catálogo, distribución y solicitudes de sellos</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4 mt-8">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl p-5 relative overflow-hidden group transition-all transform hover:scale-105 hover:-translate-y-1" style={{
              ...glassCard,
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(255,255,255,0.1) inset",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${k.accent}55, transparent)` }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${k.accent}22`, boxShadow: `0 0 12px ${k.accent}22` }}>
                <k.icon size={18} style={{ color: k.accent }} />
              </div>
              <p className="text-2xl font-extrabold text-white" style={{ textShadow: `0 0 16px ${k.accent}44` }}>{k.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{k.label}</p>
              <p className="text-xs mt-0.5" style={{ color: k.accent }}>{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          {/* Recent Applications */}
          <div className="rounded-3xl overflow-hidden relative" style={{
            ...glassCard,
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(245,158,11,0.2) inset",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #f59e0b, transparent)", opacity: 0.8 }} />
            <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <div>
                <h2 className="text-lg font-bold text-white mb-0.5">Solicitudes Recientes</h2>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{pendingApps} pendientes de revisión</p>
              </div>
              <Link href="/admin/applications" className="text-sm font-bold px-3 py-1.5 rounded-lg transition-all hover:bg-amber-500/20" style={{ color: "#f59e0b", background: "rgba(245,158,11,0.1)" }}>Ver todas →</Link>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--glass-border)" }}>
              {recentApps.map((app) => {
                const st = statusIcon[app.status];
                return (
                  <div key={app.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{app.labelName}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{app.contactName} · {app.submittedAt}</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
                      style={{ color: st.color, background: st.bg }}>
                      <st.icon size={11} />
                      {app.status === "pending" ? "Pendiente" : app.status === "approved" ? "Aprobado" : "Rechazado"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl p-8 relative" style={{
            ...glassCard,
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(124,58,237,0.2) inset",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #7c3aed, transparent)", opacity: 0.8 }} />
            <h2 className="text-lg font-bold text-white mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Gestionar Canciones", href: "/admin/tracks", accent: "#7c3aed" },
                { label: "Gestionar Álbumes", href: "/admin/albums", accent: "#ec4899" },
                { label: "Ver Plataformas", href: "/admin/platforms", accent: "#10b981" },
                { label: "Revisar Solicitudes", href: "/admin/applications", accent: "#f59e0b" },
                { label: "Nuevo Lanzamiento", href: "/admin/releases/new", accent: "#a855f7" },
                { label: "Configuración", href: "/admin/settings", accent: "#6b7280" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-center p-4 rounded-xl text-sm font-bold text-center transition-all transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    background: `${action.accent}20`,
                    border: `1px solid ${action.accent}40`,
                    color: action.accent,
                    boxShadow: `0 4px 12px ${action.accent}20`,
                  }}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
