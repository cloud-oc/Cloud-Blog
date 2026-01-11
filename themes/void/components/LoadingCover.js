import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect, useState, useCallback, useRef } from 'react'

/**
 * LoadingCover Component - Void Theme Endfield Style
 * 加载动画组件 - 终末地科技风格
 * 左侧垂直进度条，右侧竖排文字
 */
const LoadingCover = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('init') // init, loading, complete, sweeping, fadeout
  const siteName = 'CLOUD09_SPACE'
  const { onLoading } = useGlobal()
  const startTimeRef = useRef(Date.now())
  const hasCompletedRef = useRef(false)

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
    
    // Document ready state (0-50%)
    if (readyState === 'loading') calculatedProgress += 15
    else if (readyState === 'interactive') calculatedProgress += 35
    else if (readyState === 'complete') calculatedProgress += 50
    
    // Image loading (0-30%)
    if (totalImages > 0) {
      calculatedProgress += (loadedImages / totalImages) * 30
    } else {
      calculatedProgress += 30
    }
    
    // Global loading state from app (0-20%)
    if (!onLoading) calculatedProgress += 20
    
    return Math.min(Math.round(calculatedProgress), 100)
  }, [onLoading])

  useEffect(() => {
    // Prevent scrollbar on body during loading
    document.body.style.overflow = 'hidden'
    
    const initTimer = setTimeout(() => setPhase('loading'), 150)

    const progressInterval = setInterval(() => {
      if (hasCompletedRef.current) return
      
      const newProgress = updateProgress()
      const elapsed = Date.now() - startTimeRef.current
      
      setProgress(prev => {
        // Always allow progress to increase based on real calculation
        if (newProgress > prev) {
          return newProgress
        }
        
        // If stuck, slowly increment based on time elapsed
        // But only if we haven't reached the target yet
        if (prev < newProgress) {
          return Math.min(prev + 2, newProgress)
        }
        
        // If document is complete and no loading, allow reaching 100
        if (document.readyState === 'complete' && !onLoading && prev < 100) {
          return Math.min(prev + 3, 100)
        }
        
        // Slow increment if truly stuck (safety net)
        if (elapsed > 2000 && prev < 100) {
          return Math.min(prev + 1, 100)
        }
        
        return prev
      })
    }, 80)

    // Fallback: force complete after max wait time (3.5 seconds)
    const maxWaitTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        setProgress(100)
      }
    }, 3500)

    return () => {
      clearTimeout(initTimer)
      clearTimeout(maxWaitTimer)
      clearInterval(progressInterval)
      document.body.style.overflow = ''
    }
  }, [updateProgress, onLoading])

  // Complete loading sequence when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && !hasCompletedRef.current) {
      hasCompletedRef.current = true
      
      const completeTimer = setTimeout(() => {
        setPhase('complete')
        
        setTimeout(() => {
          setPhase('sweeping')
          setTimeout(() => {
            setPhase('fadeout')
            setTimeout(() => setIsVisible(false), 400)
          }, 500)
        }, 150)
      }, 100)

      return () => clearTimeout(completeTimer)
    }
  }, [progress])

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
      </div>

      {/* Right side - Vertical Text (rotated 90 degrees) */}
      <div className="site-name-container">
        <div className="site-name">
          {siteName}
        </div>
      </div>

      {/* Progress Info - 跟随进度条从上往下移动 */}
      <div 
        className="progress-info"
        style={{ top: `${progress}%` }}
      >
        <div className="progress-percent">
          {progress}%
        </div>
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
      </div>

      {/* Sweep overlay - full screen cover from left to right */}
      <div className="sweep-overlay" />

      {/* Additional HUD Decorations */}
      <div className="hud-corner hud-tl" />
      <div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" />
      <div className="hud-corner hud-br" />
      
      {/* Scan Line Effect */}
      <div className="scan-line-h" />
      
      {/* Version/System Info */}
      <div className="system-info">
        <span className="info-label">SYS.VER</span>
        <span className="info-value">2.0.26</span>
      </div>

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

        /* Progress Info - 跟随进度条移动 */
        .progress-info {
          position: absolute;
          left: 20px;
          transform: translateY(-100%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          transition: top 0.15s ease-out;
          padding-bottom: 10px;
        }

        .progress-percent {
          font-family: 'Orbitron', 'Rajdhani', 'Share Tech Mono', 'Consolas', monospace;
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 700;
          color: #93c5fd;
          letter-spacing: 2px;
          line-height: 1;
          text-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
        }

        .status-line {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #60a5fa;
          border-radius: 50%;
          animation: pulse 1s ease-in-out infinite;
          box-shadow: 0 0 10px #60a5fa;
        }

        .status-text {
          font-family: 'Orbitron', 'Rajdhani', 'Share Tech Mono', 'Consolas', monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(147, 197, 253, 0.7);
          letter-spacing: 2px;
          text-transform: uppercase;
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

          .progress-info {
            left: 15px;
            gap: 6px;
          }

          .progress-percent {
            font-size: 28px;
          }

          .status-text {
            font-size: 9px;
            letter-spacing: 1px;
          }
        }

        /* HUD Corner Decorations */
        .hud-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: 10;
        }
        .hud-tl {
          top: 30px;
          left: 30px;
          border-top: 2px solid rgba(96, 165, 250, 0.5);
          border-left: 2px solid rgba(96, 165, 250, 0.5);
        }
        .hud-tr {
          top: 30px;
          right: 30px;
          border-top: 2px solid rgba(96, 165, 250, 0.5);
          border-right: 2px solid rgba(96, 165, 250, 0.5);
        }
        .hud-bl {
          bottom: 30px;
          left: 30px;
          border-bottom: 2px solid rgba(96, 165, 250, 0.5);
          border-left: 2px solid rgba(96, 165, 250, 0.5);
        }
        .hud-br {
          bottom: 30px;
          right: 30px;
          border-bottom: 2px solid rgba(96, 165, 250, 0.5);
          border-right: 2px solid rgba(96, 165, 250, 0.5);
        }

        /* Horizontal Scan Line */
        .scan-line-h {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(96, 165, 250, 0.6) 20%, 
            rgba(96, 165, 250, 0.8) 50%,
            rgba(96, 165, 250, 0.6) 80%, 
            transparent 100%
          );
          animation: scanLineMove 3s linear infinite;
          pointer-events: none;
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
        }

        @keyframes scanLineMove {
          0% { top: 0; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }

        /* System Info Display */
        .system-info {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Orbitron', 'Share Tech Mono', monospace;
          z-index: 10;
        }

        .info-label {
          font-size: 10px;
          color: rgba(147, 197, 253, 0.5);
          letter-spacing: 2px;
        }

        .info-value {
          font-size: 12px;
          color: rgba(147, 197, 253, 0.8);
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .hud-corner {
            width: 25px;
            height: 25px;
          }
          .hud-tl, .hud-tr { top: 15px; }
          .hud-bl, .hud-br { bottom: 15px; }
          .hud-tl, .hud-bl { left: 15px; }
          .hud-tr, .hud-br { right: 15px; }
          
          .system-info {
            bottom: 15px;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingCover
