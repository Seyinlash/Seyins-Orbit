// src/main.js
//
// This is Orbit's entry point (loaded by index.html). Its job is to grab
// the DOM elements each component needs and hand them off — all the real
// logic lives in src/components/, src/api/, and src/utils/. Keeping this
// file thin makes it easy to see, at a glance, everything Orbit does.

import "./style.css";

import { fetchApod } from "./api/apod.js";
import {
  renderApodLoading,
  renderApodError,
  renderApod,
} from "./components/apodCard.js";
import { startClock } from "./components/clock.js";
import { getGreeting, getRandomSubtitle } from "./components/greeting.js";
import { renderQuickLinks, renderPersonalLinks } from "./components/links.js";
import { initSearch } from "./components/search.js";
import { initSettings } from "./components/settings.js";
import { icon } from "./components/icons.js";
import { quickLinks, personalLinks } from "./data/links.js";

const USER_NAME = "Seyin";

async function initGreetingAndClock() {
  document.getElementById("greeting").textContent = getGreeting(USER_NAME);
  document.getElementById("greeting-sub").textContent = getRandomSubtitle();
  startClock(document.getElementById("clock"), document.getElementById("date"));
}

async function initApod() {
  const apodCard = document.getElementById("apod-card");
  renderApodLoading(apodCard);

  try {
    const apod = await fetchApod();
    renderApod(apodCard, apod);
  } catch (error) {
    console.error(error);
    renderApodError(apodCard, error.message);
  }
}

function initLinks() {
  renderQuickLinks(document.getElementById("quick-links"), quickLinks);
  renderPersonalLinks(document.getElementById("personal-links"), personalLinks);
}

function initIcons() {
  // A few buttons are icon-only; fill them in with our inline SVGs here
  // rather than hardcoding SVG markup in index.html.
  document.querySelector("#search-form button[type='submit']").innerHTML =
    icon("search", 16);
  document.getElementById("settings-open").innerHTML = icon("settings", 18);
  document.getElementById("settings-close").innerHTML = icon("close", 16);
}

function initSettingsPanel() {
  initSettings({
    panel: document.getElementById("settings-panel"),
    backdrop: document.getElementById("settings-backdrop"),
    openButton: document.getElementById("settings-open"),
    closeButton: document.getElementById("settings-close"),
    themeInputs: Array.from(document.querySelectorAll("input[name='theme']")),
    accentInput: document.getElementById("accent-input"),
    wallpaperContainer: document.getElementById("wallpaper-swatches"),
    transparencyInput: document.getElementById("transparency-input"),
    blurInput: document.getElementById("blur-input"),
    animationsInput: document.getElementById("animations-input"),
  });
}

function init() {
  initIcons();
  initGreetingAndClock();
  initLinks();
  initSearch(
    document.getElementById("search-form"),
    document.getElementById("search-input")
  );
  initSettingsPanel();
  initApod();
}

init();
