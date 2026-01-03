
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
    <div id="loading-cover" className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white font-mono overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="z-10 w-full max-w-lg px-4">
        {/* Title with Glitch Effect */}
        <div className="text-4xl font-bold mb-8 tracking-widest text-[#00E3FF] animate-pulse relative">
          SYSTEM_INIT
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-2 bg-[#111] border border-[#333] mb-4 relative overflow-hidden">
          <div 
            className="h-full bg-[#00E3FF] shadow-[0_0_10px_#00E3FF] transition-all duration-100 ease-out" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-[#00E3FF] mb-8">
            <span>LOADING...</span>
            <span>{Math.floor(progress)}%</span>
        </div>

        {/* Terminal Logs */}
        <div className="h-32 overflow-hidden text-xs text-gray-400 font-mono flex flex-col-reverse relative">
          {logs.slice().reverse().map((log, index) => (
            <div key={index} className="mb-1 border-l-2 border-[#00E3FF] pl-2 animate-fadeIn">
              <span className="opacity-50 mr-2">{`[${new Date().toLocaleTimeString()}]`}</span>
              {log}
            </div>
          ))}
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E3FF11] to-transparent bg-[length:100%_4px] pointer-events-none animate-scanline"></div>
        </div>
      </div>
      
      {/* Bottom Decoration */}
      <div className="absolute bottom-10 text-[10px] text-gray-600 tracking-[0.5em]">
        NOISE_CAN NOT_HIDE_THE_TRUTH
      </div>

      <style jsx>{`
        .animate-scanline {
          animation: scanline 2s linear infinite;
        }
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
