/**
 * PostMeta Component - Article Metadata Display
 * 文章元数据显示组件
 */
export const PostMeta = ({ post }) => {
  if (!post) return null

  return (
    <div className="void-card p-6 mb-8">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
        {post.title}
      </h1>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Publish Date */}
        <div className="tech-corner p-3">
          <div className="text-xs text-gray-500 mb-1 tech-text">PUBLISHED</div>
          <div className="text-sm text-cyan-400 tech-text">{post.publishDay}</div>
        </div>

        {/* Last Edited */}
        {post.lastEditedDay && (
          <div className="tech-corner p-3">
            <div className="text-xs text-gray-500 mb-1 tech-text">UPDATED</div>
            <div className="text-sm text-cyan-400 tech-text">{post.lastEditedDay}</div>
          </div>
        )}

        {/* Category */}
        {post.category && (
          <div className="tech-corner p-3">
            <div className="text-xs text-gray-500 mb-1 tech-text">CATEGORY</div>
            <div className="text-sm text-yellow-400">{post.category}</div>
          </div>
        )}

        {/* Read Time (if available) */}
        <div className="tech-corner p-3">
          <div className="text-xs text-gray-500 mb-1 tech-text">STATUS</div>
          <div className="text-sm text-green-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-xs text-gray-500 tech-text">TAGS:</div>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 tech-text hover:bg-cyan-400/20 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
    </div>
  )
}
