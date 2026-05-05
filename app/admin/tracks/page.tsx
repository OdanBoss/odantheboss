"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import PlatformBadge from "@/components/PlatformBadge";
import { tracks as initialTracks, Track, Platform, formatNumber, formatCurrency } from "@/lib/data";
import { Plus, Edit2, Trash2, X, CheckCircle, AlertCircle } from "lucide-react";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const allPlatforms: Platform[] = ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer", "SoundCloud"];

const statusConfig = {
  active: { label: "Activo", color: "text-emerald-400", bg: "rgba(52,211,153,0.1)", icon: CheckCircle },
  pending: { label: "Pendiente", color: "text-amber-400", bg: "rgba(251,191,36,0.1)", icon: AlertCircle },
  rejected: { label: "Rechazado", color: "text-red-400", bg: "rgba(248,113,113,0.1)", icon: AlertCircle },
};

type ModalMode = "add" | "edit" | null;

function emptyTrack(): Omit<Track, "id"> {
  return { title: "", artist: "OdanTheBoss", album: "", releaseDate: "", genre: "", streams: 0, revenue: 0, platforms: [], status: "pending", duration: "", cover: "" };
}

export default function AdminTracksPage() {
  const [trackList, setTrackList] = useState<Track[]>(initialTracks);
  const [modal, setModal] = useState<ModalMode>(null);
  const [editing, setEditing] = useState<Track | null>(null);
  const [form, setForm] = useState<Omit<Track, "id">>(emptyTrack());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  function openAdd() {
    setForm(emptyTrack());
    setEditing(null);
    setModal("add");
  }

  function openEdit(t: Track) {
    setForm({ title: t.title, artist: t.artist, album: t.album, releaseDate: t.releaseDate, genre: t.genre, streams: t.streams, revenue: t.revenue, platforms: t.platforms, status: t.status, duration: t.duration, cover: t.cover });
    setEditing(t);
    setModal("edit");
  }

  function save() {
    if (modal === "add") {
      setTrackList((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    } else if (editing) {
      setTrackList((prev) => prev.map((t) => t.id === editing.id ? { ...form, id: t.id } : t));
    }
    setModal(null);
  }

  function del(id: string) {
    setTrackList((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
  }

  function togglePlatform(p: Platform) {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(p) ? f.platforms.filter((x) => x !== p) : [...f.platforms, p],
    }));
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}>Canciones</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>{trackList.length} canciones en el catálogo</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 4px 15px rgba(124,58,237,0.35)" }}>
            <Plus size={16} /> Agregar Canción
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden relative" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs border-b" style={{ color: "var(--muted-text)", borderColor: "var(--glass-border)" }}>
                <th className="text-left px-6 py-4 font-medium">Canción</th>
                <th className="text-left px-4 py-4 font-medium">Álbum</th>
                <th className="text-left px-4 py-4 font-medium">Género</th>
                <th className="text-right px-4 py-4 font-medium">Streams</th>
                <th className="text-right px-4 py-4 font-medium">Ingresos</th>
                <th className="text-left px-4 py-4 font-medium">Plataformas</th>
                <th className="text-center px-4 py-4 font-medium">Estado</th>
                <th className="text-right px-6 py-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--glass-border)" }}>
              {trackList.map((track, i) => {
                const st = statusConfig[track.status];
                return (
                  <tr key={track.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: `hsl(${i * 40 + 260}, 65%, 45%)` }}>
                          {track.title.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{track.title}</p>
                          <p className="text-xs" style={{ color: "var(--muted-text)" }}>{track.artist} · {track.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs" style={{ color: "var(--muted-text)" }}>{track.album}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "var(--muted)", color: "#a855f7" }}>{track.genre}</span>
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-white">{formatNumber(track.streams)}</td>
                    <td className="px-4 py-4 text-right text-emerald-400 font-semibold">{formatCurrency(track.revenue)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {track.platforms.slice(0, 2).map((p) => <PlatformBadge key={p} name={p} />)}
                        {track.platforms.length > 2 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-md" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>+{track.platforms.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${st.color}`} style={{ background: st.bg }}>{st.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(track)} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors" style={{ color: "var(--muted-text)" }}>
                          <Edit2 size={14} />
                        </button>
                        {deleteConfirm === track.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => del(track.id)} className="text-xs px-2 py-1 rounded-lg text-white" style={{ background: "#ef4444" }}>Sí</button>
                            <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 rounded-lg" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>No</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(track.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-red-400">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-6 relative" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">{modal === "add" ? "Agregar Canción" : "Editar Canción"}</h2>
              <button onClick={() => setModal(null)} style={{ color: "var(--muted-text)" }}><X size={20} /></button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {[
                { label: "Título", key: "title" },
                { label: "Artista", key: "artist" },
                { label: "Álbum", key: "album" },
                { label: "Género", key: "genre" },
                { label: "Duración (mm:ss)", key: "duration" },
                { label: "Fecha de Lanzamiento", key: "releaseDate", type: "date" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>{label}</label>
                  <input
                    type={type ?? "text"}
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Estado</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Track["status"] }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(16,16,28,0.9)", border: "1px solid var(--glass-border)" }}
                >
                  <option value="active">Activo</option>
                  <option value="pending">Pendiente</option>
                  <option value="rejected">Rechazado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--muted-text)" }}>Plataformas</label>
                <div className="flex flex-wrap gap-2">
                  {allPlatforms.map((p) => (
                    <button key={p} type="button" onClick={() => togglePlatform(p)}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all"
                      style={{
                        background: form.platforms.includes(p) ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.04)",
                        color: form.platforms.includes(p) ? "#a855f7" : "var(--muted-text)",
                        border: form.platforms.includes(p) ? "1px solid rgba(168,85,247,0.4)" : "1px solid var(--glass-border)",
                      }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm font-medium" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>
                Cancelar
              </button>
              <button onClick={save} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
                {modal === "add" ? "Agregar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
