import { useEffect, useState } from 'react'
import { getElementsArray } from '../preparationForAnalyse/getElementsArray'
import { useHideText } from './useHideText'
import { transliterate } from '../preparationForAnalyse/transliterate'
import { hasNebulaClassName } from '../../utils/hasNebulaClassName'
import { getDirectTextContent } from '../../utils/getDirectTextContent'
import { debounce } from '../../utils/debounce'

export const useObserveAnalysePages = (wordList) => {
  const [isWorked, setIsWorked] = useState(false)
  const hideText = useHideText()
  let currentWords = new Set()
  let observer

  useEffect(() => {
    const storageListener = (event) => {
      if (event.status) setIsWorked(event.status.newValue)
    }
    chrome.storage.sync.onChanged.addListener(storageListener)
    return () => {
      chrome.storage.sync.onChanged.removeListener(storageListener)
    }
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['status']).then(({ status }) => {
      status && setIsWorked(status)
    })
  }, [])

  useEffect(() => {
    if (isWorked) {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === 'Add this tab into list') {
          observer.disconnect()
          observer = null
          sendResponse('I`v been removed')
        }
        return true
      })
    }
  }, [isWorked])

  useEffect(() => {
    const storageListener = (event) => {
      if (!event.status) return
      if (event.status.newValue === false) {
        if (observer) {
          observer.disconnect()
          observer = null
        }
      }
    }
    chrome.storage.sync.onChanged.addListener(storageListener)
    return () => {
      chrome.storage.sync.onChanged.removeListener(storageListener)
    }
  }, [])

  useEffect(() => {
    const observeNode = document.getElementsByTagName('body')[0]
    let newElementsArray = []

    const inspectNode = (node) => {
      if (hasNebulaClassName(node)) return
      if (hasNebulaClassName(node.parentNode)) return

      const completeNode = hideNode(node)
      if (completeNode) return

      const childsArray = node.childNodes
      if (!childsArray.length) return

      childsArray.forEach((child) => {
        inspectNode(child)
      })
    }

    const hideNode = (node) => {
      if (
        node.textContent &&
        !newElementsArray.some((el) => node.isEqualNode(el))
      ) {
        for (let word in wordList) {
          const stemms = wordList[word].stemms
          const transliteration = transliterate(stemms)
          if (stemms) {
            for (let i = 0; i < stemms.length; i++) {
              const stemma = stemms[i]
              const transliterateWord = transliteration[i]
              if (
                getDirectTextContent(node).includes(stemma) ||
                getDirectTextContent(node).includes(transliterateWord)
              ) {
                const textIncudeWord = getElementsArray(node, newElementsArray)
                if (textIncudeWord) {
                  currentWords.add(word)
                }
                return true
              }
            }
          }
        }
      }
      return false
    }

    const mutationCallback = (mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes.length) return
        mutation.addedNodes.forEach((node) => {
          inspectNode(node)
        })
      })
      if (newElementsArray.length > 0 && isWorked) {
        debouncedHideText(newElementsArray, currentWords, wordList)
        newElementsArray = []
      }
    }
    observer = new MutationObserver(mutationCallback)

    observer.observe(observeNode, {
      childList: true,
      subtree: true,
    })

    const debouncedHideText = debounce(hideText, 1000)

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [wordList, hideText])
}
