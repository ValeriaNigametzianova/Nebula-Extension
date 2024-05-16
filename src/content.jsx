import React from 'react'
import ReactDOM from 'react-dom/client'
import { Scripts } from './pages/Scripts'

let injected = false

//one message connection
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.answer === 'Yes') {
    injectExtension()
    sendResponse({ message: 'ok' })
  } else {
    sendResponse({ message: 'no ok' })
  }

  if (request.message === 'Add this tab into list') {
    removeExtension()
    sendResponse({ message: 'Script was removed' })
  }

  if (request.message === 'Remove this tab out of list') {
    injectExtension()
    sendResponse({ message: 'Script was injected' })
  }
  return true
})

//port messaging
var port = chrome.runtime.connect({ name: 'nebula-script' })
port.postMessage({ execute: 'execute?' })
port.onMessage.addListener(function (msg) {
  if (msg.answer === 'Yes') {
    injectExtension()
  }
  port.disconnect()
})

chrome.storage.sync.onChanged.addListener((changes) => {
  console.log('chan', changes)
  if (changes.status) {
    const newValue = changes.status?.newValue
    if (newValue) {
      injectExtension()
    } else {
      removeExtension()
    }
  }
})

function injectExtension() {
  if (injected) {
    return
  }
  injected = true
  console.log('Injecting extension...', new Date().toLocaleString())
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
  if (!injected) return
  injected = false
  console.log('Removing extension...')
  const root = document.getElementById('crx-root')
  if (root) {
    root.remove()
  }
}
