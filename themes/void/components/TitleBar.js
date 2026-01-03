import { siteConfig } from '@/lib/config'

/**
 * TitleBar Component - Page Title Display
 * 标题栏组件
 */
export const TitleBar = ({ post, title, description }) => {
  const displayTitle = post?.title || title || siteConfig('TITLE')
  const displayDesc = post?.summary || description || siteConfig('DESCRIPTION')

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-transparent py-16 md:py-24 border-b border-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 199, 0, 0.1) 2px, rgba(255, 199, 0, 0.1) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Large Background Text */}
      {!post && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
          <div className="text-[20vw] font-bold text-white whitespace-nowrap">
            VOID
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Technical Header */}
          <div className="flex items-center gap-2 mb-4 text-xs text-cyan-400 tech-text">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>SYSTEM_TERMINAL</span>
            <span className="text-gray-600">//</span>
            <span className="text-gray-500">
              {new Date().toISOString().split('T')[0]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-yellow-400 tech-text">&gt; </span>
            {displayTitle}
          </h1>

          {/* Description */}
          {displayDesc && (
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
              {displayDesc}
            </p>
          )}

          {/* Decorative Line */}
          <div className="mt-8 flex items-center gap-2">
            <div className="h-px bg-gradient-to-r from-yellow-400 via-cyan-400 to-transparent flex-1" />
            <div className="text-xs text-gray-600 tech-text">EOF</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </div>
  )
}

export default TitleBar
