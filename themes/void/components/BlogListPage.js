import { BlogPostCard } from './BlogPostCard'

/**
 * BlogListPage Component - Paginated List
 * 分页列表组件
 */
export const BlogListPage = ({ posts = [] }) => {
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
