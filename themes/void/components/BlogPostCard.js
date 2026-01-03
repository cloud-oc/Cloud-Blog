import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * BlogPostCard Component - Refined Endfield Style
 * 文章卡片组件 - 视觉优化版
 */
export const BlogPostCard = ({ post, showSummary = true }) => {
  const showPreview = siteConfig('VOID_POST_LIST_PREVIEW', true, CONFIG)
  const showCover = siteConfig('VOID_POST_LIST_COVER', true, CONFIG)

  return (
    <SmartLink href={`/${post.slug}`}>
      <article className="void-frame group mb-6 hover:border-[var(--void-accent-yellow)] transition-all duration-300 relative overflow-hidden">
        
        {/* Active Decoration Line (Left) */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--void-accent-yellow)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-20" />

        <div className="flex flex-col md:flex-row gap-0">
          {/* Cover Image */}
          {showCover && post.pageCoverThumbnail && (
            <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[var(--void-accent-yellow)]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
              <img
                src={post.pageCoverThumbnail}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              {/* Tech overlay on image */}
              <div className="absolute bottom-0 right-0 bg-black/80 px-2 py-1 text-[10px] text-[var(--void-accent-cyan)] font-mono border-t border-l border-[var(--void-accent-cyan)] opacity-70">
                IMG_SOURCE
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 flex flex-col p-6 relative">
            
            {/* Header: Date & Cat */}
            <div className="flex items-center gap-3 mb-3 text-xs font-mono">
               <span className="text-[var(--void-accent-cyan)]">
                 [{post.publishDay}]
               </span>
               <span className="w-px h-3 bg-[var(--void-border-active)]" />
               {post.category && (
                <span className="text-[var(--void-accent-yellow)]">
                  {post.category.toUpperCase()}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-[var(--void-text-primary)] group-hover:text-white transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h2>

            {/* Summary */}
            {showSummary && showPreview && post.summary && (
              <p className="text-[var(--void-text-secondary)] text-sm line-clamp-2 mb-4 flex-1 leading-relaxed font-light">
                {post.summary}
              </p>
            )}

            {/* Footer: Tags & Action */}
            <div className="mt-auto flex items-center justify-between border-t border-[var(--void-border-base)] pt-4">
              <div className="flex gap-2">
                {post.tags && post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase text-[var(--void-text-muted)] group-hover:text-[var(--void-text-secondary)] transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-[var(--void-accent-cyan)] text-xs font-bold font-mono group-hover:text-[var(--void-accent-yellow)] transition-colors">
                <span>READ_LOG</span>
                <i className="fas fa-angle-right transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </SmartLink>
  )
}
