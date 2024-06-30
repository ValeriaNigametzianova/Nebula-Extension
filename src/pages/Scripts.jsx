import { useEffect, useState } from 'react'
import '../css/global/spoiler.css'
import '../css/global/buttons.css'
import '../css/pages/page.css'
import { parseHTML } from '../components/content/preparationForAnalyse/parseHTML'
import { useHideText } from '../components/content/hooks/useHideText'
import { useObserveAnalysePages } from '../components/content/hooks/useObserveAnalysePages'
import { removeTargetMasks } from '../components/utils/removeTargetMasks'

export const Scripts = () => {
  const [wordList, setWordList] = useState(null)
  let elementsArray = []
  const hideText = useHideText()

  useObserveAnalysePages(wordList)

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
      setWordList(storage.word_list)
    })
  }, [])

  useEffect(() => {
    const storageListener = (event) => {
      if (!event.word_list) return
      setWordList(event.word_list.newValue)

      const { newValue, oldValue } = event.word_list
      if (!oldValue) return
      const newArray = Object.keys(newValue)
      const oldArray = Object.keys(oldValue)
      const addingWord = newArray.length > oldArray.length
      const filteredWord = addingWord
        ? newArray.find((newWord) => !oldArray.includes(newWord))
        : oldArray.find((oldWord) => !newArray.includes(oldWord))
      if (!addingWord) {
        removeTargetMasks(oldValue[filteredWord])
      }
    }
    chrome.storage.sync.onChanged.addListener(storageListener)
    return () => {
      chrome.storage.sync.onChanged.removeListener(storageListener)
    }
  }, [])

  useEffect(() => {
    let currentWords = parseHTML(wordList, elementsArray)
    if (wordList && elementsArray?.length) {
      hideText(elementsArray, currentWords, wordList)
      elementsArray = []
      currentWords = []
    }
  }, [wordList])

  return null
}
