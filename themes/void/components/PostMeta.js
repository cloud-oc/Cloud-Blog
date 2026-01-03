// import { siteConfig } from '@/lib/config'

/**
 * PostMeta Component - Minimalist Light Industrial
 * 极简主义/未来感元数据展示
 * No redundant labels ("DATE:", etc.), just pure data and icons.
 */
export const PostMeta = ({ post }) => {
  if (!post) return null

  return (
    <div className="mb-10 w-full">
      {/* Header Block */}
      <div className="mb-6 relative">
        {/* Top Identification Line */}
        <div className="flex items-center gap-3 mb-6 text-xs font-mono text-[var(--void-text-muted)] border-b border-[var(--void-border-base)] pb-2">
            <span className="font-bold text-[var(--void-text-primary)]">DOC_ID // {post.id?.slice(0,6) || 'UNKNOWN'}</span>
            <span className="flex-1" />
            <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ONLINE
            </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-[var(--void-text-primary)] mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Data Grid - Borderless, clean negative space */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-mono text-[var(--void-text-secondary)]">
            
            {/* Date */}
            <div className="flex items-center gap-2">
                <i className="far fa-clock text-[var(--void-text-muted)]" />
                <span>{post.publishDay}</span>
            </div>

            {/* Last Update Time */}
            {post.lastEditedDay && post.lastEditedDay !== post.publishDay && (
                <div className="flex items-center gap-2">
                    <i className="fas fa-sync-alt text-[var(--void-text-muted)]" />
                    <span>UPDATED: {post.lastEditedDay}</span>
                </div>
            )}

            {/* Category */}
            {post.category && (
                <div className="flex items-center gap-2">
                    <i className="far fa-folder text-[var(--void-text-muted)]" />
                    <span className="font-bold text-[var(--void-text-primary)]">{post.category.toUpperCase()}</span>
                </div>
            )}

            {/* Reading Time / Count */}
            <div className="flex items-center gap-2">
                <i className="far fa-file-alt text-[var(--void-text-muted)]" />
                <span>{post.wordCount || '-'} CHARS</span>
            </div>

            {/* Tags - Minimalist Pills */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 ml-auto">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-[var(--void-bg-secondary)] text-[var(--void-text-secondary)] text-xs rounded hover:bg-[var(--void-text-primary)] hover:text-white transition-colors cursor-pointer">
                            #{tag.toUpperCase()}
                        </span>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  )
}
