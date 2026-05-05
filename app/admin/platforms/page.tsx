"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { platformData as initialData, PlatformData, formatNumber, formatCurrency } from "@/lib/data";
import { TrendingUp, TrendingDown } from "lucide-react";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

export default function AdminPlatformsPage() {
  const [platforms, setPlatforms] = useState<PlatformData[]>(initialData);

  function toggleStatus(name: string) {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.name === name
          ? { ...p, status: p.status === "connected" ? "disconnected" : "connected" }
          : p
      )
    );
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}>Plataformas</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>
            {platforms.filter((p) => p.status === "connected").length} de {platforms.length} plataformas conectadas
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {platforms.map((p) => (
            <div key={p.name} className="rounded-2xl p-5 relative overflow-hidden transition-all" style={glassCard}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${p.color}55, transparent)` }} />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}22` }}>
                    <div className="w-5 h-5 rounded-full" style={{ background: p.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{p.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: p.status === "connected" ? "#34d399" : p.status === "pending" ? "#fbbf24" : "#f87171" }}>
                      {p.status === "connected" ? "Conectado" : p.status === "pending" ? "Pendiente" : "Desconectado"}
                    </p>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  onClick={() => toggleStatus(p.name)}
                  className="relative shrink-0 transition-all duration-300"
                  style={{
                    width: 44, height: 24,
                    background: p.status === "connected" ? p.color : "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    border: `1px solid ${p.status === "connected" ? p.color : "rgba(255,255,255,0.15)"}`,
                    boxShadow: p.status === "connected" ? `0 0 8px ${p.color}66` : "none",
                  }}
                >
                  <span
                    className="absolute top-0.5 transition-all duration-300"
                    style={{
                      width: 20, height: 20,
                      background: "white",
                      borderRadius: "50%",
                      left: p.status === "connected" ? 21 : 2,
                    }}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-lg font-bold text-white">{formatNumber(p.streams)}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>Streams</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-lg font-bold text-emerald-400">{formatCurrency(p.revenue)}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>Ingresos</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "var(--muted-text)" }}>Participación</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{p.share}%</span>
                    <span className={`flex items-center gap-0.5 ${p.growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {p.growth >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {Math.abs(p.growth)}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.share}%`, background: p.color, boxShadow: `0 0 8px ${p.color}44` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
