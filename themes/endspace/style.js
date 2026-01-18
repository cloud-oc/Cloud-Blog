import React from 'react'

/**
 * Endspace Theme Styles - Light Industrial Refined
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
        --endspace-bg-base: #F7F7F9;       /* 整体背景 (冷灰�? */
        --endspace-bg-primary: #FFFFFF;    /* 容器背景 (纯白) */
        --endspace-bg-secondary: #F0F0F2;  /* 次要/悬停背景 (浅灰) */
        --endspace-bg-tertiary: #E4E4E7;   /* 装饰性背�?(中灰) */
        
        /* Typography - High Contrast Gunmetal */
        --endspace-text-primary: #18181b;  /* 主要文字 (深炭�? */
        --endspace-text-secondary: #52525b;/* 次要文字 (中深�? */
        --endspace-text-muted: #a1a1aa;    /* 装饰性文�?(浅灰) */
        
        /* Accents - Tech Blue Theme */
        --endspace-accent-yellow: #3b82f6; /* Tech Blue accent color */
        --endspace-accent-yellow-dim: rgba(59, 130, 246, 0.1);
        --endspace-accent-cyan: #06b6d4;   /* Deep Tech Cyan */
        --endspace-accent-cyan-dim: rgba(6, 182, 212, 0.1);
        
        /* Borders & Lines - Heavy Structure */
        --endspace-border-base: #e4e4e7;
        --endspace-border-active: #27272a; /* Active borders are dark/heavy */
        
        /* Technical Grid */
        --endspace-grid-color: rgba(0, 0, 0, 0.03); /* Subtle dark grid */
        
        /* Shadow / Glass */
        --endspace-shadow-base: 0 1px 3px rgba(0,0,0,0.05);
        --endspace-shadow-hover: 0 10px 30px rgba(0,0,0,0.08);
        
        /* Viewport Scaling - Set dynamically by useViewportScale hook */
        --endspace-viewport-scale: 1;
        --endspace-base-font-size: 16px;
      }

      /* ============================================
         Viewport Scaling Base
         ============================================ */
      html {
        /* CSS fallback for viewport scaling when JS not loaded */
        /* Desktop: scale based on viewport width relative to 1440px base (larger content) */
        font-size: clamp(14px, calc(16px * (100vw / 1440)), 24px);
      }
      
      /* Portrait/Mobile orientation: different scaling base */
      @media (orientation: portrait), (max-width: 767px) {
        html {
          font-size: clamp(14px, calc(16px * (100vw / 390)), 20px);
        }
      }

      /* ============================================
         Global Base Styles
         ============================================ */
      #theme-void {
        background-color: var(--endspace-bg-base);
        color: var(--endspace-text-primary);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow-x: hidden;
      }

      /* Technical Grid Background */
      #theme-void::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: 
          linear-gradient(var(--endspace-grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--endspace-grid-color) 1px, transparent 1px);
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
      .endspace-frame {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(12px);
        border: 1px solid var(--endspace-border-base);
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--endspace-shadow-base);
      }

      /* Corner Markers (Minimalist L-shape) */
      .endspace-frame::before {
        content: '';
        position: absolute;
        top: -1px; left: -1px;
        width: 0; height: 0;
        border-top: 2px solid var(--endspace-text-primary);
        border-left: 2px solid var(--endspace-text-primary);
        transition: all 0.3s ease;
        opacity: 0;
      }
      .endspace-frame::after {
        content: '';
        position: absolute;
        bottom: -1px; right: -1px;
        width: 0; height: 0;
        border-bottom: 2px solid var(--endspace-text-primary);
        border-right: 2px solid var(--endspace-text-primary);
        transition: all 0.3s ease;
        opacity: 0;
      }

      /* Active State: Heavy Corners appear */
      .endspace-frame:hover {
        border-color: var(--endspace-border-active);
        box-shadow: var(--endspace-shadow-hover);
        transform: translateY(-2px);
      }
      .endspace-frame:hover::before, .endspace-frame:hover::after {
        opacity: 1;
        width: 12px; height: 12px;
      }

      /* ============================================
         Notion Content Overrides (Light Mode)
         ============================================ */
      #notion-article {
        color: var(--endspace-text-primary);
        font-size: 1.05rem;
        line-height: 1.75;
      }

      /* Headers */
      #notion-article h1, #notion-article h2, #notion-article h3 {
        color: var(--endspace-text-primary);
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
        background: var(--endspace-accent-yellow);
      }

      /* Quotes */
      #notion-article blockquote {
        background: var(--endspace-bg-secondary);
        border-left: 3px solid var(--endspace-text-primary);
        color: var(--endspace-text-secondary);
        padding: 1.2rem 1.5rem;
        margin: 2rem 0;
        font-style: italic;
      }

      /* Lists */
      #notion-article ul li, #notion-article ol li {
        margin-bottom: 0.5em;
        color: var(--endspace-text-secondary);
      }
      #notion-article ul li::marker {
        color: var(--endspace-accent-cyan);
        font-weight: bold;
      }

      /* Links in Content */
      #notion-article a {
        color: var(--endspace-text-primary);
        text-decoration: none;
        border-bottom: 2px solid var(--endspace-accent-cyan-dim);
        transition: all 0.2s;
        font-weight: 600;
      }
      #notion-article a:hover {
        background: var(--endspace-accent-cyan-dim);
        border-bottom-color: var(--endspace-accent-cyan);
      }

      /* Code Blocks */
      #notion-article pre {
        background: #18181b !important; /* Keep code blocks dark for contrast */
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 4px !important;
        box-shadow: var(--endspace-shadow-base);
      }

      /* ============================================
         Buttons (Cut Corner Aesthetic)
         ============================================ */
      .endspace-btn {
        background: transparent;
        border: 2px solid var(--endspace-border-active);
        color: var(--endspace-text-primary);
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
      
      .endspace-btn:hover {
        background: var(--endspace-border-active);
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
        background: var(--endspace-border-base);
        margin: 1rem 0;
      }

      /* Loading Animation (Spinner) */
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .loading-radar {
        width: 24px; height: 24px;
        border: 2px solid var(--endspace-border-base);
        border-top-color: var(--endspace-text-primary);
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
        .endspace-frame {
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
          font-size: 1.1rem;
          line-height: 1.75;
        }

        #notion-article p {
          font-size: 1.1rem;
          margin-bottom: 1.2em;
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

        .endspace-frame {
          padding: 1.5rem !important;
        }
      }

      /* Large desktop (1440px+) - Notion-style larger content */
      @media (min-width: 1440px) {
        #notion-article {
          font-size: 1.1rem;
          line-height: 1.8;
        }

        #notion-article p {
          margin-bottom: 1.4em;
        }

        .endspace-frame {
          padding: 2.5rem !important;
        }

        #theme-void::before {
          background-size: 45px 45px;
        }
      }

      /* Ultra-wide / 4K displays (1920px+) */
      @media (min-width: 1920px) {
        #notion-article {
          font-size: 1.15rem;
          line-height: 1.85;
        }

        #theme-void::before {
          background-size: 50px 50px;
        }

        .endspace-frame {
          padding: 3rem !important;
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

      /* ============================================
         EndspacePlayer Styles - Sci-Fi Music Player
         ============================================ */
      
      /* Rotating album cover animation */
      @keyframes void-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .endspace-player-rotating {
        animation: void-rotate 8s linear infinite;
      }
      
      .endspace-player-rotating-slow {
        animation: void-rotate 20s linear infinite;
      }
      
      /* Pulse animation for playing indicator */
      @keyframes void-pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
      }
      
      .endspace-player-pulse {
        animation: void-pulse 2s ease-in-out infinite;
      }
      
      /* Glow effect for album cover */
      .endspace-player-glow {
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        transition: box-shadow 0.3s ease;
      }
      
      .endspace-player-glow:hover {
        box-shadow: 0 0 25px rgba(59, 130, 246, 0.5);
      }
      
      /* Play button glow */
      .endspace-player-btn-glow {
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
      }
      
      .endspace-player-btn-glow:hover {
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
      }
      
      /* Player container styling */
      .endspace-player-full {
        background: transparent;
      }
      
      .endspace-player-mini {
        /* No borders - clean sidebar design */
      }

      /* ============================================
         Endfield-Inspired Texture System
         ============================================ */
      
      /* Diagonal Stripe Pattern - 45° Industrial Lines */
      .ef-diagonal-stripe {
        position: relative;
      }
      .ef-diagonal-stripe::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(
          -45deg,
          transparent,
          transparent 13.95%,
          rgba(0, 0, 0, 0.03) 13.95%,
          rgba(0, 0, 0, 0.03) 36.05%,
          transparent 36.05%,
          transparent 63.95%,
          rgba(0, 0, 0, 0.03) 63.95%,
          rgba(0, 0, 0, 0.03) 86.05%,
          transparent 86.05%,
          transparent
        );
        background-size: 0.5rem 0.5rem;
        pointer-events: none;
        z-index: 0;
      }
      
      /* Dotted Grid Overlay - Subtle Point Pattern */
      .ef-dotted-grid {
        position: relative;
      }
      .ef-dotted-grid::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px);
        background-size: 1rem 1rem;
        pointer-events: none;
        opacity: 0.5;
        z-index: 0;
      }

      /* ============================================
         Corner Decoration System (L-Markers)
         ============================================ */
      
      /* Tech Corner - L-shaped marks on hover */
      .ef-corner-marks {
        position: relative;
      }
      .ef-corner-marks::before,
      .ef-corner-marks::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        opacity: 0;
      }
      .ef-corner-marks::before {
        top: -1px;
        left: -1px;
        border-top: 2px solid var(--endspace-accent-yellow);
        border-left: 2px solid var(--endspace-accent-yellow);
      }
      .ef-corner-marks::after {
        bottom: -1px;
        right: -1px;
        border-bottom: 2px solid var(--endspace-accent-yellow);
        border-right: 2px solid var(--endspace-accent-yellow);
      }
      .ef-corner-marks:hover::before,
      .ef-corner-marks:hover::after {
        width: 16px;
        height: 16px;
        opacity: 1;
      }

      /* Four Corner Marks - All corners */
      .ef-four-corners {
        position: relative;
      }
      .ef-four-corners::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 12px; height: 12px;
        border-top: 2px solid var(--endspace-accent-cyan);
        border-left: 2px solid var(--endspace-accent-cyan);
        opacity: 0.6;
        pointer-events: none;
      }
      .ef-four-corners::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 12px; height: 12px;
        border-bottom: 2px solid var(--endspace-accent-cyan);
        border-right: 2px solid var(--endspace-accent-cyan);
        opacity: 0.6;
        pointer-events: none;
      }

      /* ============================================
         Scan Line & HUD Animations
         ============================================ */
      
      /* Horizontal Scan Line */
      @keyframes ef-scan-horizontal {
        0% { transform: translateY(-100%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
      
      .ef-scan-line {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, 
          transparent, 
          var(--endspace-accent-cyan) 20%, 
          var(--endspace-accent-cyan) 80%, 
          transparent
        );
        animation: ef-scan-horizontal 4s linear infinite;
        pointer-events: none;
        opacity: 0.5;
      }
      
      /* Vertical Scan Line */
      @keyframes ef-scan-vertical {
        0% { transform: translateX(-100%); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateX(100vw); opacity: 0; }
      }

      .ef-scan-line-v {
        position: absolute;
        top: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(180deg, 
          transparent, 
          var(--endspace-accent-cyan) 30%, 
          var(--endspace-accent-cyan) 70%, 
          transparent
        );
        animation: ef-scan-vertical 6s linear infinite;
        pointer-events: none;
        opacity: 0.3;
      }

      /* Pulse Glow Animation */
      @keyframes ef-pulse-glow {
        0%, 100% { 
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
        }
        50% { 
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.3);
        }
      }
      
      .ef-pulse-glow {
        animation: ef-pulse-glow 3s ease-in-out infinite;
      }

      /* ============================================
         Endfield Button Styles
         ============================================ */
      
      /* Button with Left Highlight Bar */
      .ef-button {
        position: relative;
        background: var(--endspace-bg-primary);
        border: 1px solid var(--endspace-border-base);
        padding: 0.75rem 1.5rem 0.75rem 2rem;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.85em;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.2s ease;
      }
      
      .ef-button::before {
        content: '';
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 55%;
        background-color: var(--endspace-accent-yellow);
        transition: all 0.2s ease;
      }
      
      .ef-button::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(
          -45deg,
          transparent,
          transparent 16.16%,
          rgba(0, 0, 0, 0.02) 16.16%,
          rgba(0, 0, 0, 0.02) 33.84%,
          transparent 33.84%,
          transparent 66.16%,
          rgba(0, 0, 0, 0.02) 66.16%,
          rgba(0, 0, 0, 0.02) 83.84%,
          transparent 83.84%,
          transparent
        );
        background-size: 0.5rem 0.5rem;
        pointer-events: none;
      }
      
      .ef-button:hover {
        background: var(--endspace-border-active);
        color: white;
        border-color: var(--endspace-border-active);
      }
      
      .ef-button:hover::before {
        height: 70%;
        background-color: #FFFA00; /* Endfield Yellow */
      }

      /* ============================================
         Card Enhancement Styles
         ============================================ */
      
      /* Enhanced Card with texture */
      .ef-card {
        position: relative;
        background: var(--endspace-bg-primary);
        border: 1px solid var(--endspace-border-base);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .ef-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(
          -45deg,
          transparent,
          transparent 13.95%,
          rgba(0, 0, 0, 0.015) 13.95%,
          rgba(0, 0, 0, 0.015) 36.05%,
          transparent 36.05%,
          transparent 63.95%,
          rgba(0, 0, 0, 0.015) 63.95%,
          rgba(0, 0, 0, 0.015) 86.05%,
          transparent 86.05%,
          transparent
        );
        background-size: 0.5rem 0.5rem;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .ef-card:hover {
        border-color: var(--endspace-accent-yellow);
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
        transform: translateY(-2px);
      }
      
      .ef-card:hover::before {
        opacity: 1;
      }

      /* Index Number Badge - Industrial Style */
      .ef-index-badge {
        position: absolute;
        top: -1px;
        left: -1px;
        padding: 0.25rem 0.5rem;
        background: var(--endspace-accent-yellow);
        color: #000;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      /* ============================================
         Noise & Grain Overlay
         ============================================ */
      
      @keyframes ef-noise {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-5%, -10%); }
        20% { transform: translate(-15%, 5%); }
        30% { transform: translate(7%, -25%); }
        40% { transform: translate(-5%, 25%); }
        50% { transform: translate(-15%, 10%); }
        60% { transform: translate(15%, 0%); }
        70% { transform: translate(0%, 15%); }
        80% { transform: translate(3%, 35%); }
        90% { transform: translate(-10%, 10%); }
      }
      
      .ef-noise-overlay::before {
        content: '';
        position: fixed;
        inset: -50%;
        width: 200%;
        height: 200%;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        animation: ef-noise 8s steps(10) infinite;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.4;
      }

      /* ============================================
         HUD Corner Decorations
         ============================================ */
      
      .ef-hud-corners {
        position: relative;
      }
      
      /* Top Left HUD */
      .ef-hud-tl::before {
        content: '';
        position: fixed;
        top: 1rem;
        left: 1rem;
        width: 3rem;
        height: 3rem;
        border-top: 2px solid rgba(6, 182, 212, 0.4);
        border-left: 2px solid rgba(6, 182, 212, 0.4);
        pointer-events: none;
        z-index: 50;
      }
      
      /* Bottom Right HUD */
      .ef-hud-br::after {
        content: '';
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        width: 3rem;
        height: 3rem;
        border-bottom: 2px solid rgba(6, 182, 212, 0.4);
        border-right: 2px solid rgba(6, 182, 212, 0.4);
        pointer-events: none;
        z-index: 50;
      }

      /* ============================================
         Glowing Border Animation
         ============================================ */
      
      @keyframes ef-border-glow {
        0%, 100% { 
          border-color: var(--endspace-border-base);
          box-shadow: none;
        }
        50% { 
          border-color: var(--endspace-accent-cyan);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
        }
      }
      
      .ef-glow-border:hover {
        animation: ef-border-glow 2s ease-in-out infinite;
      }
    `}</style>
  )
}
