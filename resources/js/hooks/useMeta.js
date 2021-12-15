import { useCallback, useEffect, useState } from 'react'

const isSelectedByDefault = (filter, label) =>
  filter === 'neighbourhoods' && label === 'Rokkeveen-Oost'

const labelMapping = {
  neighbourhoods: 'Wijken',
  conditions: 'Staat',
  years: 'Plantjaar',
  risks: "Risico's",
  species: 'Soort',
}

const intoFilter = (id, options) => ({
  id,
  label: labelMapping[id],
  options: options.map((option, i) => ({
    id: i + 1,
    label: option.label,
    count: option.count,
    selected: isSelectedByDefault(id, option.label),
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
    (name, selected) => {
      const updatedFilter = filters.map((filter) => {
        if (filter.id !== name) {
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
