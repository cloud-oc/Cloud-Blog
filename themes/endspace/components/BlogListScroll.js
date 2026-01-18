import { BlogPostCard } from './BlogPostCard'

/**
 * BlogListScroll Component - Infinite Scroll List
 * 无限滚动列表组件
 */
export const BlogListScroll = ({ posts = [] }) => {
  return (
    <div className="w-full">
      <div id="posts-wrapper">
        {posts?.map((post) => (
          <BlogPostCard key={post.id} post={post} showSummary={true} />
        ))}
      </div>
    </div>
  )
}
