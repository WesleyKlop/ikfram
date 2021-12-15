import PropertyFilter from './PropertyFilter'

const PropertyFilterList = ({ filters, updateFilter }) => {
  return filters.map((filter) => (
    <PropertyFilter
      key={filter.id}
      name={filter.id}
      label={filter.label}
      onToggle={(val) => updateFilter(filter.id, val)}
      options={filter.options}
    />
  ))
}

export default PropertyFilterList
