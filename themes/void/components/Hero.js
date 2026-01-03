// import Image from 'next/image'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 200,
              backSpeed: 100,
              backDelay: 400,
              showCursor: true,
              smartBackspace: true
            })
          )
        }
      })
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='w-full h-screen relative bg-black'>
      <div className='text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full z-10'>
        {/* Tech Decoration Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-10 left-10 border-l-2 border-t-2 border-[#00E3FF] w-16 h-16 opacity-50"></div>
            <div className="absolute bottom-10 right-10 border-r-2 border-b-2 border-[#00E3FF] w-16 h-16 opacity-50"></div>
            <div className="absolute top-1/2 left-4 w-1 h-32 bg-[#333]"></div>
            <div className="absolute top-1/2 right-4 w-1 h-32 bg-[#333]"></div>
            {/* Crosshairs */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 border border-[#00E3FF] opacity-30"></div>
            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border border-[#00E3FF] opacity-30"></div>
        </div>

        {/* 站点标题 */}
        <div className='font-black text-6xl md:text-8xl shadow-text tracking-tighter mix-blend-overlay relative'>
          {siteInfo?.title || siteConfig('TITLE')}
          <span className="absolute -top-4 -right-8 text-sm text-[#00E3FF] tracking-widest font-mono">VER.4.0</span>
        </div>
        
        {/* 站点欢迎语 */}
        <div className='mt-2 h-12 items-center text-center font-medium shadow-text text-lg tracking-[0.5em] text-gray-300'>
          <span id='typed' />
        </div>

        {/* 首页导航大按钮 */}
        {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <NavButtonGroup {...props} />
        )}

        {/* 滚动按钮 */}
        <div
          onClick={scrollToWrapper}
          className='z-10 cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white hover:text-[#00E3FF] transition-colors duration-300'>
          <div className='opacity-70 text-xs tracking-widest mb-2 font-mono'>
            {siteConfig('HEXO_SHOW_START_READING', null, CONFIG) &&
              locale.COMMON.START_READING}
            SCROLL_DOWN
          </div>
          <i className='opacity-70 animate-bounce fas fa-chevron-down text-sm' />
        </div>
      </div>

      <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
    </header>
  )
}

export default Hero
