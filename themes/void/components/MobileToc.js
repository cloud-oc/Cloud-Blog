'use client'

import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * MobileToc Component - Mobile Table of Contents
 * 移动端目录组件 - 浮动按钮 + 弹出面板
 */
const MobileToc = ({ toc }) => {
  const [isOpen, setIsOpen] = useState(false)
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
    }, throttleMs)
  )

  // 防止滚动穿透
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // 无目录就直接返回空
  if (!toc || toc.length < 1) {
    return null
  }

  const handleItemClick = (id) => {
    setIsOpen(false)
    // 延迟滚动以确保面板关闭
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <>
      {/* Floating TOC Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 md:hidden w-12 h-12 bg-[var(--void-bg-primary)] border border-[var(--void-border-base)] shadow-lg flex items-center justify-center text-[var(--void-text-muted)] hover:text-blue-400 hover:border-blue-400 transition-all"
        title="目录"
      >
        <i className="fas fa-list-tree text-lg" />
        {/* Progress indicator ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${progress * 1.38} 138`}
            className="text-blue-400 opacity-60"
          />
        </svg>
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* TOC Panel - Slide up from bottom */}
      <div 
        className={`fixed left-0 right-0 bottom-0 z-50 md:hidden bg-[var(--void-bg-primary)] border-t border-[var(--void-border-base)] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--void-border-base)] bg-[var(--void-bg-secondary)]">
          <div className="flex items-center gap-3">
            <i className="fas fa-list-tree text-blue-400" />
            <span className="text-sm font-mono font-bold text-[var(--void-text-primary)] uppercase">TOC INDEX</span>
            <span className="text-xs font-mono text-[var(--void-text-muted)]">{toc.length} sections</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-[var(--void-text-muted)] hover:text-[var(--void-text-primary)] transition-colors"
          >
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[var(--void-bg-secondary)]">
          <div 
            className="h-full bg-blue-400 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TOC Items */}
        <div 
          ref={tRef}
          className="overflow-y-auto overflow-x-hidden py-3"
          style={{ maxHeight: 'calc(70vh - 80px)', scrollbarWidth: 'thin' }}
        >
          <nav className="px-4 space-y-1">
            {toc.map((tocItem, index) => {
              const id = uuidToId(tocItem.id)
              tocIds.push(id)
              const isActive = activeSection === id
              
              return (
                <button
                  key={id}
                  onClick={() => handleItemClick(id)}
                  className={`w-full text-left py-3 px-4 text-sm transition-all duration-200 border-l-2 ${
                    isActive 
                      ? 'border-blue-400 text-blue-400 bg-blue-400/10' 
                      : 'border-transparent text-[var(--void-text-secondary)] hover:text-[var(--void-text-primary)] hover:bg-[var(--void-bg-secondary)]'
                  }`}
                  style={{ 
                    paddingLeft: `${16 + tocItem.indentLevel * 16}px`
                  }}
                >
                  <span className="line-clamp-2 leading-relaxed break-words">
                    {tocItem.text}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[var(--void-border-base)] bg-[var(--void-bg-secondary)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--void-text-muted)]">
            <span>{Math.round(progress)}% READ</span>
            <span>Tap to navigate</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileToc
