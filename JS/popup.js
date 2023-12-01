const settingsButton = document.getElementById('btn_setting')
if (settingsButton) {
  settingsButton.addEventListener('click', (e) => {
    const url = chrome.runtime.getURL('/HTML/page.html')
    chrome.tabs.create({ url })
    window.close()
  })
}
