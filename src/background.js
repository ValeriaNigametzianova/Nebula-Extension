import { runInjected } from './components/utils/runInjected'

console.log('NEBULA-EXTENSION CONNECTED')

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == 'install') {
    console.log('This is a first install!', details)

    const url = chrome.runtime.getURL('src/html/helpPage.html')
    const DEFAULT_OBJECT = {
      word_list: {},
      domains_list: {},
      blur_settings: {
        blur_degree: '50',
        blur_color: '#5cc9ff',
        effect: 'none',
        effect_color: '#ffffff',
        hover_behavior: 'none',
        show_word: false,
        show_category: false,
      },
      status: false,
      use_neuronet: false,
      neuronet_model: '',
      API_keys: {
        ChatGPT: '',
        GigaChat: '',
      },
    }

    chrome.storage.sync.set(DEFAULT_OBJECT)
    chrome.tabs.create({ url })
  }
})

//port messaging
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg, { sender }) => {
    if (msg.execute === 'execute?') {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const senderId = sender.tab.id
        const activeTabId = tabs[0]?.id
        const checkForInjecting = await runInjected(tabs[0], {
          dontCheckStatus: true,
        })
        if (senderId === activeTabId && checkForInjecting)
          port.postMessage({ answer: 'Yes' })
        else port.postMessage({ answer: 'No' })
      })
    }
  })
  // return true возможно не нужно, так как используется при одиночном сообщении
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
            answer: 'Inject',
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

//отслеживание выключения расширения
chrome.storage.sync.onChanged.addListener((changes) => {
  if (!changes.status) {
    return
  }
  const { newValue } = changes.status
  if (newValue === false) {
    chrome.tabs.query({}, async (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, { message: 'Remove' }, (response) => {
          console.log('Remove extension', response)
        })
      }
    })
  }
})

//общение с Pop-up
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
  return true
})

//отслеживание добавление/удаление домена из списка
chrome.storage.sync.onChanged.addListener((changes) => {
  if (!changes.domains_list) {
    return
  }

  const { newValue, oldValue } = changes.domains_list
  console.log('oldValue', oldValue)
  if (!oldValue) return
  const newArray = Object.keys(newValue)
  const oldArray = Object.keys(oldValue)
  const addingURL = newArray.length > oldArray.length
  const filteredURL = addingURL
    ? newArray.find((newURL) => !oldArray.includes(newURL))
    : oldArray.find((oldURL) => !newArray.includes(oldURL))

  chrome.tabs.query({}, async (tabs) => {
    for (let tab of tabs) {
      let tabURL = new URL(tab.url).origin
      if (tabURL === filteredURL) {
        if (!addingURL) {
          chrome.tabs.sendMessage(
            tab.id,
            { message: 'Remove this tab out of list' },
            (response) => {
              console.log('Add extension', response)
            }
          )
        } else {
          chrome.tabs.sendMessage(
            tab.id,
            { message: 'Add this tab into list' },
            (response) => {
              console.log('Remove extension', response)
            }
          )
        }
      }
    }
  })
})
