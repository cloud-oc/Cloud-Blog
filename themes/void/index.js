'use client'

import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BlogListArchive from './components/BlogListArchive'
import { BlogListPage } from './components/BlogListPage'
import { BlogListScroll } from './components/BlogListScroll'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostLock } from './components/PostLock'
import { PostMeta } from './components/PostMeta'
import SearchInput from './components/SearchInput'
import { SideBar } from './components/SideBar'
import { SideNav } from './components/SideNav'
import TitleBar from './components/TitleBar'
import CONFIG from './config'
import { Style } from './style'

/**
 * Void Theme - Endfield Style
 * 基础布局框架
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = (props) => {
  const { children, post } = props
  const { onLoading, fullWidth, locale } = useGlobal()

  // 文章详情页左右布局改为上下布局
  const LAYOUT_VERTICAL =
    post && siteConfig('VOID_ARTICLE_LAYOUT_VERTICAL', false, CONFIG)

  // 网站左右布局颠倒
  const LAYOUT_SIDEBAR_REVERSE = siteConfig('LAYOUT_SIDEBAR_REVERSE', false)

  return (
    <div
      id="theme-void"
      className={`${siteConfig('FONT_STYLE')} min-h-screen relative`}
    >
      <Style />

      {/* 顶部导航 */}
      <Header {...props} />

      {/* 左侧垂直导航 */}
      <SideNav {...props} />

      {/* 主体内容区 */}
      <div className="md:ml-20 pt-16">
        {/* 标题栏 */}
        {!fullWidth && <TitleBar {...props} />}

        {/* 内容容器 */}
        <div id="container-inner" className="w-full relative z-10">
          <div
            id="container-wrapper"
            className={`relative mx-auto justify-center md:flex py-8 px-4 md:px-8
            ${LAYOUT_SIDEBAR_REVERSE ? 'flex-row-reverse' : ''} 
            ${LAYOUT_VERTICAL ? 'items-center flex-col' : 'items-start'} 
            `}
          >
            {/* 主要内容 */}
            <div
              className={`${
                fullWidth
                  ? 'w-full'
                  : LAYOUT_VERTICAL
                  ? 'max-w-5xl w-full'
                  : 'max-w-4xl w-full md:pr-8'
              }`}
            >
              <Transition
                show={!onLoading}
                appear={true}
                enter="transition ease-in-out duration-700 transform order-first"
                enterFrom="opacity-0 translate-y-16"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-16"
                unmount={false}
              >
                {props.slotTop}
                {children}
              </Transition>
            </div>

            {/* 右侧边栏 */}
            {!fullWidth && (
              <div
                className={`${
                  LAYOUT_VERTICAL
                    ? 'flex space-x-0 md:space-x-4 md:flex-row flex-col w-full max-w-5xl justify-center mt-8'
                    : 'md:w-80 w-full mt-8 md:mt-0 md:sticky md:top-24'
                }`}
              >
                <SideBar {...props} />
              </div>
            )}
          </div>
        </div>

        {/* 页脚 */}
        <Footer {...props} />
      </div>

      {/* 回顶按钮 */}
      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="void-button w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
          title={locale?.POST?.TOP || '回到顶部'}
        >
          <i className="fas fa-angle-up text-xl" />
        </button>
      </div>
    </div>
  )
}

/**
 * 首页
 * @param {*} props
 * @returns 此主题首页就是列表
 */
const LayoutIndex = (props) => {
  return <LayoutPostList {...props} />
}

