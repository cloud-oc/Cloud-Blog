import { siteConfig } from '@/lib/config'

/**
 * Footer Component - Light Industrial / Endfield Style
 * 页脚组件
 */
export const Footer = ({ title }) => {
  const d = new Date()
  const y = d.getFullYear()

  return (
    <footer className="relative mt-20 border-t-2 border-[var(--void-border-base)] bg-[var(--void-bg-secondary)] text-[var(--void-text-secondary)]">
      {/* Spectrum Bar Top */}
      <div className="spectrum-bar opacity-50" />
      
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Col 1: System Info */}
          <div className="md:col-span-2 space-y-4">
             <div className="flex items-center gap-2 mb-2">
               <i className="fas fa-cube text-xl text-[var(--void-accent-yellow)]" />
               <span className="text-xl font-bold tracking-wider text-[var(--void-text-primary)] uppercase">
                 {siteConfig('TITLE')}
               </span>
             </div>
             <p className="text-sm leading-relaxed max-w-sm text-[var(--void-text-secondary)] font-medium">
                Running Void Theme v4.5 // Light Industrial Edition. <br/>
                All systems nominal. Connection stable.
             </p>
          </div>

          {/* Col 2: Links */}
          <div className="space-y-4">
             <h4 className="text-[var(--void-text-primary)] font-bold text-xs uppercase tracking-widest mb-4 border-b border-[var(--void-border-base)] pb-2 inline-block">
               Navigation
             </h4>
             <ul className="space-y-2 text-sm font-mono">
                <li><a href="/" className="hover:text-[var(--void-text-primary)] transition-colors">&gt; HOME</a></li>
                <li><a href="/archive" className="hover:text-[var(--void-text-primary)] transition-colors">&gt; DATABASE</a></li>
                <li><a href="/about" className="hover:text-[var(--void-text-primary)] transition-colors">&gt; PROTOCOLS</a></li>
             </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--void-border-base)] flex flex-col md:flex-row justify-between items-center text-xs font-mono text-[var(--void-text-muted)]">
            <div>
               © {y} {siteConfig('AUTHOR')}. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
               <span>PRIVACY_PROTOCOL</span>
               <span>SYSTEM_STATUS</span>
            </div>
        </div>
      </div>
      
      {/* Corner Decoration */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[var(--void-border-base)] opacity-50" />
    </footer>
  )
}

export default Footer
