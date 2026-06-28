/*
 * Format a date for post metadata and search result subtitles.
 *
 * Output uses long month name, numeric day, numeric year, and `en-US` when no
 * locale is supplied. Callers pass `siteMetadata.locale` where the UI should
 * follow site configuration.
 *
 * @param {string | Date} date Date value accepted by the JavaScript `Date` constructor.
 * @param {string} [locale='en-US'] BCP 47 locale string.
 * @returns {string} Locale-formatted date, e.g. `March 10, 2025`.
 */
export function formatDate(date, locale = 'en-US') {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
