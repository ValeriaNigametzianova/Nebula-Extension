import { useEffect } from 'react'

export const useLogAllKeys = () => {
  useEffect(() => {
    chrome.storage.sync.get(null, (allkeys) => {
      console.log('allkeys: ', allkeys)
    })
  })
}
