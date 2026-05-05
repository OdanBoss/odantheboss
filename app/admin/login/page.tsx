"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Radio, Eye, EyeOff, Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 200));
    const ok = login(username, password);
    if (ok) {
      router.push("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, var(--background) 70%)",
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow), 0 0 60px rgba(124,58,237,0.15)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "var(--glow-purple)" }}
          >
            <Radio size={26} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Acceso Admin</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>OdanTheBoss Distribution</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Usuario</label>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }}
            >
              <User size={16} style={{ color: "var(--muted-text)" }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>Contraseña</label>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }}
            >
              <Lock size={16} style={{ color: "var(--muted-text)" }} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-600"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: "var(--muted-text)" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm text-red-400" style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 4px 15px rgba(124,58,237,0.4)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Verificando..." : "Entrar al Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
