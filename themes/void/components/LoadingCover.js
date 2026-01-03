
import { useEffect, useState } from 'react'

export default function LoadingCover() {
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState([])
  const bootLogs = [
    'SYSTEM_BOOT_SEQUENCE_INIT...',
    'LOADING_KERNEL_MODULES...',
    'MOUNTING_FILESYSTEMS...',
    'CONNECTING_TO_NEURAL_CLOUD...',
    'SYNCHRONIZING_DATA_STREAMS...',
    'ESTABLISHING_SECURE_CONNECTION...',
    'ACCESS_GRANTED.'
  ]

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 10
      })
    }, 100)

    // Simulate logs
    let logIndex = 0
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]])
        logIndex++
      } else {
        clearInterval(logInterval)
      }
    }, 300)

    return () => {
      clearInterval(interval)
      clearInterval(logInterval)
    }
  }, [])

  return (
    <div id="loading-cover" className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white font-mono overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#222] rounded-full opacity-50 animate-spin-slow pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#333] rounded-full opacity-30 animate-spin-reverse pointer-events-none"></div>

      {/* 3D Cube Spinner Representation (CSS only) */}
      <div className="relative w-24 h-24 mb-10 transform-style-3d animate-rotate-3d">
         <div className="absolute inset-0 border-2 border-[#00E3FF] opacity-50 translate-z-12"></div>
         <div className="absolute inset-0 border-2 border-[#00E3FF] opacity-50 rotate-y-90 translate-z-12"></div>
         <div className="absolute inset-0 border-2 border-[#00E3FF] opacity-50 rotate-x-90 translate-z-12"></div>
         <div className="absolute inset-0 border border-[#00E3FF] w-8 h-8 top-8 left-8 bg-[#00E3FF] animate-pulse shadow-[0_0_20px_#00E3FF]"></div>
      </div>

      <div className="z-10 w-full max-w-lg px-8 relative">
        {/* Decorative brackets */}
        <div className="absolute -left-4 top-0 h-full w-2 border-l-2 border-t-2 border-b-2 border-[#00E3FF] opacity-50"></div>
        <div className="absolute -right-4 top-0 h-full w-2 border-r-2 border-t-2 border-b-2 border-[#00E3FF] opacity-50"></div>

        {/* Title with Glitch Effect */}
        <div className="text-5xl font-black mb-2 tracking-widest text-white relative">
          ENDFIELD<span className="text-[#00E3FF] text-lg align-top ml-2">PROTOCOL</span>
        </div>
        <div className="text-xs text-gray-500 mb-8 tracking-[0.5em]">SYSTEM INITIALIZATION_V4.0</div>

        {/* Dynamic Progress Bar */}
        <div className="flex items-center mb-2">
            <div className="text-[#00E3FF] text-xl font-bold w-16">{Math.floor(progress)}%</div>
            <div className="flex-grow h-4 bg-[#111] border border-[#333] relative skew-x-[-20deg] overflow-hidden">
                <div 
                    className="h-full bg-[#00E3FF] shadow-[0_0_15px_#00E3FF] transition-all duration-75 ease-out" 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>
        </div>
        
        {/* Terminal Logs */}
        <div className="h-24 overflow-hidden text-[10px] text-gray-400 font-mono flex flex-col-reverse relative bg-[#00000080] p-2 border border-[#222]">
          {logs.slice().reverse().map((log, index) => (
            <div key={index} className="mb-0.5 pl-1 opacity-80">
              <span className="text-[#00E3FF] mr-2">➜</span>
              {log}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Decoration */}
      <div className="absolute bottom-10 w-full flex justify-between px-20 text-[10px] text-gray-600">
        <span>COORDINATES: 34.555, 12.333</span>
        <span>STATUS: ONLINE</span>
        <span>SECTOR: 7</span>
      </div>

      <style jsx>{`
        .rotate-y-90 { transform: rotateY(90deg); }
        .rotate-x-90 { transform: rotateX(90deg); }
        .translate-z-12 { transform: translateZ(48px); } /* half of w-24 (96px) is 48px */
        
        .transform-style-3d {
            transform-style: preserve-3d;
        }
        .animate-rotate-3d {
            animation: rotate3d 4s infinite linear;
        }
        @keyframes rotate3d {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .animate-spin-slow {
            animation: spin 10s linear infinite;
        }
        .animate-spin-reverse {
            animation: spin 15s linear infinite reverse;
        }
        @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
