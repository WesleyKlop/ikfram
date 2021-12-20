import { useCallback, useEffect, useState } from 'react'
import { LABEL_MAPPING } from '../constants'

const intoFilter = (id, options) => ({
  id,
  label: LABEL_MAPPING[id] || console.log(id),
  options: options.map((option, idx) => ({
    id: idx + 1,
    label: option.label,
    count: option.count,
    selected: false,
  })),
})

const loadFilters = async () => {
  const { count, ...filters } = await fetch('/api/meta').then((r) => r.json())

  return {
    count,
    filters: Object.entries(filters).map(([id, options]) =>
      intoFilter(id, options),
    ),
  }
}

const useMeta = () => {
  const [filters, setFilters] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    loadFilters().then(({ count, filters }) => {
      setCount(count)
      setFilters(filters)
    })
  }, [setFilters])

  const updateFilter = useCallback(
    (id, selected) => {
      const updatedFilter = filters.map((filter) => {
        if (filter.id !== id) {
          return filter
        }
        const updatedOptions = filter.options.map((option) => {
          if (option.id !== selected.id) {
            return option
          }
          return {
            ...option,
            selected: !selected.selected,
          }
        })
        return {
          ...filter,
          options: updatedOptions,
        }
      })
      setFilters(updatedFilter)
    },
    [filters],
  )

  return { filters, updateFilter, count }
}

export default useMeta
