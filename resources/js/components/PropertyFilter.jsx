import { Disclosure } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'

const PropertyFilterOption = ({ label, checked, onToggle }) => (
  <div key={label} className="flex items-center">
    <input
      onChange={onToggle}
      id={`filter-${label}`}
      type="checkbox"
      defaultChecked={checked}
      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
    />
    <label htmlFor={`filter-${label}`} className="ml-3 text-sm text-gray-600">
      {label}
    </label>
  </div>
)

const PropertyFilter = ({ label, onToggle, options }) => {
  return (
    <Disclosure as="div" key={label} className="border-b border-gray-200 py-6">
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{label}</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {options.map((option, optionIdx) => (
                <PropertyFilterOption
                  key={optionIdx}
                  label={option.label}
                  checked={option.selected}
                  onToggle={() => onToggle(option)}
                />
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default PropertyFilter
