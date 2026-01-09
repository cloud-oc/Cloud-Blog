'use client'

import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * Void Theme - 上一篇/下一篇文章导航
 * Tech industrial style with sharp corners and scan lines
 * @param {prev, next} param0
 * @returns
 */
export default function ArticleAdjacent({ prev, next }) {
  if (!siteConfig('VOID_ARTICLE_ADJACENT', true, CONFIG)) {
    return null
  }

  // 如果两者都没有，不显示
  if (!prev && !next) {
    return null
  }

  return (
    <section className="my-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-[var(--void-accent-yellow)]" />
        <span className="tech-text text-xs text-[var(--void-text-muted)]">
          NAVIGATION // 相关文章
        </span>
        <div className="flex-1 h-px bg-[var(--void-border-base)]" />
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Article */}
        {prev ? (
          <SmartLink
            href={`/${prev.slug}`}
            className="group void-frame p-5 flex flex-col justify-between min-h-[100px] hover:border-[var(--void-accent-yellow)] transition-all duration-300"
          >
            {/* Direction Label */}
            <div className="flex items-center gap-2 mb-3">
              <i className="fas fa-chevron-left text-[var(--void-accent-cyan)] text-xs" />
              <span className="tech-text text-xs text-[var(--void-text-muted)]">
                PREV_POST
              </span>
            </div>
            
            {/* Title */}
            <div className="text-[var(--void-text-primary)] font-semibold line-clamp-2 group-hover:text-[var(--void-accent-yellow)] transition-colors">
              {prev.title}
            </div>

            {/* Scan Line Effect */}
            <div className="mt-3 h-px bg-gradient-to-r from-[var(--void-accent-cyan)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </SmartLink>
        ) : (
          <div className="void-frame p-5 flex items-center justify-center min-h-[100px] opacity-40">
            <span className="tech-text text-xs text-[var(--void-text-muted)]">
              // NO_PREV_ARTICLE
            </span>
          </div>
        )}

        {/* Next Article */}
        {next ? (
          <SmartLink
            href={`/${next.slug}`}
            className="group void-frame p-5 flex flex-col justify-between min-h-[100px] hover:border-[var(--void-accent-yellow)] transition-all duration-300"
          >
            {/* Direction Label */}
            <div className="flex items-center justify-end gap-2 mb-3">
              <span className="tech-text text-xs text-[var(--void-text-muted)]">
                NEXT_POST
              </span>
              <i className="fas fa-chevron-right text-[var(--void-accent-cyan)] text-xs" />
            </div>
            
            {/* Title */}
            <div className="text-[var(--void-text-primary)] font-semibold line-clamp-2 text-right group-hover:text-[var(--void-accent-yellow)] transition-colors">
              {next.title}
            </div>

            {/* Scan Line Effect */}
            <div className="mt-3 h-px bg-gradient-to-l from-[var(--void-accent-cyan)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </SmartLink>
        ) : (
          <div className="void-frame p-5 flex items-center justify-center min-h-[100px] opacity-40">
            <span className="tech-text text-xs text-[var(--void-text-muted)]">
              // NO_NEXT_ARTICLE
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
