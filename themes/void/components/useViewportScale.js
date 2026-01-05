'use client'

import { useEffect, useCallback } from 'react'
import { isBrowser } from '@/lib/utils'

/**
 * Viewport Scale Hook - Endfield-style proportional scaling
 * 
 * This hook dynamically adjusts the html element's font-size based on viewport dimensions,
 * allowing all rem-based measurements to scale proportionally.
 * 
 * Design bases:
 * - Desktop: 1920 x 1080 (16:9 landscape)
 * - Mobile: 750 width (portrait mode)
 */
const useViewportScale = (options = {}) => {
  const {
    desktopBase = { width: 1920, height: 1080 },
    mobileBase = { width: 750 },
    baseFontSize = 16,
    minScale = 0.5,
    maxScale = 1.5,
    mobileBreakpoint = 768
  } = options

  const calculateScale = useCallback(() => {
    if (!isBrowser) return 1

    const vw = window.innerWidth
    const vh = window.innerHeight
    const isLandscape = vw > vh
    const isMobile = vw < mobileBreakpoint

    let scale

    if (isMobile || !isLandscape) {
      // Portrait/Mobile: scale based on width only
      scale = vw / mobileBase.width
    } else {
      // Landscape/Desktop: scale based on both width and height, use the smaller one
      const scaleByWidth = vw / desktopBase.width
      const scaleByHeight = vh / desktopBase.height
      scale = Math.min(scaleByWidth, scaleByHeight)
    }

    // Clamp the scale to reasonable bounds
    scale = Math.max(minScale, Math.min(maxScale, scale))

    return scale
  }, [desktopBase, mobileBase, baseFontSize, minScale, maxScale, mobileBreakpoint])

  const applyScale = useCallback(() => {
    if (!isBrowser) return

    const scale = calculateScale()
    const fontSize = baseFontSize * scale
    
    // Apply to html element
    document.documentElement.style.fontSize = `${fontSize}px`
    
    // Also set a CSS custom property for additional flexibility
    document.documentElement.style.setProperty('--void-viewport-scale', scale.toString())
    document.documentElement.style.setProperty('--void-base-font-size', `${fontSize}px`)
  }, [calculateScale, baseFontSize])

  useEffect(() => {
    if (!isBrowser) return

    // Apply initial scale
    applyScale()

    // Handle resize events with debounce
    let resizeTimeout
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(applyScale, 50)
    }

    // Handle orientation change immediately
    const handleOrientationChange = () => {
      // Small delay to let the browser settle
      setTimeout(applyScale, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      // Reset font-size on unmount
      document.documentElement.style.fontSize = ''
      document.documentElement.style.removeProperty('--void-viewport-scale')
      document.documentElement.style.removeProperty('--void-base-font-size')
    }
  }, [applyScale])

  return { calculateScale, applyScale }
}

export default useViewportScale
