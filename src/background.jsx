console.log('CONNECTED')

chrome.storage.sync.onChanged.addListener((event) => {
  if (event.status) {
    if (event.status.newValue == false) chrome.action.disable()
    else chrome.action.enable()
    console.log(event.status, 'event status')
  }
})
