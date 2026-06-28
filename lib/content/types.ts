/**
 * Public shape of a Contentlayer document after heavy build-only fields are
 * removed.
 *
 * Used by list/feed layouts so they cannot accidentally depend on compiled MDX
 * body data.
 */
export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>
