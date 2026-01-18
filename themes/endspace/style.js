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
        --endspace-accent-yellow: #62F0F5;
        --endspace-accent-yellow-dim: rgba(98, 240, 245, 0.15);
        --endspace-accent-cyan: #06b6d4;
        --endspace-accent-cyan-dim: rgba(6, 182, 212, 0.1);
        
        /* Borders & Lines */
        --endspace-border-base: #e4e4e7;
        --endspace-border-active: #3b82f6;
        --endspace-grid-color: rgba(0,0,0,0.03);
        
        /* Shadows - Enhanced 3D Depth */
        --endspace-shadow-base: 
          0 1px 2px rgba(0, 0, 0, 0.04),
          0 2px 4px rgba(0, 0, 0, 0.04),
          0 4px 8px rgba(0, 0, 0, 0.04);
        --endspace-shadow-hover: 
          0 4px 8px rgba(0, 0, 0, 0.08),
          0 8px 16px rgba(0, 0, 0, 0.06),
          0 16px 32px rgba(0, 0, 0, 0.04),
          0 0 0 1px var(--endspace-accent-yellow);
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
        
        --endspace-accent-yellow: #62F0F5;
        --endspace-accent-yellow-dim: rgba(98, 240, 245, 0.15);
        --endspace-accent-cyan: #22d3ee;
        --endspace-accent-cyan-dim: rgba(34, 211, 238, 0.1);
        
        --endspace-border-base: #27272a;
        --endspace-border-active: #3b82f6;
        --endspace-grid-color: rgba(255,255,255,0.02);
        
        --endspace-shadow-base: 
          0 1px 2px rgba(0, 0, 0, 0.2),
          0 2px 4px rgba(0, 0, 0, 0.15),
          0 4px 8px rgba(0, 0, 0, 0.1);
        --endspace-shadow-hover: 
          0 4px 8px rgba(0, 0, 0, 0.3),
          0 8px 16px rgba(0, 0, 0, 0.25),
          0 16px 32px rgba(0, 0, 0, 0.2),
          0 0 0 1px var(--endspace-accent-yellow);
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
        /* Custom Tech Cursor - Sharp Angular with 3D Shadow */
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cdefs%3E%3Cfilter id='shadow' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeDropShadow dx='2' dy='2' stdDeviation='1' flood-color='%23000' flood-opacity='0.4'/%3E%3C/filter%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2362F0F5'/%3E%3Cstop offset='100%25' stop-color='%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M4 4 L4 24 L10 18 L16 28 L20 26 L14 16 L22 16 Z' fill='url(%23grad)' stroke='%23fff' stroke-width='1.5' filter='url(%23shadow)'/%3E%3C/svg%3E") 4 4, auto;
      }
      
      #theme-endspace a, #theme-endspace button, #theme-endspace [role="button"] {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cdefs%3E%3Cfilter id='shadow' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeDropShadow dx='2' dy='2' stdDeviation='1.5' flood-color='%2362F0F5' flood-opacity='0.6'/%3E%3C/filter%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2362F0F5'/%3E%3Cstop offset='100%25' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M8 8 L16 16 L12 16 L16 24 L14 25 L10 17 L6 21 Z' fill='url(%23grad)' stroke='%23fff' stroke-width='1' filter='url(%23shadow)'/%3E%3Ccircle cx='16' cy='16' r='6' fill='none' stroke='%2362F0F5' stroke-width='1.5' opacity='0.6'/%3E%3C/svg%3E") 8 8, pointer;
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
         Card Styles - Enhanced 3D Depth
         ============================================ */
      .endspace-card {
        background: var(--endspace-bg-primary);
        border: 1px solid var(--endspace-border-base);
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--endspace-shadow-base);
        /* Subtle inner highlight for depth */
        background-image: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.1) 0%,
          transparent 50%,
          rgba(0, 0, 0, 0.02) 100%
        );
      }

      .endspace-card:hover {
        border-color: var(--endspace-border-active);
        box-shadow: var(--endspace-shadow-hover);
        transform: translateY(-4px) scale(1.01);
      }
      
      .dark .endspace-card {
        background-image: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.03) 0%,
          transparent 50%,
          rgba(0, 0, 0, 0.1) 100%
        );
      }

      /* ============================================
         Notion Content Overrides (Light Mode)
         ============================================ */
      #notion-article {
        color: var(--endspace-text-primary);
        font-size: 1.05rem;
        line-height: 1.75;
      }

      /* Headers - NieR: Automata Style Text Shadow */
      #notion-article h1, #notion-article h2, #notion-article h3 {
        color: var(--endspace-text-primary);
        font-weight: 800;
        margin-top: 2.5em;
        margin-bottom: 1em;
        position: relative;
        padding-left: 1rem;
        letter-spacing: -0.02em;
        /* NieR Automata offset shadow - sharp, layered */
        text-shadow: 
          2px 2px 0 rgba(98, 240, 245, 0.3),
          4px 4px 0 rgba(98, 240, 245, 0.15),
          6px 6px 8px rgba(0, 0, 0, 0.1);
      }
      
      .dark #notion-article h1, .dark #notion-article h2, .dark #notion-article h3 {
        text-shadow: 
          2px 2px 0 rgba(98, 240, 245, 0.4),
          4px 4px 0 rgba(98, 240, 245, 0.2),
          6px 6px 12px rgba(0, 0, 0, 0.5);
      }
      
      #notion-article h1::before, 
      #notion-article h2::before,
      #notion-article h3::before {
        content: '';
        position: absolute;
        left: 0; top: 0.3em; bottom: 0.3em;
        width: 4px;
        background: var(--endspace-accent-yellow);
        box-shadow: 2px 2px 4px rgba(98, 240, 245, 0.3);
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

      /* ============================================
         NieR: Automata Style Title (Reusable)
         ============================================ */
      .nier-title {
        position: relative;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-shadow: 
          2px 2px 0 rgba(98, 240, 245, 0.35),
          4px 4px 0 rgba(98, 240, 245, 0.18),
          6px 6px 10px rgba(0, 0, 0, 0.15);
      }
      
      .dark .nier-title {
        text-shadow: 
          2px 2px 0 rgba(98, 240, 245, 0.45),
          4px 4px 0 rgba(98, 240, 245, 0.25),
          6px 6px 15px rgba(0, 0, 0, 0.6);
      }

      /* ============================================
         3D Button Effects
         ============================================ */
      .endspace-btn-3d {
        position: relative;
        background: var(--endspace-bg-primary);
        border: 2px solid var(--endspace-accent-yellow);
        color: var(--endspace-text-primary);
        padding: 0.75rem 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 4px 0 rgba(98, 240, 245, 0.6),
          0 6px 12px rgba(0, 0, 0, 0.15);
      }
      
      .endspace-btn-3d:hover {
        transform: translateY(-2px);
        box-shadow: 
          0 6px 0 rgba(98, 240, 245, 0.7),
          0 10px 20px rgba(0, 0, 0, 0.2);
      }
      
      .endspace-btn-3d:active {
        transform: translateY(2px);
        box-shadow: 
          0 2px 0 rgba(98, 240, 245, 0.5),
          0 3px 6px rgba(0, 0, 0, 0.1);
      }

      /* ============================================
         Sidebar & Navigation 3D Depth
         ============================================ */
      .endspace-sidebar-3d {
        box-shadow: 
          4px 0 8px rgba(0, 0, 0, 0.05),
          8px 0 16px rgba(0, 0, 0, 0.03);
      }
      
      .dark .endspace-sidebar-3d {
        box-shadow: 
          4px 0 8px rgba(0, 0, 0, 0.3),
          8px 0 16px rgba(0, 0, 0, 0.2);
      }
    `}</style>
  )
}
