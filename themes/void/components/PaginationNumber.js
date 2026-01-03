import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * PaginationNumber Component - Void Theme Industrial Style
 * 分页导航组件 - 工业科技风格
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = +page
  const showPrev = currentPage > 1
  const showNext = currentPage < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  const pages = generatePages(pagePrefix, page, currentPage, totalPage)

  return (
    <div className="mt-12 py-6 flex flex-col items-center gap-4">
      {/* Page Info */}
      <div className="text-xs font-mono text-[var(--void-text-muted)] uppercase tracking-wider">
        PAGE_{currentPage} / {totalPage}_TOTAL
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First Page Button */}
        <SmartLink
          href={{
            pathname: `${pagePrefix}/`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          legacyBehavior>
          <button
            className={`w-10 h-10 flex items-center justify-center border border-[var(--void-border-base)] font-mono text-sm transition-all ${
              currentPage === 1
                ? 'opacity-30 cursor-not-allowed bg-[var(--void-bg-secondary)] text-[var(--void-text-muted)]'
                : 'bg-[var(--void-bg-base)] text-[var(--void-text-secondary)] hover:border-blue-400 hover:text-blue-400 hover:bg-[var(--void-bg-secondary)]'
            }`}
            disabled={currentPage === 1}
          >
            <i className="fas fa-angle-double-left text-xs" />
          </button>
        </SmartLink>

        {/* Previous Page Button */}
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          legacyBehavior>
          <button
            className={`w-10 h-10 flex items-center justify-center border border-[var(--void-border-base)] font-mono text-sm transition-all ${
              !showPrev
                ? 'opacity-30 cursor-not-allowed bg-[var(--void-bg-secondary)] text-[var(--void-text-muted)]'
                : 'bg-[var(--void-bg-base)] text-[var(--void-text-secondary)] hover:border-blue-400 hover:text-blue-400 hover:bg-[var(--void-bg-secondary)]'
            }`}
            disabled={!showPrev}
          >
            <i className="fas fa-angle-left text-xs" />
          </button>
        </SmartLink>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages}
        </div>

        {/* Next Page Button */}
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          legacyBehavior>
          <button
            className={`w-10 h-10 flex items-center justify-center border border-[var(--void-border-base)] font-mono text-sm transition-all ${
              !showNext
                ? 'opacity-30 cursor-not-allowed bg-[var(--void-bg-secondary)] text-[var(--void-text-muted)]'
                : 'bg-[var(--void-bg-base)] text-[var(--void-text-secondary)] hover:border-blue-400 hover:text-blue-400 hover:bg-[var(--void-bg-secondary)]'
            }`}
            disabled={!showNext}
          >
            <i className="fas fa-angle-right text-xs" />
          </button>
        </SmartLink>

        {/* Last Page Button */}
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${totalPage}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          legacyBehavior>
          <button
            className={`w-10 h-10 flex items-center justify-center border border-[var(--void-border-base)] font-mono text-sm transition-all ${
              currentPage === totalPage
                ? 'opacity-30 cursor-not-allowed bg-[var(--void-bg-secondary)] text-[var(--void-text-muted)]'
                : 'bg-[var(--void-bg-base)] text-[var(--void-text-secondary)] hover:border-blue-400 hover:text-blue-400 hover:bg-[var(--void-bg-secondary)]'
            }`}
            disabled={currentPage === totalPage}
          >
            <i className="fas fa-angle-double-right text-xs" />
          </button>
        </SmartLink>
      </div>

      {/* Progress Indicator */}
      <div className="w-48 h-1 bg-[var(--void-bg-secondary)] overflow-hidden">
        <div 
          className="h-full bg-blue-400 transition-all duration-300"
          style={{ width: `${(currentPage / totalPage) * 100}%` }}
        />
      </div>
    </div>
  )
}

/**
 * 生成分页按钮组
 */
function generatePages(pagePrefix, page, currentPage, totalPage) {
  const pages = []
  const groupCount = 5 // 最多显示页签数

  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(pagePrefix, i, page))
    }
  } else {
    pages.push(getPageElement(pagePrefix, 1, page))
    
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 1
    
    if (startPage <= 1) {
      startPage = 2
    }
    if (startPage + dynamicGroupCount > totalPage) {
      startPage = totalPage - dynamicGroupCount
    }
    
    if (startPage > 2) {
      pages.push(
        <div key={-1} className="w-8 h-10 flex items-center justify-center text-[var(--void-text-muted)] font-mono text-xs">
          ...
        </div>
      )
    }

    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(pagePrefix, startPage + i, page))
      }
    }

    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(
        <div key={-2} className="w-8 h-10 flex items-center justify-center text-[var(--void-text-muted)] font-mono text-xs">
          ...
        </div>
      )
    }

    pages.push(getPageElement(pagePrefix, totalPage, page))
  }
  return pages
}

/**
 * 生成分页按钮对象
 */
function getPageElement(pagePrefix, pageNum, currentPage) {
  const isActive = pageNum + '' === currentPage + ''
  
  return (
    <SmartLink
      href={pageNum === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${pageNum}`}
      key={pageNum}
      passHref
      className={`w-10 h-10 flex items-center justify-center border font-mono text-sm transition-all ${
        isActive
          ? 'bg-blue-500 border-blue-500 text-white font-bold'
          : 'bg-[var(--void-bg-base)] border-[var(--void-border-base)] text-[var(--void-text-secondary)] hover:border-blue-400 hover:text-blue-400'
      }`}
    >
      {pageNum}
    </SmartLink>
  )
}

export default PaginationNumber
