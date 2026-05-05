"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { labelApplications } from "@/lib/data";
import { CheckCircle, Check } from "lucide-react";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const allPlatforms = ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer", "SoundCloud"];

const steps = ["Contrato", "Perfil", "Plataformas", "Completado"];

export default function OnboardingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const app = labelApplications.find((a) => a.id === id);

  const [step, setStep] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [profile, setProfile] = useState({
    name: app?.labelName ?? "",
    bio: "",
    genre: app?.genres[0] ?? "",
    instagram: app?.socialLinks.instagram ?? "",
    spotify: app?.socialLinks.spotify ?? "",
    website: app?.socialLinks.website ?? "",
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  function togglePlatform(p: string) {
    setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  }

  if (!app) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-white">Solicitud no encontrada</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}>
            Onboarding — {app.labelName}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>Proceso de incorporación del sello</p>
        </div>

        {/* Progress */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: i + 1 < step ? "#a855f7" : i + 1 === step ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)",
                    color: i + 1 <= step ? "white" : "var(--muted-text)",
                    boxShadow: i + 1 === step ? "var(--glow-accent)" : "none",
                  }}>
                  {i + 1 < step ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs" style={{ color: i + 1 === step ? "#a855f7" : "var(--muted-text)" }}>{s}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-4 right-4 h-0.5 -z-10" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full transition-all duration-500" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }} />
          </div>
        </div>

        {/* Step 1: Contract */}
        {step === 1 && (
          <div className="rounded-2xl p-6 space-y-5 relative overflow-hidden" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
            <h2 className="text-lg font-semibold text-white">Contrato de Distribución</h2>
            <div className="rounded-xl p-5 text-sm space-y-3 leading-relaxed max-h-72 overflow-y-auto"
              style={{ background: "rgba(255,255,255,0.03)", color: "var(--muted-text)", border: "1px solid var(--glass-border)" }}>
              <p className="font-semibold text-white">ACUERDO DE DISTRIBUCIÓN DIGITAL — OdanTheBoss Distribution</p>
              <p>Este acuerdo establece los términos y condiciones bajo los cuales OdanTheBoss Distribution ("Distribuidor") distribuirá digitalmente el contenido musical del sello discográfico ("Sello").</p>
              <p><strong className="text-white">1. DERECHOS CONCEDIDOS:</strong> El Sello otorga al Distribuidor el derecho no exclusivo de distribuir y comercializar el contenido musical en las plataformas digitales acordadas.</p>
              <p><strong className="text-white">2. REGALÍAS:</strong> El Distribuidor retendrá una comisión del 15% sobre los ingresos netos generados. El 85% restante será transferido al Sello mensualmente.</p>
              <p><strong className="text-white">3. PLAZOS:</strong> El contrato tiene una duración inicial de 12 meses, renovable automáticamente salvo aviso con 30 días de anticipación.</p>
              <p><strong className="text-white">4. GARANTÍAS:</strong> El Sello garantiza ser titular o tener licencia de todos los derechos sobre el contenido distribuido.</p>
              <p><strong className="text-white">5. TERMINACIÓN:</strong> Cualquier incumplimiento de los términos resultará en la terminación inmediata del acuerdo y la retirada del contenido de todas las plataformas.</p>
              <p><strong className="text-white">6. LEY APLICABLE:</strong> Este acuerdo se rige por las leyes del Estado de Florida, Estados Unidos.</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setAccepted(!accepted)}
                className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all"
                style={{
                  background: accepted ? "#a855f7" : "transparent",
                  border: `2px solid ${accepted ? "#a855f7" : "rgba(255,255,255,0.2)"}`,
                }}>
                {accepted && <Check size={12} className="text-white" />}
              </div>
              <span className="text-sm" style={{ color: "var(--muted-text)" }}>
                Acepto los términos y condiciones del acuerdo de distribución
              </span>
            </label>
            <button onClick={() => setStep(2)} disabled={!accepted}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: accepted ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)", opacity: accepted ? 1 : 0.5, cursor: accepted ? "pointer" : "not-allowed" }}>
              Continuar →
            </button>
          </div>
        )}

        {/* Step 2: Profile */}
        {step === 2 && (
          <div className="rounded-2xl p-6 space-y-5 relative overflow-hidden" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ec489955, transparent)" }} />
            <h2 className="text-lg font-semibold text-white">Perfil del Sello</h2>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
              {profile.name.charAt(0)}
            </div>
            <div className="space-y-4">
              {[
                { label: "Nombre del Sello", key: "name" },
                { label: "Biografía", key: "bio", textarea: true },
                { label: "Género Principal", key: "genre" },
                { label: "Instagram", key: "instagram", placeholder: "@usuario" },
                { label: "Spotify", key: "spotify", placeholder: "URL o nombre" },
                { label: "Sitio Web", key: "website", placeholder: "www.ejemplo.com" },
              ].map(({ label, key, textarea, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>{label}</label>
                  {textarea ? (
                    <textarea
                      value={(profile as Record<string, string>)[key]}
                      onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                      rows={3}
                      placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={(profile as Record<string, string>)[key]}
                      onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-sm" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>← Atrás</button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>Continuar →</button>
            </div>
          </div>
        )}

        {/* Step 3: Platforms */}
        {step === 3 && (
          <div className="rounded-2xl p-6 space-y-5 relative overflow-hidden" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #10b98155, transparent)" }} />
            <h2 className="text-lg font-semibold text-white">Selecciona las Plataformas</h2>
            <p className="text-sm" style={{ color: "var(--muted-text)" }}>Selecciona mínimo una plataforma para distribución</p>
            <div className="grid grid-cols-2 gap-3">
              {allPlatforms.map((p) => {
                const selected = selectedPlatforms.includes(p);
                return (
                  <button key={p} type="button" onClick={() => togglePlatform(p)}
                    className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium text-left transition-all"
                    style={{
                      background: selected ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                      border: selected ? "1px solid rgba(168,85,247,0.5)" : "1px solid var(--glass-border)",
                      color: selected ? "#a855f7" : "var(--muted-text)",
                      boxShadow: selected ? "var(--glow-accent)" : "none",
                    }}>
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: selected ? "#a855f7" : "rgba(255,255,255,0.1)" }}>
                      {selected && <Check size={8} className="text-white m-auto mt-0.5" />}
                    </div>
                    {p}
                  </button>
                );
              })}
            </div>
            {selectedPlatforms.length === 0 && (
              <p className="text-xs text-red-400">Selecciona al menos una plataforma para continuar</p>
            )}
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-sm" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>← Atrás</button>
              <button onClick={() => setStep(4)} disabled={selectedPlatforms.length === 0}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: selectedPlatforms.length > 0 ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)", opacity: selectedPlatforms.length > 0 ? 1 : 0.5 }}>
                Finalizar →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="rounded-2xl p-8 text-center space-y-5 relative overflow-hidden" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #10b98155, transparent)" }} />
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
              style={{ background: "rgba(52,211,153,0.15)", border: "2px solid rgba(52,211,153,0.4)" }}>
              <CheckCircle size={40} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">¡Bienvenido!</h2>
              <p className="text-lg font-medium mt-1" style={{ color: "#a855f7" }}>{profile.name}</p>
              <p className="text-sm mt-3" style={{ color: "var(--muted-text)" }}>
                El sello ha sido incorporado exitosamente a OdanTheBoss Distribution.
                Tu contenido comenzará a distribuirse en {selectedPlatforms.length} plataforma{selectedPlatforms.length > 1 ? "s" : ""} en las próximas 24-48 horas.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedPlatforms.map((p) => (
                <span key={p} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(124,58,237,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}>{p}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => router.push("/admin")} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
                Ir al Panel Admin
              </button>
              <button onClick={() => router.push("/admin/applications")} className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted-text)", border: "1px solid var(--glass-border)" }}>
                Ver Solicitudes
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
