// src/api/apod.js
//
// This file is responsible for ONE thing: talking to NASA's APOD API.
// Keeping "fetch the data" separate from "show the data on screen"
// (see components/apodCard.js) makes the code much easier to expand later -
// e.g. if you add caching, a date picker, or switch to a different endpoint,
// you only touch this file.

const APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";

/**
 * Fetches today's Astronomy Picture of the Day from NASA's API.
 *
 * - The API key is read from Vite's environment variables, NOT hard-coded.
 *   Vite only exposes variables prefixed with VITE_ to client-side code,
 *   and it makes them available on the special `import.meta.env` object.
 * - We don't pass a `date` param, so NASA automatically returns TODAY's
 *   picture. That's what makes the app "auto-update" daily ,there's no
 *   stored date anywhere, we just always ask for "today".
 *
 * @returns {Promise<Object>} the parsed JSON response from NASA
 * @throws {Error} if the API key is missing or the request fails
 */
export async function fetchApod() {
  const apiKey = import.meta.env.VITE_NASA_API_KEY;

  if (!apiKey) {
    // Fail loudly and clearly during development if the .env file
    // is missing or the variable name was typed wrong.
    throw new Error(
      "Missing NASA API key. Add VITE_NASA_API_KEY to your .env file."
    );
  }

  const url = `${APOD_ENDPOINT}?api_key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    // NASA's API returns a non-200 status for things like an invalid key
    // or hitting the rate limit. We throw here so the calling code (main.js)
    // can catch it and show a friendly error message instead of crashing.
    throw new Error(`NASA API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}

