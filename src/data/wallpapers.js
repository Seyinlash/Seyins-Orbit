// src/data/wallpapers.js
//
// A small set of preset background gradients for the settings panel.
// Each one is just a CSS `background` value ,to add a new wallpaper
// option later, add another object here and it'll automatically show
// up as a choice in Settings (see components/settings.js).

export const wallpapers = [
  {
    id: "nebula",
    label: "Nebula",
    background:
      "radial-gradient(circle at 15% 15%, #2c3a8c 0%, transparent 45%), radial-gradient(circle at 85% 30%, #6c3a8c 0%, transparent 50%), radial-gradient(circle at 50% 90%, #1a2456 0%, transparent 55%), #0a0e1a",
  },
  {
    id: "aurora",
    label: "Aurora",
    background:
      "radial-gradient(circle at 20% 20%, #1e6f5c 0%, transparent 45%), radial-gradient(circle at 80% 10%, #2a4d8f 0%, transparent 50%), radial-gradient(circle at 60% 85%, #14203f 0%, transparent 55%), #060a14",
  },
  {
    id: "sunset",
    label: "Sunset",
    background:
      "radial-gradient(circle at 20% 20%, #7c3a3a 0%, transparent 45%), radial-gradient(circle at 85% 25%, #8c5a2c 0%, transparent 50%), radial-gradient(circle at 50% 90%, #3a1f3d 0%, transparent 55%), #150a10",
  },
  {
    id: "midnight",
    label: "Midnight",
    background:
      "radial-gradient(circle at 30% 10%, #1c2540 0%, transparent 50%), radial-gradient(circle at 75% 75%, #12182c 0%, transparent 55%), #05070d",
  },
];

export function getWallpaperById(id) {
  return wallpapers.find((w) => w.id === id) ?? wallpapers[0];
}
