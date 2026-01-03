import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * MobileNav Component - Bottom Navigation for Mobile
 * 移动端底部导航栏
 */
export const MobileNav = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Main navigation items (shown in bottom bar)
  const mainItems = [
    { name: 'Home', icon: 'fas fa-home', path: '/' },
    { name: 'Category', icon: 'fas fa-folder', path: '/category' },
    { name: 'Search', icon: 'fas fa-search', path: '/search' },
    { name: 'Archive', icon: 'fas fa-archive', path: '/archive' },
  ]

  // Extra menu items (shown in slide-up panel)
  const extraItems = [
    { name: 'Tag', icon: 'fas fa-tag', path: '/tag', show: siteConfig('VOID_MENU_TAG', null, CONFIG) },
    { name: 'Portfolio', icon: 'fas fa-briefcase', path: '/portfolio' },
    { name: 'Friends', icon: 'fas fa-users', path: '/friend' },
  ].filter(item => item.show !== false)

  // Social links
  const socialLinks = [
    { key: 'CONTACT_GITHUB', icon: 'fab fa-github', label: 'GitHub' },
    { key: 'CONTACT_TWITTER', icon: 'fab fa-twitter', label: 'Twitter' },
    { key: 'CONTACT_BILIBILI', icon: 'fab fa-bilibili', label: 'Bilibili' },
  ]

  useEffect(() => {
    const path = router.asPath
    if (path === '/') setActiveTab('Home')
    else if (path.includes('/category')) setActiveTab('Category')
    else if (path.includes('/tag')) setActiveTab('Tag')
    else if (path.includes('/archive')) setActiveTab('Archive')
    else if (path.includes('/search')) setActiveTab('Search')
    else if (path.includes('/friend')) setActiveTab('Friends')
    else if (path.includes('/portfolio')) setActiveTab('Portfolio')
  }, [router.asPath])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.asPath])

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--void-bg-primary)] border-t border-[var(--void-border-base)] safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {mainItems.map(item => (
            <SmartLink
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${
                activeTab === item.name
                  ? 'text-blue-500'
                  : 'text-[var(--void-text-muted)]'
              }`}
            >
              <i className={`${item.icon} text-lg`} />
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </SmartLink>
          ))}
          
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${
              isMenuOpen ? 'text-blue-500' : 'text-[var(--void-text-muted)]'
            }`}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
            <span className="text-[10px] mt-1 font-medium">Menu</span>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slide-up Menu Panel */}
      <div 
        className={`fixed bottom-16 left-0 right-0 z-40 md:hidden bg-[var(--void-bg-primary)] border-t border-[var(--void-border-base)] rounded-t-2xl transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Extra Navigation */}
        <div className="p-4 border-b border-[var(--void-border-base)]">
          <p className="text-xs font-mono text-[var(--void-text-muted)] mb-3 uppercase">Navigation</p>
          <div className="grid grid-cols-3 gap-3">
            {extraItems.map(item => (
              <SmartLink
                key={item.name}
                href={item.path}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  activeTab === item.name
                    ? 'border-blue-500 bg-blue-50 text-blue-500'
                    : 'border-[var(--void-border-base)] text-[var(--void-text-secondary)] hover:border-blue-400'
                }`}
              >
                <i className={`${item.icon} text-lg mb-1`} />
                <span className="text-xs">{item.name}</span>
              </SmartLink>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="p-4">
          <p className="text-xs font-mono text-[var(--void-text-muted)] mb-3 uppercase">Connect</p>
          <div className="flex items-center gap-4">
            {socialLinks.map(social => {
              const url = siteConfig(social.key)
              if (!url) return null
              return (
                <a
                  key={social.key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--void-border-base)] text-[var(--void-text-muted)] hover:text-blue-500 hover:border-blue-400 transition-colors"
                >
                  <i className={`${social.icon} text-lg`} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Safe area spacer for content */}
      <div className="h-16 md:hidden" />
    </>
  )
}

export default MobileNav
