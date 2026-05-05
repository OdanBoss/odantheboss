import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OdanTheBoss – Music Distribution Dashboard",
  description: "Panel de control para distribución musical",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full" style={{ background: "var(--background)" }}>
        {children}
      </body>
    </html>
  );
}
