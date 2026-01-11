import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IconSearch, IconX } from '@tabler/icons-react'

/**
 * SearchInput Component - Refined Tech Interface
 * 搜索输入组件
 */
export const SearchInput = ({ keyword = '', locale }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(keyword || '')
  const [isFocused, setIsFocused] = useState(false)

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
    <div className={`void-frame p-6 transition-colors ${isFocused ? 'border-[var(--void-accent-yellow)]' : ''}`}>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Label */}
        <div className="flex items-center gap-2 text-[var(--void-accent-yellow)] tech-text text-xs tracking-wider">
          <IconSearch size={14} stroke={1.5} />
          <span>SEARCH_DATABASE</span>
        </div>

        {/* Search Input Container */}
        <div className="relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={locale?.SEARCH?.ARTICLES || 'Input query...'}
            className="w-full px-4 py-3 bg-[var(--void-bg-secondary)] border border-[var(--void-border-base)] text-[var(--void-text-primary)] focus:border-[var(--void-accent-cyan)] focus:outline-none transition-colors pr-24 tech-text text-sm placeholder-[var(--void-text-muted)]"
          />
          
          {/* Corner accents for input */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--void-border-active)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--void-border-active)] pointer-events-none" />

          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-[var(--void-text-muted)] hover:text-red-500 transition-colors px-2"
            >
              <IconX size={14} stroke={1.5} />
            </button>
          )}

          {/* Search Button (Enter) */}
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3 bg-[var(--void-bg-tertiary)] text-[var(--void-accent-yellow)] hover:bg-[var(--void-accent-yellow)] hover:text-black transition-colors font-bold text-xs border-l border-[var(--void-border-base)]"
          >
            ⏎
          </button>
        </div>

        {/* Status Line */}
        <div className="flex items-center justify-between text-[10px] text-[var(--void-text-muted)] font-mono">
          <div>
            SYSTEM_STATUS: <span className="text-green-500">ONLINE</span>
          </div>
          <div>
             Index_v4.2.0
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchInput
