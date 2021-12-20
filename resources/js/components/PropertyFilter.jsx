import { Disclosure } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'
import PropertyFilterOption from './PropertyFilterOption'

const PropertyFilter = ({ name, label, onToggle, options }) => {
  return (
    <Disclosure as="div" key={label} className="border-b border-gray-200 pb-4">
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">
                {label} ({options.length})
              </span>
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
                  group={name}
                  key={optionIdx}
                  label={option.label ?? 'Onbekend'}
                  checked={option.selected}
                  count={option.count}
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
