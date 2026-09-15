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
import { getGreeting } from "./components/greeting.js";
import { renderQuickLinks, renderPersonalLinks } from "./components/links.js";
import { initSearch } from "./components/search.js";
import { initThemeToggle } from "./components/settings.js";
import { icon } from "./components/icons.js";
import { quickLinks, personalLinks, projects } from "./data/links.js";



async function initGreetingAndClock() {
  document.getElementById("greeting").textContent = getGreeting();

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
  renderPersonalLinks(document.getElementById("project-links"), projects.length ? projects : [
    { label: "View on GitHub", url: personalLinks[0].url, icon: "folder" },
  ]);
}

function initIcons() {
  // A few buttons are icon-only; fill them in with our inline SVGs here
  // rather than hardcoding SVG markup in index.html.
  document.querySelector("#search-form button[type='submit']").innerHTML =
    icon("search", 16);
}

function init() {
  initIcons();
  initGreetingAndClock();
  initLinks();
  initSearch(
    document.getElementById("search-form"),
    document.getElementById("search-input")
  );
  initThemeToggle(document.getElementById("theme-toggle"));
  initApod();
}

init();