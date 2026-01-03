import { siteConfig } from '@/lib/config'

/**
 * Footer Component - Dark Industrial / Endfield Style
 * 页脚组件 - 深色工业风格
 */
export const Footer = ({ title }) => {
  const d = new Date()
  const y = d.getFullYear()

  return (
    <footer className="relative mt-20 bg-[#0d0d0d] text-gray-300">
      {/* Spectrum Bar Top */}
      <div className="spectrum-bar opacity-30" />
      
      {/* Use negative margin to offset the sidebar and center content relative to viewport */}
      <div className="py-8 space-y-4 md:-ml-20">
        {/* Row 1: RSS and Sitemap Links */}
        <div className="flex justify-center items-center gap-6 text-xs font-mono">
          {siteConfig('ENABLE_RSS') && (
            <a 
              href="/rss/feed.xml" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[var(--void-accent-yellow)] transition-colors"
            >
              <i className="fas fa-rss" />
              <span>RSS</span>
            </a>
          )}
          <a 
            href="/sitemap.xml" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-[var(--void-accent-yellow)] transition-colors"
          >
            <i className="fas fa-sitemap" />
            <span>SITEMAP</span>
          </a>
        </div>

        {/* Row 2: ICP 备案 */}
        {siteConfig('BEI_AN') && (
          <div className="flex justify-center items-center text-xs font-mono text-gray-500">
            {siteConfig('BEI_AN_LINK') ? (
              <a 
                href={siteConfig('BEI_AN_LINK')} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                {siteConfig('BEI_AN')}
              </a>
            ) : (
              <span>{siteConfig('BEI_AN')}</span>
            )}
          </div>
        )}

        {/* Row 3: Copyright */}
        <div className="flex justify-center items-center text-xs font-mono text-gray-500">
          <div>
            © {siteConfig('SINCE') && siteConfig('SINCE') !== y ? `${siteConfig('SINCE')}-${y}` : y} {siteConfig('AUTHOR')}. All Rights Reserved.
          </div>
        </div>
      </div>
      
      {/* Corner Decoration */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gray-800 opacity-50" />
    </footer>
  )
}

export default Footer

