import { Target } from '../types'
import { threatColor, statusColor } from '../utils/colors'

function TargetList({ targets, selectedId, onSelect }: { targets: Target[]; selectedId: string | null; onSelect: (t: Target) => void }) {
  return (
    <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
      {targets.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t)}
          className={`w-full text-left p-2 rounded border transition-all text-xs ${
            selectedId === t.id
              ? 'border-green-500/50 bg-green-900/20'
              : 'border-gray-800 bg-black/40 hover:border-gray-700 hover:bg-gray-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor(t.status) }} />
              <span className="font-bold text-white">{t.codename}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: threatColor(t.threat_level) + '22', color: threatColor(t.threat_level) }}>
              {t.threat_level}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1 text-gray-500">
            <span>{t.city}</span>
            <span>{t.last_seen}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default TargetList
