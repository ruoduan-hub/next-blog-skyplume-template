import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('search controller keeps heavy search dialog code out of the initial layout chunk', async () => {
  const controller = await readFile('components/search/SearchDialogController.tsx', 'utf8')

  assert.match(controller, /dynamic\(\s*\(\)\s*=>\s*import\('\.\/SearchDialog'\)/)
  assert.doesNotMatch(
    controller,
    /@base-ui\/react|components\/ui\/dialog|filterSearchDocuments|useRouter/
  )
})

test('full search dialog owns search filtering and dialog dependencies', async () => {
  const dialog = await readFile('components/search/SearchDialog.tsx', 'utf8')

  assert.match(dialog, /filterSearchDocuments/)
  assert.match(dialog, /@\/components\/ui\/dialog/)
  assert.match(dialog, /useRouter/)
})

test('home hero and post feed render without client component hydration', async () => {
  const hero = await readFile('components/home/LabHero.tsx', 'utf8')
  const feed = await readFile('components/home/PostFeed.tsx', 'utf8')

  assert.doesNotMatch(hero, /^'use client'/)
  assert.doesNotMatch(feed, /^'use client'/)
  assert.doesNotMatch(feed, /useEffect|IntersectionObserver|useRef/)
})
