"use client";

import { useState } from "react";
import { Radio, Check, Plus, X } from "lucide-react";

const GENRE_OPTIONS = ["Reggaeton", "Trap Latino", "Pop Latino", "Hip-Hop Latino", "Cumbia Digital", "Electronic Latino", "Salsa", "Bachata", "R&B Latino", "Dembow"];

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [genreInput, setGenreInput] = useState("");
  const [form, setForm] = useState({
    labelName: "",
    contactName: "",
    email: "",
    phone: "",
    genres: [] as string[],
    catalogSize: "",
    instagram: "",
    spotify: "",
    website: "",
    message: "",
  });

  function addGenre(g: string) {
    if (!g.trim() || form.genres.includes(g)) return;
    setForm((f) => ({ ...f, genres: [...f.genres, g] }));
    setGenreInput("");
  }

  function removeGenre(g: string) {
    setForm((f) => ({ ...f, genres: f.genres.filter((x) => x !== g) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, var(--background) 70%)" }}>
        <div className="max-w-md w-full text-center space-y-6 rounded-2xl p-10"
          style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid var(--glass-border)", boxShadow: "var(--glass-shadow)" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ background: "rgba(52,211,153,0.15)", border: "2px solid rgba(52,211,153,0.4)" }}>
            <Check size={40} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">¡Solicitud Enviada!</h2>
            <p className="text-lg font-medium mt-1" style={{ color: "#a855f7" }}>{form.labelName}</p>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--muted-text)" }}>
              Hemos recibido tu solicitud. El equipo de OdanTheBoss Distribution la revisará en los próximos 3-5 días hábiles y te contactará a <strong className="text-white">{form.email}</strong>.
            </p>
          </div>
          <button onClick={() => setSubmitted(false)} className="text-sm font-medium" style={{ color: "#a855f7" }}>
            Enviar otra solicitud →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex w-5/12 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d0d1a 0%, rgba(124,58,237,0.3) 50%, #12122a 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}>
            <Radio size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white">OdanTheBoss</p>
            <p className="text-xs" style={{ color: "#a855f7" }}>Music Distribution</p>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white leading-tight" style={{ textShadow: "0 0 30px rgba(168,85,247,0.4)" }}>
              Distribuye tu música al mundo
            </h1>
            <p className="text-lg mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Lleva tu catálogo a más de 15 plataformas de streaming globales con comisiones transparentes y pagos puntuales.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "🎵", title: "15+ Plataformas", desc: "Spotify, Apple Music, Tidal y más" },
              { icon: "💰", title: "85% de Regalías", desc: "Solo el 15% de comisión" },
              { icon: "📊", title: "Analítica en Tiempo Real", desc: "Dashboard con tus métricas" },
              { icon: "⚡", title: "Distribución Rápida", desc: "Aprobación en 2-3 días hábiles" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="font-semibold text-white">{f.title}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2026 OdanTheBoss Distribution. Todos los derechos reservados.
        </p>
      </div>

      {/* Right panel: form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-lg space-y-6">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
              <Radio size={18} className="text-white" />
            </div>
            <p className="font-bold text-white">OdanTheBoss Distribution</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Solicitud de Distribución</h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>Completa el formulario y nos pondremos en contacto contigo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl p-6 space-y-4 relative overflow-hidden"
              style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid var(--glass-border)", boxShadow: "var(--glass-shadow)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
              <h3 className="text-sm font-semibold text-white">Información del Sello</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Nombre del Sello *</label>
                  <input required type="text" value={form.labelName} onChange={(e) => setForm((f) => ({ ...f, labelName: e.target.value }))}
                    placeholder="Mi Sello Records"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Nombre de Contacto *</label>
                  <input required type="text" value={form.contactName} onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Teléfono</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+1 (305) 000-0000"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="tu@sello.com"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 space-y-4 relative overflow-hidden"
              style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid var(--glass-border)", boxShadow: "var(--glass-shadow)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ec489955, transparent)" }} />
              <h3 className="text-sm font-semibold text-white">Catálogo Musical</h3>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--muted-text)" }}>Géneros Musicales</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.genres.map((g) => (
                    <span key={g} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(124,58,237,0.2)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}>
                      {g}
                      <button type="button" onClick={() => removeGenre(g)} className="hover:text-white"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select value={genreInput} onChange={(e) => setGenreInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(12,12,24,0.95)", border: "1px solid var(--glass-border)" }}>
                    <option value="">Seleccionar género...</option>
                    {GENRE_OPTIONS.filter((g) => !form.genres.includes(g)).map((g) => <option key={g}>{g}</option>)}
                  </select>
                  <button type="button" onClick={() => addGenre(genreInput)} disabled={!genreInput}
                    className="px-3 py-2 rounded-xl transition-all flex items-center"
                    style={{ background: genreInput ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.04)", color: genreInput ? "#a855f7" : "var(--muted-text)", border: "1px solid var(--glass-border)" }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Tamaño del Catálogo (nº canciones)</label>
                <input type="number" min="1" value={form.catalogSize} onChange={(e) => setForm((f) => ({ ...f, catalogSize: e.target.value }))}
                  placeholder="Ej: 50"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
              </div>
            </div>

            <div className="rounded-2xl p-6 space-y-4 relative overflow-hidden"
              style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid var(--glass-border)", boxShadow: "var(--glass-shadow)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #10b98155, transparent)" }} />
              <h3 className="text-sm font-semibold text-white">Redes Sociales (opcional)</h3>
              <div className="space-y-3">
                {[
                  { label: "Instagram", key: "instagram", placeholder: "@tusello" },
                  { label: "Spotify", key: "spotify", placeholder: "URL o nombre de artista" },
                  { label: "Sitio Web", key: "website", placeholder: "www.tusello.com" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>{label}</label>
                    <input type="text" value={(form as unknown as Record<string, string>)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 space-y-4 relative overflow-hidden"
              style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid var(--glass-border)", boxShadow: "var(--glass-shadow)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #f59e0b55, transparent)" }} />
              <h3 className="text-sm font-semibold text-white">Mensaje</h3>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Cuéntanos sobre tu sello y tus objetivos</label>
                <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={4} placeholder="Describe tu sello, tus artistas, tus metas de distribución..."
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
              </div>
            </div>

            <button type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
