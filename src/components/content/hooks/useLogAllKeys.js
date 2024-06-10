import { useEffect } from 'react'
function getAllKeys() {
  chrome.storage.sync.get(null, (allkeys) => {
    console.log('allkeys: ', allkeys)
  })
}
export const useLogAllKeys = () => {
  useEffect(() => {
    chrome.storage.sync.onChanged.addListener(getAllKeys)

    return () => {
      chrome.storage.sync.onChanged.removeListener(getAllKeys)
    }
  }, [])
}
