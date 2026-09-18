import { loadSettings, saveSettings } from "../utils/storage.js";

// ui now has just one preference.
export function initThemeToggle(button) {
  let { theme } = loadSettings();

  function render() {
    document.documentElement.dataset.theme = theme;
    const nextMode = theme === "dark" ? "Light" : "Dark";
    button.textContent = nextMode + " mode";
    button.setAttribute("aria-label", "Switch to " + nextMode.toLowerCase() + " mode");
  }

  render();
  button.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    saveSettings({ theme });
    render();
  });
}