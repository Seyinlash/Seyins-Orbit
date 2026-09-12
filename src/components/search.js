// src/components/search.js
//
// This file is responsible for ONE thing: the search bar. Submitting it
// opens a Google search for whatever was typed, in a new tab, so Orbit
// itself never navigates away.

export function initSearch(formEl, inputEl) {
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = inputEl.value.trim();
    if (!query) return;

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");

    inputEl.value = "";
  });
}
