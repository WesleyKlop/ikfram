import {
  GoogleMap,
  InfoBox,
  InfoWindow,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from '@react-google-maps/api'
import { memo, useCallback, useEffect, useState } from 'react'
import { ZOETERMEER } from '../constants'
import GeoJsonService from '../services/GeoJsonService'
import TreeInfo from './TreeInfo'

const service = new GeoJsonService('/api/trees')

const GoogleMapsView = ({ className }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MIX_MAPS_KEY,
  })
  const [map, setMap] = useState(null)
  const [features, setFeatures] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)

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

  const onMarkerClick = useCallback(
    (feature) => {
      setSelectedFeature(feature)
      console.log('marker click', feature)
    },
    [setSelectedFeature],
  )

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={className}
      center={ZOETERMEER}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        {selectedFeature && (
          <TreeInfo
            onClose={() => setSelectedFeature(null)}
            position={selectedFeature.position}
          />
        )}
        <MarkerClusterer>
          {(clusterer) =>
            features.map((feature) => (
              <Marker
                key={feature.properties.BMN_ID}
                position={feature.position}
                clusterer={clusterer}
                onClick={() => onMarkerClick(feature)}
              />
            ))
          }
        </MarkerClusterer>
      </>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(GoogleMapsView)
