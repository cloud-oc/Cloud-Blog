import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect, useState, useCallback } from 'react'

/**
 * LoadingCover Component - Void Theme Endfield Style
 * 加载动画组件 - 终末地科技风格
 * 左侧垂直进度条，右侧竖排文字
 */
const LoadingCover = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('init') // init, loading, complete, sweeping, fadeout
  const [resourcesLoaded, setResourcesLoaded] = useState(false)
  const siteName = 'CLOUD09_SPACE'
  const { onLoading } = useGlobal()

  // Track real page loading progress
  const updateProgress = useCallback(() => {
    const readyState = document.readyState
    const images = document.images
    const totalImages = images.length
    let loadedImages = 0
    
    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) loadedImages++
    }
    
    let calculatedProgress = 0
    
    if (readyState === 'loading') calculatedProgress += 20
    else if (readyState === 'interactive') calculatedProgress += 35
    else if (readyState === 'complete') calculatedProgress += 40
    
    if (totalImages > 0) {
      calculatedProgress += (loadedImages / totalImages) * 40
    } else {
      calculatedProgress += 40
    }
    
    if (!onLoading) calculatedProgress += 20
    
    return Math.min(Math.round(calculatedProgress), 100)
  }, [onLoading])

  useEffect(() => {
    const initTimer = setTimeout(() => setPhase('loading'), 200)

    const progressInterval = setInterval(() => {
      const newProgress = updateProgress()
      setProgress(prev => {
        const smoothProgress = Math.max(prev, newProgress)
        if (smoothProgress < 95 && smoothProgress === prev) {
          return Math.min(prev + 1, 95)
        }
        return smoothProgress
      })
    }, 100)

    const handleLoad = () => setResourcesLoaded(true)

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

  // Complete loading sequence
  useEffect(() => {
    if (resourcesLoaded && !onLoading && progress >= 80) {
      setProgress(100)
      
      const completeTimer = setTimeout(() => {
        setPhase('complete')
        
        setTimeout(() => {
          setPhase('sweeping')
          setTimeout(() => {
            setPhase('fadeout')
            setTimeout(() => setIsVisible(false), 400)
          }, 500)
        }, 200)
      }, 200)

      return () => clearTimeout(completeTimer)
    }
  }, [resourcesLoaded, onLoading, progress])

  if (!isVisible) return null

  return (
    <div className={`loading-cover ${phase}`}>
      {/* Left side - Vertical Progress Bar */}
      <div className="progress-container">
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ height: `${progress}%` }}
          />
        </div>
        <div className="progress-glow" style={{ top: `${progress}%` }} />
      </div>

      {/* Right side - Vertical Text (rotated 90 degrees) */}
      <div className="site-name-container">
        <div className="site-name">
          {siteName}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="bottom-info">
        <div className="status-line">
          <span className="status-dot" />
          <span className="status-text">
            {phase === 'init' && 'INITIALIZING'}
            {phase === 'loading' && 'LOADING'}
            {phase === 'complete' && 'READY'}
            {phase === 'sweeping' && 'LAUNCHING'}
            {phase === 'fadeout' && 'WELCOME'}
          </span>
        </div>
        <div className="progress-text">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>

      {/* Sweep overlay - full screen cover from left to right */}
      <div className="sweep-overlay" />

      <style jsx>{`
        .loading-cover {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          z-index: 99999;
          overflow: hidden;
        }

        /* Progress Bar Container - Left Side */
        .progress-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: rgba(59, 130, 246, 0.1);
        }

        .progress-track {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(180deg, #3b82f6 0%, #60a5fa 100%);
          transition: height 0.15s ease-out;
        }

        .progress-glow {
          position: absolute;
          left: 0;
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #60a5fa 0%, transparent 100%);
          box-shadow: 0 0 20px #3b82f6, 0 0 40px #3b82f6;
          transition: top 0.15s ease-out;
          transform: translateY(-1px);
        }

        /* Right side - Vertical Text */
        .site-name-container {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 40px;
        }

        .site-name {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 900;
          color: transparent;
          letter-spacing: 0.3em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          background: linear-gradient(to left, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
          -webkit-background-clip: text;
          background-clip: text;
          user-select: none;
        }

        /* Bottom Info */
        .bottom-info {
          position: absolute;
          bottom: 40px;
          left: 40px;
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .status-line {
          display: flex;
          align-items: center;
          gap: 12px;
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
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .progress-text {
          font-family: monospace;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 2px;
        }

        /* Sweep Overlay - Full screen cover */
        .sweep-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #3b82f6;
          transform: scaleX(0);
          transform-origin: left;
          pointer-events: none;
        }

        .loading-cover.sweeping .sweep-overlay {
          animation: sweepCover 0.5s ease-in-out forwards;
        }

        .loading-cover.fadeout {
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .loading-cover.fadeout .sweep-overlay {
          transform: scaleX(1);
        }

        /* Grid background pattern */
        .loading-cover::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }

        /* Corner decorations */
        .loading-cover::after {
          content: '';
          position: absolute;
          bottom: 40px;
          right: 40px;
          width: 60px;
          height: 60px;
          border-right: 2px solid rgba(59, 130, 246, 0.3);
          border-bottom: 2px solid rgba(59, 130, 246, 0.3);
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% { 
            opacity: 0.5; 
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }

        @keyframes sweepCover {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .site-name-container {
            padding-right: 20px;
          }

          .site-name {
            font-size: 1.2rem;
            letter-spacing: 0.2em;
          }

          .bottom-info {
            left: 20px;
            bottom: 20px;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingCover
