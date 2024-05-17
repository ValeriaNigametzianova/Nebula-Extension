import React, { useEffect, useState } from 'react'
import '../css/global/spoiler.css'
import '../css/global/buttons.css'
import '../css/pages/page.css'
import { parseHTML } from '../components/content/preparationForAnalyse/parseHTML'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'
import { URLExceptionsSetter } from '../components/content/preparationForAnalyse/URLExceptionsSetter'
import { hideText } from '../components/content/preparationForAnalyse/hideText'
import { useObserveAnalysePages } from '../components/content/hooks/useObserveAnalysePages'

export const Scripts = () => {
  const [wordList, setWordList] = useState(null)
  let elementsArray = []

  const [URLIncludes, setURLIncludes] = useState(false)
  const currentURL = window.location.href

  useLogAllKeys()
  useObserveAnalysePages(wordList)

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
    })
    URLExceptionsSetter(setURLIncludes, currentURL)
  }, [])

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.domains_list) {
          URLExceptionsSetter(setURLIncludes, currentURL)
        }
      }
    )
    return () => {
      chrome.storage.sync.onChanged.removeListener(storageListener)
    }
  }, [])

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    parseHTML(wordList, elementsArray)
    console.log(loading, wordList, elementsArray?.length)
    if (!loading && wordList && elementsArray?.length) {
      setLoading(true)
      hideText(elementsArray, wordList)
    }
  }, [wordList, elementsArray, loading])

  return null
}

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       {URLIncludes ? (
//         <></>
//       ) : (
//         <button
//           className="btn_red"
//           style={{
//             width: '300px',
//             padding: '10px 25px',
//             color: '#ffffff',
//             backgroundColor: '#f05365',
//             cursor: 'pointer',
//             fontFamily: 'Geologica',
//             fontSize: '20px',
//             marginTop: '20px',
//             marginBottom: '20px',
//             border: '0px',
//             borderRadius: '2px',
//             zIndex: '5',
//           }}
//           onClick={() => {
//             console.log('start hiding')
//             hideText(elementsArray)
//             console.log('end hiding')
//           }}
//         >
//           Замаскировать контент
//         </button>
//       )}
//     </div>
//   )
// }
