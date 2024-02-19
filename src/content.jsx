import React from 'react'
import ReactDOM from 'react-dom/client'
import { Scripts } from './pages/Scripts'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.prepend(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Scripts
      style={{
        display: 'flex',
      }}
    />
  </React.StrictMode>
)
