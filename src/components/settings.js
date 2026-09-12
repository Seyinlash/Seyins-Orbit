// src/components/settings.js
//
// This file is responsible for TWO things: applying settings to the page
// (as CSS variables and attributes so style.css can react to them), and
// wiring up the settings panel's controls so changing them updates the
// page immediately and saves to localStorage via utils/storage.js.

import { loadSettings, saveSettings } from "../utils/storage.js";
import { wallpapers, getWallpaperById } from "../data/wallpapers.js";

/**
 * Applies a settings object to the live page. This is the ONLY function
 * that actually changes how Orbit looks based on settings ,everything
 * else just decides *what* the settings should be.
 * @param {Object} settings
 */
export function applySettings(settings) {
  const root = document.documentElement;

  root.setAttribute("data-theme", settings.theme);
  root.style.setProperty("--accent", settings.accent);
  root.style.setProperty("--glass-opacity", settings.transparency / 100);
  root.style.setProperty("--glass-blur", `${settings.blur}px`);
  root.classList.toggle("no-animations", !settings.animations);

  const backgroundEl = document.getElementById("background");
  if (backgroundEl) {
    // The wallpaper presets are always fairly dark (space-themed), but
    // text color flips based on theme. Without a tint, dark text in the
    // light theme would be unreadable directly over the wallpaper. This
    // washes the wallpaper toward the theme's base tone so it always has
    // enough contrast, while still showing through as a wallpaper.
    const scrim =
      settings.theme === "light"
        ? "rgba(240, 243, 250, 0.7)"
        : "rgba(4, 6, 12, 0.25)";
    backgroundEl.style.background = `linear-gradient(${scrim}, ${scrim}), ${
      getWallpaperById(settings.wallpaper).background
    }`;
  }
}

/**
 * Wires up the settings panel: populates controls with the current
 * settings, opens/closes the panel, and saves + re-applies settings
 * whenever a control changes.
 *
 * @param {Object} elements - references to the panel's DOM elements
 */
export function initSettings(elements) {
  const {
    panel,
    backdrop,
    openButton,
    closeButton,
    themeInputs,
    accentInput,
    wallpaperContainer,
    transparencyInput,
    blurInput,
    animationsInput,
  } = elements;

  let settings = loadSettings();
  applySettings(settings);

  // Build the wallpaper swatch buttons from data/wallpapers.js, so adding
  // a new wallpaper there automatically adds a button here.
  wallpaperContainer.innerHTML = wallpapers
    .map(
      (wallpaper) => `
        <button
          type="button"
          class="wallpaper-swatch"
          data-wallpaper-id="${wallpaper.id}"
          style="background: ${wallpaper.background}"
          aria-label="${wallpaper.label}"
        ></button>
      `
    )
    .join("");

  function syncControlsToSettings() {
    themeInputs.forEach((input) => {
      input.checked = input.value === settings.theme;
    });
    accentInput.value = settings.accent;
    transparencyInput.value = settings.transparency;
    blurInput.value = settings.blur;
    animationsInput.checked = settings.animations;

    wallpaperContainer.querySelectorAll(".wallpaper-swatch").forEach((swatch) => {
      swatch.classList.toggle(
        "is-selected",
        swatch.dataset.wallpaperId === settings.wallpaper
      );
    });
  }

  function updateSetting(key, value) {
    settings = { ...settings, [key]: value };
    saveSettings(settings);
    applySettings(settings);
  }

  syncControlsToSettings();

  themeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) updateSetting("theme", input.value);
    });
  });

  accentInput.addEventListener("input", () => {
    updateSetting("accent", accentInput.value);
  });

  transparencyInput.addEventListener("input", () => {
    updateSetting("transparency", Number(transparencyInput.value));
  });

  blurInput.addEventListener("input", () => {
    updateSetting("blur", Number(blurInput.value));
  });

  animationsInput.addEventListener("change", () => {
    updateSetting("animations", animationsInput.checked);
  });

  wallpaperContainer.addEventListener("click", (event) => {
    const swatch = event.target.closest(".wallpaper-swatch");
    if (!swatch) return;
    updateSetting("wallpaper", swatch.dataset.wallpaperId);
    syncControlsToSettings();
  });

  function openPanel() {
    panel.hidden = false;
    backdrop.hidden = false;
    openButton.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    panel.hidden = true;
    backdrop.hidden = true;
    openButton.setAttribute("aria-expanded", "false");
  }

  openButton.addEventListener("click", openPanel);
  closeButton.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) closePanel();
  });
}
