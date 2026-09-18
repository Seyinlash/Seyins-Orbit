const APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";
const RETRY_DELAYS = [1000, 2000];

async function fetchLatestApod() {
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

const CACHE_KEY = "orbit-apod-last-success";

// Store only APOD display data, never the API key or request URL.
function displayData(data) {
  if (!data || typeof data.title !== "string" ||
      typeof data.explanation !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      !Number.isFinite(new Date(data.date + "T00:00:00").getTime()) ||
      !["image", "video"].includes(data.media_type)) {
    throw new Error("NASA returned an incomplete picture. Please try again later.");
  }
  const mediaUrl = new URL(data.url);
  if (mediaUrl.protocol !== "https:" && mediaUrl.protocol !== "http:") {
    throw new Error("NASA returned an unsupported media address.");
  }
  return {
    title: data.title,
    explanation: data.explanation,
    date: data.date,
    media_type: data.media_type,
    url: mediaUrl.href,
  };
}

export async function fetchApod() {
  try {
    const data = displayData(await fetchLatestApod());
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
      // A full or blocked browser store must not hide a successful response.
    }
    return data;
  } catch (error) {
    try {
      const saved = JSON.parse(localStorage.getItem(CACHE_KEY));
      return { ...displayData(saved), isCached: true };
    } catch {
      // No usable saved result: keep the original, key-free error message.
      throw error;
    }
  }
}