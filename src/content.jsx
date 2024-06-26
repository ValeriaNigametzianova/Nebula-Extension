import React from 'react'
import ReactDOM from 'react-dom/client'
import { Scripts } from './pages/Scripts'
import { removeAllMasks } from './components/utils/removeAllMasks'

let injected = false

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
  if (changes.status.newValue) {
    const newValue = changes.status?.newValue
    if (newValue) {
      chrome.runtime.sendMessage(
        {
          message: 'Is this tab in domains list?',
        },
        (response) => {
          console.log(response)
        }
      )
    }
  }
  return true
})

//one message connection
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.answer === 'Inject') {
    injectExtension()
    sendResponse({ message: 'Injected' })
  }

  if (request.message === 'Remove') {
    removeExtension()
    sendResponse({ message: 'Script was removed after disabling of pop-up' })
  }

  if (request.message === 'Add this tab into list') {
    removeExtension()
    sendResponse({ message: 'Script was removed' })
  }

  if (request.message === 'Remove this tab out of list') {
    injectExtension()
    sendResponse({ message: 'Script was injected' })
  }

  if (request.message === 'No, this tab isn`t in domain list') {
    injectExtension()
    sendResponse({ message: 'Script was injected' })
  }
  return true
})

const injectExtension = () => {
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

const removeExtension = () => {
  removeAllMasks()
  if (!injected) return
  injected = false
  console.log('Removing extension...')
  const root = document.getElementById('crx-root')
  if (root) {
    root.remove()
  }
}
