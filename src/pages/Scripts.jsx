import ReactDOM from 'react-dom/client'
import React, { useEffect, useState } from 'react'
import '../css/global/spoiler.css'
import '../css/global/buttons.css'
import '../css/pages/page.css'
import { HiddenBlock } from '../components/content/HiddenBlock'
import { AnalyseHTML, testRequest } from '../components/utils/http'
import { debounce } from '../components/utils/debounce'
import { getElementsArray } from '../components/content/preparationForAnalyse/getElementsArray'
import { parseHTML } from '../components/content/preparationForAnalyse/parseHTML'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'

export const Scripts = () => {
  const [wordList, setWordList] = useState(null)
  let elementsArray = []
  let newElementsArray = []
  const observeNode = document.getElementsByTagName('body')[0]
  const [URLIncludes, setURLIncludes] = useState(false)
  const currentURL = window.location.href
  const [domainList, setDomainsList] = useState(null)

  useLogAllKeys()

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
    })
    URLExceptionsSetter()
  }, [])

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.domains_list) {
          URLExceptionsSetter()
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
    console.log('params', loading, wordList, elementsArray?.length)
    if (!loading && wordList && !elementsArray?.length) {
      setLoading(true)
      console.log('hideText')
      hideText(elementsArray)
    }
  }, [wordList, elementsArray, loading])

  const URLExceptionsSetter = () => {
    chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
      setDomainsList(domains_list)

      // Если список доменов пустой, то досрочно выходим. Также убираем флаг URLIncluds
      if (Object.keys(domains_list).length === 0) {
        setURLIncludes(false)
        return
      }

      for (let key in domains_list) {
        if (currentURL.includes(key) || key.includes(currentURL)) {
          setURLIncludes(true)
        } else {
          setURLIncludes(false)
        }
      }
    })
  }

  let observer = new MutationObserver((mutations) => {
    mutations.map((el) => {
      if (el.addedNodes.length > 0) {
        const node = el.addedNodes[el.addedNodes.length - 1]

        if (
          node.textContent &&
          !newElementsArray.some((el) => node.isEqualNode(el))
        ) {
          let trust = false
          for (let word in wordList) {
            if (node.textContent.includes(word)) {
              trust = true
              console.log('node.textContent', node.textContent)
              return
            }
          }
          if (trust) getElementsArray(node, newElementsArray)
        }
      }
    })

    if (newElementsArray.length > 0) debouncedHideText(newElementsArray)
    // newElementsArray = []
  })

  observer.observe(observeNode, {
    childList: true,
    subtree: true,
  })

  const hideText = async (array) => {
    // const AIResponse = await AnalyseHTML(
    //   wordList,
    //   array.map((el) => el.textContent)
    // )
    const AIResponse = await testRequest(currentURL)
    // const AIResponse = Object.assign(
    //   {},
    //   elementsArray.map(() => true)
    // )

    for (let key in AIResponse) {
      if (AIResponse[key] === true) {
        const node = array[key]
        const oldParent = node.parentNode

        // создаем подкорень Реакта
        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'hidden_block_wrapper')
        wrapper.id = 'root ' + key
        oldParent?.replaceChild(wrapper, node)

        if (oldParent) {
          ReactDOM.createRoot(wrapper).render(
            <React.StrictMode>
              <HiddenBlock node={node} />
            </React.StrictMode>
          )
        } else return
      }
    }
    array = []
  }
  const debouncedHideText = debounce(hideText, 1000)
  // const debouncedHideText = debounce(
  //   (array) => console.log('array', array),
  //   1000
  // )

  // return null

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {URLIncludes ? (
        <></>
      ) : (
        <button
          className="btn_red"
          style={{
            width: '300px',
            padding: '10px 25px',
            color: '#fff',
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
          onClick={() => {
            console.log('start hiding')
            hideText(elementsArray)
            console.log('end hiding')
          }}
        >
          Замаскировать контент
        </button>
      )}
    </div>
  )
}
