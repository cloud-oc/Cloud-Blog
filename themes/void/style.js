import React from 'react'

/**
 * Void Theme Styles - Endfield Industrial Design
 * 终末地工业风格样式
 */
export const Style = () => {
  return (
    <style jsx global>{`
      /* ============================================
         Endfield Color Scheme & Variables
         ============================================ */
      :root {
        --void-bg-primary: #0a0a0a;
        --void-bg-secondary: #1a1a1a;
        --void-bg-tertiary: #2a2a2a;
        --void-text-primary: #f0f0f0;
        --void-text-secondary: #e0e0e0;
        --void-text-muted: #999999;
        --void-accent-yellow: #ffc700;
        --void-accent-cyan: #00d9ff;
        --void-border: #333333;
        --void-border-light: #444444;
        
        /* Technical Grid */
        --void-grid-color: rgba(255, 199, 0, 0.1);
        
        /* Transitions */
        --void-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* ============================================
         Base Theme Styling
         ============================================ */
      #theme-void {
        min-height: 100vh;
        background: var(--void-bg-primary);
        color: var(--void-text-primary);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 
                     'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        position: relative;
      }

      /* Grid Overlay Background */
      #theme-void::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          linear-gradient(var(--void-grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--void-grid-color) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 0;
        opacity: 0.3;
      }

      /* Hexagonal Pattern Overlay */
      #theme-void::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          radial-gradient(circle at 25% 50%, rgba(0, 217, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 50%, rgba(255, 199, 0, 0.05) 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
      }

      /* ============================================
         Typography
         ============================================ */
      #theme-void h1,
      #theme-void h2,
      #theme-void h3,
      #theme-void h4,
      #theme-void h5,
      #theme-void h6 {
        color: var(--void-text-primary);
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      #theme-void .tech-text {
        font-family: 'Courier New', Consolas, Monaco, monospace;
        letter-spacing: 0.05em;
        color: var(--void-accent-cyan);
      }

      /* ============================================
         Links
         ============================================ */
      #theme-void a {
        color: var(--void-accent-cyan);
        text-decoration: none;
        transition: var(--void-transition);
      }

      #theme-void a:hover {
        color: var(--void-accent-yellow);
      }

      /* ============================================
         Buttons & Interactive Elements
         ============================================ */
      #theme-void .void-button {
        background: var(--void-bg-tertiary);
        border: 1px solid var(--void-border);
        color: var(--void-text-primary);
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        transition: var(--void-transition);
        position: relative;
        overflow: hidden;
        clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
      }

      #theme-void .void-button:hover {
        background: var(--void-accent-yellow);
        color: var(--void-bg-primary);
        border-color: var(--void-accent-yellow);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 199, 0, 0.3);
      }

      #theme-void .void-button-primary {
        background: var(--void-accent-yellow);
        color: var(--void-bg-primary);
        border-color: var(--void-accent-yellow);
      }

      #theme-void .void-button-primary:hover {
        background: var(--void-accent-cyan);
        border-color: var(--void-accent-cyan);
      }

      /* ============================================
         Cards & Containers
         ============================================ */
      #theme-void .void-card {
        background: var(--void-bg-secondary);
        border: 1px solid var(--void-border);
        transition: var(--void-transition);
        position: relative;
        clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
      }

      #theme-void .void-card:hover {
        border-color: var(--void-accent-yellow);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(255, 199, 0, 0.2);
      }

      #theme-void .void-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(180deg, 
          var(--void-accent-yellow) 0%, 
          var(--void-accent-cyan) 100%);
        opacity: 0;
        transition: var(--void-transition);
      }

      #theme-void .void-card:hover::before {
        opacity: 1;
      }

      /* ============================================
         Technical Decorations
         ============================================ */
      .tech-corner {
        position: relative;
      }

      .tech-corner::before,
      .tech-corner::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border: 1px solid var(--void-accent-yellow);
      }

      .tech-corner::before {
        top: -1px;
        left: -1px;
        border-right: none;
        border-bottom: none;
      }

      .tech-corner::after {
        bottom: -1px;
        right: -1px;
        border-left: none;
        border-top: none;
      }

      /* Spectrum Bar */
      .spectrum-bar {
        height: 3px;
        background: linear-gradient(90deg,
          #ff0000 0%,
          #ff7f00 14%,
          #ffff00 28%,
          #00ff00 42%,
          #0000ff 57%,
          #4b0082 71%,
          #9400d3 85%,
          var(--void-accent-cyan) 100%
        );
        animation: spectrum-pulse 3s ease-in-out infinite;
      }

      @keyframes spectrum-pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }

      /* Technical Timestamp */
      .tech-timestamp {
        font-family: 'Courier New', monospace;
        font-size: 0.75rem;
        color: var(--void-accent-cyan);
        letter-spacing: 0.1em;
      }

      /* Scanning animation */
      @keyframes scan-line {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }

      .scan-effect {
        position: relative;
        overflow: hidden;
      }

      .scan-effect::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--void-accent-cyan), transparent);
        animation: scan-line 3s linear infinite;
        opacity: 0.5;
      }

      /* ============================================
         Scrollbar Styling
         ============================================ */
      #theme-void ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      #theme-void ::-webkit-scrollbar-track {
        background: var(--void-bg-secondary);
      }

      #theme-void ::-webkit-scrollbar-thumb {
        background: var(--void-border-light);
        border-radius: 0;
      }

      #theme-void ::-webkit-scrollbar-thumb:hover {
        background: var(--void-accent-yellow);
      }

      /* ============================================
         Responsive Utilities
         ============================================ */
      @media (max-width: 768px) {
        #theme-void::before {
          background-size: 30px 30px;
        }
      }

      /* ============================================
         Loading Animation
         ============================================ */
      @keyframes tech-loading {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .tech-loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid var(--void-border);
        border-top-color: var(--void-accent-yellow);
        border-radius: 50%;
        animation: tech-loading 0.8s linear infinite;
      }

      /* ============================================
         Selection
         ============================================ */
      #theme-void ::selection {
        background: var(--void-accent-yellow);
        color: var(--void-bg-primary);
      }

      /* ============================================
         Image Overlays
         ============================================ */
      #theme-void img {
        transition: var(--void-transition);
      }

      #theme-void img:hover {
        filter: brightness(1.1) contrast(1.1);
      }
    `}</style>
  )
}
