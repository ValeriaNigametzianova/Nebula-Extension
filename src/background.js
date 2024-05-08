console.log('CONNECTED')

//port messaging
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg, { sender }) {
    if (msg.execute === 'execute?') {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const { status } = await chrome.storage.sync.get()
        const senderId = sender.tab.id
        const activeTabId = tabs[0]?.id

        if (status && senderId === activeTabId)
          port.postMessage({ answer: 'Yes' })
        else port.postMessage({ answer: 'No' })
      })
    }
  })
})

//one message connection
// должно отправлять сообщение на загруженную страницу, но почему то падает с ошибкой все равно
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    await chrome.tabs.sendMessage(
      activeInfo.tabId,
      { message: 'sendM' },
      (response) => {
        console.log('cpntentResponse', response?.message)
      }
    )
  } catch (error) {
    console.log('page not load', error)
  }
  await chrome.tabs.get(activeInfo.tabId, async (tab) => {
    const { status } = await chrome.storage.sync.get()
    await chrome.tabs.sendMessage(
      activeInfo.tabId,
      {
        status: { status },
      },
      (response) => {
        console.log('contentResponseStatus', response?.message)
      }
    )
    if (status && tab.status === 'complete') {
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

// Check initial extension status
