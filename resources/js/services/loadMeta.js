import { LABEL_MAPPING } from '../constants'

const intoFilter = (id, options) => ({
  id,
  label: LABEL_MAPPING[id],
  options: options.map((option, idx) => ({
    id: idx + 1,
    label: option.label,
    count: option.count,
    selected: false,
  })),
})

export const loadMeta = async () => {
  const { count, ...filters } = await fetch('/api/meta').then((r) => r.json())

  return {
    count,
    filters: Object.entries(filters).map(([id, options]) =>
      intoFilter(id, options),
    ),
  }
}

export default loadMeta
