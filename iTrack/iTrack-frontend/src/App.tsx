import { useState, useEffect, useCallback } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet'
import { Activity, Clock, Eye, Fingerprint, Globe, Lock, Scan, Shield, Signal, Terminal, Wifi } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

import { Target, ScanResult, ActivityItem } from './types'
import { API_URL } from './config'
import { threatColor, statusColor } from './utils/colors'

import BootScreen from './components/BootScreen'
import StatsBar from './components/StatsBar'
import ActivityFeed from './components/ActivityFeed'
import ScanPanel from './components/ScanPanel'
import ScanResults from './components/ScanResults'
import TargetDetail from './components/TargetDetail'
import TargetList from './components/TargetList'
import TypingText from './components/TypingText'
import MapFlyTo from './components/MapFlyTo'

function App() {
  const [booted, setBooted] = useState(false)
  const [targets, setTargets] = useState<Target[]>([])
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null)
  const [detailTarget, setDetailTarget] = useState<Target | null>(null)
  const [stats, setStats] = useState<Record<string, string | number> | null>(null)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [scanResults, setScanResults] = useState<ScanResult[] | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([30, 0])
  const [mapZoom, setMapZoom] = useState(2)
  const [currentTime, setCurrentTime] = useState(new Date())

  const fetchTargets = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/targets`)
      const data = await res.json()
      setTargets(data.targets)
    } catch { /* silently retry */ }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats`)
      const data = await res.json()
      setStats(data.stats)
    } catch { /* silently retry */ }
  }, [])

  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/activity-feed`)
      const data = await res.json()
      setActivities(data.activities)
    } catch { /* silently retry */ }
  }, [])

  const handleScan = async (query: string) => {
    try {
      const res = await fetch(`${API_URL}/api/scan?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setScanResults(data.scan_results)
    } catch { /* silently retry */ }
  }

  const handleSelectTarget = async (t: Target) => {
    setSelectedTarget(t)
    setMapCenter([t.lat, t.lng])
    setMapZoom(10)
    try {
      const res = await fetch(`${API_URL}/api/targets/${t.id}`)
      const data = await res.json()
      if (data.target) setSelectedTarget(data.target)
    } catch { /* silently retry */ }
  }

  const handleOpenDetail = async (t: Target) => {
    try {
      const res = await fetch(`${API_URL}/api/targets/${t.id}`)
      const data = await res.json()
      setDetailTarget(data.target || t)
    } catch {
      setDetailTarget(t)
    }
  }

  useEffect(() => {
    if (!booted) return
    fetchTargets()
    fetchStats()
    fetchActivities()
    const interval = setInterval(() => {
      fetchActivities()
      fetchStats()
    }, 5000)
    return () => clearInterval(interval)
  }, [booted, fetchTargets, fetchStats, fetchActivities])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!booted) return <BootScreen onComplete={() => setBooted(true)} />

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      <div className="scanline-overlay" />

      {/* Top Header */}
      <header className="bg-black/90 border-b border-red-900/50 px-4 py-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Fingerprint size={24} className="text-red-500" />
            <span className="text-xl font-bold tracking-widest glitch-text">
              <span className="text-red-500">i</span>
              <span className="text-white">TRACK</span>
            </span>
          </div>
          <span className="text-[10px] text-gray-600 border border-gray-800 px-1.5 py-0.5 rounded">v4.2.1</span>
          <span className="text-[10px] text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> ONLINE</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-500 flex items-center gap-1"><Terminal size={12} /> OPERATOR: <span className="text-green-400">ROOT</span></span>
          <span className="text-gray-500 flex items-center gap-1"><Lock size={12} /> CLEARANCE: <span className="text-red-400">LEVEL 5</span></span>
          <span className="text-gray-500 flex items-center gap-1"><Clock size={12} /> <span className="text-green-400">{currentTime.toUTCString()}</span></span>
        </div>
      </header>

      <StatsBar stats={stats} />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-88px)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-gray-800/50 bg-black/50 flex flex-col">
          {/* Scanner */}
          <div className="p-3 border-b border-gray-800/50">
            <div className="text-xs text-green-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <Scan size={12} /> Global Scanner
            </div>
            <ScanPanel onScan={handleScan} />
            <ScanResults results={scanResults} />
          </div>

          {/* Target List */}
          <div className="p-3 flex-1 overflow-hidden flex flex-col">
            <div className="text-xs text-green-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <Eye size={12} /> Active Targets ({targets.length})
            </div>
            <TargetList
              targets={targets}
              selectedId={selectedTarget?.id || null}
              onSelect={handleSelectTarget}
            />
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <MapContainer
            center={[30, 0]}
            zoom={2}
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapFlyTo center={mapCenter} zoom={mapZoom} />

            {targets.map(t => (
              <CircleMarker
                key={t.id}
                center={[t.lat, t.lng]}
                radius={selectedTarget?.id === t.id ? 10 : 6}
                pathOptions={{
                  color: threatColor(t.threat_level),
                  fillColor: threatColor(t.threat_level),
                  fillOpacity: 0.7,
                  weight: selectedTarget?.id === t.id ? 3 : 1,
                }}
                eventHandlers={{
                  click: () => handleSelectTarget(t),
                }}
              >
                <Popup>
                  <div className="bg-black text-green-400 font-mono p-2 rounded text-xs min-w-48">
                    <div className="font-bold text-white text-sm mb-1">{t.codename}</div>
                    <div className="text-gray-400">{t.name}</div>
                    <div className="text-gray-400">{t.city}</div>
                    <div className="mt-1" style={{ color: threatColor(t.threat_level) }}>THREAT: {t.threat_level}</div>
                    <div style={{ color: statusColor(t.status) }}>STATUS: {t.status}</div>
                    <div className="text-gray-500 mt-1">Last seen: {t.last_seen}</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {/* Trail lines for selected target */}
            {selectedTarget?.trail && (
              <Polyline
                positions={selectedTarget.trail.map(p => [p.lat, p.lng] as [number, number])}
                pathOptions={{ color: '#00ff00', weight: 2, dashArray: '5,10', opacity: 0.6 }}
              />
            )}
          </MapContainer>

          {/* Map Overlay - Top Left */}
          <div className="absolute top-3 left-3 z-20 bg-black/80 border border-green-900/50 rounded p-3 max-w-xs">
            <div className="text-xs text-green-500 font-bold mb-1 flex items-center gap-1">
              <Globe size={12} /> GLOBAL TRACKING GRID
            </div>
            <div className="text-[10px] text-gray-500">
              <TypingText text="Monitoring 6 targets across 6 countries. All satellite links active." speed={30} />
            </div>
          </div>

          {/* Selected Target Quick Info */}
          {selectedTarget && (
            <div className="absolute bottom-3 left-3 z-20 bg-black/90 border border-green-900/50 rounded p-3 max-w-sm fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threatColor(selectedTarget.threat_level) }} />
                  <span className="font-bold text-white text-sm">{selectedTarget.codename}</span>
                </div>
                <button
                  onClick={() => handleOpenDetail(selectedTarget)}
                  className="text-[10px] text-green-400 border border-green-500/50 px-2 py-0.5 rounded hover:bg-green-900/30 transition-all flex items-center gap-1"
                >
                  <Eye size={10} /> FULL INTEL
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div className="text-gray-500">Name</div><div className="text-white">{selectedTarget.name}</div>
                <div className="text-gray-500">Location</div><div className="text-green-400">{selectedTarget.city}</div>
                <div className="text-gray-500">Status</div><div style={{ color: statusColor(selectedTarget.status) }}>{selectedTarget.status}</div>
                <div className="text-gray-500">Last Seen</div><div className="text-yellow-400">{selectedTarget.last_seen}</div>
                <div className="text-gray-500">Data Points</div><div className="text-gray-300">{selectedTarget.data_points}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-72 border-l border-gray-800/50 bg-black/50 flex flex-col">
          {/* Activity Feed */}
          <div className="p-3 flex-1 overflow-hidden flex flex-col">
            <div className="text-xs text-red-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <Activity size={12} /> Live Feed
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>
            <ActivityFeed activities={activities} />
          </div>

          {/* System Status */}
          <div className="p-3 border-t border-gray-800/50">
            <div className="text-xs text-green-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <Signal size={12} /> System Status
            </div>
            <div className="space-y-2">
              {[
                { label: 'Neural Network', value: 94 },
                { label: 'Satellite Link', value: 100 },
                { label: 'Data Pipeline', value: 87 },
                { label: 'Encryption', value: 100 },
              ].map((item, i) => (
                <div key={i} className="text-xs">
                  <div className="flex justify-between mb-0.5">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="text-green-400">{item.value}%</span>
                  </div>
                  <div className="h-1 bg-gray-900 rounded overflow-hidden">
                    <div className="h-full bg-green-600 rounded progress-glow" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-3 border-t border-gray-800/50">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-black/60 rounded border border-gray-800 p-2">
                <div className="text-lg font-bold text-red-400">{stats?.threat_alerts || 0}</div>
                <div className="text-[10px] text-gray-500">THREATS</div>
              </div>
              <div className="bg-black/60 rounded border border-gray-800 p-2">
                <div className="text-lg font-bold text-green-400">{stats?.nodes_online || 0}</div>
                <div className="text-[10px] text-gray-500">NODES</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Detail Modal */}
      {detailTarget && (
        <TargetDetail target={detailTarget} onClose={() => setDetailTarget(null)} />
      )}

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-gray-800/50 px-4 py-1 flex items-center justify-between text-[10px] text-gray-600 z-30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Lock size={10} className="text-green-600" /> AES-256-GCM</span>
          <span className="flex items-center gap-1"><Shield size={10} className="text-green-600" /> TOR ROUTING</span>
          <span className="flex items-center gap-1"><Wifi size={10} className="text-green-600" /> ENCRYPTED</span>
        </div>
        <span className="text-red-600">CLASSIFIED // iTrack Global Intelligence Network // Unauthorized access is prohibited</span>
      </div>
    </div>
  )
}

export default App
