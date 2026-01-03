import { siteConfig } from '@/lib/config'

/**
 * Footer Component - Dark Industrial / Endfield Style
 * 页脚组件 - 深色工业风格
 */
export const Footer = ({ title }) => {
  const d = new Date()
  const y = d.getFullYear()

  return (
    <footer className="relative mt-20 bg-[#0d0d0d] text-gray-400">
      {/* Spectrum Bar Top */}
      <div className="spectrum-bar opacity-30" />
      
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="space-y-4">
          
          {/* System Info */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-2">
               <i className="fas fa-cube text-xl text-[var(--void-accent-yellow)]" />
               <span className="text-xl font-bold tracking-wider text-white uppercase">
                 {siteConfig('TITLE')}
               </span>
             </div>
             <p className="text-sm leading-relaxed max-w-sm text-gray-500 font-medium">
                Running Void Theme v4.5 // Dark Industrial Edition. <br/>
                All systems nominal. Connection stable.
             </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600">
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
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gray-800 opacity-50" />
    </footer>
  )
}

export default Footer

