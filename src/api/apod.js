const APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";
const RETRY_DELAYS = [1000, 2000];

export async function fetchApod() {
  const apiKey = import.meta.env.VITE_NASA_API_KEY;
  if (!apiKey) {
    throw new Error("Missing NASA API key. Add VITE_NASA_API_KEY to your .env file.");
  }

  const url = `${APOD_ENDPOINT}?api_key=${encodeURIComponent(apiKey)}`;
  for (let attempt = 0; ; attempt += 1) {
    let response;
    try {
      response = await fetch(url);
    } catch {
      // Do not include the request URL or key in displayed/logged errors.
      throw new Error("Couldn't reach NASA. Check your connection and try again later.");
    }

    if (response.status >= 500 && response.status <= 599) {
      if (attempt < RETRY_DELAYS.length) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS[attempt]));
        continue;
      }
      throw new Error("NASA's picture service is having trouble right now. Please try again later.");
    }

    if (response.status === 429) {
      throw new Error("NASA's request limit has been reached. Please try again later.");
    }
    if (!response.ok) {
      throw new Error(`NASA API request failed with status ${response.status}`);
    }

    return response.json();
  }
}

