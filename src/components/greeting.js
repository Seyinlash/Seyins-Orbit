const SUBTITLES = [
  "Here's what's happening today.",
  "Ready when you are.",
  "One tab, everything you need.",
  "Let's see what's out there today.",
  "Home base for the day ahead.",
];

/**
 * Returns a greeting like "Good afternoon" based on the current
 * local time.

 */
export function getGreeting() {
  const hour = new Date().getHours();
  let timeOfDay;

  if (hour < 5) timeOfDay = "Good night";
  else if (hour < 12) timeOfDay = "Good morning";
  else if (hour < 18) timeOfDay = "Good afternoon";
  else timeOfDay = "Good evening";

  return timeOfDay;
}

/**
 * Returns a random subtitle line. Called once per page load, so it
 * changes each time you open a new tab.
 */
export function getRandomSubtitle() {
  return SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)];
}