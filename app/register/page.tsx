"use client";

import { useState } from "react";
import { Radio, Check, Plus, X, Music, Zap, Globe, Shield, Mail, Phone, Share2, Headphones } from "lucide-react";

const GENRE_OPTIONS = ["Reggaeton", "Trap Latino", "Pop Latino", "Hip-Hop Latino", "Cumbia Digital", "Electronic Latino", "Salsa", "Bachata", "R&B Latino", "Dembow"];

const features = [
  { icon: Globe, title: "15+ Plataformas", desc: "Spotify, Apple Music, Tidal y más", color: "#7c3aed" },
  { icon: Shield, title: "85% de Regalías", desc: "Solo 15% de comisión directa", color: "#10b981" },
  { icon: Zap, title: "Distribución Rápida", desc: "Aprobación en 2-3 días hábiles", color: "#f59e0b" },
  { icon: Music, title: "Panel Premium", desc: "Analytics en tiempo real", color: "#ec4899" },
];

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
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
        style={{ background: "#080810" }}>
        <div className="fixed inset-0 -z-10" style={{
          background: "#080810",
          backgroundImage: `
            radial-gradient(ellipse 900px 600px at -100px -100px, rgba(124,58,237,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 700px 500px at 110% 110%, rgba(168,85,247,0.15) 0%, transparent 65%)
          `,
        }} />

        <div className="max-w-md w-full text-center space-y-6 rounded-3xl p-12 relative z-10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(168,85,247,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 rgba(168,85,247,0.2) inset",
          }}>

          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto relative"
            style={{
              background: "linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(52,211,153,0.05) 100%)",
              border: "2px solid rgba(52,211,153,0.4)",
              boxShadow: "0 0 24px rgba(52,211,153,0.3)",
            }}>
            <Check size={48} className="text-emerald-400" style={{ filter: "drop-shadow(0 0 8px rgba(52,211,153,0.6))" }} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">¡Solicitud Enviada!</h2>
            <p className="text-lg font-semibold mt-3" style={{ color: "#a855f7" }}>{form.labelName || "Tu Sello"}</p>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Hemos recibido tu solicitud de distribución. Nuestro equipo la revisará en los próximos <strong>3-5 días hábiles</strong> y te contactará a <strong>{form.email}</strong>.
            </p>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ color: "#a855f7" }}>
              ← Enviar otra solicitud
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: "#080810" }}>
      <div className="fixed inset-0 -z-10" style={{
        background: "#080810",
        backgroundImage: `
          radial-gradient(ellipse 900px 600px at -100px -100px, rgba(124,58,237,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 110% 110%, rgba(168,85,247,0.15) 0%, transparent 65%)
        `,
      }} />

      {/* Left panel */}
      <div className="hidden lg:flex w-5/12 flex-col justify-between p-12 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 0 24px rgba(124,58,237,0.4)",
            }}>
            <Radio size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-lg text-white">OdanTheBoss</p>
            <p className="text-xs" style={{ color: "#a855f7" }}>Music Distribution</p>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-10">
          <div>
            <h1 className="text-5xl font-extrabold text-white leading-tight" style={{ textShadow: "0 0 40px rgba(168,85,247,0.5)" }}>
              Distribuye tu música al mundo
            </h1>
            <p className="text-lg mt-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Llega a más de 15 plataformas de streaming con comisiones transparentes, pagos puntuales y un equipo que realmente entiende la música latina.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="group p-5 rounded-2xl transition-all hover:translate-y--1 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-all"
                  style={{
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                  }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="font-semibold text-white text-sm">{title}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          © 2026 OdanTheBoss. Distribución de música para artistas y sellos latinoamericanos.
        </p>
      </div>

      {/* Right panel: form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto relative z-10">
        <div className="w-full max-w-lg space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
              <Radio size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white">OdanTheBoss</p>
              <p className="text-xs" style={{ color: "#a855f7" }}>Distribution</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">Únete a nosotros</h2>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>Completa tu solicitud y comienza a distribuir hoy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Label Info */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(124,58,237,0.2)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 -1px 0 0 rgba(124,58,237,0.1) inset",
              }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #7c3aed, transparent)",
                opacity: 0.8,
              }} />
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <Mail size={18} style={{ color: "#7c3aed" }} />
                Información Básica
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-white">Nombre del Sello *</label>
                  <input
                    required
                    type="text"
                    value={form.labelName}
                    onChange={(e) => setForm((f) => ({ ...f, labelName: e.target.value }))}
                    placeholder="Mi Sello Records"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-white">Nombre de Contacto *</label>
                    <input
                      required
                      type="text"
                      value={form.contactName}
                      onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                      placeholder="Juan Pérez"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-white">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="tu@sello.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-white">Teléfono</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+1 (305) 000-0000"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Catalog Info */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(236,72,153,0.2)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 -1px 0 0 rgba(236,72,153,0.1) inset",
              }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #ec4899, transparent)",
                opacity: 0.8,
              }} />
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <Music size={18} style={{ color: "#ec4899" }} />
                Tu Catálogo
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-3 text-white">Géneros Principales</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {form.genres.map((g) => (
                      <span
                        key={g}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-pink-500/20"
                        style={{
                          background: "rgba(236,72,153,0.2)",
                          color: "#ec4899",
                          border: "1px solid rgba(236,72,153,0.4)",
                        }}>
                        {g}
                        <button
                          type="button"
                          onClick={() => removeGenre(g)}
                          className="hover:text-white transition-colors">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={genreInput}
                      onChange={(e) => setGenreInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}>
                      <option value="">Seleccionar género...</option>
                      {GENRE_OPTIONS.filter((g) => !form.genres.includes(g)).map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => addGenre(genreInput)}
                      disabled={!genreInput}
                      className="px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-medium"
                      style={{
                        background: genreInput ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
                        color: genreInput ? "#a855f7" : "var(--muted-text)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-white">Tamaño del Catálogo</label>
                  <input
                    type="number"
                    min="1"
                    value={form.catalogSize}
                    onChange={(e) => setForm((f) => ({ ...f, catalogSize: e.target.value }))}
                    placeholder="Ej: 50 canciones"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Social & Message */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(16,185,129,0.2)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 -1px 0 0 rgba(16,185,129,0.1) inset",
              }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #10b981, transparent)",
                opacity: 0.8,
              }} />
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <Globe size={18} style={{ color: "#10b981" }} />
                Presencia Digital (opcional)
              </h3>

              <div className="space-y-3">
                {[
                  { label: "Instagram", key: "instagram", placeholder: "@tusello", Icon: Share2 },
                  { label: "Spotify", key: "spotify", placeholder: "URL o nombre de artista", Icon: Headphones },
                  { label: "Sitio Web", key: "website", placeholder: "www.tusello.com", Icon: Globe },
                ].map(({ label, key, placeholder, Icon: IconComponent }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold mb-2 text-white flex items-center gap-2">
                      <IconComponent size={14} style={{ color: "#10b981" }} />
                      {label}
                    </label>
                    <input
                      type="text"
                      value={(form as unknown as Record<string, string>)[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <label className="block text-xs font-semibold mb-2 text-white">Cuéntanos sobre ti</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={3}
                  placeholder="Tu visión, tus artistas, tus objetivos de distribución..."
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none transition-all focus:ring-2 focus:ring-purple-500/50"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-base font-bold text-white transition-all transform hover:scale-105 hover:-translate-y-1 active:scale-95 duration-200"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 8px 32px rgba(124,58,237,0.4), 0 4px 16px rgba(168,85,247,0.3)",
              }}>
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
