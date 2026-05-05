"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import PlatformBadge from "@/components/PlatformBadge";
import { albums as initialAlbums, Album, Platform, formatNumber, formatCurrency } from "@/lib/data";
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
  active: { label: "Activo", color: "text-emerald-400", bg: "rgba(52,211,153,0.1)" },
  pending: { label: "Pendiente", color: "text-amber-400", bg: "rgba(251,191,36,0.1)" },
  rejected: { label: "Rechazado", color: "text-red-400", bg: "rgba(248,113,113,0.1)" },
};

function emptyAlbum(): Omit<Album, "id"> {
  return { title: "", artist: "OdanTheBoss", releaseDate: "", tracks: 0, streams: 0, revenue: 0, platforms: [], status: "pending", cover: "", genre: "" };
}

export default function AdminAlbumsPage() {
  const [albumList, setAlbumList] = useState<Album[]>(initialAlbums);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Album | null>(null);
  const [form, setForm] = useState<Omit<Album, "id">>(emptyAlbum());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  function openAdd() { setForm(emptyAlbum()); setEditing(null); setModal("add"); }
  function openEdit(a: Album) {
    setForm({ title: a.title, artist: a.artist, releaseDate: a.releaseDate, tracks: a.tracks, streams: a.streams, revenue: a.revenue, platforms: a.platforms, status: a.status, cover: a.cover, genre: a.genre });
    setEditing(a); setModal("edit");
  }

  function save() {
    if (modal === "add") {
      setAlbumList((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    } else if (editing) {
      setAlbumList((prev) => prev.map((a) => a.id === editing.id ? { ...form, id: a.id } : a));
    }
    setModal(null);
  }

  function del(id: string) { setAlbumList((prev) => prev.filter((a) => a.id !== id)); setDeleteConfirm(null); }

  function togglePlatform(p: Platform) {
    setForm((f) => ({ ...f, platforms: f.platforms.includes(p) ? f.platforms.filter((x) => x !== p) : [...f.platforms, p] }));
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gestión de Álbumes</h1>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>Administra y publica tus álbumes: {albumList.length} álbumes distribuidos</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white transition-all transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ec4899, #a855f7)",
              boxShadow: "0 6px 20px rgba(236,72,153,0.4)"
            }}>
            <Plus size={18} /> Agregar Álbum
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          {albumList.map((album, i) => {
            const st = statusConfig[album.status];
            return (
              <div key={album.id} className="rounded-3xl p-6 flex gap-5 relative overflow-hidden group transition-all transform hover:scale-105 hover:-translate-y-1" style={{
                ...glassCard,
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(255,255,255,0.1) inset",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, hsl(${i * 80 + 240}, 70%, 55%)55, transparent)` }} />
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
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${st.color}`} style={{ background: st.bg }}>{st.label}</span>
                      <button onClick={() => openEdit(album)} className="p-1.5 rounded-lg hover:bg-white/[0.06]" style={{ color: "var(--muted-text)" }}><Edit2 size={14} /></button>
                      {deleteConfirm === album.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => del(album.id)} className="text-xs px-2 py-1 rounded-lg text-white" style={{ background: "#ef4444" }}>Sí</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 rounded-lg" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>No</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(album.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 size={14} /></button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs">
                    <div><p style={{ color: "var(--muted-text)" }}>Canciones</p><p className="font-semibold text-white mt-0.5">{album.tracks}</p></div>
                    <div><p style={{ color: "var(--muted-text)" }}>Streams</p><p className="font-semibold text-white mt-0.5">{formatNumber(album.streams)}</p></div>
                    <div><p style={{ color: "var(--muted-text)" }}>Ingresos</p><p className="font-semibold text-emerald-400 mt-0.5">{formatCurrency(album.revenue)}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {album.platforms.slice(0, 3).map((p) => <PlatformBadge key={p} name={p} />)}
                    {album.platforms.length > 3 && <span className="text-[11px] px-2 py-0.5 rounded-md" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>+{album.platforms.length - 3}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-6 relative" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ec489955, transparent)" }} />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">{modal === "add" ? "Agregar Álbum" : "Editar Álbum"}</h2>
              <button onClick={() => setModal(null)} style={{ color: "var(--muted-text)" }}><X size={20} /></button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {[
                { label: "Título", key: "title" },
                { label: "Artista", key: "artist" },
                { label: "Género", key: "genre" },
                { label: "Fecha de Lanzamiento", key: "releaseDate", type: "date" },
                { label: "Nº de Canciones", key: "tracks", type: "number" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>{label}</label>
                  <input
                    type={type ?? "text"}
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Estado</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Album["status"] }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(16,16,28,0.9)", border: "1px solid var(--glass-border)" }}>
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
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>Cancelar</button>
              <button onClick={save} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #ec4899, #a855f7)" }}>
                {modal === "add" ? "Agregar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
