import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect, useState, useCallback } from 'react'

/**
 * LoadingCover Component - Void Theme Endfield Style
 * 加载动画组件 - 终末地科技风格
 * 显示真实的页面加载进度
 */
const LoadingCover = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('init') // init, loading, complete, fadeout
  const [resourcesLoaded, setResourcesLoaded] = useState(false)
  const siteName = siteConfig('TITLE') || 'CLOUD09_SPACE'
  const { onLoading } = useGlobal()

  // Track real page loading progress
  const updateProgress = useCallback(() => {
    // Check document ready state
    const readyState = document.readyState
    
    // Count loaded resources
    const images = document.images
    const totalImages = images.length
    let loadedImages = 0
    
    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) {
        loadedImages++
      }
    }
    
    // Calculate progress based on multiple factors
    let calculatedProgress = 0
    
    // Document state contribution (0-40%)
    if (readyState === 'loading') {
      calculatedProgress += 20
    } else if (readyState === 'interactive') {
      calculatedProgress += 35
    } else if (readyState === 'complete') {
      calculatedProgress += 40
    }
    
    // Image loading contribution (0-40%)
    if (totalImages > 0) {
      calculatedProgress += (loadedImages / totalImages) * 40
    } else {
      calculatedProgress += 40
    }
    
    // Content loading state from global (0-20%)
    if (!onLoading) {
      calculatedProgress += 20
    }
    
    return Math.min(Math.round(calculatedProgress), 100)
  }, [onLoading])

  useEffect(() => {
    // Initial phase
    const initTimer = setTimeout(() => {
      setPhase('loading')
    }, 300)

    // Progress update interval
    const progressInterval = setInterval(() => {
      const newProgress = updateProgress()
      setProgress(prev => {
        // Smooth progress increase, never decrease
        const smoothProgress = Math.max(prev, newProgress)
        
        // Add small increments to make it feel alive
        if (smoothProgress < 95 && smoothProgress === prev) {
          return Math.min(prev + 1, 95)
        }
        return smoothProgress
      })
    }, 100)

    // Listen for window load event
    const handleLoad = () => {
      setResourcesLoaded(true)
    }

    if (document.readyState === 'complete') {
      setResourcesLoaded(true)
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearTimeout(initTimer)
      clearInterval(progressInterval)
      window.removeEventListener('load', handleLoad)
    }
  }, [updateProgress])

  // Complete loading when resources are loaded and onLoading is false
  useEffect(() => {
    if (resourcesLoaded && !onLoading && progress >= 80) {
      // Set progress to 100%
      setProgress(100)
      
      // Small delay then complete
      const completeTimer = setTimeout(() => {
        setPhase('complete')
        
        setTimeout(() => {
          setPhase('fadeout')
          setTimeout(() => {
            setIsVisible(false)
          }, 600)
        }, 400)
      }, 300)

      return () => clearTimeout(completeTimer)
    }
  }, [resourcesLoaded, onLoading, progress])

  if (!isVisible) return null

  return (
    <div className={`loading-cover ${phase === 'fadeout' ? 'fade-out' : ''}`}>
      {/* Background Grid Pattern */}
      <div className="grid-pattern" />
      
      {/* Scan Lines */}
      <div className="scan-lines" />
      
      {/* Corner Brackets */}
      <div className="corner-bracket top-left" />
      <div className="corner-bracket top-right" />
      <div className="corner-bracket bottom-left" />
      <div className="corner-bracket bottom-right" />
      
      {/* Main Content */}
      <div className="loading-content">
        {/* System Status */}
        <div className="system-status">
          <div className="status-dot" />
          <span className="status-text">
            {phase === 'init' && 'SYSTEM_INITIALIZING'}
            {phase === 'loading' && 'LOADING_RESOURCES'}
            {phase === 'complete' && 'READY'}
            {phase === 'fadeout' && 'LAUNCHING'}
          </span>
        </div>
        
        {/* Site Name */}
        <div className="site-name">
          {siteName.split('').map((char, i) => (
            <span 
              key={i} 
              className="char"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        
        {/* Loading Bar */}
        <div className="loading-bar-container">
          <div className="loading-bar-track">
            <div 
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-percentage">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="loading-text">
          <span className="bracket">[</span>
          <span className="text-content">
            {phase === 'init' && 'BOOT_SEQUENCE_START'}
            {phase === 'loading' && `LOADING: ${progress < 40 ? 'DOM' : progress < 80 ? 'ASSETS' : 'FINALIZING'}...`}
            {phase === 'complete' && 'INITIALIZATION_COMPLETE'}
            {phase === 'fadeout' && 'WELCOME_OPERATOR'}
          </span>
          <span className="bracket">]</span>
        </div>
        
        {/* Decorative Elements */}
        <div className="hex-decorations">
          <div className="hex hex-1" />
          <div className="hex hex-2" />
          <div className="hex hex-3" />
        </div>
      </div>
      
      <style jsx>{`
        .loading-cover {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          z-index: 99999;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .loading-cover.fade-out {
          opacity: 0;
          transform: scale(1.05);
        }
        
        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridPulse 4s ease-in-out infinite;
        }
        
        .scan-lines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          pointer-events: none;
        }
        
        .corner-bracket {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid rgba(59, 130, 246, 0.3);
        }
        
        .corner-bracket.top-left {
          top: 40px;
          left: 40px;
          border-right: none;
          border-bottom: none;
        }
        
        .corner-bracket.top-right {
          top: 40px;
          right: 40px;
          border-left: none;
          border-bottom: none;
        }
        
        .corner-bracket.bottom-left {
          bottom: 40px;
          left: 40px;
          border-right: none;
          border-top: none;
        }
        
        .corner-bracket.bottom-right {
          bottom: 40px;
          right: 40px;
          border-left: none;
          border-top: none;
        }
        
        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          z-index: 10;
        }
        
        .system-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          animation: pulse 1s ease-in-out infinite;
        }
        
        .status-text {
          font-family: monospace;
          font-size: 12px;
          color: #3b82f6;
          letter-spacing: 2px;
        }
        
        .site-name {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 8px;
          display: flex;
        }
        
        .char {
          opacity: 0;
          animation: charReveal 0.3s ease forwards;
        }
        
        .loading-bar-container {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 300px;
        }
        
        .loading-bar-track {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .loading-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          transition: width 0.15s ease;
          position: relative;
        }
        
        .loading-bar-fill::after {
          content: '';
          position: absolute;
          right: 0;
          top: -2px;
          bottom: -2px;
          width: 20px;
          background: linear-gradient(90deg, transparent, #60a5fa);
          animation: glow 1s ease-in-out infinite;
        }
        
        .loading-percentage {
          font-family: monospace;
          font-size: 14px;
          color: #3b82f6;
          min-width: 48px;
        }
        
        .loading-text {
          font-family: monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
        }
        
        .bracket {
          color: #3b82f6;
        }
        
        .text-content {
          margin: 0 8px;
        }
        
        .hex-decorations {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }
        
        .hex {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 1px solid rgba(59, 130, 246, 0.1);
          transform: rotate(45deg);
          animation: hexFloat 6s ease-in-out infinite;
        }
        
        .hex-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .hex-2 {
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }
        
        .hex-3 {
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% { 
            opacity: 0.6; 
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }
        
        @keyframes charReveal {
          0% { 
            opacity: 0; 
            transform: translateY(20px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes hexFloat {
          0%, 100% { 
            transform: rotate(45deg) translateY(0);
            opacity: 0.3;
          }
          50% { 
            transform: rotate(45deg) translateY(-20px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingCover
