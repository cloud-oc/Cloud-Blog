import { siteConfig } from '@/lib/config'

/**
 * TitleBar Component - Endfield Style (Light Industrial)
 * 标题栏组件 - 仅显示循环滚动的 CLOUD09_SPACE 文字动画
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

      {/* Large Background Text Watermark */}
      {!post && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden mix-blend-multiply">
          <div className="text-[20vw] font-black text-[var(--void-text-primary)] whitespace-nowrap select-none">
            VOID_SYSTEM
          </div>
        </div>
      )}

      {/* Scrolling Marquee Title */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="overflow-hidden">
          <div className="marquee-container">
            <h1 className="marquee-text text-4xl md:text-6xl lg:text-7xl font-black text-[var(--void-text-primary)] leading-tight tracking-tight whitespace-nowrap">
              <span className="text-[var(--void-accent-yellow)] mr-4">&gt;</span>
              {marqueeText}
              <span className="mx-8 text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-8 text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-8 text-[var(--void-text-muted)]">•</span>
              {marqueeText}
              <span className="mx-8 text-[var(--void-text-muted)]">•</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        .marquee-container {
          display: flex;
          width: 100%;
        }
        .marquee-text {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </div>
  )
}

export default TitleBar


