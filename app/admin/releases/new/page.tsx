"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { TrackSubmission, ReleaseSubmission } from "@/lib/data";
import { Plus, Trash2, ChevronDown, ChevronUp, Check, AlertTriangle, RefreshCw } from "lucide-react";

const glassCard = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
} as React.CSSProperties;

const GENRES = ["Reggaeton", "Trap Latino", "Pop Latino", "Hip-Hop Latino", "Cumbia Digital", "Electronic Latino", "Salsa", "Bachata", "Dembow", "R&B Latino"];
const LANGUAGES = ["Español", "English", "Portugués", "Spanglish"];
const REGIONS = ["Norteamérica", "Latinoamérica", "España", "Europa", "Asia", "África", "Oceanía"];
const ALL_PLATFORMS = ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer", "SoundCloud", "Pandora", "iHeartRadio", "Napster", "Anghami", "Boomplay", "NetEase", "QQ Music", "Audiomack"];

const PLATFORM_COLORS: Record<string, string> = {
  Spotify: "#1DB954", "Apple Music": "#FC3C44", "YouTube Music": "#FF0000",
  "Amazon Music": "#00A8E1", Tidal: "#c8c8c8", Deezer: "#EF5466", SoundCloud: "#FF5500",
  Pandora: "#005483", iHeartRadio: "#C6002B", Napster: "#000000",
  Anghami: "#6200EE", Boomplay: "#F43B00", NetEase: "#C10D0C", "QQ Music": "#FCAD05", Audiomack: "#FFA200",
};

const DECLARATIONS = [
  "Confirmo que soy el 100% propietario o tengo licencia total de todos los derechos sobre este contenido, incluyendo masters, composiciones, letras y artwork",
  "Confirmo que este contenido no infringe derechos de autor, marcas registradas ni ningún derecho de terceros",
  "Confirmo que tengo los derechos de distribución digital en todos los territorios seleccionados",
  "Acepto los Términos de Distribución y la Política de Regalías de OdanTheBoss Distribution",
  "Entiendo que el material falso o fraudulento resultará en la eliminación inmediata y posibles acciones legales",
];

function defaultTrack(artist: string): TrackSubmission {
  return { title: "", isrc: "", artist, featuredArtists: "", composer: "", lyricist: "", producer: "", duration: "", genre: "Reggaeton", subgenre: "", explicit: false, language: "Español", lyrics: "" };
}

function genUPC() {
  return "858" + Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
}

function genISRC() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cc = chars[Math.floor(Math.random() * 26)] + chars[Math.floor(Math.random() * 26)];
  const reg = "OTB";
  const yr = "26";
  const num = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `${cc}-${reg}-${yr}-${num}`;
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange} className="relative shrink-0 transition-all duration-200"
      style={{ width: 44, height: 24, background: value ? "#a855f7" : "rgba(255,255,255,0.1)", borderRadius: 12, border: `1px solid ${value ? "#a855f7" : "rgba(255,255,255,0.15)"}` }}>
      <span className="absolute top-0.5 transition-all duration-200"
        style={{ width: 20, height: 20, background: "white", borderRadius: "50%", left: value ? 21 : 2 }} />
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-text)" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)" } as React.CSSProperties;
const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none";
const selectStyle = { background: "rgba(12,12,24,0.95)", border: "1px solid var(--glass-border)" } as React.CSSProperties;

