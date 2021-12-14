import { render } from 'react-dom'
import GoogleMapsView from './components/GoogleMapsView'

import '../css/app.css'

const App = () => <main>
    <p>It works!</p>
    <GoogleMapsView />
</main>


render(<App />, document.getElementById('app'))
