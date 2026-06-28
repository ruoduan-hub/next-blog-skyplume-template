import assert from 'node:assert/strict'
import test from 'node:test'
import { remark } from 'remark'

test('extractTocHeadings returns GitHub-style heading links', async () => {
  const { extractTocHeadings } = await import('../lib/mdx/plugins.mjs')

  const toc = await extractTocHeadings('# Intro\n\n## Intro\n\n### Details')

  assert.deepEqual(toc, [
    { value: 'Intro', url: '#intro', depth: 1 },
    { value: 'Intro', url: '#intro-1', depth: 2 },
    { value: 'Details', url: '#details', depth: 3 },
  ])
})

test('remarkCodeTitles inserts a title node and keeps the code language', async () => {
  const { remarkCodeTitles } = await import('../lib/mdx/plugins.mjs')
  const processor = remark().use(remarkCodeTitles)
  const tree = processor.parse('```ts:lib/example.ts\nexport const value = 1\n```')
  const transformed = await processor.run(tree)

  assert.equal(transformed.children[0].type, 'mdxJsxFlowElement')
  assert.equal(transformed.children[0].name, 'div')
  assert.deepEqual(transformed.children[0].attributes, [
    { type: 'mdxJsxAttribute', name: 'className', value: 'remark-code-title' },
  ])
  assert.deepEqual(transformed.children[0].children, [
    { type: 'text', value: 'lib/example.ts' },
  ])
  assert.equal(transformed.children[1].type, 'code')
  assert.equal(transformed.children[1].lang, 'ts')
})
