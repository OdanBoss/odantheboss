"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { labelApplications as initialApps, LabelApplication } from "@/lib/data";
import { CheckCircle, Clock, XCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Link from "next/link";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

type Filter = "all" | "pending" | "approved" | "rejected";

const statusCfg = {
  pending: { label: "Pendiente", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", icon: Clock },
  approved: { label: "Aprobado", color: "#34d399", bg: "rgba(52,211,153,0.1)", icon: CheckCircle },
  rejected: { label: "Rechazado", color: "#f87171", bg: "rgba(248,113,113,0.1)", icon: XCircle },
};

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<LabelApplication[]>(initialApps);
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  function approve(id: string) {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved", reviewedAt: new Date().toISOString().slice(0, 10) } : a));
  }
  function reject(id: string) {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "rejected", reviewedAt: new Date().toISOString().slice(0, 10) } : a));
  }

  const counts = {
    all: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Solicitudes de Sellos</h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>Revisa y aprueba solicitudes de nuevos sellos discográficos para distribución</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {(["all", "pending", "approved", "rejected"] as Filter[]).map((f) => (
            <div key={f} className="rounded-2xl p-4 text-center relative overflow-hidden cursor-pointer transition-all"
              style={{ ...glassCard, border: filter === f ? "1px solid rgba(168,85,247,0.4)" : "1px solid var(--glass-border)" }}
              onClick={() => setFilter(f)}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: filter === f ? "linear-gradient(90deg, transparent, #a855f755, transparent)" : "none" }} />
              <p className="text-2xl font-extrabold text-white">{counts[f]}</p>
              <p className="text-xs mt-0.5" style={{ color: filter === f ? "#a855f7" : "var(--muted-text)" }}>
                {f === "all" ? "Total" : f === "pending" ? "Pendientes" : f === "approved" ? "Aprobados" : "Rechazados"}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-3xl overflow-hidden relative mt-8" style={{
          ...glassCard,
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(245,158,11,0.2) inset",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #f59e0b, transparent)", opacity: 0.8 }} />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs border-b" style={{ color: "var(--muted-text)", borderColor: "var(--glass-border)" }}>
                <th className="text-left px-6 py-4 font-medium">Sello</th>
                <th className="text-left px-4 py-4 font-medium">Contacto</th>
                <th className="text-left px-4 py-4 font-medium">Géneros</th>
                <th className="text-center px-4 py-4 font-medium">Catálogo</th>
                <th className="text-center px-4 py-4 font-medium">Enviado</th>
                <th className="text-center px-4 py-4 font-medium">Estado</th>
                <th className="text-right px-6 py-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => {
                const st = statusCfg[app.status];
                const isExpanded = expanded === app.id;
                return (
                  <>
                    <tr key={app.id} className="border-b hover:bg-white/[0.02] transition-colors" style={{ borderColor: "var(--glass-border)" }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setExpanded(isExpanded ? null : app.id)} style={{ color: "var(--muted-text)" }}>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          <div>
                            <p className="font-medium text-white">{app.labelName}</p>
                            <p className="text-xs" style={{ color: "var(--muted-text)" }}>{app.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-white">{app.contactName}</p>
                        <p className="text-xs" style={{ color: "var(--muted-text)" }}>{app.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {app.genres.map((g) => (
                            <span key={g} className="text-xs px-2 py-0.5 rounded-md" style={{ background: "rgba(124,58,237,0.15)", color: "#a855f7" }}>{g}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-white font-semibold">{app.catalogSize}</td>
                      <td className="px-4 py-4 text-center text-xs" style={{ color: "var(--muted-text)" }}>{app.submittedAt}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
                          style={{ color: st.color, background: st.bg }}>
                          <st.icon size={11} />{st.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {app.status === "pending" && (
                            <>
                              <button onClick={() => approve(app.id)} className="text-xs px-3 py-1.5 rounded-lg font-medium"
                                style={{ background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" }}>
                                Aprobar
                              </button>
                              <button onClick={() => reject(app.id)} className="text-xs px-3 py-1.5 rounded-lg font-medium"
                                style={{ background: "rgba(248,113,113,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" }}>
                                Rechazar
                              </button>
                            </>
                          )}
                          {app.status === "approved" && (
                            <Link href={`/admin/onboarding/${app.id}`} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium"
                              style={{ background: "rgba(124,58,237,0.2)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}>
                              <ExternalLink size={11} /> Onboarding
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${app.id}-detail`} className="border-b" style={{ borderColor: "var(--glass-border)" }}>
                        <td colSpan={7} className="px-6 py-4">
                          <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <p className="font-medium mb-1" style={{ color: "#a855f7" }}>Redes Sociales</p>
                                {app.socialLinks.instagram && <p style={{ color: "var(--muted-text)" }}>📷 {app.socialLinks.instagram}</p>}
                                {app.socialLinks.spotify && <p style={{ color: "var(--muted-text)" }}>🎵 {app.socialLinks.spotify}</p>}
                                {app.socialLinks.website && <p style={{ color: "var(--muted-text)" }}>🌐 {app.socialLinks.website}</p>}
                              </div>
                              <div>
                                <p className="font-medium mb-1" style={{ color: "#a855f7" }}>Teléfono</p>
                                <p style={{ color: "var(--muted-text)" }}>{app.phone}</p>
                              </div>
                              {app.reviewedAt && (
                                <div>
                                  <p className="font-medium mb-1" style={{ color: "#a855f7" }}>Revisado</p>
                                  <p style={{ color: "var(--muted-text)" }}>{app.reviewedAt}</p>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-medium mb-1" style={{ color: "#a855f7" }}>Mensaje</p>
                              <p className="text-xs" style={{ color: "var(--muted-text)" }}>{app.message}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
