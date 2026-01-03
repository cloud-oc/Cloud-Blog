import { useState, useEffect, useRef } from 'react'
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
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, opacity: 0 })
  const navRef = useRef(null)
  const itemRefs = useRef({})

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

  // Update active indicator position with smooth animation
  const updateIndicatorPosition = (tabName) => {
    const itemEl = itemRefs.current[tabName]
    if (itemEl && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = itemEl.getBoundingClientRect()
      setIndicatorStyle({
        top: itemRect.top - navRect.top,
        opacity: 1
      })
    }
  }

  useEffect(() => {
    // Set active tab based on path
    const path = router.asPath
    let newTab = 'Home'
    if (path === '/') newTab = 'Home'
    else if (path.includes('/category')) newTab = 'Category'
    else if (path.includes('/tag')) newTab = 'Tag'
    else if (path.includes('/archive')) newTab = 'Archive'
    else if (path.includes('/search')) newTab = 'Search'
    
    setActiveTab(newTab)
  }, [router.asPath])

  // Update indicator position when activeTab changes
  useEffect(() => {
    // Small delay to ensure refs are set
    const timer = setTimeout(() => {
      updateIndicatorPosition(activeTab)
    }, 50)
    return () => clearTimeout(timer)
  }, [activeTab])

  return (
    <div 
      className={`fixed left-0 top-16 bottom-0 z-40 hidden md:flex flex-col bg-[var(--void-bg-base)] border-r border-[var(--void-border-base)] transition-all duration-300 ease-in-out ${isHovered ? 'w-64 shadow-2xl' : 'w-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Items */}
      <div ref={navRef} className="flex-1 py-8 flex flex-col gap-2 overflow-y-auto overflow-x-hidden relative">
        {/* Animated Active Indicator Bar - Higher z-index */}
        <div 
          className="absolute left-0 w-1 h-12 bg-[var(--void-accent-yellow)] transition-all duration-300 ease-out z-10"
          style={{ top: indicatorStyle.top, opacity: indicatorStyle.opacity }}
        />
        
        {menuItems.map((item) => {
          const isActive = activeTab === item.name
          return (
            <SmartLink key={item.name} href={item.path}>
              <div 
                ref={el => itemRefs.current[item.name] = el}
                className={`relative h-12 flex items-center cursor-pointer transition-all duration-300 group
                  ${isActive 
                    ? 'bg-[var(--void-bg-secondary)] text-[var(--void-accent-yellow)]' 
                    : 'text-[var(--void-text-secondary)] hover:text-[var(--void-text-primary)] hover:bg-[var(--void-bg-secondary)]'
                  }
                `}
              >
                {/* Icon Container */}
                <div className="w-20 flex-shrink-0 flex items-center justify-center">
                  <i className={`${item.icon} text-lg transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
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

      {/* Footer / Contact Links - No divider, no gray background */}
      <div className="py-4 transition-all duration-300">
        
        {/* Collapsed State: Contact Button */}
        <div className={`flex justify-center transition-all duration-300 ${isHovered ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="w-10 h-10 flex items-center justify-center text-[var(--void-text-secondary)] cursor-pointer hover:text-[var(--void-accent-yellow)] transition-colors">
            <i className="fas fa-address-book text-lg" />
          </div>
        </div>

        {/* Expanded State: Horizontal Icon Row - Single line, no wrap */}
        <div className={`px-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
           {/* Social Icons - Horizontal Layout, single row */}
           <div className="flex items-center justify-center gap-2 flex-nowrap">
             {/* Email Icon */}
             {email && (
               <a 
                 href={`mailto:${email}`}
                 title={email}
                 className="w-8 h-8 flex items-center justify-center text-[var(--void-text-secondary)] hover:text-[var(--void-accent-yellow)] transition-colors flex-shrink-0"
               >
                 <i className="fas fa-envelope text-sm" />
               </a>
             )}
             
             {/* Social Links */}
             {socialLinks.map(({ key, icon, label }) => {
               const url = siteConfig(key)
               if (!url) return null
               return (
                 <a 
                   key={key}
                   href={url} 
                   target="_blank" 
                   rel="noreferrer"
                   title={label}
                   className="w-8 h-8 flex items-center justify-center text-[var(--void-text-secondary)] hover:text-[var(--void-accent-yellow)] transition-colors flex-shrink-0"
                 >
                   <i className={`${icon} text-sm`} />
                 </a>
               )
             })}
           </div>
        </div>
      </div>
    </div>
  )
}


