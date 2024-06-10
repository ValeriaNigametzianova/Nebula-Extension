import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import './css/global/variables.css'
import './css/global/input.css'
import './css/global/toggle.css'
import './css/global/buttons.css'
import './css/pages/helpPage.css'
import './css/global/tagsAdderInput.css'
import { Background } from './ui/Background'
import { HelpPage } from './pages/HelpPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Background />
    <HelpPage />
  </React.StrictMode>
)
