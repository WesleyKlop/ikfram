import { GoogleMapsView } from './components/GoogleMapsView'
import { Sidebar } from './components/Sidebar'
import { StateProvider } from './hooks/store'

const Application = () => {
  return (
    <StateProvider>
      <main className="flex h-screen w-screen">
        <Sidebar />
        <GoogleMapsView className="flex-1" />
      </main>
    </StateProvider>
  )
}

export default Application
