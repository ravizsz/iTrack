import { ScanResult } from '../types'

function ScanResults({ results }: { results: ScanResult[] | null }) {
  if (!results) return null
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {results.map((r, i) => (
        <div key={i} className="bg-black/60 border border-gray-800 rounded p-2 text-xs fade-in" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400 font-bold">{r.type}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              r.status === 'MATCH' ? 'bg-green-900/50 text-green-400' :
              r.status === 'PARTIAL' ? 'bg-yellow-900/50 text-yellow-400' :
              r.status === 'SCANNING' ? 'bg-blue-900/50 text-blue-400' :
              'bg-gray-800 text-gray-500'
            }`}>{r.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-900 rounded overflow-hidden">
              <div
                className={`h-full rounded progress-glow ${
                  r.confidence > 80 ? 'bg-green-500' : r.confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${r.confidence}%` }}
              />
            </div>
            <span className="text-gray-400 w-10 text-right">{r.confidence}%</span>
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-gray-600">
            <span>{r.data_sources} sources</span>
            <span>{r.time_ms}ms</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScanResults
