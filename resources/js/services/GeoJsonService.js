export default class GeoJsonService {
  constructor(url) {
    this.url = new URL(url, window.location).toString()
    this.controller = null
  }

  applyFilter(url, key, filterOptions) {
    for (const option of filterOptions) {
      if (option.selected) {
        url.searchParams.append(`filter[${key}][]`, option.label)
      }
    }
  }

  async fetchGeoJson(center, zoom, filters, limit) {
    // Abort running fetch.
    this.controller?.abort()
    const url = new URL(this.url)

    url.searchParams.set('center[lat]', center.lat)
    url.searchParams.set('center[lng]', center.lng)
    if (zoom) url.searchParams.set('zoom', zoom)
    if (limit) url.searchParams.set('limit', limit)

    filters.forEach((filter) => {
      this.applyFilter(url, filter.id, filter.options)
    })

    this.controller = new AbortController()
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/geo+json',
        cache: 'no-cache',
      },
      signal: this.controller.signal,
    })
    this.controller = null

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
