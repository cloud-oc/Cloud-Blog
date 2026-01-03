import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * SideBar Component - Right Sidebar
 * 右侧边栏组件
 */
export const SideBar = (props) => {
  const { tags, categories, latestPosts, locale } = props

  return (
    <aside className="space-y-6">
      {/* About / Author Card */}
      <div className="void-card p-6 tech-corner">
        <h3 className="text-yellow-400 font-bold mb-4 tech-text text-sm">
          // OPERATOR_INFO
        </h3>
        <div className="space-y-3">
          <div className="text-center mb-4">
            {siteConfig('AVATAR') && (
              <img
                src={siteConfig('AVATAR')}
                alt={siteConfig('AUTHOR')}
                className="w-24 h-24 mx-auto mb-3 border-2 border-yellow-400 p-1"
              />
            )}
            <h4 className="text-lg font-bold text-white">{siteConfig('AUTHOR')}</h4>
          </div>
          <p className="text-sm text-gray-400 text-center">
            {siteConfig('BIO') || 'Exploring the frontier of technology'}
          </p>
        </div>
      </div>

      {/* Latest Posts */}
      {latestPosts && latestPosts.length > 0 && (
        <div className="void-card p-6 tech-corner">
          <h3 className="text-yellow-400 font-bold mb-4 tech-text text-sm">
            // RECENT_POSTS
          </h3>
          <div className="space-y-3">
            {latestPosts.slice(0, 5).map((post, index) => (
              <SmartLink
                key={post.id}
                href={`/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 text-xs tech-text mt-1 flex-shrink-0">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="text-xs text-gray-600 tech-text mt-1">
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
        <div className="void-card p-6 tech-corner">
          <h3 className="text-yellow-400 font-bold mb-4 tech-text text-sm">
            // CATEGORIES
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                className="flex items-center justify-between text-sm text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-folder text-xs" />
                  <span>{category.name}</span>
                </span>
                <span className="tech-text text-xs text-cyan-400">
                  [{category.count}]
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* Tags Cloud */}
      {tags && tags.length > 0 && (
        <div className="void-card p-6 tech-corner">
          <h3 className="text-yellow-400 font-bold mb-4 tech-text text-sm">
            // TAGS
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 20).map((tag) => (
              <SmartLink
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className="px-2 py-1 text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 tech-text hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all"
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
