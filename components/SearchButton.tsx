'use client'

import { openSearchDialog } from '@/components/search/SearchDialogController'
import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  if (siteMetadata.search?.provider === 'kbar') {
    return (
      <button
        aria-label="Search"
        className="group/button hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-medium text-gray-900 transition-all outline-none select-none focus-visible:ring-3 dark:text-gray-100"
        onClick={openSearchDialog}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="group-hover/button:text-primary-500 dark:group-hover/button:text-primary-400 text-gray-900 transition-colors dark:text-gray-100"
          fill="none"
          height="20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="20"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    )
  }

  return null
}

export default SearchButton
