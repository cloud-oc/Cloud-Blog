import { siteConfig } from '@/lib/config'

/**
 * PostMeta Component - Mission Briefing Style
 * 文章元数据 - 任务简报风格
 */
export const PostMeta = ({ post }) => {
  if (!post) return null

  return (
    <div className="mb-8 w-full">
      {/* Header Title Block */}
      <div className="mb-6 border-b border-[var(--void-border-base)] pb-6 relative">
        <div className="flex items-center gap-2 mb-4">
           <span className="px-2 py-0.5 bg-[var(--void-accent-yellow)] text-black text-xs font-bold font-mono">
             DOC_ID_{post.id?.slice(0,6) || 'UNKNOWN'}
           </span>
           <span className="text-xs text-[var(--void-text-muted)] font-mono">
             // SECURITY_LEVEL: PUBLIC
           </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Decorative scan line */}
        <div className="scan-line absolute bottom-0" />
      </div>

      {/* Info Grid / Mission Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--void-border-base)] border border-[var(--void-border-base)]">
        
        {/* Cell 1: Date */}
        <div className="bg-[var(--void-bg-primary)] p-4 flex flex-col justify-between group hover:bg-[var(--void-bg-secondary)] transition-colors relative">
           <span className="text-[10px] text-[var(--void-text-muted)] uppercase tracking-wider mb-1">Date_Created</span>
           <span className="text-sm font-mono text-[var(--void-accent-cyan)]">{post.publishDay}</span>
           <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--void-accent-cyan)] opacity-0 group-hover:opacity-100" />
        </div>

        {/* Cell 2: Category */}
        <div className="bg-[var(--void-bg-primary)] p-4 flex flex-col justify-between group hover:bg-[var(--void-bg-secondary)] transition-colors">
           <span className="text-[10px] text-[var(--void-text-muted)] uppercase tracking-wider mb-1">Category</span>
           <span className="text-sm font-bold text-[var(--void-accent-yellow)]">
             {post.category || 'UNCLASSIFIED'}
           </span>
        </div>

        {/* Cell 3: Views/Words (Simulated or Real) */}
        <div className="bg-[var(--void-bg-primary)] p-4 flex flex-col justify-between group hover:bg-[var(--void-bg-secondary)] transition-colors">
           <span className="text-[10px] text-[var(--void-text-muted)] uppercase tracking-wider mb-1">Data_Size</span>
           <span className="text-sm font-mono text-white">
             {post.wordCount || '-'} CHARS
           </span>
        </div>

         {/* Cell 4: Tags */}
        <div className="bg-[var(--void-bg-primary)] p-4 flex flex-col justify-between group hover:bg-[var(--void-bg-secondary)] transition-colors">
           <span className="text-[10px] text-[var(--void-text-muted)] uppercase tracking-wider mb-1">Keywords</span>
           <div className="flex flex-wrap gap-1">
             {post.tags && post.tags.slice(0,2).map(tag => (
               <span key={tag} className="text-xs text-[var(--void-text-secondary)]">#{tag}</span>
             ))}
           </div>
        </div>
      </div>
    </div>
  )
}
