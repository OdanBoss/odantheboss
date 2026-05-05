"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { releaseSubmissions, ReleaseSubmission } from "@/lib/data";
import { CheckCircle, Clock, XCircle, FileText, ArrowLeft } from "lucide-react";

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

const PLATFORM_COLORS: Record<string, string> = {
  Spotify: "#1DB954", "Apple Music": "#FC3C44", "YouTube Music": "#FF0000",
  "Amazon Music": "#00A8E1", Tidal: "#c8c8c8", Deezer: "#EF5466", SoundCloud: "#FF5500",
  Pandora: "#005483", iHeartRadio: "#C6002B", Napster: "#000000",
  Anghami: "#6200EE", Boomplay: "#F43B00", NetEase: "#C10D0C", "QQ Music": "#FCAD05", Audiomack: "#FFA200",
};

export default function ReleaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const initial = releaseSubmissions.find((r) => r.id === id);
  const [release, setRelease] = useState<ReleaseSubmission | undefined>(initial);

  if (!release) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-white text-lg">Lanzamiento no encontrado</p>
          <button onClick={() => router.push("/admin/releases")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>
            <ArrowLeft size={14} /> Volver
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  const st = statusCfg[release.status];

  function updateStatus(status: ReleaseSubmission["status"]) {
    setRelease((r) => r ? { ...r, status } : r);
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <button onClick={() => router.push("/admin/releases")} className="flex items-center gap-2 text-sm mb-3 transition-colors hover:text-white"
              style={{ color: "var(--muted-text)" }}>
              <ArrowLeft size={14} /> Volver a Lanzamientos
            </button>
            <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}>{release.releaseTitle}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
                style={{ color: st.color, background: st.bg }}>
                <st.icon size={11} />{st.label}
              </span>
              <span className="text-xs" style={{ color: "var(--muted-text)" }}>{release.id}</span>
            </div>
          </div>
          {(release.status === "submitted" || release.status === "in_review") && (
            <div className="flex gap-2">
              <button onClick={() => updateStatus("in_review")} className="px-4 py-2 rounded-xl text-xs font-medium"
                style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.3)" }}>
                En Revisión
              </button>
              <button onClick={() => updateStatus("approved")} className="px-4 py-2 rounded-xl text-xs font-medium"
                style={{ background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" }}>
                Aprobar
              </button>
              <button onClick={() => updateStatus("rejected")} className="px-4 py-2 rounded-xl text-xs font-medium"
                style={{ background: "rgba(248,113,113,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" }}>
                Rechazar
              </button>
            </div>
          )}
        </div>

        {/* Release Info */}
        <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
          <h2 className="text-base font-semibold text-white mb-4">Información del Release</h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[
              ["Artista", release.artist],
              ["Tipo", release.releaseType.toUpperCase()],
              ["Sello", release.label],
              ["Fecha", release.releaseDate],
              ["Idioma", release.language],
              ["Género", release.genre],
              ["UPC", release.upc || "—"],
              ["Copyright", release.copyright],
              ["Rec. Copyright", release.recordingCopyright],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>{label as string}</p>
                <p className="font-medium text-white mt-0.5 text-sm">{value as string || "—"}</p>
              </div>
            ))}
            {release.submittedAt && (
              <div>
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>Enviado</p>
                <p className="font-medium text-white mt-0.5 text-sm">{new Date(release.submittedAt).toLocaleDateString("es")}</p>
              </div>
            )}
            {release.notes && (
              <div className="col-span-3">
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>Notas</p>
                <p className="text-sm text-white mt-0.5">{release.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tracks */}
        <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ec489955, transparent)" }} />
          <h2 className="text-base font-semibold text-white mb-4">Canciones ({release.tracks.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b" style={{ color: "var(--muted-text)", borderColor: "var(--glass-border)" }}>
                  <th className="text-left pb-3 font-medium pr-3">#</th>
                  <th className="text-left pb-3 font-medium pr-3">Título</th>
                  <th className="text-left pb-3 font-medium pr-3">ISRC</th>
                  <th className="text-left pb-3 font-medium pr-3">Feat.</th>
                  <th className="text-left pb-3 font-medium pr-3">Compositor</th>
                  <th className="text-left pb-3 font-medium pr-3">Productor</th>
                  <th className="text-center pb-3 font-medium pr-3">Dur.</th>
                  <th className="text-center pb-3 font-medium">E</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--glass-border)" }}>
                {release.tracks.map((t, i) => (
                  <tr key={i}>
                    <td className="py-2.5 pr-3 font-bold text-white">{i + 1}</td>
                    <td className="py-2.5 pr-3 font-medium text-white">{t.title}</td>
                    <td className="py-2.5 pr-3 font-mono" style={{ color: "#a855f7" }}>{t.isrc || "—"}</td>
                    <td className="py-2.5 pr-3" style={{ color: "var(--muted-text)" }}>{t.featuredArtists || "—"}</td>
                    <td className="py-2.5 pr-3" style={{ color: "var(--muted-text)" }}>{t.composer || "—"}</td>
                    <td className="py-2.5 pr-3" style={{ color: "var(--muted-text)" }}>{t.producer || "—"}</td>
                    <td className="py-2.5 text-center text-white pr-3">{t.duration || "—"}</td>
                    <td className="py-2.5 text-center">
                      {t.explicit ? <span className="text-red-400 font-bold">E</span> : <span style={{ color: "var(--muted-text)" }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platforms & Territories */}
        <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #10b98155, transparent)" }} />
          <h2 className="text-base font-semibold text-white mb-3">Plataformas y Territorios</h2>
          <p className="text-xs mb-4" style={{ color: "var(--muted-text)" }}>Territorios: {release.territories.join(", ")}</p>
          <div className="flex flex-wrap gap-2">
            {release.platforms.map((p) => {
              const color = PLATFORM_COLORS[p] ?? "#7c3aed";
              return (
                <span key={p} className="text-xs px-3 py-1.5 rounded-lg font-medium"
                  style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>
                  {p}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
