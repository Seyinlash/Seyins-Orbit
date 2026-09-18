function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function getFormattedDate(dateString) {
  // Use the APOD date, including when displaying a saved result.
  const date = dateString ? new Date(`${dateString}T00:00:00`) : new Date();
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function renderApodLoading(container) {
  container.innerHTML = `
    <div class="apod-state">
      <div class="spinner" aria-hidden="true"></div>
      <p>Loading today's Astronomy Picture of the Day…</p>
    </div>
  `;
}

export function renderApodError(container, message) {
  container.innerHTML = `
    <div class="apod-state apod-state--error">
      <p class="apod-state-title">Couldn't load today's picture</p>
      <p class="apod-state-hint">${message}</p>
    </div>
  `;
}

/**
 * Renders the successful APOD result, including expand/collapse for the
 * explanation text.
 * @param {HTMLElement} container
 * @param {Object} apod - the JSON object returned by NASA's APOD API
 */
export function renderApod(container, apod) {
  const { media_type } = apod;
  const title = escapeHtml(apod.title);
  const explanation = escapeHtml(apod.explanation);
  const url = escapeHtml(apod.url);

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
      : `<img class="apod-media" src="${url}" alt="${title}" loading="lazy" />`;

  container.innerHTML = `
    <p class="apod-date">${apod.isCached ? "Saved APOD · " : ""}${getFormattedDate(apod.date)}</p>
    ${apod.isCached ? '<p class="section-note" role="status">Live APOD is unavailable. Showing the last saved result.</p>' : ""}
    <h2 class="apod-title">${title}</h2>
    ${mediaHtml}
    <div class="apod-explanation" data-expanded="false">
      <p>${explanation}</p>
    </div>
    <button class="apod-toggle" type="button" aria-expanded="false">
      Read more
    </button>
  `;

  // Wire up the expand/collapse button. The CSS handles the actual
  // clamping (see .apod-explanation in style.css); this just flips a
  // data attribute and updates the button label.
  const explanationEl = container.querySelector(".apod-explanation");
  const toggleBtn = container.querySelector(".apod-toggle");

  toggleBtn.addEventListener("click", () => {
    const isExpanded = explanationEl.dataset.expanded === "true";
    explanationEl.dataset.expanded = String(!isExpanded);
    toggleBtn.textContent = isExpanded ? "Read more" : "Show less";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
  });
}
