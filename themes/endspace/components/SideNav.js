import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { EndspacePlayer } from './EndspacePlayer'
import Home4FillIcon from 'remixicon-react/Home4FillIcon'
import Folder2FillIcon from 'remixicon-react/Folder2FillIcon'
import PriceTag3FillIcon from 'remixicon-react/PriceTag3FillIcon'
import ArchiveDrawerFillIcon from 'remixicon-react/ArchiveDrawerFillIcon'
import Briefcase4FillIcon from 'remixicon-react/Briefcase4FillIcon'
import GroupFillIcon from 'remixicon-react/GroupFillIcon'
import Search2FillIcon from 'remixicon-react/Search2FillIcon'
import ContactsBook2FillIcon from 'remixicon-react/ContactsBook2FillIcon'
import MailSendFillIcon from 'remixicon-react/MailSendFillIcon'
import GithubFillIcon from 'remixicon-react/GithubFillIcon'
import TwitterFillIcon from 'remixicon-react/TwitterFillIcon'
import BilibiliFillIcon from 'remixicon-react/BilibiliFillIcon'
import TelegramFillIcon from 'remixicon-react/TelegramFillIcon'
import InstagramFillIcon from 'remixicon-react/InstagramFillIcon'
import YoutubeFillIcon from 'remixicon-react/YoutubeFillIcon'
import LinkedinFillIcon from 'remixicon-react/LinkedinFillIcon'
import WechatFillIcon from 'remixicon-react/WechatFillIcon'
import WeiboFillIcon from 'remixicon-react/WeiboFillIcon'
import EarthFillIcon from 'remixicon-react/EarthFillIcon'

/**
 * SideNav Component - Endfield Intelligent Sidebar
 * 智能侧边栏：默认收起，悬停展开
 * Light Industrial Aesthetic - Tabler Icons for Futuristic Feel
 */

// Avatar image URL
const AVATAR_URL = 'https://github.com/cloud-oc/picx-images-hosting/blob/master/Origin/Cloud_icon.pfpafpaii.png?raw=true'

// Icon components mapping
const IconComponents = {
  Home: Home4FillIcon,
  Category: Folder2FillIcon,
  Tag: PriceTag3FillIcon,
  Archive: ArchiveDrawerFillIcon,
  Portfolio: Briefcase4FillIcon,
  Friends: GroupFillIcon,
  Search: Search2FillIcon
}

// Social icon components mapping
const SocialIconComponents = {
  'CONTACT_GITHUB': GithubFillIcon,
  'CONTACT_TWITTER': TwitterFillIcon,
  'CONTACT_WEIBO': WeiboFillIcon,
  'CONTACT_BILIBILI': BilibiliFillIcon,
  'CONTACT_TELEGRAM': TelegramFillIcon,
  'CONTACT_INSTAGRAM': InstagramFillIcon,
  'CONTACT_YOUTUBE': YoutubeFillIcon,
  'CONTACT_LINKEDIN': LinkedinFillIcon,
  'CONTACT_WEHCHAT_PUBLIC': WechatFillIcon,
  'CONTACT_ZHISHIXINGQIU': EarthFillIcon
}

