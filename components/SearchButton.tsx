'use client'

import { useSearch } from '@/components/search/SearchProvider'
import { Search } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  const { openSearch } = useSearch()

  if (siteMetadata.search?.provider === 'kbar') {
    return (
      <button aria-label="Search" onClick={openSearch} type="button">
        <Search
          aria-hidden="true"
          className="hover:text-primary-500 dark:hover:text-primary-400 h-6 w-6 text-gray-900 dark:text-gray-100"
          strokeWidth={1.5}
        />
      </button>
    )
  }

  return null
}

export default SearchButton
