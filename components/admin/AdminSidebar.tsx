"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Music2,
  Disc3,
  Globe,
  FileText,
  Settings,
  Radio,
  ChevronRight,
  LogOut,
  Upload,
} from "lucide-react";
import { labelApplications } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Panel Admin" },
  { href: "/admin/tracks", icon: Music2, label: "Canciones" },
  { href: "/admin/albums", icon: Disc3, label: "Álbumes" },
  { href: "/admin/platforms", icon: Globe, label: "Plataformas" },
  { href: "/admin/releases", icon: Upload, label: "Lanzamientos" },
  { href: "/admin/applications", icon: FileText, label: "Solicitudes" },
  { href: "/admin/settings", icon: Settings, label: "Configuración" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const pendingCount = labelApplications.filter((a) => a.status === "pending").length;

  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 flex flex-col z-20"
      style={{
        background: "var(--gradient-sidebar)",
        borderRight: "1px solid var(--glass-border)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: "var(--glass-border)" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "var(--glow-purple)" }}
        >
          <Radio size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-sm text-white leading-tight">OdanTheBoss</p>
          <p className="text-xs" style={{ color: "#a855f7" }}>Admin Panel</p>
        </div>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: active ? "var(--active-nav-bg)" : "transparent",
                color: active ? "#a855f7" : "var(--muted-text)",
                border: active ? "1px solid rgba(168,85,247,0.3)" : "1px solid transparent",
                boxShadow: active ? "var(--glow-accent)" : "none",
              }}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r" style={{ height: "60%", background: "#a855f7" }} />
              )}
              <Icon size={18} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {href === "/admin/applications" && pendingCount > 0 && (
                <span className="text-[11px] px-1.5 py-0.5 rounded-full text-white font-bold" style={{ background: "#7c3aed" }}>
                  {pendingCount}
                </span>
              )}
              {active && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "var(--glass-border)" }}>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-red-500/10"
          style={{ color: "#f87171" }}
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
        <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Administrador</p>
              <p className="text-[11px]" style={{ color: "var(--muted-text)" }}>admin@odantheboss.com</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}
