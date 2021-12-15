import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from '@react-google-maps/api'
import { memo, useCallback, useEffect, useState } from 'react'
import { ZOETERMEER } from '../constants'
import GeoJsonService from '../services/GeoJsonService'

const service = new GeoJsonService('/api/trees')

const GoogleMapsView = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MIX_MAPS_KEY,
  })
  const [map, setMap] = useState(null)
  const [features, setFeatures] = useState([])

  useEffect(async () => {
    const newFeatures = await service.fetchGeoJson(ZOETERMEER, 14)
    setFeatures(newFeatures)
  }, [setFeatures])

  const onLoad = useCallback(
    async (map) => {
      setMap(map)
    },
    [setMap],
  )

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [setMap])

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="w-screen h-screen"
      center={ZOETERMEER}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MarkerClusterer>
        {(clusterer) =>
          features.map((feature) => (
            <Marker
              key={feature.properties.BMN_ID}
              position={feature.position}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default GoogleMapsView
