"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Music2,
  TrendingUp,
  Globe,
  DollarSign,
  Bell,
  Settings,
  Radio,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { notifications } from "@/lib/data";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Resumen" },
  { href: "/catalog", icon: Music2, label: "Catálogo" },
  { href: "/revenue", icon: TrendingUp, label: "Ingresos" },
  { href: "/distribution", icon: Globe, label: "Distribución" },
  { href: "/royalties", icon: DollarSign, label: "Regalías" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const unread = notifications.filter((n) => !n.read).length;
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col z-20 transition-all duration-300"
      style={{
        width: collapsed ? "80px" : "256px",
        background: "linear-gradient(180deg, rgba(13,13,26,0.97) 0%, rgba(18,18,42,0.97) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(124,58,237,0.2)",
        boxShadow: "4px 0 40px rgba(0,0,0,0.6), inset -1px 0 0 rgba(124,58,237,0.1)",
      }}
    >
      {/* Logo & Toggle */}
      <div
        className="flex items-center justify-between px-6 py-5 border-b"
        style={{ borderColor: "var(--glass-border)" }}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "var(--glow-purple)",
              }}
            >
              <Radio size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-white leading-tight truncate">OdanTheBoss</p>
              <p className="text-xs" style={{ color: "var(--muted-text)" }}>Music Distribution</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mx-auto"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "var(--glow-purple)",
            }}
          >
            <Radio size={18} className="text-white" />
          </div>
        )}
        <button
          onClick={toggle}
          className="p-1.5 rounded-lg transition-colors hover:bg-white/[0.1]"
          style={{ color: "var(--muted-text)" }}
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* Gradient separator */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : ""}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                justifyContent: collapsed ? "center" : "flex-start",
                background: active ? "rgba(124,58,237,0.25)" : "transparent",
                color: active ? "#a855f7" : "var(--muted-text)",
                border: active ? "1px solid rgba(168,85,247,0.3)" : "1px solid transparent",
                boxShadow: active ? "var(--glow-accent)" : "none",
              }}
            >
              {active && !collapsed && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r"
                  style={{ height: "60%", background: "#a855f7" }}
                />
              )}
              <Icon size={18} className="shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{label}</span>
                  {active && <ChevronRight size={14} />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 space-y-1 border-t" style={{ borderColor: "var(--glass-border)" }}>
        <Link
          href="/notifications"
          title="Notificaciones"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/[0.04]"
          style={{ color: "var(--muted-text)", justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <div className="relative">
            <Bell size={18} />
            {unread > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white font-bold"
                style={{ background: "#7c3aed" }}
              >
                {unread}
              </span>
            )}
          </div>
          {!collapsed && (
            <>
              <span className="flex-1">Notificaciones</span>
              {unread > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-md text-white" style={{ background: "#7c3aed" }}>
                  {unread}
                </span>
              )}
            </>
          )}
        </Link>

        <Link
          href="/settings"
          title="Configuración"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/[0.04]"
          style={{ color: "var(--muted-text)", justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <Settings size={18} />
          {!collapsed && <span>Configuración</span>}
        </Link>

        {/* Artist card - hidden when collapsed */}
        {!collapsed && (
          <div
            className="mt-3 p-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
              >
                OB
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">OdanTheBoss</p>
                <p className="text-[11px]" style={{ color: "var(--muted-text)" }}>Artista Verificado</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
