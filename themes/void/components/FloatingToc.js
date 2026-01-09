import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * FloatingToc Component - Void Theme Industrial Style
 * 悬浮目录导航组件 - 工业风格设计
 */
const FloatingToc = ({ toc }) => {
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
    <div className="p-2">
      {/* Header - matches other sidebar sections */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[var(--void-text-muted)] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <i className="fas fa-list-tree text-blue-400" />
          <span>TOC Index</span>
        </h3>
        <span className="text-[10px] font-mono text-blue-400">{Math.round(progress)}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-[var(--void-bg-secondary)] mb-4">
        <div 
          className="h-full bg-blue-400 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* TOC Items */}
      <div 
        ref={tRef}
        className="overflow-y-auto max-h-64 scroll-smooth border-l border-[var(--void-border-base)] pl-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        <nav className="space-y-2">
          {toc.map((tocItem, index) => {
            const id = uuidToId(tocItem.id)
            tocIds.push(id)
            const isActive = activeSection === id
            
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`block py-1 text-xs transition-all duration-200 hover:translate-x-1 ${
                  isActive 
                    ? 'text-blue-400 font-medium' 
                    : 'text-[var(--void-text-secondary)] hover:text-[var(--void-text-primary)]'
                }`}
                style={{ 
                  paddingLeft: `${tocItem.indentLevel * 12}px`
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
      <div className="mt-4 pt-2 border-t border-[var(--void-border-base)]">
        <div className="text-[10px] font-mono text-[var(--void-text-muted)]">
          {toc.length} SECTIONS
        </div>
      </div>
    </div>
  )
}

export default FloatingToc
