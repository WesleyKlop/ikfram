export default class GeoJsonService {
  constructor(url) {
    this.url = new URL(url, window.location).toString()
  }

  async fetchGeoJson(center, zoom) {
    const url = new URL(this.url)

    url.searchParams.set('center[lat]', center.lat)
    url.searchParams.set('center[lng]', center.lng)
    url.searchParams.set('zoom', zoom)

    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/geo+json',
        cache: 'no-cache',
      },
    })

    if (!response.ok) {
      return []
    }

    const { features } = await response.json()
    return features.map((feature) => {
      feature.position = {
        lat: feature.geometry.coordinates[0][1],
        lng: feature.geometry.coordinates[0][0],
      }
      return feature
    })
  }
}
