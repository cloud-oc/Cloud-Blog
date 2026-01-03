import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * MobileNav Component - Top Navigation for Mobile
 * 移动端顶部导航：左上角头像，右上角汉堡菜单
 */

// Avatar image URL
const AVATAR_URL = 'https://github.com/cloud-oc/picx-images-hosting/blob/master/Origin/Cloud_icon.pfpafpaii.png?raw=true'

export const MobileNav = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // All navigation items
  const menuItems = [
    { name: 'Home', icon: 'fas fa-home', path: '/' },
    { name: 'Category', icon: 'fas fa-folder', path: '/category', show: siteConfig('VOID_MENU_CATEGORY', null, CONFIG) },
    { name: 'Tag', icon: 'fas fa-tag', path: '/tag', show: siteConfig('VOID_MENU_TAG', null, CONFIG) },
    { name: 'Archive', icon: 'fas fa-archive', path: '/archive', show: siteConfig('VOID_MENU_ARCHIVE', null, CONFIG) },
    { name: 'Portfolio', icon: 'fas fa-briefcase', path: '/portfolio' },
    { name: 'Friends', icon: 'fas fa-users', path: '/friend' },
    { name: 'Search', icon: 'fas fa-search', path: '/search', show: siteConfig('VOID_MENU_SEARCH', null, CONFIG) }
  ].filter(item => item.show !== false)

  // Social links
  const socialLinks = [
    { key: 'CONTACT_GITHUB', icon: 'fab fa-github', label: 'GitHub' },
    { key: 'CONTACT_TWITTER', icon: 'fab fa-twitter', label: 'Twitter' },
    { key: 'CONTACT_BILIBILI', icon: 'fab fa-bilibili', label: 'Bilibili' },
    { key: 'CONTACT_TELEGRAM', icon: 'fab fa-telegram', label: 'Telegram' },
  ]

  // Email
  const email = siteConfig('CONTACT_EMAIL')

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[var(--void-bg-primary)]/95 backdrop-blur-sm border-b border-[var(--void-border-base)] safe-area-top">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Avatar */}
          <SmartLink href="/cloud09" title="个人页" className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--void-accent-yellow)] hover:border-blue-500 transition-colors">
              <img 
                src={AVATAR_URL}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </SmartLink>

          {/* Center: Site Title (Optional) */}
          <SmartLink href="/" className="text-sm font-bold text-[var(--void-text-primary)] uppercase tracking-wider">
            {siteConfig('AUTHOR') || 'Cloud'}
          </SmartLink>

          {/* Right: Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 transition-all"
            aria-label="Toggle Menu"
          >
            <span 
              className={`w-5 h-0.5 bg-[var(--void-text-primary)] transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`w-5 h-0.5 bg-[var(--void-text-primary)] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`w-5 h-0.5 bg-[var(--void-text-primary)] transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Slide-in Menu Panel */}
      <div 
        className={`fixed top-14 right-0 bottom-0 w-72 max-w-[80vw] z-40 md:hidden bg-[var(--void-bg-primary)] border-l border-[var(--void-border-base)] transition-transform duration-300 ease-out overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Navigation Items */}
        <div className="py-3 pt-5">
          <p className="px-5 text-xs font-mono text-[var(--void-text-muted)] mb-2 uppercase tracking-wider">Navigation</p>
          {menuItems.map(item => (
            <SmartLink
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-5 py-3 transition-all ${
                activeTab === item.name
                  ? 'bg-blue-500/10 text-blue-500 border-r-2 border-blue-500'
                  : 'text-[var(--void-text-secondary)] hover:bg-[var(--void-bg-secondary)] hover:text-[var(--void-text-primary)]'
              }`}
            >
              <i className={`${item.icon} w-5 text-center`} />
              <span className="text-sm font-medium">{item.name}</span>
            </SmartLink>
          ))}
        </div>

        {/* Social Links */}
        <div className="p-5 border-t border-[var(--void-border-base)]">
          <p className="text-xs font-mono text-[var(--void-text-muted)] mb-3 uppercase tracking-wider">Connect</p>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Email */}
            {email && (
              <a
                href={`mailto:${email}`}
                title={email}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--void-bg-secondary)] text-[var(--void-text-muted)] hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
              >
                <i className="fas fa-envelope text-sm" />
              </a>
            )}
            {socialLinks.map(social => {
              const url = siteConfig(social.key)
              if (!url) return null
              return (
                <a
                  key={social.key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--void-bg-secondary)] text-[var(--void-text-muted)] hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                >
                  <i className={`${social.icon} text-sm`} />
                </a>
              )
            })}
          </div>
        </div>

        {/* Theme Toggle or other utilities could go here */}
        <div className="p-5 border-t border-[var(--void-border-base)] mt-auto">
          <div className="text-xs text-[var(--void-text-muted)] font-mono">
            © {new Date().getFullYear()} {siteConfig('AUTHOR') || 'Cloud'}
          </div>
        </div>
      </div>

      {/* Top spacer for content */}
      <div className="h-14 md:hidden" />
    </>
  )
}

export default MobileNav
