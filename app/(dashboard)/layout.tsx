"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <>
      {/* Background ambient */}
      <div className="fixed inset-0 -z-10" style={{
        background: "#080810",
        backgroundImage: `
          radial-gradient(ellipse 900px 600px at -100px -100px, rgba(124,58,237,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 110% 110%, rgba(168,85,247,0.15) 0%, transparent 65%),
          radial-gradient(ellipse 500px 400px at 60% 40%, rgba(99,40,200,0.08) 0%, transparent 60%)
        `,
      }} />
      <Sidebar />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? "80px" : "256px" }}
      >
        <Header />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
