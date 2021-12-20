import { render } from 'react-dom'
import { StrictMode } from 'react'
import Application from './Application'

import '../css/app.css'

render(
  <StrictMode>
    <Application />
  </StrictMode>,
  document.getElementById('app'),
)
