import { AppTitle } from './AppTitle'
import { useStoreState, useStoreDispatch } from '../hooks/store'
import { PropertyFilterList } from './PropertyFilterList'

export const Sidebar = () => {
  const { count, filters } = useStoreState()
  const dispatch = useStoreDispatch()

  const updateFilter = (id, selected) =>
    dispatch({ type: 'UPDATE_FILTER', payload: { id, selected } })

  return (
    <aside className="px-4 pt-8 max-h-full flex flex-col max-w-[350px] relative">
      <AppTitle />
      <div className="-mx-4 px-4 flex-1 overflow-y-scroll overflow-x-visible flex flex-col gap-y-4 pb-8">
        <p className="text-gray-600 text-sm">
          Op deze website kan je ALLE bomen in de mooie stad Zoetermeer
          bekijken. Momenteel bevat de dataset&nbsp;
          <span className="font-bold">{count}</span> bomen.
          <br />
          Omdat dit er erg veel zijn, staan hier onder een aantal filters om een
          beter beeld te krijgen.
        </p>
        <PropertyFilterList updateFilter={updateFilter} filters={filters} />
      </div>
      <div className="h-12 bg-gradient-to-t from-white to-transparent absolute bottom-8 inset-x-0 pointer-events-none" />
      <footer className="text-xs text-gray-500 pb-4">
        Bron data:&nbsp;
        <a
          href="https://opendata.zoetermeer.nl/datasets/bomen-2"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          opendata.zoetermeer.nl
        </a>
      </footer>
    </aside>
  )
}
