import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * SideBar Component - Endfield Style Refined
 * 右侧边栏组件
 */
export const SideBar = (props) => {
  const { tags, categories, latestPosts, locale } = props

  return (
    <aside className="space-y-6">
      {/* About / Author Card */}
      <div className="void-frame p-6">
        <h3 className="text-[var(--void-accent-yellow)] font-bold mb-4 tech-text text-xs tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--void-accent-yellow)]" />
          // OPERATOR_INFO
        </h3>
        <div className="flex gap-4 items-start">
            {siteConfig('AVATAR') && (
              <div className="relative w-16 h-16 flex-shrink-0">
                <img
                  src={siteConfig('AVATAR')}
                  alt={siteConfig('AUTHOR')}
                  className="w-full h-full object-cover border border-[var(--void-border-base)]"
                />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--void-accent-cyan)]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--void-accent-cyan)]" />
              </div>
            )}
            <div>
               <h4 className="text-lg font-bold text-white leading-none mb-2">{siteConfig('AUTHOR')}</h4>
               <p className="text-xs text-[var(--void-text-secondary)] leading-relaxed">
                 {siteConfig('BIO') || 'Exploring the frontier of technology'}
               </p>
            </div>
        </div>
      </div>

      {/* Latest Posts */}
      {latestPosts && latestPosts.length > 0 && (
        <div className="void-frame p-6">
          <h3 className="text-[var(--void-accent-yellow)] font-bold mb-4 tech-text text-xs tracking-wider flex items-center gap-2">
             <div className="w-2 h-2 bg-[var(--void-accent-yellow)]" />
             // RECENT_LOGS
          </h3>
          <div className="space-y-4">
            {latestPosts.slice(0, 5).map((post, index) => (
              <SmartLink
                key={post.id}
                href={`/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[var(--void-text-muted)] font-mono text-xs mt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-[var(--void-text-primary)] group-hover:text-[var(--void-accent-cyan)] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="text-[10px] text-[var(--void-text-muted)] font-mono mt-1">
                      {post.publishDay}
                    </div>
                  </div>
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="void-frame p-6">
          <h3 className="text-[var(--void-accent-yellow)] font-bold mb-4 tech-text text-xs tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--void-accent-yellow)]" />
            // DATA_TYPES
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                className="flex items-center justify-between text-xs group py-1 border-b border-transparent hover:border-[var(--void-border-active)] transition-all"
              >
                <span className="text-[var(--void-text-secondary)] group-hover:text-[var(--void-accent-yellow)] transition-colors flex items-center gap-2">
                  <span className="opacity-50">&gt;</span>
                  <span>{category.name}</span>
                </span>
                <span className="text-[var(--void-accent-cyan)] font-mono opacity-60">
                  {String(category.count).padStart(2, '0')}
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* Tags Cloud */}
      {tags && tags.length > 0 && (
        <div className="void-frame p-6">
          <h3 className="text-[var(--void-accent-yellow)] font-bold mb-4 tech-text text-xs tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--void-accent-yellow)]" />
            // KEYWORDS
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 20).map((tag) => (
              <SmartLink
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className="px-2 py-1 text-[10px] uppercase bg-[var(--void-bg-secondary)] text-[var(--void-text-secondary)] border border-[var(--void-border-base)] hover:border-[var(--void-accent-cyan)] hover:text-[var(--void-accent-cyan)] transition-colors"
              >
                #{tag.name}
              </SmartLink>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
