# Void Theme - Endfield Style

一个受《明日方舟：终末地》官方网站启发的高科技工业风格主题。

## 特点

### 视觉设计
- 🌑 深色主题 - 黑色/深灰背景
- ⚡ 霓虹强调色 - 黄色和青色
- 🔲 几何UI元素 - 尖角和技术装饰
- 🎯 网格叠加层 - 技术感背景图案
- 💫 流畅动画 - 悬停效果和过渡动画

### 功能特性
- 📱 响应式设计 - 支持移动端、平板、桌面
- 🔍 搜索功能 - 技术风格搜索界面
- 🏷️ 分类和标签 - 完整的内容组织
- 📅 归档时间线 - 可视化的时间轴
- 🔒 密码保护 - 赛博朋克风格的锁定界面
- ⏱️ 技术时间戳 - 实时系统时钟显示

### 布局元素
- 左侧垂直导航栏 - 图标式菜单
- 顶部固定导航 - 光谱条装饰
- 右侧内容侧边栏 - 作者信息、最新文章、分类标签
- 技术装饰元素 - 扫描线、角标、状态指示器

## 使用方法

### 1. 安装主题

主题已经安装在 `themes/void` 目录中。

### 2. 配置主题

在你的 `blog.config.js` 或 `.env` 文件中，设置主题为 `void`:

```bash
NEXT_PUBLIC_THEME=void
```

### 3. 主题配置选项

在 `themes/void/config.js` 中可以自定义以下选项：

```javascript
{
  // 菜单显示
  VOID_MENU_CATEGORY: true,     // 显示分类菜单
  VOID_MENU_TAG: true,          // 显示标签菜单
  VOID_MENU_ARCHIVE: true,      // 显示归档菜单
  VOID_MENU_SEARCH: true,       // 显示搜索菜单
  
  // 文章列表
  VOID_POST_LIST_COVER: true,   // 显示文章封面
  VOID_POST_LIST_PREVIEW: true, // 显示文章预览
  
  // 技术风格元素
  VOID_SHOW_TIMESTAMP: true,    // 显示技术时间戳
  VOID_SHOW_GRID_OVERLAY: true, // 显示网格覆盖层
  VOID_SHOW_SPECTRUM_BAR: true, // 显示光谱条
  
  // 布局
  VOID_ARTICLE_LAYOUT_VERTICAL: false, // 文章详情页上下布局
}
```

### 4. 启动开发服务器

```bash
cd f:\Cloud-Blog
npm run dev
```

访问 http://localhost:3000 查看效果。

## 颜色方案

主题使用以下颜色变量（在 `style.js` 中定义）：

```css
--void-bg-primary: #0a0a0a      /* 主背景 - 纯黑 */
--void-bg-secondary: #1a1a1a    /* 次要背景 - 深灰 */
--void-bg-tertiary: #2a2a2a     /* 第三背景 - 中等灰 */
--void-text-primary: #f0f0f0    /* 主文字 - 白色 */
--void-text-secondary: #e0e0e0  /* 次要文字 - 浅灰 */
--void-accent-yellow: #ffc700   /* 强调黄色 */
--void-accent-cyan: #00d9ff     /* 强调青色 */
```

## 组件说明

### 核心组件
- **Header** - 顶部导航栏，带光谱条和实时时钟
- **Footer** - 页脚，显示系统信息和联系方式
- **SideNav** - 左侧垂直导航菜单
- **SideBar** - 右侧边栏，显示作者信息、最新文章、分类标签
- **TitleBar** - 页面标题展示区

### 内容组件
- **BlogPostCard** - 文章卡片，支持封面、分类、标签显示
- **BlogListPage** - 分页文章列表
- **BlogListScroll** - 无限滚动文章列表
- **BlogListArchive** - 归档时间线
- **PostMeta** - 文章元数据显示
- **PostLock** - 密码保护界面
- **SearchInput** - 搜索输入框

## 技术栈

- React + Next.js
- Tailwind CSS
- Headless UI (用于过渡动画)
- Font Awesome (用于图标)

## 自定义

### 修改颜色
编辑 `themes/void/style.js` 中的 CSS 变量。

### 添加新组件
在 `themes/void/components/` 目录中创建新组件。

### 修改布局
编辑 `themes/void/index.js` 中的布局组件。

## 致谢

- 设计灵感来源于《明日方舟：终末地》官方网站
- 基于 NotionNext 博客框架

## License

MIT

---

**BEYOND THE FRONTIER** // 跨越边境 直至前线
