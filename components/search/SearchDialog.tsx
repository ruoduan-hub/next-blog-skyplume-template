'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/content/format-date.mjs'
import { filterSearchDocuments } from '@/lib/search/core.mjs'
import { AlertCircle, ArrowRight, FileText, Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'

export type SearchConfig = {
  provider?: string
  kbarConfig?: {
    searchDocumentsPath?: string
  }
}

type SearchDocument = {
  path: string
  title: string
  summary?: string
  date?: string
  tags?: string[]
}

type SearchDialogProps = {
  isOpen: boolean
  onClose: () => void
  searchConfig?: SearchConfig
}

function getSearchUrl(searchDocumentsPath?: string) {
  if (!searchDocumentsPath) return null
  if (searchDocumentsPath.includes('://') || searchDocumentsPath.startsWith('//')) {
    return searchDocumentsPath
  }
  return new URL(searchDocumentsPath, window.location.origin).toString()
}

export function SearchDialog({ isOpen, onClose, searchConfig }: SearchDialogProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const requestIdRef = useRef(0)
  const [query, setQuery] = useState('')
  const [documents, setDocuments] = useState<SearchDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchDocumentsPath = searchConfig?.kbarConfig?.searchDocumentsPath

  useEffect(() => {
    if (!isOpen) return
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }, [isOpen])

  useEffect(() => {
    setDocuments([])
    setHasLoaded(false)
    setError(null)
  }, [searchDocumentsPath])

  useEffect(() => {
    if (!isOpen || !searchDocumentsPath || hasLoaded) return

    const controller = new AbortController()
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId

    const isCurrentRequest = () => requestIdRef.current === requestId

    async function loadDocuments() {
      setIsLoading(true)
      setError(null)
      try {
        const searchUrl = getSearchUrl(searchDocumentsPath)
        if (!searchUrl) return

        const response = await fetch(searchUrl, { signal: controller.signal })
        if (!response.ok) throw new Error(`Search index request failed: ${response.status}`)
        const json = await response.json()
        if (!isCurrentRequest()) return
        setDocuments(Array.isArray(json) ? json : [])
        setHasLoaded(true)
      } catch (loadError) {
        if (!controller.signal.aborted && isCurrentRequest()) {
          setError(loadError instanceof Error ? loadError.message : 'Search index failed to load')
          setHasLoaded(true)
        }
      } finally {
        if (isCurrentRequest()) setIsLoading(false)
      }
    }

    loadDocuments()
    return () => controller.abort()
  }, [hasLoaded, isOpen, searchDocumentsPath])

  const results = useMemo(() => {
    return filterSearchDocuments(documents, query)
  }, [documents, query])

  const closeSearch = () => {
    onClose()
    setQuery('')
  }

  const onSelect = (document: SearchDocument) => {
    closeSearch()
    router.push(`/${document.path}`)
  }

  const resultLabel = query.trim()
    ? `${results.length} result${results.length === 1 ? '' : 's'}`
    : 'Recent posts'
  const hasSearchConfig = Boolean(searchDocumentsPath)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeSearch()
      }}
    >
      <DialogContent className="top-6 grid max-h-[calc(100dvh-3rem)] w-[min(calc(100%-1rem),44rem)] translate-y-0 gap-0 overflow-hidden rounded-xl border-gray-200 bg-white p-0 shadow-[0_16px_48px_rgba(15,23,42,0.16)] sm:top-16 sm:w-[min(calc(100%-2rem),44rem)] dark:border-gray-800 dark:bg-gray-950 dark:shadow-[0_16px_48px_rgba(0,0,0,0.42)]">
        <DialogHeader className="border-b border-gray-200 px-4 pt-5 pb-4 text-left sm:px-5 dark:border-gray-800">
          <div className="flex items-center gap-3 pr-8">
            <span className="bg-primary-50 text-primary-700 ring-primary-100 dark:bg-primary-950 dark:text-primary-300 dark:ring-primary-800 flex size-9 shrink-0 items-center justify-center rounded-lg ring-1">
              <Search aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
              <DialogTitle className="text-base leading-6 font-semibold text-gray-950 dark:text-gray-50">
                Search the archive
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                Find posts by title, path, summary, or tag.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="border-b border-gray-200 p-4 sm:p-5 dark:border-gray-800">
          <label className="sr-only" htmlFor="site-search-input">
            Search posts
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              strokeWidth={1.7}
            />
            <Input
              ref={inputRef}
              id="site-search-input"
              aria-describedby="site-search-help"
              className="h-11 rounded-lg border-gray-300 bg-gray-50 pr-3 pl-9 text-base shadow-none placeholder:text-gray-500 focus-visible:bg-white dark:border-gray-800 dark:bg-gray-900/80 dark:placeholder:text-gray-400 dark:focus-visible:bg-gray-950"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts, tags, or notes"
              type="search"
              value={query}
            />
          </div>
          <div
            className="mt-3 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400"
            id="site-search-help"
          >
            <span>{resultLabel}</span>
            <span className="hidden sm:inline">Press Esc to close</span>
          </div>
        </div>

        <div className="max-h-[min(60dvh,30rem)] overflow-y-auto p-2" aria-live="polite">
          {!hasSearchConfig && (
            <SearchState
              icon={<AlertCircle aria-hidden="true" className="size-4" />}
              title="Search is not configured"
              description="Add a search document path to enable local search."
            />
          )}

          {hasSearchConfig && (isLoading || (!hasLoaded && !error)) && <SearchLoadingRows />}

          {hasSearchConfig && error && (
            <SearchState
              icon={<AlertCircle aria-hidden="true" className="size-4" />}
              title="Search index failed to load"
              description={error}
            />
          )}

          {hasSearchConfig && hasLoaded && !isLoading && !error && results.length === 0 && (
            <SearchState
              icon={<Search aria-hidden="true" className="size-4" />}
              title="No posts found"
              description="Try a broader title, tag, or topic."
            />
          )}

          {hasSearchConfig &&
            hasLoaded &&
            !isLoading &&
            !error &&
            results.map((document) => (
              <SearchResultButton
                document={document}
                key={document.path}
                onSelect={() => onSelect(document)}
              />
            ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-400">
          <span>Local index</span>
          <span>
            {documents.length ? `${documents.length} posts indexed` : 'Ready on first open'}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SearchLoadingRows() {
  return (
    <div className="space-y-1 p-1">
      {[0, 1, 2].map((item) => (
        <div
          className="flex gap-3 rounded-lg px-3 py-3"
          key={item}
          aria-label="Loading search result"
        >
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-900">
            <Loader2
              aria-hidden="true"
              className="size-4 animate-spin text-gray-400 dark:text-gray-500"
              strokeWidth={1.7}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-900" />
            <div className="h-3 w-1/3 rounded bg-gray-100 dark:bg-gray-900" />
            <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-900" />
          </div>
        </div>
      ))}
    </div>
  )
}

function SearchState({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="px-4 py-10 text-center">
      <div className="mx-auto flex size-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
        {icon}
      </div>
      <p className="mt-3 text-sm font-semibold text-gray-950 dark:text-gray-50">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}

function SearchResultButton({
  document,
  onSelect,
}: {
  document: SearchDocument
  onSelect: () => void
}) {
  const tags = (document.tags || []).slice(0, 2)

  return (
    <Button
      className="group/result hover:bg-primary-50 focus-visible:bg-primary-50 h-auto w-full justify-start rounded-lg px-3 py-3 text-left whitespace-normal dark:hover:bg-gray-900 dark:focus-visible:bg-gray-900"
      onClick={onSelect}
      type="button"
      variant="ghost"
    >
      <span className="flex w-full min-w-0 gap-3">
        <span className="group-hover/result:text-primary-700 dark:group-hover/result:text-primary-300 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition-colors group-hover/result:bg-white dark:bg-gray-900 dark:text-gray-300 dark:group-hover/result:bg-gray-800">
          <FileText aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 items-start justify-between gap-3">
            <span className="min-w-0 text-sm leading-6 font-semibold text-gray-950 dark:text-gray-50">
              {document.title}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-gray-400 opacity-0 transition group-hover/result:translate-x-0.5 group-hover/result:opacity-100 dark:text-gray-500"
              strokeWidth={1.7}
            />
          </span>
          <span className="mt-0.5 block text-xs leading-5 text-gray-500 dark:text-gray-400">
            {document.date ? formatDate(document.date, 'en-US') : document.path}
          </span>
          {document.summary && (
            <span className="mt-2 line-clamp-2 block text-sm leading-6 text-gray-600 dark:text-gray-300">
              {document.summary}
            </span>
          )}
          {tags.length > 0 && (
            <span className="mt-2 flex min-w-0 flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  className="bg-gray-50 text-gray-600 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800"
                  key={tag}
                  variant="secondary"
                >
                  {tag}
                </Badge>
              ))}
            </span>
          )}
        </span>
      </span>
    </Button>
  )
}
