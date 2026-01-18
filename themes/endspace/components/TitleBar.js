import { siteConfig } from '@/lib/config'

/**
 * TitleBar Component - Endfield Style (Light Industrial)
 * 标题栏组�?- 背景层显示循环滚动的 CLOUD09_SPACE 文字动画
 */
export const TitleBar = ({ post }) => {
  const marqueeText = 'CLOUD09_SPACE'

  return (
    <div className="relative py-20 md:py-28 border-b-2 border-[var(--endspace-border-base)] overflow-hidden bg-[var(--endspace-bg-base)]">
      {/* Post Cover Image Background - shown on article pages */}
      {post && post.pageCoverThumbnail && (
        <div className="absolute inset-0">
          <img 
            src={post.pageCoverThumbnail}
            alt={post.title || 'Cover'}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Background Pattern - Grid overlay effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, var(--endspace-text-muted) 2px, var(--endspace-text-muted) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, var(--endspace-text-muted) 2px, var(--endspace-text-muted) 4px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Large Background Scrolling Watermark - CLOUD09_SPACE (only on non-article pages) */}
      {!post && (
        <div className="absolute inset-0 flex items-center opacity-[0.04] pointer-events-none overflow-hidden">
          <div className="bg-watermark-scroll whitespace-nowrap">
            <span className="text-[15vw] font-black text-[var(--endspace-text-primary)] select-none">
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">�?/span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">�?/span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">�?/span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">�?/span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">�?/span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--endspace-text-muted)]">�?/span>
            </span>
          </div>
        </div>
      )}

      {/* Marquee Animation Styles for Background Watermark */}
      <style jsx>{`
        .bg-watermark-scroll {
          display: inline-block;
          animation: bgMarquee 30s linear infinite;
        }
        @keyframes bgMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

export default TitleBar



