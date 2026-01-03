import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * FloatingToc Component - Void Theme Industrial Style
 * 悬浮目录导航组件 - 工业风格设计
 */
const FloatingToc = ({ toc }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [progress, setProgress] = useState(0)
  const tRef = useRef(null)
  const tocIds = []

  // 监听滚动事件
  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    window.addEventListener('scroll', updateProgress)
    actionSectionScrollSpy()
    updateProgress()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  // 更新阅读进度
  const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
    setProgress(progress)
  }

  // 同步选中目录事件
  const throttleMs = 200
  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        break
      }
      setActiveSection(currentSectionId)
      // 自动滚动目录
      if (tRef.current && tocIds.length > 0) {
        const index = tocIds.indexOf(currentSectionId) || 0
        tRef.current.scrollTo({ top: 32 * index - 60, behavior: 'smooth' })
      }
    }, throttleMs)
  )

  // 无目录就直接返回空
  if (!toc || toc.length < 1) {
    return null
  }

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      {/* Toggle Button */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ${isExpanded ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
      >
        <button
          onClick={() => setIsExpanded(true)}
          className="w-10 h-10 bg-[var(--void-bg-base)] border border-[var(--void-border-base)] hover:border-blue-400 flex items-center justify-center text-[var(--void-text-muted)] hover:text-blue-400 transition-all group"
          title="目录"
        >
          <i className="fas fa-list-ul text-sm" />
          {/* Progress indicator ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progress * 1.13} 113`}
              className="text-blue-400 opacity-60"
            />
          </svg>
        </button>
      </div>

      {/* TOC Panel */}
      <div 
        className={`bg-[var(--void-bg-base)] border border-[var(--void-border-base)] shadow-xl transition-all duration-300 origin-left ${
          isExpanded 
            ? 'opacity-100 scale-100 translate-x-0' 
            : 'opacity-0 scale-95 -translate-x-4 pointer-events-none'
        }`}
        style={{ maxWidth: '280px', minWidth: '220px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--void-border-base)] bg-[var(--void-bg-secondary)]">
          <div className="flex items-center gap-2">
            <i className="fas fa-sitemap text-xs text-blue-400" />
            <span className="text-xs font-mono font-bold text-[var(--void-text-primary)] uppercase">TOC_INDEX</span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="w-6 h-6 flex items-center justify-center text-[var(--void-text-muted)] hover:text-[var(--void-text-primary)] transition-colors"
          >
            <i className="fas fa-times text-xs" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-0.5 bg-[var(--void-bg-secondary)]">
          <div 
            className="h-full bg-blue-400 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TOC Items */}
        <div 
          ref={tRef}
          className="overflow-y-auto max-h-80 py-2 scroll-smooth"
          style={{ scrollbarWidth: 'thin' }}
        >
          <nav className="px-2">
            {toc.map((tocItem, index) => {
              const id = uuidToId(tocItem.id)
              tocIds.push(id)
              const isActive = activeSection === id
              
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsExpanded(false)}
                  className={`block py-1.5 px-2 text-xs font-mono transition-all duration-200 border-l-2 hover:bg-[var(--void-bg-secondary)] ${
                    isActive 
                      ? 'border-blue-400 text-blue-400 bg-[var(--void-bg-secondary)]' 
                      : 'border-transparent text-[var(--void-text-secondary)] hover:text-[var(--void-text-primary)] hover:border-[var(--void-border-active)]'
                  }`}
                  style={{ 
                    paddingLeft: `${8 + tocItem.indentLevel * 12}px`
                  }}
                >
                  <span className="line-clamp-2 leading-relaxed">
                    {tocItem.text}
                  </span>
                </a>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[var(--void-border-base)] bg-[var(--void-bg-secondary)]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--void-text-muted)]">
            <span>{toc.length} SECTIONS</span>
            <span>{Math.round(progress)}% READ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatingToc
