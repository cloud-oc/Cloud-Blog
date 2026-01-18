'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'

/**
 * LoadingCover Component - Endfield Style
 * Full-screen loading animation with progress bar
 */
export const LoadingCover = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('init') // init -> loading -> complete -> sweeping -> fadeout
  const { onLoading } = useGlobal()
  const hasCompletedRef = useRef(false)

  const siteName = siteConfig('TITLE') || 'CLOUD09_SPACE'

  // Smooth progress simulation
  const updateProgress = useCallback((currentProgress) => {
    if (currentProgress >= 100) return 100
    
    // Slow down as we approach 100%
    const remaining = 100 - currentProgress
    const increment = Math.max(0.5, remaining * 0.15)
    return Math.min(100, currentProgress + increment)
  }, [])

  useEffect(() => {
    if (hasCompletedRef.current) return

    // Prevent body scroll during loading
    document.body.style.overflow = 'hidden'

    // Start loading phase after brief init
    const initTimer = setTimeout(() => {
      setPhase('loading')
    }, 100)

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // If page has loaded, accelerate to 100%
        if (!onLoading && prev >= 60) {
          return Math.min(100, prev + 10)
        }
        return updateProgress(prev)
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

      {/* Progress Info - follows progress bar from top to bottom */}
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

        /* Progress Info - follows progress bar */
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
      `}</style>
    </div>
  )
}

export default LoadingCover
