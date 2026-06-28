'use client'

import { formatDate } from '@/lib/content/format-date.mjs'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

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

type SearchContextValue = {
  openSearch: () => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    return {
      openSearch: () => undefined,
    }
  }
  return context
}

function getSearchUrl(searchDocumentsPath?: string) {
  if (!searchDocumentsPath) return null
  if (searchDocumentsPath.includes('://') || searchDocumentsPath.startsWith('//')) {
    return searchDocumentsPath
  }
  return new URL(searchDocumentsPath, window.location.origin).toString()
}

function matchesQuery(document: SearchDocument, query: string) {
  const haystack = [document.title, document.summary, document.path, ...(document.tags || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

export function SearchProvider({
  searchConfig,
  children,
}: {
  searchConfig?: SearchConfig
  children: ReactNode
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const requestIdRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [documents, setDocuments] = useState<SearchDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchDocumentsPath = searchConfig?.kbarConfig?.searchDocumentsPath

  const openSearch = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openSearch()
      }
      if (event.key === 'Escape') {
        closeSearch()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeSearch, openSearch])

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
    if (!query.trim()) return documents.slice(0, 8)
    return documents.filter((document) => matchesQuery(document, query)).slice(0, 8)
  }, [documents, query])

  const onSelect = (document: SearchDocument) => {
    closeSearch()
    router.push(`/${document.path}`)
  }

  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-80 bg-black/30 px-4 py-20 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch()
          }}
        >
          <div
            aria-modal="true"
            className="mx-auto max-w-2xl overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950"
            role="dialog"
          >
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <Search aria-hidden="true" className="h-5 w-5 text-gray-400" />
              <label className="sr-only" htmlFor="site-search-input">
                Search posts
              </label>
              <input
                ref={inputRef}
                id="site-search-input"
                className="min-w-0 flex-1 bg-transparent text-base text-gray-950 outline-none placeholder:text-gray-500 dark:text-gray-50 dark:placeholder:text-gray-400"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search posts"
                type="search"
                value={query}
              />
              <button
                aria-label="Close search"
                className="hover:text-primary-500 dark:hover:text-primary-400 rounded-sm p-1 text-gray-500"
                onClick={closeSearch}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {(isLoading || (!hasLoaded && !error)) && (
                <p className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
                  Loading search index...
                </p>
              )}
              {error && <p className="px-4 py-6 text-sm text-red-600 dark:text-red-400">{error}</p>}
              {hasLoaded && !isLoading && !error && results.length === 0 && (
                <p className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
                  No posts found.
                </p>
              )}
              {hasLoaded &&
                !isLoading &&
                !error &&
                results.map((document) => (
                  <button
                    className="hover:bg-primary-50 focus:bg-primary-50 block w-full px-4 py-3 text-left outline-none dark:hover:bg-gray-900 dark:focus:bg-gray-900"
                    key={document.path}
                    onClick={() => onSelect(document)}
                    type="button"
                  >
                    <span className="block text-sm font-semibold text-gray-950 dark:text-gray-50">
                      {document.title}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                      {document.date ? formatDate(document.date, 'en-US') : document.path}
                    </span>
                    {document.summary && (
                      <span className="mt-2 line-clamp-2 block text-sm text-gray-600 dark:text-gray-300">
                        {document.summary}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </SearchContext.Provider>
  )
}
