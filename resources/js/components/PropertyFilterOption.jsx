const PropertyFilterOption = ({ group, label, checked, onToggle, count }) => {
  const key = `filter-${group}-${label.toLowerCase()}`
  return (
    <div className="flex items-center">
      <input
        onChange={onToggle}
        id={key}
        type="checkbox"
        checked={checked}
        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={key} className="ml-3 text-sm text-gray-600">
        {label} ({count})
      </label>
    </div>
  )
}

export default PropertyFilterOption