/**
 * 文章列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = (props) => {
  const { category, tag } = props

  return (
    <>
      {/* 显示分类 */}
      {category && (
        <div className="void-card p-6 mb-8">
          <div className="flex items-center gap-2 text-yellow-400">
            <i className="fas fa-folder" />
            <h2 className="text-2xl font-bold">{category}</h2>
          </div>
        </div>
      )}
      {/* 显示标签 */}
      {tag && (
        <div className="void-card p-6 mb-8">
          <div className="flex items-center gap-2 text-cyan-400">
            <i className="fas fa-tag" />
            <h2 className="text-2xl font-bold">#{tag}</h2>
          </div>
        </div>
      )}

      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </>
  )
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = (props) => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])

  return (
    <>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : (
        post && (
          <div className="relative">
            {/* Post Metadata Header */}
            <PostMeta post={post} />

             {/* Article Content Frame */}
            <div id="article-wrapper" className="void-frame p-8 md:p-12 mb-12">
               {/* Content Watermark/Background decoration */}
               <div className="absolute top-4 right-4 text-[var(--void-text-muted)] opacity-10 text-6xl font-black pointer-events-none select-none z-0">
                 VOID
               </div>
               
              <div className="relative z-10">
                <NotionPage post={post} />
              </div>

              {/* Footer of the card */}
              <div className="mt-12 pt-8 border-t border-[var(--void-border-base)] flex justify-between items-center">
                 <div className="text-xs text-[var(--void-text-muted)] font-mono">END_OF_RECORD</div>
                 <ShareBar post={post} />
              </div>
            </div>

            <Comment frontMatter={post} />
          </div>
        )
      )}
    </>
  )
}

/**
 * 404页
 * @param {*} props
 * @returns
 */
const Layout404 = (props) => {
  const router = useRouter()
  const { locale } = useGlobal()

  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="void-card p-12 text-center tech-corner max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-8xl font-bold text-yellow-400 tech-text mb-4">
            404
          </div>
          <div className="text-2xl text-white mb-2">PAGE_NOT_FOUND</div>
          <div className="text-gray-500 tech-text text-sm">
            The requested resource could not be located
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 text-cyan-400 mb-8">
          <i className="fas fa-spinner animate-spin" />
          <span className="tech-text text-sm">Redirecting to home...</span>
        </div>

        <SmartLink href="/">
          <button className="void-button-primary px-8 py-3">
            <span className="tech-text">RETURN_HOME</span>
          </button>
        </SmartLink>

        {/* Status indicators */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-center gap-4 text-xs text-gray-600 tech-text">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span>ERROR</span>
          </div>
          <span>|</span>
          <div>CODE: 404</div>
          <span>|</span>
          <div>STATUS: NOT_FOUND</div>
        </div>
      </div>
    </div>
  )
}

/**
 * 搜索页
 * @param {*} props
 * @returns
 */
const LayoutSearch = (props) => {
  const { keyword } = props
  const router = useRouter()

  useEffect(() => {
    if (isBrowser) {
      // 高亮搜索到的结果
      const container = document.getElementById('posts-wrapper')
      if (keyword && container) {
        replaceSearchResult({
          doms: container,
          search: keyword,
          target: {
            element: 'span',
            className: 'text-yellow-400 bg-yellow-400/20 px-1'
          }
        })
      }
    }
  }, [router])

  return (
    <>
      <div className="mb-8">
        <SearchInput {...props} />
      </div>
      <LayoutPostList {...props} />
    </>
  )
}

/**
 * 归档列表
 * @param {*} props
 * @returns 按照日期将文章分组排序
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props
  return (
    <>
      <div className="mb-10 pb-20 min-h-screen w-full">
        {Object.keys(archivePosts).map((archiveTitle) => (
          <BlogListArchive
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  return (
    <>
      <div className="void-card p-8">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 tech-text">
          // ALL_CATEGORIES
        </h2>
        <div
          id="category-list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {categoryOptions?.map((category) => (
            <SmartLink
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              legacyBehavior
            >
              <div className="tech-corner p-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-yellow-400 transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-folder text-cyan-400 group-hover:text-yellow-400 transition-colors" />
                    <span className="text-white group-hover:text-yellow-400 transition-colors">
                      {category.name}
                    </span>
                  </div>
                  <span className="tech-text text-xs text-gray-500">
                    [{category.count}]
                  </span>
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = (props) => {
  const { tagOptions } = props
  return (
    <>
      <div className="void-card p-8">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 tech-text">
          // ALL_TAGS
        </h2>
        <div id="tags-list" className="flex flex-wrap gap-3">
          {tagOptions.map((tag) => (
            <SmartLink
              key={tag.name}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              className="px-4 py-2 bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 tech-text hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all text-sm"
            >
              <div>
                #{tag.name}
                {tag.count && (
                  <span className="ml-2 text-xs text-gray-500">
                    [{tag.count}]
                  </span>
                )}
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
