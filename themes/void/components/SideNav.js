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
      className={`fixed left-0 top-0 bottom-0 h-full z-40 hidden md:flex flex-col bg-[var(--void-bg-base)] border-r border-[var(--void-border-base)] transition-all duration-300 ease-in-out ${isHovered ? 'w-64 shadow-2xl' : 'w-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Header / Logo Area */}
      <div className="h-20 flex items-center justify-center relative border-b border-[var(--void-border-base)] bg-[var(--void-bg-primary)]">
        <div className="w-10 h-10 flex items-center justify-center bg-[var(--void-accent-yellow)] text-black">
           <i className="fas fa-cube text-xl" />
        </div>
        
        {/* Expanded Title */}
        <div className={`absolute left-20 top-0 bottom-0 flex flex-col justify-center pl-4 transition-opacity duration-300 whitespace-nowrap overflow-hidden ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           <h1 className="font-bold text-[var(--void-text-primary)] text-lg uppercase tracking-wider">{siteConfig('TITLE')}</h1>
           <span className="text-[10px] text-[var(--void-text-muted)] tracking-widest">SYSTEM_V4.0</span>
        </div>
      </div>

      {/* 2. Navigation Items */}
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

      {/* 3. Footer / Author Info (Reveal on Hover) */}
      <div className={`border-t border-[var(--void-border-base)] bg-[var(--void-bg-secondary)] transition-all duration-300 overflow-hidden ${isHovered ? 'h-auto py-6' : 'h-20 py-0 flex items-center justify-center'}`}>
        
        {/* Collapsed State: Simple Status Icon */}
        {!isHovered && (
          <div className="w-10 h-10 rounded bg-[var(--void-bg-tertiary)] flex items-center justify-center text-[var(--void-accent-cyan)] cursor-pointer hover:bg-[var(--void-accent-cyan)] hover:text-white transition-colors">
            <i className="fas fa-user-astronaut" />
          </div>
        )}

        {/* Expanded State: Full Author Info */}
        <div className={`px-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 hidden'}`}>
           <div className="flex items-center gap-4 mb-4">
              {siteConfig('AVATAR') && (
                <img src={siteConfig('AVATAR')} alt="Avatar" className="w-12 h-12 object-cover border border-[var(--void-border-active)]" />
              )}
              <div>
                <div className="text-sm font-bold text-[var(--void-text-primary)]">{siteConfig('AUTHOR')}</div>
                <div className="text-[10px] text-[var(--void-text-muted)]">OPERATOR_ID: 001</div>
              </div>
           </div>
           
           <p className="text-xs text-[var(--void-text-secondary)] mb-4 leading-relaxed line-clamp-2">
             {siteConfig('BIO')}
           </p>

           {/* Contact / Social Icons */}
           <div className="flex gap-3 text-[var(--void-text-muted)]">
              <i className="fab fa-github hover:text-[var(--void-text-primary)] cursor-pointer transition-colors" />
              <i className="fab fa-twitter hover:text-[var(--void-text-primary)] cursor-pointer transition-colors" />
              <i className="fas fa-envelope hover:text-[var(--void-text-primary)] cursor-pointer transition-colors" />
           </div>
        </div>
      </div>
    </div>
  )
}
