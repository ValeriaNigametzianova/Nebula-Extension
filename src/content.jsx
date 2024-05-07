import React from 'react'
import ReactDOM from 'react-dom/client'
import { Scripts } from './pages/Scripts'

let injected = false

//one message connection
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request?.answer === 'Yes') {
    injectExtension()
    sendResponse({ message: 'ok' })
  }
  if (request?.message === 'sendM') {
    console.log('uraaaaaa vse rabotaet')
    sendResponse({ message: 'ok-sendM' })
  }
  sendResponse({ message: 'no ok' })
  return true
})

//port messaging
var port = chrome.runtime.connect({ name: 'nebula-script' })
port.postMessage({ execute: 'execute?' })
port.onMessage.addListener(function (msg) {
  console.log('msg', msg)
  if (msg.answer === 'Yes') {
    injectExtension()
  }
})
port.disconnect()

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
  if (injected) return
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
