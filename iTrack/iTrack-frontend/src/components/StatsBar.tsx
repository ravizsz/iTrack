import { Activity, AlertTriangle, Eye, Globe, Radio, Scan, Skull, Wifi } from 'lucide-react'

function StatsBar({ stats }: { stats: Record<string, string | number> | null }) {
  if (!stats) return null
  const items = [
    { label: 'TARGETS', value: stats.total_targets, icon: <Skull size={14} /> },
    { label: 'ACTIVE', value: stats.active_targets, icon: <Eye size={14} /> },
    { label: 'DATA', value: stats.data_intercepted, icon: <Wifi size={14} /> },
    { label: 'NODES', value: stats.nodes_online, icon: <Globe size={14} /> },
    { label: 'SATS', value: stats.satellites_linked, icon: <Radio size={14} /> },
    { label: 'AI SCANS', value: stats.ai_scans_today, icon: <Scan size={14} /> },
    { label: 'ALERTS', value: stats.threat_alerts, icon: <AlertTriangle size={14} /> },
    { label: 'UPTIME', value: stats.uptime, icon: <Activity size={14} /> },
  ]
  return (
    <div className="flex items-center gap-6 px-4 py-2 bg-black/80 border-b border-green-900/50 text-xs overflow-x-auto">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-green-600">{item.icon}</span>
          <span className="text-gray-500">{item.label}:</span>
          <span className={`font-bold ${item.label === 'ALERTS' ? 'text-red-400' : 'text-green-400'}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default StatsBar
