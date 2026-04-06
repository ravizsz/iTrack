import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function MapFlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 })
  }, [center, zoom, map])
  return null
}

export default MapFlyTo
