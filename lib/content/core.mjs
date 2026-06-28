const isProduction = process.env.NODE_ENV === 'production'

/*
 * Compare two date-like string values in descending order.
 *
 * Contentlayer emits ISO date strings for this project, so lexical comparison
 * keeps the existing newest-first behavior while avoiding timezone drift.
 *
 * @param {string} a
 * @param {string} b
 * @returns {-1 | 0 | 1}
 */
export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

/*
 * Sort posts in-place by a date field in descending order.
 *
 * This intentionally mutates the input array because existing page code builds
 * pagination and previous/next links from the returned array. If we ever want
 * immutable sorting, update the callers and tests together.
 *
 * @template T
 * @param {T[]} allBlogs Contentlayer blog documents or core-content objects.
 * @param {keyof T | string} [dateKey='date'] Field to sort by.
 * @returns {T[]} The same array instance, sorted newest first.
 */
export function sortPosts(allBlogs, dateKey = 'date') {
  return allBlogs.sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]))
}

/*
 * Backwards-compatible alias retained for older template customizations.
 *
 * New code should call `sortPosts`; this alias exists so older template code or
 * local customizations can migrate without a behavior change.
 *
 * @template T
 * @param {T[]} allBlogs
 * @returns {T[]}
 */
export function sortedBlogPost(allBlogs) {
  return sortPosts(allBlogs)
}

/*
 * Pick a list of keys from an object and convert missing/undefined values to
 * `null`.
 *
 * The current project does not call this directly, but keeping it here makes
 * local content shaping easier for common template customizations.
 *
 * @template {Record<string, unknown>} T
 * @param {T} obj Source object.
 * @param {(keyof T)[]} keys Keys to copy.
 * @returns {Partial<T>}
 */
export function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key] ?? null
    return acc
  }, {})
}

/*
 * Return a shallow copy without the listed keys.
 *
 * This is used by `coreContent` to strip heavy Contentlayer internals before
 * serializing content into pages, feeds, and `search.json`.
 *
 * @template {Record<string, unknown>} T
 * @param {T} obj Source object.
 * @param {(keyof T | string)[]} keys Keys to remove.
 * @returns {Partial<T>}
 */
export function omit(obj, keys) {
  const result = { ...obj }
  keys.forEach((key) => {
    delete result[key]
  })
  return result
}

/*
 * Strip Contentlayer-only fields from a document.
 *
 * `body` contains compiled/raw MDX and is too large for list pages and the local
 * search index. `_raw` and `_id` are build internals. This keeps the public
 * content shape stable so existing layouts can keep using `CoreContent<Blog>`.
 *
 * @template {Record<string, unknown>} T
 * @param {T} content Contentlayer document.
 * @returns {Partial<T>} Public content fields without `body`, `_raw`, and `_id`.
 */
export function coreContent(content) {
  return omit(content, ['body', '_raw', '_id'])
}

/*
 * Convert a list of Contentlayer documents to core content.
 *
 * Production builds filter `draft: true` after stripping internal fields.
 * Development keeps drafts visible so authors can preview them locally.
 *
 * @template {Record<string, unknown>} T
 * @param {T[]} contents Contentlayer documents.
 * @returns {Partial<T>[]} Core content documents.
 */
export function allCoreContent(contents) {
  const coreContents = contents.map((content) => coreContent(content))
  if (!isProduction) return coreContents
  return coreContents.filter((content) => !('draft' in content && content.draft === true))
}
