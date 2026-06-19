export type OnlineVideoBase = {
  id: string;
  title: string;
  duration: string;
  /** Poster / thumbnail for the grid card */
  thumbnailSrc: string;
};

export type OnlineVideoMp4 = OnlineVideoBase & {
  kind: "mp4";
  /** Direct video URL (MP4, etc.) */
  playbackUrl: string;
};

export type OnlineVideoInstagram = OnlineVideoBase & {
  kind: "instagram";
  /** Full reel / post URL (Instagram’s embed script reads this) */
  permalink: string;
};

export type OnlineVideo = OnlineVideoMp4 | OnlineVideoInstagram;

const base =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

/** Instagram reel permalink (query params optional; embed works with the clean path). */
const INSTAGRAM_REEL =
  "https://www.instagram.com/reel/DCjC1xQsWtK/?utm_source=ig_embed&utm_campaign=loading";

/**
 * Demo MP4s use Google sample clips. Replace with your hosted classes or more
 * `kind: "instagram"` entries as needed.
 */
export const onlineVideos: OnlineVideo[] = [
  {
    id: "v1",
    title: "Morning Hatha reset",
    duration: "Reel",
    kind: "instagram",
    permalink: INSTAGRAM_REEL,
    thumbnailSrc:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: "v2",
    title: "Slow flow foundations",
    duration: "22 min",
    kind: "mp4",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=75",
    playbackUrl: `${base}/ForBiggerEscapes.mp4`,
  },
  {
    id: "v3",
    title: "Hips & breath",
    duration: "15 min",
    kind: "mp4",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1599447421410-3415500d3a9f?auto=format&fit=crop&w=800&q=75",
    playbackUrl: `${base}/ForBiggerFun.mp4`,
  },
  {
    id: "v4",
    title: "Midday vinyasa",
    duration: "25 min",
    kind: "mp4",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1575052814086-f971e9977607?auto=format&fit=crop&w=800&q=75",
    playbackUrl: `${base}/ForBiggerJoyrides.mp4`,
  },
  {
    id: "v5",
    title: "Yin for deep rest",
    duration: "35 min",
    kind: "mp4",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1518611012118-696072aa780a?auto=format&fit=crop&w=800&q=75",
    playbackUrl: `${base}/ForBiggerMeltdowns.mp4`,
  },
  {
    id: "v6",
    title: "Shoulder ease",
    duration: "12 min",
    kind: "mp4",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1510894347713-fc3bed1ad35?auto=format&fit=crop&w=800&q=75",
    playbackUrl: `${base}/Sintel.mp4`,
  },
  {
    id: "v7",
    title: "Evening wind-down",
    duration: "20 min",
    kind: "mp4",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=75",
    playbackUrl: `${base}/ElephantsDream.mp4`,
  },
  {
    id: "v8",
    title: "Weekend restore",
    duration: "40 min",
    kind: "mp4",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1593811167565-4172cf8432b1?auto=format&fit=crop&w=800&q=75",
    playbackUrl: `${base}/BigBuckBunny.mp4`,
  },
];
