export const runInjected = async (tab, { dontCheckStatus } = {}) => {
  if (!tab) return false
  const currentURL = tab.url
  let whiteURL = false

  const { domains_list } = await chrome.storage.sync.get(['domains_list'])
  const currentOrigin = new URL(currentURL).origin
  for (let key in domains_list) {
    if (key.includes(currentOrigin)) {
      whiteURL = true
      break
    } else {
      whiteURL = false
    }
  }

  const { status } = await chrome.storage.sync.get()
  if (!whiteURL && status && (dontCheckStatus || tab.status === 'complete')) {
    return true
  } else {
    return false
  }
}
