import { useEffect, useState } from 'react'
import '../css/global/spoiler.css'
import '../css/global/buttons.css'
import '../css/pages/page.css'
import { parseHTML } from '../components/content/preparationForAnalyse/parseHTML'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'
import { useHideText } from '../components/content/hooks/useHideText'
import { useObserveAnalysePages } from '../components/content/hooks/useObserveAnalysePages'

export const Scripts = () => {
  const [wordList, setWordList] = useState(null)
  let elementsArray = []
  const hideText = useHideText()

  useLogAllKeys()
  useObserveAnalysePages(wordList)

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
      setWordList(storage.word_list)
    })
  }, [])

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.word_list) {
          setWordList(event.word_list.newValue)
        }
        return () => {
          chrome.storage.sync.onChanged.removeListener(storageListener)
        }
      }
    )
  }, [])

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const currentWords = parseHTML(wordList, elementsArray)
    if (!loading && wordList && elementsArray?.length) {
      setLoading(true)
      hideText(elementsArray, currentWords, wordList)
    }
  }, [wordList, loading])

  return null
}
