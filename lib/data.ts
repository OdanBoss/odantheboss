export type Platform = "Spotify" | "Apple Music" | "YouTube Music" | "Amazon Music" | "Tidal" | "Deezer" | "SoundCloud";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  releaseDate: string;
  genre: string;
  streams: number;
  revenue: number;
  platforms: Platform[];
  status: "active" | "pending" | "rejected";
  duration: string;
  cover: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  tracks: number;
  streams: number;
  revenue: number;
  platforms: Platform[];
  status: "active" | "pending" | "rejected";
  cover: string;
  genre: string;
}

export interface RevenueData {
  month: string;
  spotify: number;
  appleMusic: number;
  youtubeMusic: number;
  amazonMusic: number;
  tidal: number;
  deezer: number;
  total: number;
}

export interface StreamData {
  month: string;
  streams: number;
  listeners: number;
}

export interface PlatformData {
  name: Platform;
  streams: number;
  revenue: number;
  share: number;
  color: string;
  growth: number;
  status: "connected" | "pending" | "disconnected";
}

export interface RoyaltyStatement {
  id: string;
  period: string;
  amount: number;
  status: "paid" | "pending" | "processing";
  tracks: number;
  platforms: number;
  date: string;
}

export interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const tracks: Track[] = [
  {
    id: "1",
    title: "Noche de Verano",
    artist: "OdanTheBoss",
    album: "Fuego Eterno",
    releaseDate: "2025-03-15",
    genre: "Reggaeton",
    streams: 4820000,
    revenue: 19280,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal"],
    status: "active",
    duration: "3:24",
    cover: "/covers/noche.jpg",
  },
  {
    id: "2",
    title: "Ritmo Salvaje",
    artist: "OdanTheBoss",
    album: "Fuego Eterno",
    releaseDate: "2025-03-15",
    genre: "Reggaeton",
    streams: 3650000,
    revenue: 14600,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music"],
    status: "active",
    duration: "3:51",
    cover: "/covers/ritmo.jpg",
  },
  {
    id: "3",
    title: "Cielo Roto",
    artist: "OdanTheBoss",
    album: "Fuego Eterno",
    releaseDate: "2025-03-15",
    genre: "Trap Latino",
    streams: 2980000,
    revenue: 11920,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Tidal", "Deezer"],
    status: "active",
    duration: "2:58",
    cover: "/covers/cielo.jpg",
  },
  {
    id: "4",
    title: "La Llamada",
    artist: "OdanTheBoss",
    album: "Singles",
    releaseDate: "2025-01-20",
    genre: "Pop Latino",
    streams: 5200000,
    revenue: 20800,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer"],
    status: "active",
    duration: "3:12",
    cover: "/covers/llamada.jpg",
  },
  {
    id: "5",
    title: "Sin Fronteras",
    artist: "OdanTheBoss",
    album: "Singles",
    releaseDate: "2025-02-14",
    genre: "Reggaeton",
    streams: 1870000,
    revenue: 7480,
    platforms: ["Spotify", "Apple Music", "YouTube Music"],
    status: "active",
    duration: "4:02",
    cover: "/covers/fronteras.jpg",
  },
  {
    id: "6",
    title: "Madrugada",
    artist: "OdanTheBoss",
    album: "Sombras",
    releaseDate: "2025-04-01",
    genre: "Trap Latino",
    streams: 980000,
    revenue: 3920,
    platforms: ["Spotify", "Apple Music"],
    status: "active",
    duration: "3:38",
    cover: "/covers/madrugada.jpg",
  },
  {
    id: "7",
    title: "Lluvia Digital",
    artist: "OdanTheBoss",
    album: "Sombras",
    releaseDate: "2025-04-01",
    genre: "Electro Latino",
    streams: 720000,
    revenue: 2880,
    platforms: ["Spotify", "Apple Music", "Tidal"],
    status: "active",
    duration: "3:55",
    cover: "/covers/lluvia.jpg",
  },
  {
    id: "8",
    title: "Corazón de Piedra",
    artist: "OdanTheBoss",
    album: "Nuevo Álbum",
    releaseDate: "2025-06-01",
    genre: "Reggaeton",
    streams: 0,
    revenue: 0,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer"],
    status: "pending",
    duration: "3:45",
    cover: "/covers/corazon.jpg",
  },
];

export const albums: Album[] = [
  {
    id: "1",
    title: "Fuego Eterno",
    artist: "OdanTheBoss",
    releaseDate: "2025-03-15",
    tracks: 12,
    streams: 18200000,
    revenue: 72800,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal"],
    status: "active",
    cover: "/covers/fuego.jpg",
    genre: "Reggaeton",
  },
  {
    id: "2",
    title: "Sombras",
    artist: "OdanTheBoss",
    releaseDate: "2025-04-01",
    tracks: 8,
    streams: 4200000,
    revenue: 16800,
    platforms: ["Spotify", "Apple Music", "Tidal"],
    status: "active",
    cover: "/covers/sombras.jpg",
    genre: "Trap Latino",
  },
  {
    id: "3",
    title: "Singles",
    artist: "OdanTheBoss",
    releaseDate: "2025-01-01",
    tracks: 5,
    streams: 9800000,
    revenue: 39200,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer"],
    status: "active",
    cover: "/covers/singles.jpg",
    genre: "Pop Latino",
  },
  {
    id: "4",
    title: "Nuevo Álbum",
    artist: "OdanTheBoss",
    releaseDate: "2025-06-01",
    tracks: 14,
    streams: 0,
    revenue: 0,
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer"],
    status: "pending",
    cover: "/covers/nuevo.jpg",
    genre: "Reggaeton",
  },
];

