import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * Header Component - Endfield Style
 * 顶部导航栏
 */
export const Header = (props) => {
  const { locale } = props
  const currentTime = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '.').replace(',', '')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      {/* Spectrum Bar */}
      {siteConfig('VOID_SHOW_SPECTRUM_BAR', true, CONFIG) && (
        <div className="spectrum-bar" />
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site Title */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="text-yellow-400">[ </span>
              <span className="text-white">{siteConfig('TITLE')}</span>
              <span className="text-yellow-400"> ]</span>
            </div>
            {siteConfig('VOID_SHOW_TIMESTAMP', true, CONFIG) && (
              <div className="hidden md:block tech-timestamp">
                {currentTime}
              </div>
            )}
          </div>

          {/* Right Side - Status Indicator */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-gray-400 tech-text">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
