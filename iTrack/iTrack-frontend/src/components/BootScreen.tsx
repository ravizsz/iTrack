import { useState, useEffect, useRef } from 'react'
import { BOOT_LINES } from '../config'

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let i = 0
    setLines([])
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i]
        setLines(prev => [...prev, line])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => onCompleteRef.current(), 800)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 font-mono text-sm">
        <div className="mb-4 text-green-500 text-xl glitch-text font-bold">
          {'>'} iTRACK BOOT SEQUENCE
        </div>
        <div className="space-y-1">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`fade-in ${
                line.includes('ACCESS GRANTED') ? 'text-red-500 font-bold text-lg glow-red' :
                line.includes('Welcome') ? 'text-green-400 glow-green' :
                line.includes('OK') || line.includes('active') || line.includes('ready') || line.includes('loaded') || line.includes('online') || line.includes('initialized') || line.includes('activated') || line.includes('operational')
                  ? 'text-green-500'
                  : 'text-gray-400'
              }`}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="mt-6 h-1 bg-gray-900 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-green-500 to-green-400 progress-glow transition-all duration-200"
            style={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default BootScreen
