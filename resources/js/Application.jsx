import GoogleMapsView from './components/GoogleMapsView'
import { useMeta } from './hooks'
import Sidebar from './components/Sidebar'

const Application = () => {
  const meta = useMeta()
  return (
    <main className="flex h-screen w-screen">
      <Sidebar {...meta} />
      <GoogleMapsView className="flex-1" filters={meta.filters} />
    </main>
  )
}

export default Application
