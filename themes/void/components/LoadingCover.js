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
    // Prevent scrollbar on body during loading
    document.body.style.overflow = 'hidden'
    
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
      document.body.style.overflow = ''
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
          background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0f1419 100%);
          z-index: 99999;
          overflow: hidden;
        }

        /* Progress Bar Container - Left Side */
        .progress-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 6px;
          height: 100%;
          background: rgba(96, 165, 250, 0.15);
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
          background: linear-gradient(180deg, #60a5fa 0%, #93c5fd 100%);
          transition: height 0.15s ease-out;
          box-shadow: 0 0 15px #60a5fa;
        }

        .progress-glow {
          position: absolute;
          left: 0;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #93c5fd 0%, transparent 100%);
          box-shadow: 0 0 30px #60a5fa, 0 0 60px #60a5fa;
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
          padding-right: 50px;
        }

        .site-name {
          font-family: 'Orbitron', 'Rajdhani', 'Share Tech Mono', 'Consolas', monospace;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          color: transparent;
          letter-spacing: 0.4em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          background: linear-gradient(to left, rgba(147, 197, 253, 0.9) 0%, rgba(96, 165, 250, 0.5) 40%, rgba(59, 130, 246, 0.15) 80%, transparent 100%);
          -webkit-background-clip: text;
          background-clip: text;
          user-select: none;
          text-shadow: 0 0 40px rgba(96, 165, 250, 0.3);
        }

        /* Bottom Info */
        .bottom-info {
          position: absolute;
          bottom: 50px;
          left: 50px;
          display: flex;
          align-items: center;
          gap: 50px;
        }

        .status-line {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          background: #60a5fa;
          border-radius: 50%;
          animation: pulse 1s ease-in-out infinite;
          box-shadow: 0 0 10px #60a5fa;
        }

        .status-text {
          font-family: 'Orbitron', 'Rajdhani', 'Share Tech Mono', 'Consolas', monospace;
          font-size: 16px;
          font-weight: 600;
          color: #93c5fd;
          letter-spacing: 4px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(147, 197, 253, 0.5);
        }

        .progress-text {
          font-family: 'Orbitron', 'Rajdhani', 'Share Tech Mono', 'Consolas', monospace;
          font-size: 18px;
          font-weight: 600;
          color: rgba(147, 197, 253, 0.8);
          letter-spacing: 3px;
        }

        /* Sweep Overlay - Full screen cover */
        .sweep-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%);
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
            linear-gradient(rgba(96, 165, 250, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Corner decorations */
        .loading-cover::after {
          content: '';
          position: absolute;
          bottom: 50px;
          right: 50px;
          width: 80px;
          height: 80px;
          border-right: 2px solid rgba(96, 165, 250, 0.4);
          border-bottom: 2px solid rgba(96, 165, 250, 0.4);
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            box-shadow: 0 0 10px #60a5fa, 0 0 20px rgba(96, 165, 250, 0.4);
          }
          50% { 
            opacity: 0.6; 
            box-shadow: 0 0 15px #60a5fa, 0 0 30px rgba(96, 165, 250, 0.2);
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
            padding-right: 25px;
          }

          .site-name {
            font-size: 1.5rem;
            letter-spacing: 0.3em;
          }

          .bottom-info {
            left: 25px;
            bottom: 25px;
            gap: 30px;
          }

          .status-text {
            font-size: 14px;
            letter-spacing: 3px;
          }

          .progress-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingCover
