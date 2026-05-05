"use client";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const { collapsed } = useSidebar();

  if (isLogin) {
    return <div className="min-h-screen" style={{ background: "var(--background)" }}>{children}</div>;
  }

  return (
    <>
      <div className="fixed inset-0 -z-10" style={{
        background: "#080810",
        backgroundImage: `
          radial-gradient(ellipse 900px 600px at -100px -100px, rgba(124,58,237,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 110% 110%, rgba(168,85,247,0.15) 0%, transparent 65%)
        `,
      }} />
      <AdminSidebar />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? "80px" : "256px" }}
      >
        <main className="flex-1 p-8">{children}</main>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AdminContent>{children}</AdminContent>
      </SidebarProvider>
    </AuthProvider>
  );
}
