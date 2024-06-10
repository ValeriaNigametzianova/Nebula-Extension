import React from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './pages/Popup'
import './reset.css'
import './css/global/input.css'
import './css/global/toggle.css'
import './css/pages/popup.css'
import './css/global/buttons.css'
import './css/global/variables.css'
import './css/global/tagsAdderInput.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