export const SideNav = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Home')
  const [isHovered, setIsHovered] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, opacity: 0 })
  const navRef = useRef(null)
  const itemRefs = useRef({})

  // Configure menu items
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Category', path: '/category', show: siteConfig('ENDSPACE_MENU_CATEGORY', null, CONFIG) },
    { name: 'Tag', path: '/tag', show: siteConfig('ENDSPACE_MENU_TAG', null, CONFIG) },
    { name: 'Archive', path: '/archive', show: siteConfig('ENDSPACE_MENU_ARCHIVE', null, CONFIG) },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Friends', path: '/friend' },
    { name: 'Search', path: '/search', show: siteConfig('ENDSPACE_MENU_SEARCH', null, CONFIG) }
  ].filter(item => item.show !== false)

  // 社交图标配置 - 使用 contact.config.js 的配�?
  const socialLinks = [
    { key: 'CONTACT_GITHUB', label: 'GitHub' },
    { key: 'CONTACT_TWITTER', label: 'Twitter' },
    { key: 'CONTACT_WEIBO', label: '微博' },
    { key: 'CONTACT_BILIBILI', label: 'Bilibili' },
    { key: 'CONTACT_TELEGRAM', label: 'Telegram' },
    { key: 'CONTACT_INSTAGRAM', label: 'Instagram' },
    { key: 'CONTACT_YOUTUBE', label: 'YouTube' },
    { key: 'CONTACT_XIAOHONGSHU', svg: '/svg/xiaohongshu.svg', label: '小红�? },
    { key: 'CONTACT_LINKEDIN', label: 'LinkedIn' },
    { key: 'CONTACT_ZHISHIXINGQIU', label: '知识星球' },
    { key: 'CONTACT_WEHCHAT_PUBLIC', label: '微信公众�? },
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
    else if (path.includes('/friend')) newTab = 'Friends'
    else if (path.includes('/portfolio')) newTab = 'Portfolio'
    
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

  // Render icon component
  const renderIcon = (name, isActive) => {
    const IconComponent = IconComponents[name]
    if (!IconComponent) return null
    return (
      <IconComponent 
        size={20} 
        stroke={1.5}
        className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
      />
    )
  }

  // Render social icon
  const renderSocialIcon = (key, svg, label) => {
    if (svg) {
      return <img src={svg} alt={label} className="w-3 h-3 opacity-60 hover:opacity-100" />
    }
    const IconComponent = SocialIconComponents[key]
    if (IconComponent) {
      return <IconComponent size={14} stroke={1.5} />
    }
    return null
  }

  return (
    <div 
      className={`fixed left-0 top-0 bottom-0 z-40 hidden md:flex flex-col bg-[var(--endspace-bg-base)] border-r border-[var(--endspace-border-base)] transition-all duration-300 ease-in-out ${isHovered ? 'w-[16rem] shadow-2xl' : 'w-[5rem]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar Section - Top of sidebar, clickable to personal page */}
      <div className="flex-shrink-0 py-6 flex flex-col items-center">
        <SmartLink href="/cloud09" title="个人�?>
          <div className={`transition-all duration-300 cursor-pointer hover:scale-105 ${isHovered ? 'w-[5rem] h-[5rem]' : 'w-[3rem] h-[3rem]'}`}>
            <img 
              src={AVATAR_URL}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border-2 border-[var(--endspace-accent-yellow)] shadow-lg hover:border-[var(--endspace-text-primary)] transition-colors"
            />
          </div>
        </SmartLink>
        {/* Author Info - shown when expanded */}
        <div className={`mt-3 text-center transition-all duration-300 overflow-hidden ${isHovered ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0'}`}>
          <SmartLink href="/cloud09" className="hover:text-[var(--endspace-accent-yellow)] transition-colors">
            <div className="text-sm font-bold text-[var(--endspace-text-primary)] uppercase tracking-wider">
              {siteConfig('AUTHOR') || 'Cloud'}
            </div>
          </SmartLink>
          <div className="text-xs text-[var(--endspace-text-muted)] mt-1 px-4 line-clamp-2">
            {siteConfig('BIO') || ''}
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div ref={navRef} className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto overflow-x-hidden relative">
        {/* Animated Active Indicator Bar - Higher z-index */}
        <div 
          className="absolute left-0 w-[0.25rem] h-[3rem] bg-[var(--endspace-accent-yellow)] transition-all duration-300 ease-out z-10"
          style={{ top: indicatorStyle.top, opacity: indicatorStyle.opacity }}
        />
        
        {menuItems.map((item) => {
          const isActive = activeTab === item.name
          return (
            <SmartLink key={item.name} href={item.path}>
              <div 
                ref={el => itemRefs.current[item.name] = el}
                className={`relative h-[3rem] flex items-center cursor-pointer transition-all duration-300 group
                  ${isActive 
                    ? 'bg-[var(--endspace-bg-secondary)] text-[var(--endspace-accent-yellow)]' 
                    : 'text-gray-300 hover:text-[var(--endspace-text-primary)] hover:bg-[var(--endspace-bg-secondary)]'
                  }
                `}
              >
                {/* Icon Container */}
                <div className="w-[5rem] flex-shrink-0 flex items-center justify-center">
                  {renderIcon(item.name, isActive)}
                </div>

                {/* Text Label (Reveal on Hover) */}
                <span className={`text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-75' : 'opacity-0 w-0'}`}>
                  {item.name.toUpperCase()}
                </span>
              </div>
            </SmartLink>
          )
        })}
      </div>

      {/* Music Player Section - Above Contact Links */}
      <EndspacePlayer isExpanded={isHovered} />

      {/* Contact Links Section - Above arrow */}
      <div className="py-3 transition-all duration-300">
        
        {/* Collapsed State: Contact Button with light gray background */}
        <div className={`flex justify-center transition-all duration-300 ${isHovered ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="w-[2.5rem] h-[2.5rem] flex items-center justify-center bg-gray-200 text-gray-500 rounded cursor-pointer hover:text-white hover:bg-blue-500 transition-colors">
             <ContactsBook2FillIcon size={18} />
           </div>
         </div>

         {/* Expanded State: Horizontal Icon Row - Single line */}
         <div className={`px-3 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            {/* Social Icons - Horizontal Layout, single row with light gray background */}
            <div className="flex items-center justify-center gap-1.5 flex-nowrap">
              {/* Email Icon */}
              {email && (
                  <a 
                  href={`mailto:${email}`}
                  title={email}
                  className="w-[1.75rem] h-[1.75rem] flex items-center justify-center bg-gray-200 text-gray-500 rounded hover:text-white hover:bg-blue-500 transition-colors flex-shrink-0"
                >
                  <MailSendFillIcon size={14} />
               </a>
             )}
             
             {/* Social Links */}
             {socialLinks.map(({ key, svg, label }) => {
               const url = siteConfig(key)
               if (!url) return null
               return (
                 <a 
                   key={key}
                   href={url} 
                   target="_blank" 
                   rel="noreferrer"
                   title={label}
                   className="w-[1.75rem] h-[1.75rem] flex items-center justify-center bg-gray-200 text-gray-500 rounded hover:text-white hover:bg-blue-500 transition-colors flex-shrink-0"
                 >
                   {renderSocialIcon(key, svg, label)}
                 </a>
               )
             })}
           </div>
        </div>
      </div>

      {/* Bottom Toggle Button - Simple Black Triangle */}
      <div className="py-4">
        <div className="flex justify-center">
          <div 
            className="w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer"
            title={isHovered ? 'Collapse' : 'Expand'}
          >
            {/* Simple Black Triangle */}
            <div 
              className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transition-transform duration-300 ${
                isHovered 
                  ? 'border-r-[10px] border-r-[var(--endspace-text-primary)] border-l-0' 
                  : 'border-l-[10px] border-l-[var(--endspace-text-primary)] border-r-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}




