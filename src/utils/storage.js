const STORAGE_KEY = "orbit-settings";

export const DEFAULT_SETTINGS = { theme: "dark" };

export function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // Retains the old theme preference and ignore retired customization fields.
    return { theme: saved?.theme === "light" ? "light" : "dark" };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings({ theme }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      theme: theme === "light" ? "light" : "dark",
    }));
  } catch {
    // The toggle still works when browser storage is unavailable.
  }
}
