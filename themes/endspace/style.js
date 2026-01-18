/**
 * Endspace Theme - Global Styles (JSX)
 * Light Industrial / Endfield-inspired aesthetic
 */

export const Style = () => {
  return (
    <style jsx global>{`
      /* ============================================
         CSS Custom Properties - Light Industrial Theme
         ============================================ */
      :root {
        /* Ethereal Whites & Grays */
        --endspace-bg-base: #fafafa;
        --endspace-bg-primary: #ffffff;
        --endspace-bg-secondary: #f4f4f5;
        --endspace-bg-tertiary: #e4e4e7;
        
        /* Dark Text (High Contrast) */
        --endspace-text-primary: #18181b;
        --endspace-text-secondary: #52525b;
        --endspace-text-muted: #a1a1aa;
        
        /* Accents (Subtle Industrialism) */
        --endspace-accent-yellow: #f59e0b;
        --endspace-accent-yellow-dim: rgba(245, 158, 11, 0.15);
        --endspace-accent-cyan: #06b6d4;
        --endspace-accent-cyan-dim: rgba(6, 182, 212, 0.1);
        
        /* Borders & Lines */
        --endspace-border-base: #e4e4e7;
        --endspace-border-active: #3b82f6;
        --endspace-grid-color: rgba(0,0,0,0.03);
        
        /* Shadows */
        --endspace-shadow-base: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
        --endspace-shadow-hover: 0 10px 40px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
      }

      /* Dark Mode Variables */
      .dark {
        --endspace-bg-base: #09090b;
        --endspace-bg-primary: #18181b;
        --endspace-bg-secondary: #27272a;
        --endspace-bg-tertiary: #3f3f46;
        
        --endspace-text-primary: #fafafa;
        --endspace-text-secondary: #a1a1aa;
        --endspace-text-muted: #71717a;
        
        --endspace-accent-yellow: #fbbf24;
        --endspace-accent-yellow-dim: rgba(251, 191, 36, 0.15);
        --endspace-accent-cyan: #22d3ee;
        --endspace-accent-cyan-dim: rgba(34, 211, 238, 0.1);
        
        --endspace-border-base: #27272a;
        --endspace-border-active: #3b82f6;
        --endspace-grid-color: rgba(255,255,255,0.02);
        
        --endspace-shadow-base: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
        --endspace-shadow-hover: 0 10px 40px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3);
      }

      /* ============================================
         Viewport Scaling (Responsive Font Size)
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
      #theme-endspace {
        background-color: var(--endspace-bg-base);
        color: var(--endspace-text-primary);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow-x: hidden;
      }

      /* Technical Grid Background */
      #theme-endspace::before {
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

      .dark .endspace-frame {
        background: rgba(24, 24, 27, 0.8);
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
         Card Styles
         ============================================ */
      .endspace-card {
        background: var(--endspace-bg-primary);
        border: 1px solid var(--endspace-border-base);
        position: relative;
        transition: all 0.3s ease;
      }

      .endspace-card:hover {
        border-color: var(--endspace-border-active);
        box-shadow: var(--endspace-shadow-hover);
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
        background: #18181b !important;
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

      .endspace-button-primary {
        background: var(--endspace-border-active);
        border: none;
        color: white;
        padding: 0.75rem 1.5rem;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.85em;
        cursor: pointer;
        transition: all 0.2s;
      }

      .endspace-button-primary:hover {
        background: #2563eb;
        transform: translateY(-1px);
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

      /* Spectrum bar decoration */
      .spectrum-bar {
        height: 2px;
        background: linear-gradient(90deg, 
          var(--endspace-accent-cyan) 0%, 
          var(--endspace-accent-yellow) 50%, 
          var(--endspace-accent-cyan) 100%
        );
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

      /* Tech corner decoration */
      .tech-corner {
        position: relative;
      }
      .tech-corner::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 8px; height: 8px;
        border-top: 2px solid var(--endspace-accent-cyan);
        border-left: 2px solid var(--endspace-accent-cyan);
      }
      .tech-corner::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 8px; height: 8px;
        border-bottom: 2px solid var(--endspace-accent-cyan);
        border-right: 2px solid var(--endspace-accent-cyan);
      }

      /* ============================================
         Mobile Responsive Styles
         ============================================ */
      
      /* Safe area support for notched devices */
      .safe-area-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }
      .safe-area-top {
        padding-top: env(safe-area-inset-top);
      }

      /* Mobile-specific adjustments */
      @media (max-width: 767px) {
        /* Smaller grid on mobile */
        #theme-endspace::before {
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
          margin-bottom: 1.25em;
        }
      }

      /* ============================================
         Player Styles
         ============================================ */
      .endspace-player-glow {
        box-shadow: 0 0 10px var(--endspace-accent-yellow);
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .endspace-player-rotating {
        animation: rotate 8s linear infinite;
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
      
      .ef-button:hover {
        background: var(--endspace-border-active);
        color: white;
        border-color: var(--endspace-border-active);
      }
      
      .ef-button:hover::before {
        height: 70%;
        background-color: #FFFA00;
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
      
      .ef-card:hover {
        border-color: var(--endspace-accent-yellow);
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
        transform: translateY(-2px);
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
