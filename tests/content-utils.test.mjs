import assert from 'node:assert/strict'
import test from 'node:test'

test('sortPosts sorts descending by date and mutates the input array', async () => {
  const { sortPosts } = await import('../lib/content/core.mjs')
  const posts = [
    { slug: 'old', date: '2024-01-01' },
    { slug: 'new', date: '2025-03-10' },
    { slug: 'middle', date: '2024-08-20' },
  ]

  const sorted = sortPosts(posts)

  assert.equal(sorted, posts)
  assert.deepEqual(
    sorted.map((post) => post.slug),
    ['new', 'middle', 'old']
  )
})

test('coreContent removes contentlayer internals while preserving public fields', async () => {
  const { coreContent } = await import('../lib/content/core.mjs')
  const post = {
    title: 'Keep me',
    draft: false,
    body: { raw: 'raw mdx' },
    _raw: { flattenedPath: 'blog/keep-me' },
    _id: 'blog/keep-me.mdx',
  }

  assert.deepEqual(coreContent(post), {
    title: 'Keep me',
    draft: false,
  })
})

test('allCoreContent filters draft posts only in production', async () => {
  const originalNodeEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
  const moduleUrl = `../lib/content/core.mjs?production-test=${Date.now()}`
  const { allCoreContent } = await import(moduleUrl)

  const posts = [
    { title: 'Published', draft: false, body: {} },
    { title: 'Draft', draft: true, body: {} },
  ]

  assert.deepEqual(allCoreContent(posts), [{ title: 'Published', draft: false }])
  process.env.NODE_ENV = originalNodeEnv
})

test('formatDate formats dates with the requested locale', async () => {
  const { formatDate } = await import('../lib/content/format-date.mjs')

  assert.equal(formatDate('2025-03-10', 'en-US'), 'March 10, 2025')
})

test('escapeHtml escapes XML-sensitive characters for RSS', async () => {
  const { escapeHtml } = await import('../lib/content/html-escape.mjs')

  assert.equal(escapeHtml(`A&B <tag> 'quote' "double"`), 'A&amp;B &lt;tag&gt; &#39;quote&#39; &quot;double&quot;')
})
