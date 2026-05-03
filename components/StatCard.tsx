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
    <div className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}22` }}>
          <Icon size={20} style={{ color: accent }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${positive ? "text-emerald-400" : "text-red-400"}`}
          style={{ background: positive ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)" }}>
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}% {changeLabel ?? "vs mes anterior"}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-text)" }}>{title}</p>
        {sub && <p className="text-xs mt-1" style={{ color: "var(--muted-text)" }}>{sub}</p>}
      </div>
    </div>
  );
}
