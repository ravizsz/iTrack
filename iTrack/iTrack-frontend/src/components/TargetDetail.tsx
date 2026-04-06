import { Brain, ChevronRight, Clock, MapPin, Shield, Skull, User } from 'lucide-react'
import { Target } from '../types'
import { threatColor, statusColor } from '../utils/colors'

function TargetDetail({ target, onClose }: { target: Target; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-950 border border-green-900/50 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: threatColor(target.threat_level) + '22', border: `2px solid ${threatColor(target.threat_level)}` }}>
              <Skull size={20} style={{ color: threatColor(target.threat_level) }} />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{target.codename}</div>
              <div className="text-xs text-gray-400">{target.id} | {target.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: threatColor(target.threat_level) + '22', color: threatColor(target.threat_level) }}>
              {target.threat_level}
            </span>
            <span className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: statusColor(target.status) + '22', color: statusColor(target.status) }}>
              {target.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-white ml-2 text-xl">&times;</button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Info */}
          <div className="space-y-3">
            <div className="text-xs text-green-500 font-bold uppercase tracking-wider flex items-center gap-1"><User size={12} /> Subject Profile</div>
            <div className="bg-black/50 rounded border border-gray-800 p-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-white">{target.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Age</span><span className="text-white">{target.age}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Nationality</span><span className="text-white">{target.nationality}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="text-green-400">{target.city}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Last Seen</span><span className="text-yellow-400">{target.last_seen}</span></div>
            </div>

            <div className="text-xs text-green-500 font-bold uppercase tracking-wider flex items-center gap-1"><Shield size={12} /> Device Intel</div>
            <div className="bg-black/50 rounded border border-gray-800 p-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="text-red-400 font-mono">{target.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-red-400 font-mono">{target.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Device</span><span className="text-white">{target.device}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">OS</span><span className="text-white">{target.os}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">IP</span><span className="text-red-400 font-mono">{target.ip}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">ISP</span><span className="text-white">{target.isp}</span></div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="space-y-3">
            <div className="text-xs text-green-500 font-bold uppercase tracking-wider flex items-center gap-1"><Brain size={12} /> AI Analysis</div>
            <div className="bg-black/50 rounded border border-gray-800 p-3 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Behavior Score</span>
                  <span className={target.behavior_score && target.behavior_score > 70 ? 'text-red-400' : 'text-green-400'}>{target.behavior_score}/100</span>
                </div>
                <div className="h-2 bg-gray-900 rounded overflow-hidden">
                  <div className={`h-full rounded progress-glow ${(target.behavior_score ?? 0) > 70 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${target.behavior_score}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Voice Match</span>
                  <span className="text-green-400">{target.voice_match}%</span>
                </div>
                <div className="h-2 bg-gray-900 rounded overflow-hidden">
                  <div className="h-full bg-green-500 rounded progress-glow" style={{ width: `${target.voice_match}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Face Match</span>
                  <span className="text-green-400">{target.face_match}%</span>
                </div>
                <div className="h-2 bg-gray-900 rounded overflow-hidden">
                  <div className="h-full bg-green-500 rounded progress-glow" style={{ width: `${target.face_match}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-black/50 rounded border border-gray-800 p-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Emotional State</span><span className="text-orange-400">{target.emotional_state}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Thinking Pattern</span><span className="text-cyan-400">{target.thinking_pattern}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Movement</span><span className="text-yellow-400">{target.movement_pattern}</span></div>
            </div>

            <div className="text-xs text-green-500 font-bold uppercase tracking-wider flex items-center gap-1"><MapPin size={12} /> Location Trail</div>
            <div className="bg-black/50 rounded border border-gray-800 p-3 space-y-1 max-h-40 overflow-y-auto">
              {target.trail?.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Clock size={10} className="text-gray-600" />
                  <span className="text-green-600 w-12">{t.time}</span>
                  <ChevronRight size={10} className="text-gray-700" />
                  <span className="text-gray-300">{t.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-green-900/30 flex items-center justify-between text-xs text-gray-600">
          <span>DATA POINTS: {target.data_points} | CONNECTIONS: {target.connections}</span>
          <span className="text-green-600">CLASSIFIED // iTrack Intelligence</span>
        </div>
      </div>
    </div>
  )
}

export default TargetDetail
