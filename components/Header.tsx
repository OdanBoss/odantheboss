"use client";

import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";
import { notifications } from "@/lib/data";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Bienvenido de vuelta, OdanTheBoss" },
  "/catalog": { title: "Catálogo", subtitle: "Administra tus canciones y álbumes" },
  "/revenue": { title: "Ingresos", subtitle: "Analítica de ingresos y tendencias" },
  "/distribution": { title: "Distribución", subtitle: "Estado en plataformas de streaming" },
  "/royalties": { title: "Regalías", subtitle: "Historial de pagos y declaraciones" },
  "/notifications": { title: "Notificaciones", subtitle: "Actividad reciente" },
  "/settings": { title: "Configuración", subtitle: "Ajustes de cuenta" },
};

export default function Header() {
  const pathname = usePathname();
  const page = titles[pathname] ?? { title: "Dashboard", subtitle: "" };
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b sticky top-0 z-10"
      style={{ background: "rgba(8,8,16,0.8)", backdropFilter: "blur(12px)", borderColor: "var(--card-border)" }}>
      <div>
        <h1 className="text-xl font-bold text-white">{page.title}</h1>
        <p className="text-sm" style={{ color: "var(--muted-text)" }}>{page.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{ background: "var(--card)", border: "1px solid var(--card-border)", color: "var(--muted-text)" }}>
          <Search size={15} />
          <span>Buscar...</span>
          <kbd className="ml-4 text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>⌘K</kbd>
        </div>

        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
          <Bell size={18} style={{ color: "var(--muted-text)" }} />
          {unread > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "#a855f7" }} />
          )}
        </button>

        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
          OB
        </div>
      </div>
    </header>
  );
}
