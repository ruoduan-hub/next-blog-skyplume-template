const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}

const htmlEscapePattern = /[&<>'"]/g

/*
 * Escape characters that are unsafe inside RSS/XML text nodes.
 *
 * The replacement table covers the characters that break XML/RSS text nodes.
 * The local implementation coerces values with `String(value)` so RSS
 * generation remains resilient if future metadata passes a number or boolean.
 *
 * @param {unknown} value Value to serialize into XML text.
 * @returns {string} Escaped string safe for RSS title, description, and metadata fields.
 */
export function escapeHtml(value) {
  return String(value).replace(htmlEscapePattern, (character) => htmlEscapes[character])
}

/*
 * Short export name used by `scripts/rss.mjs`.
 */
export { escapeHtml as escape }
