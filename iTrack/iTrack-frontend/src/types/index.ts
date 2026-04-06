export interface Target {
  id: string
  codename: string
  name: string
  age?: number
  nationality?: string
  threat_level: string
  status: string
  lat: number
  lng: number
  city: string
  phone?: string
  email?: string
  device?: string
  os?: string
  ip?: string
  isp?: string
  last_seen: string
  behavior_score?: number
  emotional_state?: string
  thinking_pattern?: string
  voice_match?: number
  face_match?: number
  movement_pattern?: string
  connections: number
  data_points: number
  trail?: Array<{ lat: number; lng: number; time: string; location: string }>
}

export interface ScanResult {
  type: string
  status: string
  confidence: number
  data_sources: number
  time_ms: number
}

export interface ActivityItem {
  type: string
  message: string
  severity: string
  time: string
}
