import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * SideNav Component - Endfield Intelligent Sidebar
 * 智能侧边栏：默认收起，悬停展开
 * Light Industrial Aesthetic
 */
export const SideNav = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Home')
  const [isHovered, setIsHovered] = useState(false)

  // Configure menu items
  const menuItems = [
    { name: 'Home', icon: 'fas fa-home', path: '/' },
    { name: 'Category', icon: 'fas fa-folder', path: '/category', show: siteConfig('VOID_MENU_CATEGORY', null, CONFIG) },
    { name: 'Tag', icon: 'fas fa-tag', path: '/tag', show: siteConfig('VOID_MENU_TAG', null, CONFIG) },
    { name: 'Archive', icon: 'fas fa-archive', path: '/archive', show: siteConfig('VOID_MENU_ARCHIVE', null, CONFIG) },
    { name: 'Search', icon: 'fas fa-search', path: '/search', show: siteConfig('VOID_MENU_SEARCH', null, CONFIG) }
  ].filter(item => item.show !== false)

  // 社交图标配置 (从 contact.config.js 获取)
  const socialLinks = [
    { key: 'CONTACT_GITHUB', icon: 'fab fa-github', label: 'GitHub' },
    { key: 'CONTACT_TWITTER', icon: 'fab fa-twitter', label: 'Twitter' },
    { key: 'CONTACT_WEIBO', icon: 'fab fa-weibo', label: '微博' },
    { key: 'CONTACT_BILIBILI', icon: 'fab fa-bilibili', label: 'Bilibili' },
    { key: 'CONTACT_TELEGRAM', icon: 'fab fa-telegram', label: 'Telegram' },
    { key: 'CONTACT_INSTAGRAM', icon: 'fab fa-instagram', label: 'Instagram' },
    { key: 'CONTACT_YOUTUBE', icon: 'fab fa-youtube', label: 'YouTube' },
    { key: 'CONTACT_XIAOHONGSHU', icon: 'fas fa-leaf', label: '小红书' },
    { key: 'CONTACT_LINKEDIN', icon: 'fab fa-linkedin', label: 'LinkedIn' },
    { key: 'CONTACT_ZHISHIXINGQIU', icon: 'fas fa-star', label: '知识星球' },
    { key: 'CONTACT_WEHCHAT_PUBLIC', icon: 'fab fa-weixin', label: '微信公众号' },
  ]

  // 获取邮箱
  const email = siteConfig('CONTACT_EMAIL')

  useEffect(() => {
    // Set active tab based on path
    const path = router.asPath
    if (path === '/') setActiveTab('Home')
    else if (path.includes('/category')) setActiveTab('Category')
    else if (path.includes('/tag')) setActiveTab('Tag')
    else if (path.includes('/archive')) setActiveTab('Archive')
    else if (path.includes('/search')) setActiveTab('Search')
  }, [router.asPath])

  return (
    <div 
      className={`fixed left-0 top-16 bottom-0 z-40 hidden md:flex flex-col bg-[var(--void-bg-base)] border-r border-[var(--void-border-base)] transition-all duration-300 ease-in-out ${isHovered ? 'w-64 shadow-2xl' : 'w-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Items */}
      <div className="flex-1 py-8 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isActive = activeTab === item.name
          return (
            <SmartLink key={item.name} href={item.path}>
              <div 
                className={`relative h-12 flex items-center cursor-pointer transition-all duration-200 group
                  ${isActive 
                    ? 'bg-[var(--void-bg-secondary)] text-[var(--void-accent-yellow)]' 
                    : 'text-[var(--void-text-secondary)] hover:text-[var(--void-text-primary)] hover:bg-[var(--void-bg-secondary)]'
                  }
                `}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--void-accent-yellow)]" />
                )}

                {/* Icon Container */}
                <div className="w-20 flex-shrink-0 flex items-center justify-center">
                  <i className={`${item.icon} text-lg transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                </div>

                {/* Text Label (Reveal on Hover) */}
                <span className={`text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-75' : 'opacity-0 w-0'}`}>
                  {item.name.toUpperCase()}
                </span>
                
                {/* Tech Line Decoration */}
                {isActive && isHovered && (
                  <div className="absolute right-4 w-2 h-2 rounded-full bg-[var(--void-accent-yellow)] animate-pulse" />
                )}
              </div>
            </SmartLink>
          )
        })}
      </div>

      {/* Footer / Contact Links */}
      <div className={`border-t border-[var(--void-border-base)] bg-[var(--void-bg-secondary)] transition-all duration-300 overflow-hidden ${isHovered ? 'h-auto py-6' : 'h-auto py-4 flex flex-col items-center justify-center gap-2'}`}>
        
        {/* Collapsed State: Simple Status Icon */}
        {!isHovered && (
          <div className="w-10 h-10 rounded bg-[var(--void-bg-tertiary)] flex items-center justify-center text-[var(--void-accent-cyan)] cursor-pointer hover:bg-[var(--void-accent-cyan)] hover:text-white transition-colors">
            <i className="fas fa-link" />
          </div>
        )}

        {/* Expanded State: Full Contact Links */}
        <div className={`px-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 hidden'}`}>
           <h4 className="text-[var(--void-text-primary)] font-bold text-xs uppercase tracking-widest mb-4 border-b border-[var(--void-border-base)] pb-2 inline-block">
             Contact
           </h4>
           
           {/* Email Button */}
           {email && (
             <a 
               href={`mailto:${email}`}
               className="flex items-center gap-3 h-10 px-3 mb-2 bg-[var(--void-bg-tertiary)] border border-[var(--void-border-base)] hover:border-[var(--void-accent-yellow)] hover:text-[var(--void-accent-yellow)] text-[var(--void-text-secondary)] transition-all rounded-sm"
             >
               <i className="fas fa-envelope text-sm" />
               <span className="text-xs font-mono truncate">{email}</span>
             </a>
           )}
           
           {/* Social Links */}
           <div className="flex flex-col gap-2">
             {socialLinks.map(({ key, icon, label }) => {
               const url = siteConfig(key)
               if (!url) return null
               return (
                 <a 
                   key={key}
                   href={url} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="flex items-center gap-3 h-10 px-3 bg-[var(--void-bg-tertiary)] border border-[var(--void-border-base)] hover:border-[var(--void-accent-yellow)] hover:text-[var(--void-accent-yellow)] text-[var(--void-text-secondary)] transition-all rounded-sm"
                 >
                   <i className={`${icon} text-sm`} />
                   <span className="text-xs font-mono">{label}</span>
                 </a>
               )
             })}
           </div>
        </div>
      </div>
    </div>
  )
}
