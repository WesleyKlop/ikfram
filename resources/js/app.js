import { render } from 'react-dom'
import GoogleMapsView from './components/GoogleMapsView'

import '../css/app.css'
import PropertyFilter from './components/PropertyFilter'
import { useCallback, useState } from 'react'

const availableNeighbourhoods = [{ id: 0, label: 'Rokkeveen', selected: false }]

const App = () => {
  const [neighbourhoods, setNeighbourhoods] = useState(availableNeighbourhoods)

  const toggleNeighbourhood = useCallback(
    (neighbourhood) => {
      const newNeighbourhoods = neighbourhoods.map((n) => {
        if (n.id === neighbourhood.id) {
          return { ...n, selected: !n.selected }
        }
        return n
      })
      setNeighbourhoods(newNeighbourhoods)
    },
    [neighbourhoods],
  )

  return (
    <main className="flex h-screen w-screen">
      <aside className="px-4 py-8 flex flex-col gap-y-4 max-w-[350px]">
        <h1 className="italic mb-2">
          <span className="text-2xl">🌳Boompje,&nbsp;</span>
          <span className="text-xl">boompje,&nbsp;</span>
          <span className="text-lg">boompje</span>
        </h1>
        <p className="text-gray-600 text-sm">
          Op deze website kan je ALLE bomen in de mooie stad Zoetermeer
          bekijken. Momenteel bevat de dataset{' '}
          <span className="font-bold">46278</span> bomen.
          <br />
          Omdat dit er erg veel zijn, staan hier onder een aantal filters om een
          beter beeld te krijgen.
        </p>

        <PropertyFilter
          name="neighbourhood"
          label="Wijk"
          onToggle={toggleNeighbourhood}
          options={neighbourhoods}
        />
      </aside>
      <GoogleMapsView className="flex-1" />
    </main>
  )
}

render(<App />, document.getElementById('app'))
