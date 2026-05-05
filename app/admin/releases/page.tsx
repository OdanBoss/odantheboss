"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { releaseSubmissions } from "@/lib/data";
import { Plus, CheckCircle, Clock, XCircle, FileText, Eye } from "lucide-react";
import Link from "next/link";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const statusCfg = {
  draft: { label: "Borrador", color: "#6b7280", bg: "rgba(107,114,128,0.1)", icon: FileText },
  submitted: { label: "Enviado", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", icon: Clock },
  in_review: { label: "En Revisión", color: "#60a5fa", bg: "rgba(96,165,250,0.1)", icon: Clock },
  approved: { label: "Aprobado", color: "#34d399", bg: "rgba(52,211,153,0.1)", icon: CheckCircle },
  rejected: { label: "Rechazado", color: "#f87171", bg: "rgba(248,113,113,0.1)", icon: XCircle },
};

const typeLabel = { single: "Single", ep: "EP", album: "Álbum" };

export default function ReleasesPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}>Lanzamientos</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>{releaseSubmissions.length} lanzamientos registrados</p>
          </div>
          <Link href="/admin/releases/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 4px 15px rgba(124,58,237,0.35)" }}>
            <Plus size={16} /> Nuevo Lanzamiento
          </Link>
        </div>

        <div className="rounded-2xl overflow-hidden relative" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #a855f755, transparent)" }} />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs border-b" style={{ color: "var(--muted-text)", borderColor: "var(--glass-border)" }}>
                <th className="text-left px-6 py-4 font-medium">Lanzamiento</th>
                <th className="text-left px-4 py-4 font-medium">Tipo</th>
                <th className="text-left px-4 py-4 font-medium">UPC</th>
                <th className="text-center px-4 py-4 font-medium">Canciones</th>
                <th className="text-center px-4 py-4 font-medium">Fecha</th>
                <th className="text-center px-4 py-4 font-medium">Estado</th>
                <th className="text-right px-6 py-4 font-medium">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--glass-border)" }}>
              {releaseSubmissions.map((r, i) => {
                const st = statusCfg[r.status];
                return (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                          style={{ background: `hsl(${i * 80 + 260}, 65%, 45%)` }}>
                          {r.releaseTitle.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{r.releaseTitle}</p>
                          <p className="text-xs" style={{ color: "var(--muted-text)" }}>{r.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(124,58,237,0.15)", color: "#a855f7" }}>
                        {typeLabel[r.releaseType]}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs" style={{ color: "var(--muted-text)" }}>{r.upc}</td>
                    <td className="px-4 py-4 text-center text-white font-semibold">{r.tracks.length}</td>
                    <td className="px-4 py-4 text-center text-xs" style={{ color: "var(--muted-text)" }}>{r.releaseDate}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
                        style={{ color: st.color, background: st.bg }}>
                        <st.icon size={11} />{st.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/releases/${r.id}`}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/[0.06]"
                        style={{ color: "#a855f7" }}>
                        <Eye size={13} /> Ver
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
