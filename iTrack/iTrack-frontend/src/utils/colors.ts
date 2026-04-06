export const threatColor = (level: string) => {
  switch (level) {
    case 'CRITICAL': return '#ff0000'
    case 'HIGH': return '#ff4444'
    case 'MEDIUM': return '#ffaa00'
    case 'LOW': return '#00ff00'
    default: return '#666666'
  }
}

export const statusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return '#00ff00'
    case 'DORMANT': return '#ffaa00'
    case 'MONITORING': return '#4488ff'
    default: return '#666666'
  }
}
