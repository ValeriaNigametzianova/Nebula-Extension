import React, { useEffect, useState } from 'react'
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

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    parseHTML(wordList, elementsArray)
    if (!loading && wordList && elementsArray?.length) {
      setLoading(true)
      hideText(elementsArray, wordList)
    }
  }, [wordList, elementsArray, loading])

  // return null
  // }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        className="nebula_btn_red"
        style={{
          width: '300px',
          padding: '10px 25px',
          color: '#ffffff',
          backgroundColor: '#f05365',
          cursor: 'pointer',
          fontFamily: 'Geologica',
          fontSize: '20px',
          marginTop: '20px',
          marginBottom: '20px',
          border: '0px',
          borderRadius: '2px',
          zIndex: '5',
        }}
      >
        Замаскировать контент
      </button>
    </div>
  )
}
