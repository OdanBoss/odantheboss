"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { Check } from "lucide-react";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="relative shrink-0 transition-all duration-300"
      style={{ width: 44, height: 24, background: value ? "#a855f7" : "rgba(255,255,255,0.1)", borderRadius: 12, border: `1px solid ${value ? "#a855f7" : "rgba(255,255,255,0.15)"}`, boxShadow: value ? "0 0 8px rgba(168,85,247,0.4)" : "none" }}>
      <span className="absolute top-0.5 transition-all duration-300"
        style={{ width: 20, height: 20, background: "white", borderRadius: "50%", left: value ? 21 : 2 }} />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({ name: "OdanTheBoss", bio: "Artista independiente de reggaeton y trap latino.", genre: "Reggaeton", photoUrl: "" });
  const [account, setAccount] = useState({ email: "admin@odantheboss.com", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [prefs, setPrefs] = useState({ emailNotifs: true, pushNotifs: false, royaltyAlerts: true, distributionAlerts: true });
  const [saved, setSaved] = useState<string | null>(null);

  function saveSection(section: string) {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}>Configuración</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>Gestiona tu perfil y preferencias</p>
        </div>

        {/* Perfil del Artista */}
        <div className="rounded-2xl p-6 space-y-5 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
          <h2 className="text-base font-semibold text-white">Perfil del Artista</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <input type="text" value={profile.photoUrl} onChange={(e) => setProfile((p) => ({ ...p, photoUrl: e.target.value }))}
                placeholder="URL de foto de perfil (opcional)"
                className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Nombre Artístico", key: "name" },
              { label: "Género Principal", key: "genre" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>{label}</label>
                <input type="text" value={(profile as Record<string, string>)[key]}
                  onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Biografía</label>
              <textarea value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                rows={3} className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
            </div>
          </div>
          <button onClick={() => saveSection("profile")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: saved === "profile" ? "rgba(52,211,153,0.3)" : "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
            {saved === "profile" ? <><Check size={14} /> Guardado</> : "Guardar Perfil"}
          </button>
        </div>

        {/* Información de Cuenta */}
        <div className="rounded-2xl p-6 space-y-5 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #10b98155, transparent)" }} />
          <h2 className="text-base font-semibold text-white">Información de Cuenta</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Email</label>
              <input type="email" value={account.email} onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
            </div>
            {[
              { label: "Contraseña Actual", key: "currentPassword" },
              { label: "Nueva Contraseña", key: "newPassword" },
              { label: "Confirmar Nueva Contraseña", key: "confirmPassword" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>{label}</label>
                <input type="password" value={(account as Record<string, string>)[key]}
                  onChange={(e) => setAccount((a) => ({ ...a, [key]: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }} />
              </div>
            ))}
          </div>
          <button onClick={() => saveSection("account")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: saved === "account" ? "rgba(52,211,153,0.3)" : "linear-gradient(135deg, #10b981, #059669)" }}>
            {saved === "account" ? <><Check size={14} /> Guardado</> : "Guardar Cuenta"}
          </button>
        </div>

        {/* Preferencias */}
        <div className="rounded-2xl p-6 space-y-5 relative overflow-hidden" style={glassCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #f59e0b55, transparent)" }} />
          <h2 className="text-base font-semibold text-white">Preferencias de Notificaciones</h2>
          <div className="space-y-4">
            {[
              { label: "Notificaciones por Email", desc: "Recibe actualizaciones en tu correo", key: "emailNotifs" },
              { label: "Notificaciones Push", desc: "Alertas en tiempo real en el navegador", key: "pushNotifs" },
              { label: "Alertas de Regalías", desc: "Notificaciones cuando se generen pagos", key: "royaltyAlerts" },
              { label: "Alertas de Distribución", desc: "Estado de aprobación en plataformas", key: "distributionAlerts" },
            ].map(({ label, desc, key }) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{desc}</p>
                </div>
                <Toggle value={(prefs as Record<string, boolean>)[key]} onChange={() => setPrefs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }))} />
              </div>
            ))}
          </div>
          <button onClick={() => saveSection("prefs")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: saved === "prefs" ? "rgba(52,211,153,0.3)" : "linear-gradient(135deg, #f59e0b, #d97706)" }}>
            {saved === "prefs" ? <><Check size={14} /> Guardado</> : "Guardar Preferencias"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
