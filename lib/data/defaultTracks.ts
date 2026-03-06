export interface MusicTrack {
  id: string;
  name: string;
  artist: string;
  emoji: string;
  url: string;
  mood: string;
}

// SoundHelix provides free, publicly streamable MP3s with no hotlink restrictions.
// Songs 1-17 available at https://www.soundhelix.com/examples/mp3/SoundHelix-Song-N.mp3
export const DEFAULT_TRACKS: MusicTrack[] = [
  {
    id: "happy-bright",
    name: "Happy & Bright",
    artist: "SoundHelix",
    emoji: "🎂",
    mood: "Celebratory",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "romantic-vibes",
    name: "Romantic Vibes",
    artist: "SoundHelix",
    emoji: "💕",
    mood: "Romantic",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "uplifting-piano",
    name: "Uplifting Piano",
    artist: "SoundHelix",
    emoji: "🎹",
    mood: "Emotional",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "chill-acoustic",
    name: "Chill Acoustic",
    artist: "SoundHelix",
    emoji: "🎸",
    mood: "Relaxed",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "grand-celebration",
    name: "Grand Celebration",
    artist: "SoundHelix",
    emoji: "🎊",
    mood: "Epic",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  },
];
