import React from 'react'
import ReactDOM from 'react-dom/client'
import { Scripts } from './pages/Scripts'

let extensionStatus = false

chrome.storage.sync.onChanged.addListener((changes) => {
  if (changes.status) {
    const newValue = changes.status.newValue
    console.log('Extension status changed:', newValue)
    if (newValue) {
      injectExtension()
    } else {
      removeExtension()
    }
  }
})

function injectExtension() {
  console.log('Injecting extension...')
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
}

function removeExtension() {
  console.log('Removing extension...')
  const root = document.getElementById('crx-root')
  if (root) {
    root.remove()
  }
}

// Check initial extension status
chrome.storage.sync.get('status', (data) => {
  extensionStatus = data.status
  if (extensionStatus) {
    injectExtension()
  }
})
