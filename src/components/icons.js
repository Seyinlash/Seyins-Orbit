
const ICONS = {
  code: '<path d="M8 5 3 10l5 5M12 5l5 5-5 5M10 4 8 16" />',
  flame:
    '<path d="M10 2c1 3-3 4-3 7a3 3 0 0 0 6 0c0-1-.5-1.7-1-2.3.6 1 .3 2.6-1 2.6-1.6 0-1.6-1.8-1-3C10.8 5 10.6 3.2 10 2Z" />',
  camera:
    '<rect x="2" y="6" width="16" height="11" rx="2" /><circle cx="10" cy="11.5" r="3.2" /><path d="M7 6l1.2-2h3.6L13 6" />',
  music:
    '<path d="M8 14V4l8-1.5V11" /><circle cx="6" cy="15" r="2.2" /><circle cx="14" cy="12.5" r="2.2" />',
  chat: '<path d="M3 4h14v9H8l-3.5 3V13H3Z" />',
  window:
    '<rect x="2" y="4" width="16" height="12" rx="1.5" /><path d="M2 7.5h16" /><circle cx="4.6" cy="5.7" r="0.4" /><circle cx="6.2" cy="5.7" r="0.4" />',
  grid: '<rect x="2" y="2" width="6.5" height="6.5" rx="1" /><rect x="11.5" y="2" width="6.5" height="6.5" rx="1" /><rect x="2" y="11.5" width="6.5" height="6.5" rx="1" /><rect x="11.5" y="11.5" width="6.5" height="6.5" rx="1" />',
  mail: '<rect x="2" y="4" width="16" height="12" rx="1.5" /><path d="m3 5.5 7 5.5 7-5.5" />',
  folder:
    '<path d="M2 5.5A1.5 1.5 0 0 1 3.5 4H8l2 2h6.5A1.5 1.5 0 0 1 18 7.5v7A1.5 1.5 0 0 1 16.5 16h-13A1.5 1.5 0 0 1 2 14.5Z" />',
  play: '<path d="M6 4.5v11l9-5.5Z" />',
  calendar:
    '<rect x="2" y="4" width="16" height="13" rx="1.5" /><path d="M2 8h16M6 2v4M14 2v4" />',
  settings:
    '<circle cx="10" cy="10" r="2.6" /><path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3 4.9 4.9" />',
  search: '<circle cx="8.5" cy="8.5" r="5.5" /><path d="m17 17-4-4" />',
  close: '<path d="M4 4l12 12M16 4 4 16" />',
  chevron: '<path d="m6 8 4 4 4-4" />',
};

export function icon(name, size = 18) {
  const shape = ICONS[name] ?? '<circle cx="10" cy="10" r="6" />';
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shape}</svg>`;
}
