import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

/**
 * SearchInput Component - Technical Search Interface
 * 搜索输入组件
 */
export const SearchInput = ({ keyword = '', locale }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(keyword || '')

  useEffect(() => {
    setSearchTerm(keyword || '')
  }, [keyword])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className="void-card p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Label */}
        <div className="flex items-center gap-2 text-yellow-400 tech-text">
          <i className="fas fa-search" />
          <span className="text-sm">SEARCH_DATABASE</span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={locale?.SEARCH?.ARTICLES || '搜索文章...'}
            className="w-full px-4 py-4 bg-black border border-gray-700 text-white focus:border-yellow-400 focus:outline-none transition-colors pr-24 tech-text"
          />
          
          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors"
              title="Clear"
            >
              <i className="fas fa-times" />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-yellow-400 text-black hover:bg-cyan-400 transition-colors font-bold text-sm"
          >
            <i className="fas fa-arrow-right" />
          </button>
        </div>

        {/* Search Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 tech-text">
          <div>
            {keyword && (
              <span>
                QUERY: <span className="text-cyan-400">{keyword}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>READY</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchInput
