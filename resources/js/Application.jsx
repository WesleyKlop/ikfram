import GoogleMapsView from './components/GoogleMapsView'
import { useMeta } from './hooks'
import Sidebar from './components/Sidebar'

const Application = () => {
  const { filters, updateFilter, count } = useMeta()
  return (
    <main className="flex h-screen w-screen">
      <Sidebar {...{ filters, updateFilter, count }} />
      <GoogleMapsView className="flex-1" filters={filters} />
    </main>
  )
}

export default Application
