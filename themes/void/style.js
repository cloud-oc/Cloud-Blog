import React from 'react'

/**
 * Void Theme Styles - Endfield Industrial Design Refined
 * 终末地工业风格样式 - 视觉优化版
 */
export const Style = () => {
  return (
    <style jsx global>{`
      /* ============================================
         Endfield Color Scheme & Variables (Refined)
         ============================================ */
      :root {
        /* Backgrounds - Layered Dark Grey */
        --void-bg-base: #09090b;       /* 基础背景 (极深灰) */
        --void-bg-primary: #121214;    /* 主要容器背景 */
        --void-bg-secondary: #1c1c1f;  /* 次要/悬停背景 */
        --void-bg-tertiary: #27272a;   /* 装饰性背景 */
        
        /* Typography */
        --void-text-primary: #e4e4e7;  /* 主要文字 (灰白) */
        --void-text-secondary: #a1a1aa;/* 次要文字 (中灰) */
        --void-text-muted: #52525b;    /* 装饰性文字 (深灰) */
        
        /* Accents - Precise Endfield Colors */
        --void-accent-yellow: #FFD700; /* Endfield Yellow */
        --void-accent-yellow-dim: rgba(255, 215, 0, 0.15);
        --void-accent-cyan: #00E5FF;   /* Endfield High-Tech Cyan */
        --void-accent-cyan-dim: rgba(0, 229, 255, 0.15);
        
        /* Borders & Lines */
        --void-border-base: #27272a;
        --void-border-active: #3f3f46;
        
        /* Technical Grid */
        --void-grid-color: rgba(255, 255, 255, 0.03);
        
        /* Layout */
        --void-frame-padding: 1.5rem;
      }

      /* ============================================
         Global Base Styles
         ============================================ */
      #theme-void {
        background-color: var(--void-bg-base);
        color: var(--void-text-primary);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow-x: hidden;
      }

      /* Technical Grid Background - Subtle */
      #theme-void::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: 
          linear-gradient(var(--void-grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--void-grid-color) 1px, transparent 1px);
        background-size: 40px 40px;
        z-index: -1;
        pointer-events: none;
      }

      /* Vignette Effect */
      #theme-void::after {
        content: '';
        position: fixed;
        inset: 0;
        background: radial-gradient(circle at center, transparent 0%, rgba(9, 9, 11, 0.8) 100%);
        z-index: -1;
        pointer-events: none;
      }

      /* ============================================
         Typography & Technical Text
         ============================================ */
      .tech-text {
        font-family: 'JetBrains Mono', 'Courier New', monospace;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      
      .tech-num {
        font-family: 'Oswald', sans-serif;
        letter-spacing: 1px;
      }

      /* ============================================
         "Endfield Frame" Container Styes
         统一的容器风格：极简边框 + 角落装饰
         ============================================ */
      .void-frame {
        background: var(--void-bg-primary);
        border: 1px solid var(--void-border-base);
        position: relative;
        transition: all 0.3s ease;
      }

      /* Corner Markers (Top-Left & Bottom-Right) */
      .void-frame::before {
        content: '';
        position: absolute;
        top: -1px; left: -1px;
        width: 8px; height: 8px;
        border-top: 2px solid var(--void-accent-yellow);
        border-left: 2px solid var(--void-accent-yellow);
        opacity: 0.6;
      }
      .void-frame::after {
        content: '';
        position: absolute;
        bottom: -1px; right: -1px;
        width: 8px; height: 8px;
        border-bottom: 2px solid var(--void-accent-yellow);
        border-right: 2px solid var(--void-accent-yellow);
        opacity: 0.6;
      }

      .void-frame:hover {
        border-color: var(--void-border-active);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
      }
      .void-frame:hover::before, .void-frame:hover::after {
        opacity: 1;
        width: 12px; height: 12px;
      }

      /* ============================================
         Notion Content Overrides
         让文章内容看起来像"系统日志"
         ============================================ */
      #notion-article {
        color: var(--void-text-primary);
      }

      /* Headers */
      #notion-article h1, #notion-article h2, #notion-article h3 {
        color: white;
        font-weight: 700;
        margin-top: 2em;
        margin-bottom: 0.8em;
        position: relative;
        padding-left: 1rem;
      }
      
      #notion-article h1::before, 
      #notion-article h2::before,
      #notion-article h3::before {
        content: '';
        position: absolute;
        left: 0; top: 0.2em; bottom: 0.2em;
        width: 4px;
        background: var(--void-accent-yellow);
      }

      /* Quotes / Blockquotes */
      #notion-article blockquote {
        background: var(--void-bg-secondary);
        border-left: 2px solid var(--void-accent-cyan);
        color: var(--void-text-secondary);
        padding: 1rem 1.5rem;
        margin: 1.5rem 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9em;
      }

      /* Lists */
      #notion-article ul li, #notion-article ol li {
        margin-bottom: 0.5em;
        color: var(--void-text-secondary);
      }
      #notion-article ul li::marker {
        color: var(--void-accent-cyan);
      }

      /* Links in Content */
      #notion-article a {
        color: var(--void-accent-cyan);
        text-decoration: none;
        border-bottom: 1px dotted var(--void-accent-cyan);
        transition: all 0.2s;
      }
      #notion-article a:hover {
        color: var(--void-accent-yellow);
        border-bottom-color: var(--void-accent-yellow);
        background: var(--void-accent-cyan-dim);
      }

      /* Code Blocks */
      #notion-article pre {
        background: #000 !important;
        border: 1px solid var(--void-border-base);
        border-radius: 0 !important;
      }

      /* ============================================
         Buttons (Cut Corner Aesthetic)
         ============================================ */
      .void-btn {
        background: transparent;
        border: 1px solid var(--void-accent-yellow);
        color: var(--void-accent-yellow);
        padding: 0.5rem 1.5rem;
        font-family: 'JetBrains Mono', monospace;
        text-transform: uppercase;
        font-size: 0.8em;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: all 0.2s;
      }
      
      .void-btn:hover {
        background: var(--void-accent-yellow);
        color: black;
        box-shadow: 0 0 10px var(--void-accent-yellow-dim);
      }
      
      /* Cut Corner using Clip Path */
      .void-btn-cut {
        clip-path: polygon(
          10px 0, 100% 0, 
          100% calc(100% - 10px), 
          calc(100% - 10px) 100%, 
          0 100%, 0 10px
        );
      }

      /* ============================================
         Tech Decorations Utilities
         ============================================ */
      .scan-line {
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--void-accent-cyan), transparent);
        opacity: 0.3;
      }

      /* Loading Animation (Radar Spin) */
      @keyframes radar-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .loading-radar {
        width: 40px; height: 40px;
        border: 2px solid var(--void-border-base);
        border-top-color: var(--void-accent-yellow);
        border-radius: 50%;
        animation: radar-spin 1s linear infinite;
      }
    `}</style>
  )
}
