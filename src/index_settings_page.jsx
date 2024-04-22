import React from 'react'
import ReactDOM from 'react-dom/client'
import { SettingsPage } from './pages/SettingsPage'
import './reset.css'
import './css/global/variables.css'
import './css/global/input.css'
import './css/global/toggle.css'
import './css/global/buttons.css'
import './css/pages/page.css'
import './css/global/tagsAdderInput.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsPage />
  </React.StrictMode>
)
