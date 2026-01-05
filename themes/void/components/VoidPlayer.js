import { useState, useEffect, useRef } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * VoidPlayer Component - Sci-Fi Music Player for Void Theme
 * Integrates with widget.config.js settings
 * Has two states: expanded (full info) and collapsed (mini cover)
 */
export const VoidPlayer = ({ isExpanded }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)
  const progressIntervalRef = useRef(null)

  // Get configuration from widget.config.js
  const musicPlayerEnabled = siteConfig('MUSIC_PLAYER')
  const musicPlayerVisible = siteConfig('MUSIC_PLAYER_VISIBLE')
  const autoPlay = siteConfig('MUSIC_PLAYER_AUTO_PLAY')
  const playOrder = siteConfig('MUSIC_PLAYER_ORDER')
  const audioList = siteConfig('MUSIC_PLAYER_AUDIO_LIST') || []

  // Don't render if disabled
  if (!musicPlayerEnabled || !musicPlayerVisible || audioList.length === 0) {
    return null
  }

  const currentAudio = audioList[currentTrack] || {}

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = 0.7
      
      audioRef.current.addEventListener('ended', handleTrackEnd)
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration)
      })
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio load error:', e)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('ended', handleTrackEnd)
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Load track when currentTrack changes
  useEffect(() => {
    if (audioRef.current && currentAudio.url) {
      const wasPlaying = isPlaying
      audioRef.current.src = currentAudio.url
      audioRef.current.load()
      setProgress(0)
      setCurrentTime(0)
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.log('Autoplay prevented:', e))
      }
    }
  }, [currentTrack, currentAudio.url])

  // Progress update
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const current = audioRef.current.currentTime
          const total = audioRef.current.duration || 1
          setCurrentTime(current)
          setProgress((current / total) * 100)
        }
      }, 200)
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying])

  const handleTrackEnd = () => {
    if (playOrder === 'random') {
      const randomIndex = Math.floor(Math.random() * audioList.length)
      setCurrentTrack(randomIndex)
    } else {
      setCurrentTrack((prev) => (prev + 1) % audioList.length)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.log('Play prevented:', e))
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    if (playOrder === 'random') {
      const randomIndex = Math.floor(Math.random() * audioList.length)
      setCurrentTrack(randomIndex)
    } else {
      setCurrentTrack((prev) => (prev + 1) % audioList.length)
    }
  }

  const playPrev = () => {
    setCurrentTrack((prev) => (prev - 1 + audioList.length) % audioList.length)
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    audioRef.current.currentTime = percentage * audioRef.current.duration
    setProgress(percentage * 100)
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Collapsed State: Mini circular cover with play button
  if (!isExpanded) {
    return (
      <div className="void-player-mini flex justify-center py-3">
        <div 
          className={`relative w-12 h-12 cursor-pointer group ${isPlaying ? 'void-player-rotating' : ''}`}
          onClick={togglePlay}
        >
          {/* Album Cover */}
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[var(--void-accent-yellow)] shadow-lg void-player-glow">
            <img 
              src={currentAudio.cover || '/default-cover.jpg'} 
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-white text-sm`} />
          </div>
          {/* Playing Indicator Ring */}
          {isPlaying && (
            <div className="absolute -inset-1 rounded-full border border-[var(--void-accent-yellow)] opacity-50 void-player-pulse" />
          )}
        </div>
      </div>
    )
  }

  // Expanded State: Full player with all controls
  return (
    <div className="void-player-full px-3 py-4">
      {/* Header */}
      <div className="flex items-center gap-1 mb-3">
        <i className="fas fa-music text-[var(--void-accent-yellow)] text-xs" />
        <span className="text-[var(--void-text-muted)] font-mono text-[10px] tracking-widest uppercase">
          NOW PLAYING
        </span>
      </div>

      {/* Main Content */}
      <div className="flex gap-3">
        {/* Album Cover */}
        <div className={`flex-shrink-0 w-14 h-14 rounded overflow-hidden border border-[var(--void-border-base)] void-player-glow ${isPlaying ? 'void-player-rotating-slow' : ''}`}>
          <img 
            src={currentAudio.cover || '/default-cover.jpg'} 
            alt="Album Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-sm font-bold text-[var(--void-text-primary)] truncate leading-tight">
            {currentAudio.name || 'Unknown Track'}
          </div>
          <div className="text-xs text-[var(--void-text-muted)] truncate mt-0.5">
            {currentAudio.artist || 'Unknown Artist'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div 
          className="h-1 bg-[var(--void-bg-tertiary)] rounded-full cursor-pointer overflow-hidden group"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-[var(--void-accent-yellow)] to-[var(--void-accent-cyan)] transition-all duration-200 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--void-accent-yellow)] rounded-full shadow-[0_0_8px_var(--void-accent-yellow)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] font-mono text-[var(--void-text-muted)]">
            {formatTime(currentTime)}
          </span>
          <span className="text-[10px] font-mono text-[var(--void-text-muted)]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-3">
        <button 
          onClick={playPrev}
          className="w-8 h-8 flex items-center justify-center text-[var(--void-text-secondary)] hover:text-[var(--void-accent-yellow)] transition-colors"
        >
          <i className="fas fa-step-backward text-sm" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-[var(--void-accent-yellow)] text-white rounded-full hover:scale-105 transition-transform shadow-lg void-player-btn-glow"
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-sm ${!isPlaying ? 'ml-0.5' : ''}`} />
        </button>
        
        <button 
          onClick={playNext}
          className="w-8 h-8 flex items-center justify-center text-[var(--void-text-secondary)] hover:text-[var(--void-accent-yellow)] transition-colors"
        >
          <i className="fas fa-step-forward text-sm" />
        </button>
      </div>

      {/* Track Counter */}
      <div className="text-center mt-2">
        <span className="text-[10px] font-mono text-[var(--void-text-muted)]">
          {currentTrack + 1} / {audioList.length}
        </span>
      </div>
    </div>
  )
}

export default VoidPlayer
