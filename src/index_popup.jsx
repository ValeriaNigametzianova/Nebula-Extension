import React from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './pages/Popup'
import './reset.css'
import './css/global/input.css'
import './css/global/toggle.css'
import './css/pages/popup.css'
import './css/global/buttons.css'
import './css/global/variables.css'
{
  /*

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap" rel="stylesheet"> */
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