export default function NewReleasePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [declarations, setDeclarations] = useState<boolean[]>(Array(DECLARATIONS.length).fill(false));
  const [expandedTrack, setExpandedTrack] = useState<number | null>(0);

  const [release, setRelease] = useState<Partial<ReleaseSubmission>>({
    releaseTitle: "",
    releaseType: "single",
    upc: "",
    artist: "OdanTheBoss",
    label: "OdanTheBoss Distribution",
    releaseDate: "",
    genre: "Reggaeton",
    subgenre: "",
    language: "Español",
    coverArtUrl: "",
    territories: ["worldwide"],
    platforms: [],
    tracks: [defaultTrack("OdanTheBoss")],
    copyright: "© 2026 OdanTheBoss Distribution",
    recordingCopyright: "℗ 2026 OdanTheBoss Distribution",
    notes: "",
  });

  const tracks = (release.tracks ?? []) as TrackSubmission[];
  const maxTracks = release.releaseType === "single" ? 1 : release.releaseType === "ep" ? 7 : 99;

  function setField<K extends keyof ReleaseSubmission>(k: K, v: ReleaseSubmission[K]) {
    setRelease((r) => ({ ...r, [k]: v }));
  }

  function setTrackField(i: number, k: keyof TrackSubmission, v: unknown) {
    const t = [...tracks];
    t[i] = { ...t[i], [k]: v };
    setField("tracks", t as TrackSubmission[]);
  }

  function addTrack() {
    if (tracks.length >= maxTracks) return;
    const t = [...tracks, defaultTrack(release.artist ?? "OdanTheBoss")];
    setField("tracks", t as TrackSubmission[]);
    setExpandedTrack(t.length - 1);
  }

  function removeTrack(i: number) {
    if (tracks.length <= 1) return;
    const t = tracks.filter((_, idx) => idx !== i);
    setField("tracks", t as TrackSubmission[]);
    setExpandedTrack(null);
  }

  function moveTrack(i: number, dir: "up" | "down") {
    const t = [...tracks];
    const j = dir === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= t.length) return;
    [t[i], t[j]] = [t[j], t[i]];
    setField("tracks", t as TrackSubmission[]);
  }

  function togglePlatform(p: string) {
    const current = (release.platforms ?? []) as string[];
    const next = current.includes(p) ? current.filter((x) => x !== p) : [...current, p];
    setRelease((r) => ({ ...r, platforms: next }));
  }

  function toggleTerritory(r: string) {
    if (r === "worldwide") { setField("territories", ["worldwide"]); return; }
    const current = (release.territories ?? []).filter((t) => t !== "worldwide");
    setField("territories", current.includes(r) ? current.filter((x) => x !== r) : [...current, r]);
  }

  const allDeclarations = declarations.every(Boolean);
  const platforms = (release.platforms ?? []) as string[];

  async function handleSubmit() {
    setField("status", "submitted");
    setField("submittedAt", new Date().toISOString());
    setSubmitted(true);
  }

  const steps = ["Datos del Lanzamiento", "Canciones", "Revisión", "Confirmación"];

  return (
    <ProtectedRoute>
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}>Nuevo Lanzamiento</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>Completa los 3 pasos para enviar tu lanzamiento</p>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              {steps.slice(0, 3).map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{ background: i + 1 < step ? "#a855f7" : i + 1 === step ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)", color: i + 1 <= step ? "white" : "var(--muted-text)", boxShadow: i + 1 === step ? "var(--glow-accent)" : "none" }}>
                    {i + 1 < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className="text-xs text-center" style={{ color: i + 1 === step ? "#a855f7" : "var(--muted-text)" }}>{s}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-4 left-4 right-4 h-0.5 -z-10" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }} />
            </div>
          </div>
        )}

        {/* Step 1: Release Data */}
        {step === 1 && (
          <div className="rounded-2xl p-6 space-y-6 relative overflow-hidden" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
            <h2 className="text-lg font-semibold text-white">Datos del Lanzamiento</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Título del Lanzamiento *">
                  <input type="text" value={release.releaseTitle} onChange={(e) => setField("releaseTitle", e.target.value)}
                    className={inputCls} style={inputStyle} placeholder="Título del lanzamiento" />
                </Field>
              </div>

              <Field label="Tipo de Lanzamiento">
                <select value={release.releaseType} onChange={(e) => setField("releaseType", e.target.value as ReleaseSubmission["releaseType"])}
                  className={inputCls} style={selectStyle}>
                  <option value="single">Single</option>
                  <option value="ep">EP</option>
                  <option value="album">Álbum</option>
                </select>
              </Field>

              <Field label="UPC">
                <div className="flex gap-2">
                  <input type="text" value={release.upc} onChange={(e) => setField("upc", e.target.value)}
                    className={inputCls} style={inputStyle} placeholder="858XXXXXXXXXXXX" />
                  <button type="button" onClick={() => setField("upc", genUPC())}
                    className="px-3 rounded-xl text-xs shrink-0 flex items-center gap-1.5"
                    style={{ background: "rgba(124,58,237,0.2)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}>
                    <RefreshCw size={12} /> Gen
                  </button>
                </div>
              </Field>

              <Field label="Artista *">
                <input type="text" value={release.artist} onChange={(e) => setField("artist", e.target.value)}
                  className={inputCls} style={inputStyle} />
              </Field>

              <Field label="Sello Discográfico">
                <input type="text" value={release.label} onChange={(e) => setField("label", e.target.value)}
                  className={inputCls} style={inputStyle} />
              </Field>

              <Field label="Fecha de Lanzamiento *">
                <input type="date" value={release.releaseDate} onChange={(e) => setField("releaseDate", e.target.value)}
                  className={inputCls} style={inputStyle} />
              </Field>

              <Field label="Idioma Principal">
                <select value={release.language} onChange={(e) => setField("language", e.target.value)}
                  className={inputCls} style={selectStyle}>
                  {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>

              <Field label="Género">
                <select value={release.genre} onChange={(e) => setField("genre", e.target.value)}
                  className={inputCls} style={selectStyle}>
                  {GENRES.map((g) => <option key={g}>{g}</option>)}
                </select>
              </Field>

              <Field label="Subgénero (opcional)">
                <input type="text" value={release.subgenre ?? ""} onChange={(e) => setField("subgenre", e.target.value)}
                  className={inputCls} style={inputStyle} placeholder="Subgénero" />
              </Field>

              <div className="col-span-2">
                <Field label="URL de Portada (opcional)">
                  <input type="text" value={release.coverArtUrl ?? ""} onChange={(e) => setField("coverArtUrl", e.target.value)}
                    className={inputCls} style={inputStyle} placeholder="https://..." />
                </Field>
                {release.coverArtUrl && (
                  <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden" style={{ border: "1px solid var(--glass-border)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={release.coverArtUrl} alt="cover" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
              </div>

              <Field label="Copyright">
                <input type="text" value={release.copyright ?? ""} onChange={(e) => setField("copyright", e.target.value)}
                  className={inputCls} style={inputStyle} />
              </Field>

              <Field label="Recording Copyright">
                <input type="text" value={release.recordingCopyright ?? ""} onChange={(e) => setField("recordingCopyright", e.target.value)}
                  className={inputCls} style={inputStyle} />
              </Field>
            </div>

            {/* Territories */}
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "var(--muted-text)" }}>Territorios</label>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => toggleTerritory("worldwide")}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{ background: (release.territories ?? []).includes("worldwide") ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.04)", color: (release.territories ?? []).includes("worldwide") ? "#a855f7" : "var(--muted-text)", border: (release.territories ?? []).includes("worldwide") ? "1px solid rgba(168,85,247,0.4)" : "1px solid var(--glass-border)" }}>
                  🌎 Worldwide
                </button>
                {REGIONS.map((r) => (
                  <button key={r} type="button" onClick={() => toggleTerritory(r)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: (release.territories ?? []).includes(r) ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)", color: (release.territories ?? []).includes(r) ? "#a855f7" : "var(--muted-text)", border: (release.territories ?? []).includes(r) ? "1px solid rgba(168,85,247,0.3)" : "1px solid var(--glass-border)" }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: "var(--muted-text)" }}>Plataformas DSP</label>
              <div className="flex flex-wrap gap-2">
                {ALL_PLATFORMS.map((p) => {
                  const sel = platforms.includes(p);
                  const color = PLATFORM_COLORS[p] ?? "#7c3aed";
                  return (
                    <button key={p} type="button" onClick={() => togglePlatform(p)}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all"
                      style={{ background: sel ? `${color}22` : "rgba(255,255,255,0.04)", color: sel ? color : "var(--muted-text)", border: sel ? `1px solid ${color}44` : "1px solid var(--glass-border)" }}>
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <Field label="Notas adicionales (opcional)">
              <textarea value={release.notes ?? ""} onChange={(e) => setField("notes", e.target.value)}
                rows={3} className={`${inputCls} resize-none`} style={inputStyle} placeholder="Instrucciones especiales, prioridades, etc." />
            </Field>

            <button onClick={() => setStep(2)} disabled={!release.releaseTitle || !release.releaseDate}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: (release.releaseTitle && release.releaseDate) ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)", opacity: (release.releaseTitle && release.releaseDate) ? 1 : 0.5, boxShadow: (release.releaseTitle && release.releaseDate) ? "0 4px 15px rgba(124,58,237,0.35)" : "none" }}>
              Siguiente: Canciones →
            </button>
          </div>
        )}

        {/* Step 2: Tracks */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ec489955, transparent)" }} />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Canciones ({tracks.length}/{maxTracks})</h2>
                <button type="button" onClick={addTrack} disabled={tracks.length >= maxTracks}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ background: tracks.length < maxTracks ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)", color: tracks.length < maxTracks ? "#a855f7" : "var(--muted-text)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  <Plus size={14} /> Agregar Canción
                </button>
              </div>
              {release.releaseType === "single" && <p className="text-xs mb-4" style={{ color: "var(--muted-text)" }}>Los singles pueden tener máximo 1 canción.</p>}

              <div className="space-y-3">
                {tracks.map((track, i) => {
                  const isOpen = expandedTrack === i;
                  return (
                    <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.02)" }}>
                      {/* Header */}
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <button type="button" onClick={() => moveTrack(i, "up")} disabled={i === 0} className="text-xs disabled:opacity-30" style={{ color: "var(--muted-text)" }}>▲</button>
                          <button type="button" onClick={() => moveTrack(i, "down")} disabled={i === tracks.length - 1} className="text-xs disabled:opacity-30" style={{ color: "var(--muted-text)" }}>▼</button>
                        </div>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{track.title || `Canción ${i + 1}`}</p>
                          <p className="text-xs" style={{ color: "var(--muted-text)" }}>{track.isrc || "ISRC pendiente"} · {track.duration || "--:--"}</p>
                        </div>
                        {track.explicit && <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(248,113,113,0.2)", color: "#f87171" }}>E</span>}
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => setExpandedTrack(isOpen ? null : i)} style={{ color: "var(--muted-text)" }}>
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          {tracks.length > 1 && (
                            <button type="button" onClick={() => removeTrack(i)} className="text-red-400 hover:bg-red-500/10 p-1 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Fields */}
                      {isOpen && (
                        <div className="px-4 pb-4 grid grid-cols-2 gap-3 border-t" style={{ borderColor: "var(--glass-border)" }}>
                          <div className="col-span-2 pt-3">
                            <Field label="Título *">
                              <input type="text" value={track.title} onChange={(e) => setTrackField(i, "title", e.target.value)}
                                className={inputCls} style={inputStyle} placeholder="Título de la canción" />
                            </Field>
                          </div>
                          <Field label="ISRC">
                            <div className="flex gap-2">
                              <input type="text" value={track.isrc} onChange={(e) => setTrackField(i, "isrc", e.target.value)}
                                className={inputCls} style={inputStyle} placeholder="CC-XXX-YY-NNNNN" />
                              <button type="button" onClick={() => setTrackField(i, "isrc", genISRC())}
                                className="px-2 rounded-xl shrink-0 flex items-center"
                                style={{ background: "rgba(124,58,237,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}>
                                <RefreshCw size={12} />
                              </button>
                            </div>
                          </Field>
                          <Field label="Artista Principal">
                            <input type="text" value={track.artist} onChange={(e) => setTrackField(i, "artist", e.target.value)}
                              className={inputCls} style={inputStyle} />
                          </Field>
                          <Field label="Artistas Feat. (opcional)">
                            <input type="text" value={track.featuredArtists ?? ""} onChange={(e) => setTrackField(i, "featuredArtists", e.target.value)}
                              className={inputCls} style={inputStyle} placeholder="Artista 1, Artista 2" />
                          </Field>
                          <Field label="Compositor/es">
                            <input type="text" value={track.composer} onChange={(e) => setTrackField(i, "composer", e.target.value)}
                              className={inputCls} style={inputStyle} />
                          </Field>
                          <Field label="Letrista/s">
                            <input type="text" value={track.lyricist} onChange={(e) => setTrackField(i, "lyricist", e.target.value)}
                              className={inputCls} style={inputStyle} />
                          </Field>
                          <Field label="Productor/es">
                            <input type="text" value={track.producer} onChange={(e) => setTrackField(i, "producer", e.target.value)}
                              className={inputCls} style={inputStyle} />
                          </Field>
                          <Field label="Duración (mm:ss)">
                            <input type="text" value={track.duration} onChange={(e) => setTrackField(i, "duration", e.target.value)}
                              className={inputCls} style={inputStyle} placeholder="3:24" />
                          </Field>
                          <Field label="Género">
                            <select value={track.genre} onChange={(e) => setTrackField(i, "genre", e.target.value)}
                              className={inputCls} style={selectStyle}>
                              {GENRES.map((g) => <option key={g}>{g}</option>)}
                            </select>
                          </Field>
                          <Field label="Idioma">
                            <select value={track.language} onChange={(e) => setTrackField(i, "language", e.target.value)}
                              className={inputCls} style={selectStyle}>
                              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                            </select>
                          </Field>
                          <div className="col-span-2 flex items-center justify-between py-2">
                            <div>
                              <p className="text-sm font-medium text-white">Contenido Explícito</p>
                              <p className="text-xs" style={{ color: "var(--muted-text)" }}>¿Contiene lenguaje adulto?</p>
                            </div>
                            <Toggle value={track.explicit} onChange={() => setTrackField(i, "explicit", !track.explicit)} />
                          </div>
                          <div className="col-span-2">
                            <Field label="Letra (opcional)">
                              <textarea value={track.lyrics ?? ""} onChange={(e) => setTrackField(i, "lyrics", e.target.value)}
                                rows={4} className={`${inputCls} resize-none`} style={inputStyle} placeholder="Letra de la canción..." />
                            </Field>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-sm" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>← Atrás</button>
              <button onClick={() => setStep(3)} disabled={tracks.length === 0 || !tracks[0].title}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: (tracks.length > 0 && tracks[0].title) ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)", boxShadow: (tracks.length > 0 && tracks[0].title) ? "0 4px 15px rgba(124,58,237,0.35)" : "none" }}>
                Siguiente: Revisión →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-5">
            {/* Section 1: Release Data */}
            <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />
              <h3 className="text-base font-semibold text-white mb-4">Datos del Release</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Título", release.releaseTitle],
                  ["Tipo", release.releaseType?.toUpperCase()],
                  ["UPC", release.upc || "—"],
                  ["Artista", release.artist],
                  ["Sello", release.label],
                  ["Fecha", release.releaseDate],
                  ["Idioma", release.language],
                  ["Género", release.genre],
                  ["Copyright", release.copyright],
                  ["Rec. Copyright", release.recordingCopyright],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-xs" style={{ color: "var(--muted-text)" }}>{label as string}</p>
                    <p className="font-medium text-white mt-0.5">{value as string || "—"}</p>
                  </div>
                ))}
                {release.notes && (
                  <div className="col-span-2">
                    <p className="text-xs" style={{ color: "var(--muted-text)" }}>Notas</p>
                    <p className="text-sm text-white mt-0.5">{release.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Platforms */}
            <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #10b98155, transparent)" }} />
              <h3 className="text-base font-semibold text-white mb-2">DSPs / Plataformas</h3>
              <p className="text-xs mb-4" style={{ color: "var(--muted-text)" }}>
                Territorios: {(release.territories ?? []).join(", ") || "—"}
              </p>
              {platforms.length === 0 ? (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-400" style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <AlertTriangle size={16} /> Selecciona al menos una plataforma en el Paso 1
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {platforms.map((p) => {
                    const color = PLATFORM_COLORS[p] ?? "#7c3aed";
                    return (
                      <span key={p} className="text-xs px-3 py-1.5 rounded-lg font-medium"
                        style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>
                        {p}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 3: Tracks */}
            <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ec489955, transparent)" }} />
              <h3 className="text-base font-semibold text-white mb-4">Canciones ({tracks.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ color: "var(--muted-text)" }}>
                      <th className="text-left pb-3 font-medium">#</th>
                      <th className="text-left pb-3 font-medium">Título</th>
                      <th className="text-left pb-3 font-medium">ISRC</th>
                      <th className="text-left pb-3 font-medium">Feat.</th>
                      <th className="text-left pb-3 font-medium">Compositor</th>
                      <th className="text-left pb-3 font-medium">Productor</th>
                      <th className="text-center pb-3 font-medium">Duración</th>
                      <th className="text-center pb-3 font-medium">Exp.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: "var(--glass-border)" }}>
                    {tracks.map((t, i) => (
                      <tr key={i}>
                        <td className="py-2.5 pr-3 font-bold text-white">{i + 1}</td>
                        <td className="py-2.5 pr-3 font-medium text-white">{t.title || "—"}</td>
                        <td className="py-2.5 pr-3 font-mono" style={{ color: "#a855f7" }}>{t.isrc || "—"}</td>
                        <td className="py-2.5 pr-3" style={{ color: "var(--muted-text)" }}>{t.featuredArtists || "—"}</td>
                        <td className="py-2.5 pr-3" style={{ color: "var(--muted-text)" }}>{t.composer || "—"}</td>
                        <td className="py-2.5 pr-3" style={{ color: "var(--muted-text)" }}>{t.producer || "—"}</td>
                        <td className="py-2.5 text-center text-white">{t.duration || "—"}</td>
                        <td className="py-2.5 text-center">
                          {t.explicit ? <span className="text-red-400 font-bold">E</span> : <span style={{ color: "var(--muted-text)" }}>—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Declarations */}
            <div className="rounded-2xl p-6 relative overflow-hidden" style={glassCard}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #f59e0b55, transparent)" }} />
              <h3 className="text-base font-semibold text-white mb-4">Declaraciones y Confirmaciones</h3>
              <div className="space-y-3">
                {DECLARATIONS.map((d, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => {
                        const n = [...declarations];
                        n[i] = !n[i];
                        setDeclarations(n);
                      }}
                      className="mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all"
                      style={{ background: declarations[i] ? "#a855f7" : "transparent", border: `2px solid ${declarations[i] ? "#a855f7" : "rgba(255,255,255,0.2)"}` }}>
                      {declarations[i] && <Check size={11} className="text-white" />}
                    </div>
                    <span className="text-sm leading-snug" style={{ color: declarations[i] ? "white" : "var(--muted-text)" }}>{d}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                disabled={!allDeclarations || platforms.length === 0}
                className="mt-6 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: (allDeclarations && platforms.length > 0) ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.06)",
                  boxShadow: (allDeclarations && platforms.length > 0) ? "0 4px 15px rgba(124,58,237,0.4)" : "none",
                  opacity: (allDeclarations && platforms.length > 0) ? 1 : 0.5,
                  cursor: (allDeclarations && platforms.length > 0) ? "pointer" : "not-allowed",
                }}>
                {allDeclarations && platforms.length > 0 ? "Enviar Lanzamiento" : "Completa todas las confirmaciones para continuar"}
              </button>
            </div>

            <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl text-sm" style={{ background: "var(--muted)", color: "var(--muted-text)" }}>← Atrás: Canciones</button>
          </div>
        )}

        {/* Step 4: Success */}
        {submitted && (
          <div className="rounded-2xl p-8 text-center space-y-5 relative overflow-hidden" style={glassCard}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #10b98155, transparent)" }} />
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
              style={{ background: "rgba(52,211,153,0.15)", border: "2px solid rgba(52,211,153,0.4)" }}>
              <Check size={40} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">¡Lanzamiento Enviado!</h2>
              <p className="text-lg font-medium mt-1" style={{ color: "#a855f7" }}>{release.releaseTitle}</p>
              <div className="flex justify-center gap-4 mt-3 text-sm" style={{ color: "var(--muted-text)" }}>
                <span>UPC: <span className="font-mono text-white">{release.upc || "Auto-asignado"}</span></span>
                <span>·</span>
                <span>{tracks.length} canción{tracks.length > 1 ? "es" : ""}</span>
                <span>·</span>
                <span>{platforms.length} plataforma{platforms.length > 1 ? "s" : ""}</span>
              </div>
              <p className="text-sm mt-4" style={{ color: "var(--muted-text)" }}>
                El equipo revisará tu lanzamiento en 2-3 días hábiles. Recibirás una notificación por email.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => router.push("/admin/releases")} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
                Ver Mis Lanzamientos
              </button>
              <button onClick={() => { setSubmitted(false); setStep(1); setRelease({ releaseType: "single", platforms: [], territories: ["worldwide"], tracks: [defaultTrack("OdanTheBoss")], releaseTitle: "", artist: "OdanTheBoss", label: "OdanTheBoss Distribution", copyright: "© 2026 OdanTheBoss Distribution", recordingCopyright: "℗ 2026 OdanTheBoss Distribution", upc: "", releaseDate: "", genre: "Reggaeton", language: "Español", notes: "" }); setDeclarations(Array(DECLARATIONS.length).fill(false)); }}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted-text)", border: "1px solid var(--glass-border)" }}>
                Nuevo Lanzamiento
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
