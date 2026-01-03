import React from 'react'

/**
 * Void Theme Styles - Light Industrial Refined
 * Phase 3: "White Endfield" / Laboratory Aesthetic
 */
export const Style = () => {
  return (
    <style jsx global>{`
      /* ============================================
         Light Industrial Color Scheme
         ============================================ */
      :root {
        /* Backgrounds - Laboratory / Clean Room */
        --void-bg-base: #F7F7F9;       /* 整体背景 (冷灰白) */
        --void-bg-primary: #FFFFFF;    /* 容器背景 (纯白) */
        --void-bg-secondary: #F0F0F2;  /* 次要/悬停背景 (浅灰) */
        --void-bg-tertiary: #E4E4E7;   /* 装饰性背景 (中灰) */
        
        /* Typography - High Contrast Gunmetal */
        --void-text-primary: #18181b;  /* 主要文字 (深炭灰) */
        --void-text-secondary: #52525b;/* 次要文字 (中深灰) */
        --void-text-muted: #a1a1aa;    /* 装饰性文字 (浅灰) */
        
        /* Accents - Tech Blue Theme */
        --void-accent-yellow: #3b82f6; /* Tech Blue accent color */
        --void-accent-yellow-dim: rgba(59, 130, 246, 0.1);
        --void-accent-cyan: #06b6d4;   /* Deep Tech Cyan */
        --void-accent-cyan-dim: rgba(6, 182, 212, 0.1);
        
        /* Borders & Lines - Heavy Structure */
        --void-border-base: #e4e4e7;
        --void-border-active: #27272a; /* Active borders are dark/heavy */
        
        /* Technical Grid */
        --void-grid-color: rgba(0, 0, 0, 0.03); /* Subtle dark grid */
        
        /* Shadow / Glass */
        --void-shadow-base: 0 1px 3px rgba(0,0,0,0.05);
        --void-shadow-hover: 0 10px 30px rgba(0,0,0,0.08);
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

      /* Technical Grid Background */
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

      /* ============================================
         Typography & Technical Text
         ============================================ */
      .tech-text {
        font-family: 'JetBrains Mono', 'Courier New', monospace;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-weight: 500;
      }
      
      .tech-num {
        font-family: 'Oswald', sans-serif;
        letter-spacing: 1px;
      }

      /* ============================================
         "Float" Container Styles (Glassmorphism)
         ============================================ */
      .void-frame {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(12px);
        border: 1px solid var(--void-border-base);
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--void-shadow-base);
      }

      /* Corner Markers (Minimalist L-shape) */
      .void-frame::before {
        content: '';
        position: absolute;
        top: -1px; left: -1px;
        width: 0; height: 0;
        border-top: 2px solid var(--void-text-primary);
        border-left: 2px solid var(--void-text-primary);
        transition: all 0.3s ease;
        opacity: 0;
      }
      .void-frame::after {
        content: '';
        position: absolute;
        bottom: -1px; right: -1px;
        width: 0; height: 0;
        border-bottom: 2px solid var(--void-text-primary);
        border-right: 2px solid var(--void-text-primary);
        transition: all 0.3s ease;
        opacity: 0;
      }

      /* Active State: Heavy Corners appear */
      .void-frame:hover {
        border-color: var(--void-border-active);
        box-shadow: var(--void-shadow-hover);
        transform: translateY(-2px);
      }
      .void-frame:hover::before, .void-frame:hover::after {
        opacity: 1;
        width: 12px; height: 12px;
      }

      /* ============================================
         Notion Content Overrides (Light Mode)
         ============================================ */
      #notion-article {
        color: var(--void-text-primary);
        font-size: 1.05rem;
        line-height: 1.75;
      }

      /* Headers */
      #notion-article h1, #notion-article h2, #notion-article h3 {
        color: var(--void-text-primary);
        font-weight: 800;
        margin-top: 2.5em;
        margin-bottom: 1em;
        position: relative;
        padding-left: 1rem;
        letter-spacing: -0.02em;
      }
      
      #notion-article h1::before, 
      #notion-article h2::before,
      #notion-article h3::before {
        content: '';
        position: absolute;
        left: 0; top: 0.3em; bottom: 0.3em;
        width: 4px;
        background: var(--void-accent-yellow);
      }

      /* Quotes */
      #notion-article blockquote {
        background: var(--void-bg-secondary);
        border-left: 3px solid var(--void-text-primary);
        color: var(--void-text-secondary);
        padding: 1.2rem 1.5rem;
        margin: 2rem 0;
        font-style: italic;
      }

      /* Lists */
      #notion-article ul li, #notion-article ol li {
        margin-bottom: 0.5em;
        color: var(--void-text-secondary);
      }
      #notion-article ul li::marker {
        color: var(--void-accent-cyan);
        font-weight: bold;
      }

      /* Links in Content */
      #notion-article a {
        color: var(--void-text-primary);
        text-decoration: none;
        border-bottom: 2px solid var(--void-accent-cyan-dim);
        transition: all 0.2s;
        font-weight: 600;
      }
      #notion-article a:hover {
        background: var(--void-accent-cyan-dim);
        border-bottom-color: var(--void-accent-cyan);
      }

      /* Code Blocks */
      #notion-article pre {
        background: #18181b !important; /* Keep code blocks dark for contrast */
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 4px !important;
        box-shadow: var(--void-shadow-base);
      }

      /* ============================================
         Buttons (Cut Corner Aesthetic)
         ============================================ */
      .void-btn {
        background: transparent;
        border: 2px solid var(--void-border-active);
        color: var(--void-text-primary);
        padding: 0.6rem 1.5rem;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.85em;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: all 0.2s;
      }
      
      .void-btn:hover {
        background: var(--void-border-active);
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }

      /* ============================================
         Tech Decorations Utilities (Minimalist)
         ============================================ */
      .scan-line {
        width: 100%;
        height: 1px;
        background: var(--void-border-base);
        margin: 1rem 0;
      }

      /* Loading Animation (Spinner) */
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .loading-radar {
        width: 24px; height: 24px;
        border: 2px solid var(--void-border-base);
        border-top-color: var(--void-text-primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      /* ============================================
         Mobile Responsive Styles
         ============================================ */
      
      /* Safe area support for notched devices */
      .safe-area-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }

      /* Mobile-specific adjustments */
      @media (max-width: 767px) {
        /* Smaller grid on mobile */
        #theme-void::before {
          background-size: 30px 30px;
        }

        /* Reduce padding on mobile */
        .void-frame {
          padding: 1rem !important;
        }

        /* Smaller technical text */
        .tech-text {
          font-size: 0.75rem;
          letter-spacing: 0.3px;
        }

        /* Ensure minimum touch targets */
        button, a, [role="button"] {
          min-height: 44px;
        }

        /* Notion content adjustments */
        #notion-article {
          font-size: 1rem;
          line-height: 1.7;
        }

        #notion-article h1 { font-size: 1.75rem; }
        #notion-article h2 { font-size: 1.5rem; }
        #notion-article h3 { font-size: 1.25rem; }

        #notion-article h1, 
        #notion-article h2, 
        #notion-article h3 {
          margin-top: 1.5em;
          padding-left: 0.75rem;
        }

        #notion-article h1::before, 
        #notion-article h2::before,
        #notion-article h3::before {
          width: 3px;
        }

        /* Code blocks scroll horizontally */
        #notion-article pre {
          max-width: 100%;
          overflow-x: auto;
        }

        /* Blockquotes */
        #notion-article blockquote {
          padding: 0.8rem 1rem;
          margin: 1.5rem 0;
        }
      }

      /* Tablet adjustments */
      @media (min-width: 768px) and (max-width: 1023px) {
        #theme-void::before {
          background-size: 35px 35px;
        }

        .void-frame {
          padding: 1.5rem !important;
        }
      }

      /* Hide scrollbar on webkit for mobile nav */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  )
}
