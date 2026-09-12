// src/utils/storage.js
//
// This file is responsible for ONE thing: reading and writing Orbit's
// settings to localStorage. Nothing else in the app touches localStorage
// directly — it always goes through here, so if you ever change how or
// where settings are stored, this is the only file you'd need to edit.

const STORAGE_KEY = "orbit-settings";

// These are the settings Orbit falls back to the very first time someone
// opens it (or if their saved settings ever get cleared/corrupted).
export const DEFAULT_SETTINGS = {
  theme: "dark", // "dark" | "light"
  accent: "#7c9eff",
  wallpaper: "nebula", // matches an id in data/wallpapers.js
  transparency: 60, // 0–100, controls glass panel opacity
  blur: 16, // px, controls glass panel backdrop blur
  animations: true, // whether transitions/hover motion are enabled
};

/**
 * Loads saved settings from localStorage, filling in any missing fields
 * with defaults. This means adding a new setting later never breaks
 * existing users' saved data.
 */
export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const saved = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch {
    // If localStorage is unavailable or the saved data is corrupted,
    // fall back to defaults instead of crashing the whole page.
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Saves the full settings object to localStorage.
 * @param {Object} settings
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage can fail (e.g. private browsing with storage disabled).
    // Failing silently here is fine — Orbit just won't remember settings.
    console.warn("Orbit: couldn't save settings to localStorage.");
  }
}
