// src/ui.js
//
// This file is responsible for ONE thing: putting content on the screen.
// It never fetches data itself — main.js calls these functions and hands
// them whatever data (or error) it has. This separation means that later,
// when you redesign the UI, you mostly just rewrite this file.

const app = document.getElementById("app");

/**
 * Formats today's date in a readable way, e.g. "September 12, 2026".
 */
function getFormattedDate() {
  const today = new Date();
  return today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Shows a loading message while the API request is in flight.
 */
export function renderLoading() {
  app.innerHTML = `
    <div class="state state--loading">
      <p>Loading today's Astronomy Picture of the Day…</p>
    </div>
  `;
}

/**
 * Shows a friendly error message if the API request fails.
 * @param {string} message - a human-readable explanation of what went wrong
 */
export function renderError(message) {
  app.innerHTML = `
    <div class="state state--error">
      <h2>Couldn't load today's picture</h2>
      <p>${message}</p>
      <p class="hint">Check your internet connection or API key, then refresh.</p>
    </div>
  `;
}

/**
 * Renders the successful APOD result.
 * NASA's response can be either "image" or "video" media_type — we handle
 * both so the app doesn't break on days APOD features a video.
 *
 * @param {Object} apod - the JSON object returned by NASA's APOD API
 */
export function renderApod(apod) {
  const { title, explanation, media_type, url, hdurl } = apod;

  // Build the media element depending on whether today's APOD is an
  // image or a video. Videos are usually embedded YouTube/Vimeo players,
  // so an <iframe> is the safest way to show them.
  const mediaHtml =
    media_type === "video"
      ? `<iframe
           class="apod-media"
           src="${url}"
           title="${title}"
           frameborder="0"
           allow="autoplay; encrypted-media"
           allowfullscreen
         ></iframe>`
      : `<img
           class="apod-media"
           src="${url}"
           alt="${title}"
           loading="lazy"
         />`;

  app.innerHTML = `
    <article class="apod-card">
      <p class="apod-date">${getFormattedDate()}</p>
      <h1 class="apod-title">${title}</h1>
      ${mediaHtml}
      <p class="apod-explanation">${explanation}</p>
    </article>
  `;
}
