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
      
      <div className="container mx-auto px-6 py-8">
        {/* Bottom Bar - Copyright only */}
        <div className="flex justify-center items-center text-xs font-mono text-gray-500">
          <div>
            © {y} {siteConfig('AUTHOR')}. All Rights Reserved.
          </div>
        </div>
      </div>
      
      {/* Corner Decoration */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gray-800 opacity-50" />
    </footer>
  )
}

export default Footer

