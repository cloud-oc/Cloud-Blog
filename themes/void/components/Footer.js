import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * Footer Component - Endfield Style
 * 页脚组件
 */
export const Footer = (props) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate = parseInt(since) < currentYear ? `${since}-${currentYear}` : currentYear

  return (
    <footer className="relative mt-20 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      {/* Spectrum Bar */}
      {siteConfig('VOID_SHOW_SPECTRUM_BAR', true, CONFIG) && (
        <div className="spectrum-bar" />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* System Info */}
          <div className="tech-corner p-4">
            <h3 className="text-yellow-400 font-bold mb-4 tech-text text-sm">
              // SYSTEM_INFO
            </h3>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-cyan-400">OPERATIONAL</span>
              </div>
              <div className="flex justify-between">
                <span>VERSION:</span>
                <span className="text-cyan-400">v2.0.26</span>
              </div>
              <div className="flex justify-between">
                <span>UPTIME:</span>
                <span className="text-cyan-400">99.9%</span>
              </div>
            </div>
          </div>

          {/* Site Info */}
          <div className="tech-corner p-4">
            <h3 className="text-yellow-400 font-bold mb-4 tech-text text-sm">
              // SITE_INFO
            </h3>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>OPERATOR:</span>
                <span className="text-cyan-400">{siteConfig('AUTHOR')}</span>
              </div>
              <div className="flex justify-between">
                <span>POWERED_BY:</span>
                <span className="text-cyan-400">NotionNext</span>
              </div>
              <div className="flex justify-between">
                <span>THEME:</span>
                <span className="text-cyan-400">VOID</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="tech-corner p-4">
            <h3 className="text-yellow-400 font-bold mb-4 tech-text text-sm">
              // CONTACT_INFO
            </h3>
            <div className="space-y-2 text-xs text-gray-400">
              {siteConfig('CONTACT_GITHUB') && (
                <a
                  href={siteConfig('CONTACT_GITHUB')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 hover:text-yellow-400 transition"
                >
                  <i className="fab fa-github" />
                  <span>GITHUB</span>
                </a>
              )}
              {siteConfig('CONTACT_TWITTER') && (
                <a
                  href={siteConfig('CONTACT_TWITTER')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 hover:text-yellow-400 transition"
                >
                  <i className="fab fa-twitter" />
                  <span>TWITTER</span>
                </a>
              )}
              {siteConfig('CONTACT_EMAIL') && (
                <a
                  href={`mailto:${siteConfig('CONTACT_EMAIL')}`}
                  className="flex items-center space-x-2 hover:text-yellow-400 transition"
                >
                  <i className="fas fa-envelope" />
                  <span>EMAIL</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 pt-8 border-t border-gray-800">
          <div className="tech-text mb-2">
            © {copyrightDate} {siteConfig('AUTHOR')}. ALL RIGHTS RESERVED.
          </div>
          <div className="text-gray-600">
            <span className="text-yellow-400">&gt;&gt;</span> BEYOND THE FRONTIER <span className="text-yellow-400">&lt;&lt;</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
