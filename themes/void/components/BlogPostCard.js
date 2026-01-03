import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * BlogPostCard Component - Endfield Style
 * 文章卡片组件
 */
export const BlogPostCard = ({ post, showSummary = true }) => {
  const showPreview = siteConfig('VOID_POST_LIST_PREVIEW', true, CONFIG)
  const showCover = siteConfig('VOID_POST_LIST_COVER', true, CONFIG)

  return (
    <SmartLink href={`/${post.slug}`}>
      <article className="void-card group p-6 mb-6 hover:scale-[1.02] transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover Image */}
          {showCover && post.pageCoverThumbnail && (
            <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img
                src={post.pageCoverThumbnail}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              {/* Technical Corner Decoration */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {/* Category & Tags */}
            <div className="flex items-center gap-2 mb-3 text-xs">
              {post.category && (
                <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/50 tech-text">
                  {post.category}
                </span>
              )}
              {post.tags && post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 tech-text"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
              {post.title}
            </h2>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 tech-text">
              <div className="flex items-center gap-1">
                <i className="far fa-calendar" />
                <span>{post.publishDay}</span>
              </div>
              {post.lastEditedDay && (
                <div className="flex items-center gap-1">
                  <i className="far fa-edit" />
                  <span>{post.lastEditedDay}</span>
                </div>
              )}
            </div>

            {/* Summary */}
            {showSummary && showPreview && post.summary && (
              <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                {post.summary}
              </p>
            )}

            {/* Read More */}
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:text-yellow-400 transition-colors">
              <span className="tech-text">READ_MORE</span>
              <span className="transform group-hover:translate-x-2 transition-transform">&gt;&gt;</span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </article>
    </SmartLink>
  )
}