export const revenueData: RevenueData[] = [
  { month: "Jul", spotify: 8200, appleMusic: 4100, youtubeMusic: 2100, amazonMusic: 1200, tidal: 800, deezer: 400, total: 16800 },
  { month: "Ago", spotify: 9100, appleMusic: 4600, youtubeMusic: 2400, amazonMusic: 1400, tidal: 900, deezer: 450, total: 18850 },
  { month: "Sep", spotify: 10500, appleMusic: 5200, youtubeMusic: 2800, amazonMusic: 1600, tidal: 1100, deezer: 500, total: 21700 },
  { month: "Oct", spotify: 11200, appleMusic: 5600, youtubeMusic: 3100, amazonMusic: 1800, tidal: 1200, deezer: 550, total: 23450 },
  { month: "Nov", spotify: 13400, appleMusic: 6700, youtubeMusic: 3600, amazonMusic: 2100, tidal: 1400, deezer: 650, total: 27850 },
  { month: "Dic", spotify: 16800, appleMusic: 8400, youtubeMusic: 4500, amazonMusic: 2600, tidal: 1800, deezer: 800, total: 34900 },
  { month: "Ene", spotify: 14200, appleMusic: 7100, youtubeMusic: 3800, amazonMusic: 2200, tidal: 1500, deezer: 700, total: 29500 },
  { month: "Feb", spotify: 15600, appleMusic: 7800, youtubeMusic: 4200, amazonMusic: 2400, tidal: 1600, deezer: 750, total: 32350 },
  { month: "Mar", spotify: 21400, appleMusic: 10700, youtubeMusic: 5700, amazonMusic: 3300, tidal: 2200, deezer: 1000, total: 44300 },
  { month: "Abr", spotify: 18900, appleMusic: 9450, youtubeMusic: 5100, amazonMusic: 2900, tidal: 1900, deezer: 900, total: 39150 },
  { month: "May", spotify: 22300, appleMusic: 11150, youtubeMusic: 5900, amazonMusic: 3400, tidal: 2300, deezer: 1050, total: 46100 },
];

export const streamData: StreamData[] = [
  { month: "Jul", streams: 3200000, listeners: 1100000 },
  { month: "Ago", streams: 3800000, listeners: 1280000 },
  { month: "Sep", streams: 4500000, listeners: 1520000 },
  { month: "Oct", streams: 5100000, listeners: 1720000 },
  { month: "Nov", streams: 6200000, listeners: 2100000 },
  { month: "Dic", streams: 7800000, listeners: 2640000 },
  { month: "Ene", streams: 6900000, listeners: 2330000 },
  { month: "Feb", streams: 7400000, listeners: 2500000 },
  { month: "Mar", streams: 9800000, listeners: 3310000 },
  { month: "Abr", streams: 8600000, listeners: 2900000 },
  { month: "May", streams: 10200000, listeners: 3450000 },
];

export const platformData: PlatformData[] = [
  { name: "Spotify", streams: 42800000, revenue: 171200, share: 48.2, color: "#1DB954", growth: 18.4, status: "connected" },
  { name: "Apple Music", streams: 21400000, revenue: 107000, share: 24.1, color: "#FC3C44", growth: 12.8, status: "connected" },
  { name: "YouTube Music", streams: 11600000, revenue: 46400, share: 13.1, color: "#FF0000", growth: 22.1, status: "connected" },
  { name: "Amazon Music", streams: 6800000, revenue: 40800, share: 7.7, color: "#00A8E1", growth: 9.2, status: "connected" },
  { name: "Tidal", streams: 4200000, revenue: 29400, share: 4.7, color: "#000000", growth: 6.5, status: "connected" },
  { name: "Deezer", streams: 1800000, revenue: 7200, share: 2.0, color: "#EF5466", growth: 3.1, status: "connected" },
  { name: "SoundCloud", streams: 600000, revenue: 1200, share: 0.7, color: "#FF5500", growth: -2.4, status: "pending" },
];

export const royaltyStatements: RoyaltyStatement[] = [
  { id: "RS-2025-05", period: "Mayo 2025", amount: 46100, status: "processing", tracks: 8, platforms: 6, date: "2025-06-15" },
  { id: "RS-2025-04", period: "Abril 2025", amount: 39150, status: "paid", tracks: 8, platforms: 6, date: "2025-05-15" },
  { id: "RS-2025-03", period: "Marzo 2025", amount: 44300, status: "paid", tracks: 7, platforms: 5, date: "2025-04-15" },
  { id: "RS-2025-02", period: "Febrero 2025", amount: 32350, status: "paid", tracks: 7, platforms: 5, date: "2025-03-15" },
  { id: "RS-2025-01", period: "Enero 2025", amount: 29500, status: "paid", tracks: 5, platforms: 5, date: "2025-02-15" },
  { id: "RS-2024-12", period: "Diciembre 2024", amount: 34900, status: "paid", tracks: 5, platforms: 5, date: "2025-01-15" },
];

export const notifications: Notification[] = [
  { id: "1", type: "success", title: "Distribución Aprobada", message: "\"Corazón de Piedra\" fue aprobada en Spotify", time: "Hace 2h", read: false },
  { id: "2", type: "info", title: "Nuevo Pago", message: "Regalías de Abril 2025 disponibles: $39,150", time: "Hace 5h", read: false },
  { id: "3", type: "success", title: "Milestone Alcanzado", message: "\"La Llamada\" superó 5M reproducciones", time: "Hace 1d", read: false },
  { id: "4", type: "warning", title: "Revisión Pendiente", message: "Apple Music requiere metadata adicional para \"Nuevo Álbum\"", time: "Hace 2d", read: true },
  { id: "5", type: "info", title: "SoundCloud Conectado", message: "Tu cuenta de SoundCloud está en proceso de verificación", time: "Hace 3d", read: true },
];

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
