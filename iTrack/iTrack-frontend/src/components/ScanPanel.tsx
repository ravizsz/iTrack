import { useState } from 'react'
import { Brain, Camera, Mail, Mic, Phone, Scan, Search, Wifi, Zap } from 'lucide-react'

function ScanPanel({ onScan }: { onScan: (query: string) => void }) {
  const [query, setQuery] = useState('')
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    if (!query.trim()) return
    setScanning(true)
    onScan(query)
    setTimeout(() => setScanning(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            placeholder="Enter phone, email, name, or ID..."
            className="w-full bg-black/80 border border-green-900/50 rounded px-8 py-2 text-sm text-green-400 placeholder-gray-600 focus:outline-none focus:border-green-500/50 font-mono"
          />
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className={`px-4 py-2 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all ${
            scanning
              ? 'bg-red-900/50 text-red-400 border border-red-500/50 cursor-not-allowed'
              : 'bg-green-900/30 text-green-400 border border-green-500/50 hover:bg-green-900/50 hover:shadow-lg hover:shadow-green-500/20'
          }`}
        >
          {scanning ? (
            <span className="flex items-center gap-1"><Zap size={14} className="animate-spin" /> SCANNING</span>
          ) : (
            <span className="flex items-center gap-1"><Scan size={14} /> TRACE</span>
          )}
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {['Phone', 'Email', 'Face', 'Voice', 'Behavior', 'Network'].map(t => (
          <button key={t} className="px-2 py-0.5 text-[10px] border border-gray-700 rounded text-gray-400 hover:border-green-500/50 hover:text-green-400 transition-all flex items-center gap-1">
            {t === 'Phone' && <Phone size={10} />}
            {t === 'Email' && <Mail size={10} />}
            {t === 'Face' && <Camera size={10} />}
            {t === 'Voice' && <Mic size={10} />}
            {t === 'Behavior' && <Brain size={10} />}
            {t === 'Network' && <Wifi size={10} />}
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ScanPanel
