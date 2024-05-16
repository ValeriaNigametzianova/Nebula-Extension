import { runInjected } from './components/utils/runInjected'

console.log('CONNECTED')

//port messaging
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg, { sender }) => {
    if (msg.execute === 'execute?') {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const senderId = sender.tab.id
        const activeTabId = tabs[0]?.id
        const checkForInjecting = await runInjected(tabs[0])
        if (senderId === activeTabId && checkForInjecting)
          port.postMessage({ answer: 'Yes' })
        else port.postMessage({ answer: 'No' })
        port.postMessage({ answer: 'No' })
      })
    }
  })
  return true
})

//one message connection
// должно отправлять сообщение на загруженную страницу, но почему то падает с ошибкой все равно
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await chrome.tabs.get(activeInfo.tabId, async (tab) => {
    const checkForInjecting = await runInjected(tab)
    if (checkForInjecting) {
      try {
        await chrome.tabs.sendMessage(
          activeInfo.tabId,
          {
            answer: 'Yes',
          },
          (response) => {
            console.log('contentResponseAnswer', response?.message)
          }
        )
      } catch (error) {
        console.log('page not load', error)
      }
    }
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { message } = request
  if (message === 'Send me an activeTab') {
    sendResponse('Wait the activeTabURL')
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabURL = tabs[0]?.url
      chrome.runtime.sendMessage(
        {
          message: 'Send you activeTabURL',
          activeTabURL: activeTabURL,
        },
        (response) => {
          console.log(response)
        }
      )
      return true
    })
  }
  if (
    message === 'Add this tab into list' ||
    message === 'Remove this tab out of list'
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (request.tabURL === tabs[0].url) {
        await chrome.tabs.sendMessage(
          tabs[0].id,
          {
            message,
          },
          (response) => {
            console.log('resp from content', response)
          }
        )
        sendResponse('Thanks, Popup. Tab was getting')
        return true
      }
    })
  }
  console.log('CATCH')
  return true
})
