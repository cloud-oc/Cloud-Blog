import { siteConfig } from '@/lib/config'

/**
 * TitleBar Component - Endfield Style (Light Industrial)
 * 标题栏组件 - 适配亮色工业风
 */
export const TitleBar = ({ post, title, description }) => {
  const displayTitle = post?.title || title || siteConfig('TITLE')
  const displayDesc = post?.summary || description || siteConfig('DESCRIPTION')

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

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Technical Header */}
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--void-accent-cyan)] tech-text tracking-wider">
            <div className="w-2 h-2 bg-[var(--void-accent-cyan)] rounded-full animate-pulse" />
            <span>SYSTEM_TERMINAL</span>
            <span className="text-[var(--void-text-muted)]">//</span>
            <span className="text-[var(--void-text-secondary)]">
              {new Date().toISOString().split('T')[0]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-[var(--void-text-primary)] mb-6 leading-tight tracking-tight">
            <span className="text-[var(--void-accent-yellow)] tech-text font-normal mr-2">&gt;</span>
            {displayTitle}
          </h1>

          {/* Description */}
          {displayDesc && (
            <p className="text-lg md:text-xl text-[var(--void-text-secondary)] max-w-2xl font-medium leading-relaxed">
              {displayDesc}
            </p>
          )}

          {/* Decorative Line */}
          <div className="mt-8 flex items-center gap-2">
            <div className="h-0.5 bg-gradient-to-r from-[var(--void-accent-yellow)] via-[var(--void-accent-cyan)] to-transparent flex-1 opacity-50" />
            <div className="text-xs text-[var(--void-text-muted)] tech-text font-bold">EOF</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleBar
