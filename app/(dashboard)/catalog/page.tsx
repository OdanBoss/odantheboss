"use client";

import { useState } from "react";
import { Music2, Disc3, Search, Filter, PlayCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";
import PlatformBadge from "@/components/PlatformBadge";
import { tracks, albums, formatNumber, formatCurrency } from "@/lib/data";

type Tab = "tracks" | "albums";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const statusConfig = {
  active: { label: "Activo", color: "text-emerald-400", bg: "rgba(52,211,153,0.1)", icon: CheckCircle },
  pending: { label: "Pendiente", color: "text-amber-400", bg: "rgba(251,191,36,0.1)", icon: AlertCircle },
  rejected: { label: "Rechazado", color: "text-red-400", bg: "rgba(248,113,113,0.1)", icon: AlertCircle },
};

export default function CatalogPage() {
  const [tab, setTab] = useState<Tab>("tracks");
  const [search, setSearch] = useState("");

  const filteredTracks = tracks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.album.toLowerCase().includes(search.toLowerCase()) ||
    t.genre.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAlbums = albums.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-white mb-2">Tu Catálogo</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Gestiona tus canciones y álbumes distribuidos en plataformas globales</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Total Canciones", value: tracks.length, icon: Music2, accent: "#7c3aed", sub: `${tracks.filter(t => t.status === "active").length} activas` },
          { label: "Total Álbumes", value: albums.length, icon: Disc3, accent: "#ec4899", sub: `${albums.filter(a => a.status === "active").length} activos` },
          { label: "Reproducciones Totales", value: formatNumber(tracks.reduce((s, t) => s + t.streams, 0)), icon: PlayCircle, accent: "#10b981", sub: "Todas las plataformas" },
          { label: "Ingresos del Catálogo", value: formatCurrency(tracks.reduce((s, t) => s + t.revenue, 0)), icon: Clock, accent: "#f59e0b", sub: "Acumulado total" },
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

      {/* Tabs + Search */}
      <div className="flex items-center justify-between gap-6 mt-8">
        <div className="flex gap-2 p-1.5 rounded-lg" style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          {(["tracks", "albums"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
              style={{
                background: tab === t ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "transparent",
                color: tab === t ? "white" : "rgba(255,255,255,0.6)",
                boxShadow: tab === t ? "0 4px 12px rgba(124,58,237,0.3)" : "none",
              }}>
              {t === "tracks" ? `Canciones (${tracks.length})` : `Álbumes (${albums.length})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)"
            }}>
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar canción, álbum..."
              className="bg-transparent outline-none text-white placeholder:text-gray-500 w-40"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all font-medium"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)"
            }}>
            <Filter size={16} />
            Filtrar
          </button>
          <button className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 6px 20px rgba(124,58,237,0.4)"
            }}>
            + Subir
          </button>
        </div>
      </div>

      {/* Tracks table */}
      {tab === "tracks" && (
        <div className="rounded-3xl overflow-hidden relative" style={{
          ...glassCard,
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(124,58,237,0.2) inset",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #7c3aed, transparent)", opacity: 0.8 }} />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs border-b" style={{ color: "var(--muted-text)", borderColor: "var(--card-border)" }}>
                <th className="text-left px-6 py-4 font-medium">#</th>
                <th className="text-left px-4 py-4 font-medium">Canción</th>
                <th className="text-left px-4 py-4 font-medium">Álbum</th>
                <th className="text-left px-4 py-4 font-medium">Género</th>
                <th className="text-right px-4 py-4 font-medium">Streams</th>
                <th className="text-right px-4 py-4 font-medium">Ingresos</th>
                <th className="text-left px-4 py-4 font-medium">Plataformas</th>
                <th className="text-center px-4 py-4 font-medium">Estado</th>
                <th className="text-right px-6 py-4 font-medium">Duración</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--card-border)" }}>
              {filteredTracks.map((track, i) => {
                const st = statusConfig[track.status];
                return (
                  <tr key={track.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-xs" style={{ color: "var(--muted-text)" }}>{i + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: `hsl(${i * 40 + 260}, 65%, 45%)` }}>
                          {track.title.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{track.title}</p>
                          <p className="text-xs" style={{ color: "var(--muted-text)" }}>{track.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4" style={{ color: "var(--muted-text)" }}>{track.album}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "var(--muted)", color: "#a855f7" }}>
                        {track.genre}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-white">{formatNumber(track.streams)}</td>
                    <td className="px-4 py-4 text-right text-emerald-400 font-semibold">{formatCurrency(track.revenue)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {track.platforms.slice(0, 2).map((p) => <PlatformBadge key={p} name={p} />)}
                        {track.platforms.length > 2 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-md" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>
                            +{track.platforms.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${st.color}`} style={{ background: st.bg }}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs" style={{ color: "var(--muted-text)" }}>{track.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Albums grid */}
      {tab === "albums" && (
        <div className="grid grid-cols-2 gap-5">
          {filteredAlbums.map((album, i) => {
            const st = statusConfig[album.status];
            return (
              <div key={album.id} className="rounded-2xl p-5 flex gap-5"
                style={glassCard}>
                <div className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, hsl(${i * 80 + 240}, 70%, 40%), hsl(${i * 80 + 270}, 70%, 55%))` }}>
                  {album.title.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{album.title}</h3>
                      <p className="text-sm mt-0.5" style={{ color: "var(--muted-text)" }}>{album.artist}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${st.color}`} style={{ background: st.bg }}>
                      {st.label}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs">
                    <div>
                      <p style={{ color: "var(--muted-text)" }}>Canciones</p>
                      <p className="font-semibold text-white mt-0.5">{album.tracks}</p>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-text)" }}>Streams</p>
                      <p className="font-semibold text-white mt-0.5">{formatNumber(album.streams)}</p>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-text)" }}>Ingresos</p>
                      <p className="font-semibold text-emerald-400 mt-0.5">{formatCurrency(album.revenue)}</p>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-text)" }}>Lanzamiento</p>
                      <p className="font-semibold text-white mt-0.5">{album.releaseDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {album.platforms.map((p) => <PlatformBadge key={p} name={p} />)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
