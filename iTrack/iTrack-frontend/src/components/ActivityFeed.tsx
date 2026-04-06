import { AlertTriangle, Brain, Lock, MapPin, Scan, Signal, Wifi } from 'lucide-react'
import { ActivityItem } from '../types'

function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  const severityStyle = (s: string) => {
    switch (s) {
      case 'CRITICAL': return 'border-l-red-500 bg-red-900/10'
      case 'HIGH': return 'border-l-orange-500 bg-orange-900/10'
      case 'MEDIUM': return 'border-l-yellow-500 bg-yellow-900/10'
      default: return 'border-l-green-500 bg-green-900/10'
    }
  }
  const typeIcon = (t: string) => {
    switch (t) {
      case 'INTERCEPT': return <Lock size={12} className="text-red-400" />
      case 'LOCATION': return <MapPin size={12} className="text-blue-400" />
      case 'ALERT': return <AlertTriangle size={12} className="text-orange-400" />
      case 'SCAN': return <Scan size={12} className="text-green-400" />
      case 'NETWORK': return <Wifi size={12} className="text-purple-400" />
      case 'DATA': return <Brain size={12} className="text-cyan-400" />
      default: return <Signal size={12} className="text-gray-400" />
    }
  }
  return (
    <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
      {activities.map((a, i) => (
        <div key={i} className={`border-l-2 pl-2 py-1 text-xs ${severityStyle(a.severity)} fade-in`}>
          <div className="flex items-center gap-1.5">
            {typeIcon(a.type)}
            <span className="text-gray-500">{a.time}</span>
            <span className={`px-1 text-[10px] rounded ${
              a.severity === 'CRITICAL' ? 'bg-red-900/50 text-red-400' :
              a.severity === 'HIGH' ? 'bg-orange-900/50 text-orange-400' : 'bg-gray-800 text-gray-400'
            }`}>{a.severity}</span>
          </div>
          <div className="text-gray-300 mt-0.5">{a.message}</div>
        </div>
      ))}
    </div>
  )
}

export default ActivityFeed
