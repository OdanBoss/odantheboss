"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <AuthProvider>
      {isLogin ? (
        <div className="min-h-screen" style={{ background: "var(--background)" }}>
          {children}
        </div>
      ) : (
        <>
          <AdminSidebar />
          <div className="ml-64 flex flex-col min-h-screen">
            <main className="flex-1 p-8">{children}</main>
          </div>
        </>
      )}
    </AuthProvider>
  );
}
