import { siteConfig } from '@/lib/config'

/**
 * TitleBar Component - Endfield Style (Light Industrial)
 * 标题栏组件 - 背景层显示循环滚动的 CLOUD09_SPACE 文字动画
 */
export const TitleBar = ({ post }) => {
  const marqueeText = 'CLOUD09_SPACE'

  return (
    <div className="relative py-16 md:py-24 border-b-2 border-[var(--void-border-base)] overflow-hidden bg-[var(--void-bg-base)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, var(--void-text-muted) 2px, var(--void-text-muted) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, var(--void-text-muted) 2px, var(--void-text-muted) 4px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Large Background Scrolling Watermark - CLOUD09_SPACE */}
      {!post && (
        <div className="absolute inset-0 flex items-center opacity-[0.04] pointer-events-none overflow-hidden">
          <div className="bg-watermark-scroll whitespace-nowrap">
            <span className="text-[15vw] font-black text-[var(--void-text-primary)] select-none">
              {marqueeText}
              <span className="mx-[5vw] text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-[5vw] text-[var(--void-text-muted)]">•</span>
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



