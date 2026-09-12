// src/main.js
//
// This is the entry point of the app (loaded by index.html).
// Its job is small on purpose: ask apod.js for data, and tell ui.js what
// to display. All the real logic lives in those two files, which keeps
// this file easy to read at a glance and easy to extend later — e.g. this
// is where you'd eventually add the dashboard/GitHub/settings sections.

import "./style.css";
import { fetchApod } from "./apod.js";
import { renderLoading, renderApod, renderError } from "./ui.js";

async function init() {
  renderLoading();

  try {
    const apod = await fetchApod();
    renderApod(apod);
  } catch (error) {
    // Log the real error for debugging, but show the user a friendly
    // message instead of a raw stack trace.
    console.error(error);
    renderError(error.message);
  }
}

init();
