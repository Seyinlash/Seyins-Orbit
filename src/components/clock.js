
/**
 * Starts the live clock/date display and keeps it updating forever
 * (until the tab is closed).
 * @param {HTMLElement} clockEl - element to hold the time text
 * @param {HTMLElement} dateEl - element to hold the date text
 */
export function startClock(clockEl, dateEl) {
  function tick() {
    const now = new Date();

    clockEl.textContent = now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });

    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  tick(); // show the correct time immediately, don't wait a full second
  setInterval(tick, 1000);
}
