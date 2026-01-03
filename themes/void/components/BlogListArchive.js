import SmartLink from '@/components/SmartLink'

/**
 * BlogListArchive Component - Archive Timeline
 * 归档时间线组件
 */
export const BlogListArchive = ({ archiveTitle, archivePosts }) => {
  return (
    <div className="mb-12">
      {/* Year Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl font-bold text-yellow-400 tech-text">
          {archiveTitle}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/50 to-transparent" />
        <div className="text-sm text-gray-500 tech-text">
          {archivePosts[archiveTitle]?.length} POSTS
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4 pl-8 border-l-2 border-gray-800 relative">
        {/* Timeline accent */}
        <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-yellow-400 to-cyan-400 opacity-30" />
        
        {archivePosts[archiveTitle]?.map((post) => (
          <div key={post.id} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-[33px] top-2 w-2 h-2 bg-gray-700 border-2 border-cyan-400 rounded-full group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all" />
            
            <SmartLink href={`/${post.slug}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 p-4 rounded hover:bg-gray-900/50 transition-colors">
                {/* Date */}
                <div className="text-gray-500 text-sm tech-text whitespace-nowrap md:w-32">
                  {post.publishDay}
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h3 className="text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                </div>

                {/* Category */}
                {post.category && (
                  <div className="text-cyan-400 text-xs tech-text">
                    [{post.category}]
                  </div>
                )}

                {/* Arrow */}
                <div className="text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all">
                  &gt;&gt;
                </div>
              </div>
            </SmartLink>
          </div>
        ))}
      </div>
    </div>
  )
}
