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

import ICON_URL from '../../svg/tree.svg?url'

const service = new GeoJsonService('/api/trees')

const GoogleMapsView = ({ className, filters }) => {
  const ZOOM = 14
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MIX_MAPS_KEY,
  })
  const [map, setMap] = useState(null)
  const [features, setFeatures] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)

  useEffect(() => {
    service
      .fetchGeoJson(ZOETERMEER_CENTER, ZOOM, filters)
      .then((newFeatures) => setFeatures(newFeatures))
      .catch((e) => {
        if (e instanceof DOMException) {
          // Do nothing because we expect this to happen
          return
        }
        console.log('Something unexpected went wrong 🤷‍', e)
      })
  }, [setFeatures, filters])

  const onLoad = useCallback(
    (map) => {
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
      center={ZOETERMEER_CENTER}
      zoom={ZOOM}
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
                icon={ICON_URL}
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
    <p>Aan het laden...</p>
  )
}

export default memo(GoogleMapsView)
