import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { memo, useCallback, useState } from 'react'
import { ZOETERMEER } from '../constants'

const GoogleMapsView = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MIX_MAPS_KEY,
  })
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const url = new URL('/api/trees', window.location)
    url.searchParams.set('center[lat]', ZOETERMEER.lat)
    url.searchParams.set('center[lng]', ZOETERMEER.lng)
    map.data.loadGeoJson(url.toString())
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="w-screen h-screen"
      center={ZOETERMEER}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(GoogleMapsView)
