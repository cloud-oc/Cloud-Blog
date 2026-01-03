import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'

/**
 * SideNav Component - Endfield Style Vertical Navigation
 * 左侧垂直导航栏 - 仿Endfield官网风格
 */
export const SideNav = (props) => {
  const router = useRouter()
  const { locale } = props

  const menuItems = [
    {
      id: 'home',
      icon: 'fas fa-home',
      label: locale?.NAV?.INDEX || '首页',
      href: '/',
      show: true
    },
    {
      id: 'category',
      icon: 'fas fa-folder',
      label: locale?.COMMON?.CATEGORY || '分类',
      href: '/category',
      show: siteConfig('VOID_MENU_CATEGORY', true, CONFIG)
    },
    {
      id: 'tag',
      icon: 'fas fa-tag',
      label: locale?.COMMON?.TAGS || '标签',
      href: '/tag',
      show: siteConfig('VOID_MENU_TAG', true, CONFIG)
    },
    {
      id: 'archive',
      icon: 'fas fa-archive',
      label: locale?.NAV?.ARCHIVE || '归档',
      href: '/archive',
      show: siteConfig('VOID_MENU_ARCHIVE', true, CONFIG)
    },
    {
      id: 'search',
      icon: 'fas fa-search',
      label: locale?.NAV?.SEARCH || '搜索',
      href: '/search',
      show: siteConfig('VOID_MENU_SEARCH', true, CONFIG)
    }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-black/95 border-r border-gray-800 z-40 hidden md:flex flex-col items-center py-24">
      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center space-y-2 w-full px-2">
        {menuItems.filter(item => item.show).map((item) => (
          <SmartLink
            key={item.id}
            href={item.href}
            className={`
              group relative w-14 h-14 flex items-center justify-center
              transition-all duration-300
              ${isActive(item.href)
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-yellow-400'
              }
              clip-path-corner
            `}
            title={item.label}
          >
            {/* Icon */}
            <i className={`${item.icon} text-xl`} />
            
            {/* Active Indicator */}
            {isActive(item.href) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400" />
            )}

            {/* Hover Label */}
            <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-700">
              {item.label}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          </SmartLink>
        ))}
      </nav>

      {/* Technical Decoration */}
      <div className="w-full px-2 space-y-2 mb-4">
        {/* Scanning Line Effect */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
      </div>

      <style jsx>{`
        .clip-path-corner {
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
        }
      `}</style>
    </aside>
  )
}
