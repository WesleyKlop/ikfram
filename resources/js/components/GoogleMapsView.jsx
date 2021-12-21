import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from '@react-google-maps/api'
import { memo, useCallback, useEffect, useState } from 'react'
import { ZOETERMEER_CENTER, ZOETERMEER_BOUNDS } from '../constants'
import GeoJsonService from '../services/GeoJsonService'
import { TreeInfo } from './TreeInfo'
import { useStoreState } from '../hooks/store'

import ICON_URL from '../../svg/tree.svg'

const ZOOM = 14
const service = new GeoJsonService('/api/trees')

export const GoogleMapsView = memo(({ className }) => {
  const { filters } = useStoreState()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: globalThis.__APP_CONFIG.mapsKey,
  })
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

  if (!isLoaded) {
    return <p className={className}>Aan het laden...</p>
  }

  return (
    <GoogleMap
      mapContainerClassName={className}
      center={ZOETERMEER_CENTER}
      zoom={ZOOM}
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
          {(clusterer) => {
            if (clusterer.getTotalMarkers() !== features.length) {
              clusterer.clearMarkers()
            }
            return features.map((feature) => (
              <Marker
                icon={ICON_URL}
                key={feature.properties.BMN_ID}
                position={feature.position}
                clusterer={clusterer}
                onClick={() => setSelectedFeature(feature)}
              />
            ))
          }}
        </MarkerClusterer>
      </>
    </GoogleMap>
  )
})
