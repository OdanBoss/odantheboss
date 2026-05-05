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
      className="relative rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(145deg, rgba(20,20,40,0.7) 0%, rgba(12,12,28,0.8) 100%)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${accent}28`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {/* Top accent strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}bb, ${accent}, ${accent}bb, transparent)`,
          borderRadius: "16px 16px 0 0",
        }}
      />
      {/* Ambient glow in corner */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `${accent}18`,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${accent}44, ${accent}22)`,
            boxShadow: `0 0 20px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${positive ? "text-emerald-400" : "text-red-400"}`}
          style={{ background: positive ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)", border: positive ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(248,113,113,0.2)" }}
        >
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}% {changeLabel ?? "vs mes anterior"}
        </div>
      </div>

      <div>
        <p
          className="text-3xl font-extrabold text-white"
          style={{ textShadow: `0 0 24px ${accent}66, 0 2px 4px rgba(0,0,0,0.3)` }}
        >
          {value}
        </p>
        <p className="text-sm mt-0.5 font-medium" style={{ color: "var(--muted-text)" }}>{title}</p>
        {sub && <p className="text-xs mt-1" style={{ color: `${accent}99` }}>{sub}</p>}
      </div>
    </div>
  );
}
