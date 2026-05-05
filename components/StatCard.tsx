import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon: LucideIcon;
  accent?: string;
  sub?: string;
}

export default function StatCard({ title, value, change, changeLabel, icon: Icon, accent = "#7c3aed", sub }: Props) {
  const positive = change >= 0;
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${accent}40`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), 0 -1px 0 0 ${accent}30 inset`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: 0.8,
      }} />
      {/* BG glow */}
      <div style={{
        position: "absolute", top: -40, right: -40, width: 120, height: 120,
        borderRadius: "50%",
        background: `${accent}15`,
        filter: "blur(30px)",
        pointerEvents: "none",
      }} />

      <div className="flex items-center justify-between relative">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{
          background: `${accent}20`,
          border: `1px solid ${accent}30`,
        }}>
          <Icon size={20} style={{ color: accent }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? "text-emerald-400" : "text-red-400"}`}
          style={{ background: positive ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)" }}>
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(change)}%
        </div>
      </div>

      <div className="relative">
        <p className="text-2xl font-bold text-white leading-tight">{value}</p>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-text)" }}>{title}</p>
        {sub && <p className="text-xs mt-1" style={{ color: `${accent}cc` }}>{sub}</p>}
      </div>
    </div>
  );
}
