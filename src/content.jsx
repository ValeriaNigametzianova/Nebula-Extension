import React from 'react'
import ReactDOM from 'react-dom/client'
import { Scripts } from './pages/Scripts'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Scripts />
  </React.StrictMode>
)
