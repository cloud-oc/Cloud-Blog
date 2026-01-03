import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * BlogPostCard Component - Minimalist Light Industrial
 * 极简/光亮风格文章卡片
 */
export const BlogPostCard = ({ post, showSummary = true }) => {
  const showPreview = siteConfig('VOID_POST_LIST_PREVIEW', true, CONFIG)
  const showCover = siteConfig('VOID_POST_LIST_COVER', true, CONFIG)
  const hasCover = showCover && post.pageCoverThumbnail

  return (
    <SmartLink href={`/${post.slug}`}>
      <article className={`void-frame group mb-6 flex flex-col md:flex-row overflow-hidden hover:border-[var(--void-border-active)] transition-all duration-300 ${hasCover ? '' : 'p-6 md:p-8'}`}>
        
        {/* Content - Left side with padding */}
        <div className={`flex-1 flex flex-col justify-center ${hasCover ? 'p-6 md:p-8' : ''}`}>
          
          {/* Top Meta */}
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--void-text-muted)] mb-3">
             <span className="text-[var(--void-text-primary)] font-bold">
                 {post.publishDay}
             </span>
             <span className="w-px h-3 bg-[var(--void-border-base)]" />
             {post.category && (
                <span className="tracking-wider">{post.category.toUpperCase()}</span>
             )}
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-black text-[var(--void-text-primary)] mb-4 leading-tight group-hover:text-[var(--void-accent-yellow)] transition-colors">
            {post.title}
          </h2>

          {/* Summary */}
          {showSummary && showPreview && post.summary && (
            <p className="text-[var(--void-text-secondary)] text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 font-medium">
              {post.summary}
            </p>
          )}

          {/* Footer / Read More */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-2">
                {post.tags?.slice(0,3).map(tag => (
                    <span key={tag} className="text-[10px] text-[var(--void-text-muted)] bg-[var(--void-bg-secondary)] px-1.5 py-0.5 rounded">
                        #{tag}
                    </span>
                ))}
            </div>
            
            <div className="flex items-center gap-2 text-[var(--void-text-primary)] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                <span>Access</span>
                <i className="fas fa-arrow-right" />
            </div>
          </div>
        </div>

        {/* Cover Image - Fixed size, flush right, no frame */}
        {hasCover && (
          <div className="md:w-64 lg:w-80 h-48 md:h-auto flex-shrink-0 relative overflow-hidden order-first md:order-last">
            <img
              src={post.pageCoverThumbnail}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Minimalist marker overlay */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-[var(--void-accent-yellow)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </article>
    </SmartLink>
  )
}

