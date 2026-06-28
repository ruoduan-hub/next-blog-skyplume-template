'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

type GiscusCommentsProps = {
  slug: string
  title?: string
}

function getGiscusConfig() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  const missing: string[] = []
  if (!repo) missing.push('NEXT_PUBLIC_GISCUS_REPO')
  if (!repoId) missing.push('NEXT_PUBLIC_GISCUS_REPOSITORY_ID')
  if (!category) missing.push('NEXT_PUBLIC_GISCUS_CATEGORY')
  if (!categoryId) missing.push('NEXT_PUBLIC_GISCUS_CATEGORY_ID')

  return { repo, repoId, category, categoryId, missing }
}

function getGiscusTheme(resolvedTheme?: string): string {
  if (resolvedTheme === 'dark') return 'dark_dimmed'
  return 'light'
}

function sendGiscusTheme(theme: string) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (!iframe?.contentWindow) return

  iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
}

export function GiscusComments(_props: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { repo, repoId, category, categoryId, missing } = getGiscusConfig()
  const { resolvedTheme } = useTheme()
  const theme = getGiscusTheme(resolvedTheme)
  const themeRef = useRef(theme)
  themeRef.current = theme

  // Sync theme to Giscus whenever resolvedTheme changes
  useEffect(() => {
    sendGiscusTheme(themeRef.current)
  }, [resolvedTheme])

  // Load Giscus script
  useEffect(() => {
    if (missing.length > 0 || !containerRef.current) return

    const container = containerRef.current
    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo!)
    script.setAttribute('data-repo-id', repoId!)
    script.setAttribute('data-category', category!)
    script.setAttribute('data-category-id', categoryId!)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', themeRef.current)
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    container.appendChild(script)
  }, [category, categoryId, missing.length, repo, repoId])

  if (missing.length > 0) {
    return (
      <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
        Giscus comments are not configured. Missing {missing.join(', ')}. Visit{' '}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 underline"
        >
          giscus.app
        </a>{' '}
        to generate your configuration.
      </p>
    )
  }

  return <div ref={containerRef} className="mt-8" />
}
