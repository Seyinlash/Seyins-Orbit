// This file is  for turning link data (from
// data/links.js) into clickable cards in the DOM. It doesn't know or
// care what the links actually are ,edit data/links.js to change them.

import { icon } from "./icons.js";

/**
 * shows a row of compact "quick link" pills.
 * @param {HTMLElement} container
 * @param {Array<{label: string, url: string, icon: string}>} links
 */
export function renderQuickLinks(container, links) {
  container.innerHTML = links
    .map(
      (link) => `
        <a class="quick-link" href="${link.url}" target="_blank" rel="noopener noreferrer">
          ${icon(link.icon, 16)}
          <span>${link.label}</span>
        </a>
      `
    )
    .join("");
}

/**
 * shows the personal/social links list.
 * @param {HTMLElement} container
 * @param {Array<{label: string, url: string, icon: string}>} links
 */
export function renderPersonalLinks(container, links) {
  container.innerHTML = links
    .map(
      (link) => `
        <a class="personal-link" href="${link.url}" target="_blank" rel="noopener noreferrer">
          <span class="personal-link-icon">${icon(link.icon, 18)}</span>
          <span class="personal-link-label">${link.label}</span>
          ${icon("chevron", 14)}
        </a>
      `
    )
    .join("");
}
