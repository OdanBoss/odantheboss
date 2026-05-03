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
} from "lucide-react";
import { notifications } from "@/lib/data";

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

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col z-20"
      style={{ background: "var(--card)", borderRight: "1px solid var(--card-border)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: "var(--card-border)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
          <Radio size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-sm text-white leading-tight">OdanTheBoss</p>
          <p className="text-xs" style={{ color: "var(--muted-text)" }}>Music Distribution</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
              style={{
                background: active ? "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.15))" : "transparent",
                color: active ? "#a855f7" : "var(--muted-text)",
                border: active ? "1px solid rgba(168,85,247,0.3)" : "1px solid transparent",
              }}>
              <Icon size={18} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 space-y-1 border-t" style={{ borderColor: "var(--card-border)" }}>
        <Link href="/notifications"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: "var(--muted-text)" }}>
          <div className="relative">
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white font-bold"
                style={{ background: "#7c3aed" }}>
                {unread}
              </span>
            )}
          </div>
          <span className="flex-1">Notificaciones</span>
          {unread > 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded-md text-white" style={{ background: "#7c3aed" }}>
              {unread}
            </span>
          )}
        </Link>
        <Link href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: "var(--muted-text)" }}>
          <Settings size={18} />
          <span>Configuración</span>
        </Link>

        {/* Artist card */}
        <div className="mt-3 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
              OB
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">OdanTheBoss</p>
              <p className="text-[11px]" style={{ color: "var(--muted-text)" }}>Artista Verificado</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}
