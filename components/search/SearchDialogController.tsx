'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import type { SearchConfig } from './SearchDialog'

const LazySearchDialog = dynamic(() => import('./SearchDialog').then((mod) => mod.SearchDialog), {
  ssr: false,
})

const OPEN_SEARCH_EVENT = 'site-search:open'

export function openSearchDialog() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))
}

export function SearchDialogController({ searchConfig }: { searchConfig?: SearchConfig }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasRequestedDialog, setHasRequestedDialog] = useState(false)

  const openSearch = useCallback(() => {
    setHasRequestedDialog(true)
    setIsOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openSearch()
      }
    }

    const onOpenSearch = () => openSearch()

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener(OPEN_SEARCH_EVENT, onOpenSearch)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpenSearch)
    }
  }, [openSearch])

  if (!hasRequestedDialog) return null

  return <LazySearchDialog isOpen={isOpen} onClose={closeSearch} searchConfig={searchConfig} />
}
