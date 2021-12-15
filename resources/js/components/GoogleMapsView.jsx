import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from '@react-google-maps/api'
import { memo, useCallback, useEffect, useState } from 'react'
import { ZOETERMEER_CENTER, ZOETERMEER_BOUNDS } from '../constants'
import GeoJsonService from '../services/GeoJsonService'
import TreeInfo from './TreeInfo'

const service = new GeoJsonService('/api/trees')

const GoogleMapsView = ({ className, filters }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MIX_MAPS_KEY,
  })
  const [map, setMap] = useState(null)
  const [zoom, setZoom] = useState(14)
  const [features, setFeatures] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)

  useEffect(() => {
    service
      .fetchGeoJson(ZOETERMEER_CENTER, zoom, filters)
      .then((newFeatures) => setFeatures(newFeatures))
      .catch((e) => console.error('Something went wrong 🤷‍', e))
  }, [setFeatures, filters, zoom])

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

  const onZoomChanged = (...args) => {
    console.log('zoom change', args)
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={className}
      center={ZOETERMEER_CENTER}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
      options={{
        restriction: {
          latLngBounds: ZOETERMEER_BOUNDS,
        },
      }}
    >
      <>
        {selectedFeature && (
          <TreeInfo
            onClose={() => setSelectedFeature(null)}
            position={selectedFeature.position}
            properties={selectedFeature.properties}
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
