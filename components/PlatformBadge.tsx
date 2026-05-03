import { Platform } from "@/lib/data";

const colors: Record<Platform, { bg: string; text: string }> = {
  Spotify: { bg: "rgba(29,185,84,0.15)", text: "#1DB954" },
  "Apple Music": { bg: "rgba(252,60,68,0.15)", text: "#FC3C44" },
  "YouTube Music": { bg: "rgba(255,0,0,0.15)", text: "#FF0000" },
  "Amazon Music": { bg: "rgba(0,168,225,0.15)", text: "#00A8E1" },
  Tidal: { bg: "rgba(200,200,200,0.15)", text: "#c8c8c8" },
  Deezer: { bg: "rgba(239,84,102,0.15)", text: "#EF5466" },
  SoundCloud: { bg: "rgba(255,85,0,0.15)", text: "#FF5500" },
};

export default function PlatformBadge({ name }: { name: Platform }) {
  const c = colors[name];
  return (
    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
      style={{ background: c.bg, color: c.text }}>
      {name}
    </span>
  );
}
