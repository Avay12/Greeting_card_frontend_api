import type { SceneType } from "@/components/templates/SceneBackground";

export interface BackgroundScene {
  id: string;
  name: string;
  emoji: string;
  sceneType: SceneType;
  // Base CSS gradient under the particles
  style: React.CSSProperties;
  thumbnail: string;
}

export const BACKGROUND_SCENES: BackgroundScene[] = [
  {
    id: "none",
    name: "Classic",
    emoji: "⬜",
    sceneType: "none",
    style: { background: "#111827" },
    thumbnail: "linear-gradient(135deg, #111827, #1f2937)",
  },
  {
    id: "snow",
    name: "Snowfall",
    emoji: "❄️",
    sceneType: "snow",
    style: {
      background: "linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    },
    thumbnail: "linear-gradient(160deg, #0f2027, #2c5364)",
  },
  {
    id: "roses",
    name: "Rose Garden",
    emoji: "🌹",
    sceneType: "roses",
    style: {
      background: "linear-gradient(135deg, #1a0010 0%, #5c001e 50%, #8b0031 100%)",
    },
    thumbnail: "linear-gradient(135deg, #1a0010, #8b0031)",
  },
  {
    id: "celebration",
    name: "Celebration",
    emoji: "🎊",
    sceneType: "celebration",
    style: {
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
    },
    thumbnail: "linear-gradient(135deg, #1a1a2e, #0f3460)",
  },
  {
    id: "blossom",
    name: "Blossom",
    emoji: "🌸",
    sceneType: "blossom",
    style: {
      background: "linear-gradient(135deg, #2d0030 0%, #5e0050 40%, #8c0069 100%)",
    },
    thumbnail: "linear-gradient(135deg, #2d0030, #8c0069)",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    emoji: "🌌",
    sceneType: "galaxy",
    style: {
      background: "linear-gradient(135deg, #020111 0%, #091833 50%, #020111 100%)",
    },
    thumbnail: "linear-gradient(135deg, #020111, #091833)",
  },
  {
    id: "firefly",
    name: "Aurora",
    emoji: "🌠",
    sceneType: "firefly",
    style: {
      background: "linear-gradient(135deg, #0a0a0a 0%, #052a1a 50%, #001a0a 100%)",
    },
    thumbnail: "linear-gradient(135deg, #0a0a0a, #052a1a)",
  },
  {
    id: "romance",
    name: "Romance",
    emoji: "💕",
    sceneType: "romance",
    style: {
      background: "linear-gradient(135deg, #1a0026 0%, #3d0050 50%, #6b003a 100%)",
    },
    thumbnail: "linear-gradient(135deg, #1a0026, #6b003a)",
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌿",
    sceneType: "forest",
    style: {
      background: "linear-gradient(135deg, #0a1a0a 0%, #0d2b1a 60%, #142b10 100%)",
    },
    thumbnail: "linear-gradient(135deg, #0a1a0a, #142b10)",
  },
  {
    id: "golden",
    name: "Golden",
    emoji: "✨",
    sceneType: "golden",
    style: {
      background: "linear-gradient(135deg, #1a1000 0%, #3d2e00 50%, #5a4500 100%)",
    },
    thumbnail: "linear-gradient(135deg, #1a1000, #5a4500)",
  },
];
