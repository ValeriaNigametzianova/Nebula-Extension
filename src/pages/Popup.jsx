import React, { useEffect, useRef, useState } from 'react'
import { addWord } from '../components/utils/wordsUtils'
import { addDomain, deleteDomain } from '../components/utils/domainsUtils'
import { TagAdderInput } from '../components/TagAdder/TagAdderInput'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'

// const getCurrentURL = async () => {
//   return await
// }

export const Popup = () => {
  const [category, setCategory] = useState([])
  const [word, setWord] = useState('')
  const [word_list, setWordList] = useState(null)
  const [isWorked, setIsWorked] = useState(false)
  const [whiteURl, setWhiteURL] = useState(false)
  const [currentURL, setCurrentURL] = useState('')

  const checkboxRef = useRef(null)
  chrome.runtime.onMessage.addListener((request) => {
    console.log('get status', request)
  })
  useEffect(() => {
    function listener(activeInfo) {
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        setCurrentURL(tab.url)
      })
    }
    chrome.tabs.onActivated.addListener(listener)

    chrome.storage.sync.get(['status']).then(({ status }) => {
      status && setIsWorked(status)
    })

    return () => {
      chrome.tabs.onActivated.removeListener(listener)
    }
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
      for (let key in domains_list) {
        const currentOrigin = new URL(currentURL).origin
        if (key.includes(currentOrigin)) {
          console.log('yes')
          setWhiteURL(true)
        } else {
          console.log('no')
          setWhiteURL(false)
        }
      }
    })
  }, [currentURL])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.set({
        status: isWorked,
      })
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [isWorked])

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.word_list) setWordList(event.word_list.newValue)
        if (event.status) setIsWorked(event.status.newValue)
        return () => {
          chrome.storage.sync.onChanged.removeListener(storageListener)
        }
      }
    )
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
    })
  }, [])

  return (
    <div className="body">
      <h1 className="title">Небула</h1>
      <div className="toggle">
        <div className="main_text">выкл</div>
        <div className="toggle-btn" id="_1st_toggle-btn">
          <input
            className="checkbox_input"
            type="checkbox"
            checked={isWorked}
            onChange={(e) => {
              setIsWorked(e.target.checked)
            }}
          />
          <span></span>
        </div>
        <div className="main_text">вкл</div>
      </div>
      <div className="links">
        <div style={{ display: 'flex', gap: '10px' }}>
          <div
            className="btn btn_link popup-text"
            onClick={(checkboxRef) => {
              console.log(checkboxRef.current.checked, 'checkboxRef.current')
              // setWhiteURL(checkboxRef.current.checked)
              // if (checkboxRef.current.checked) addDomain(currentURL, '')
              // else deleteDomain(currentURL)
            }}
          >
            Доверять этому сайту
          </div>
          <input
            ref={checkboxRef}
            className="checkbox_popup"
            type="checkbox"
            checked={whiteURl}
            onChange={async (e) => {
              console.log('e.target.checked', e.target.checked)
              setWhiteURL(!whiteURl)
              if (e.target.checked) await addDomain(currentURL, '')
              else await deleteDomain(currentURL)
            }}
          >
            {console.log('whiteURl', whiteURl)}
          </input>
        </div>
        <div
          className="btn btn_link popup-text"
          id="btn_setting"
          onClick={() => {
            const url = chrome.runtime.getURL('src/html/page.html')
            chrome.tabs.create({ url })
            window.close()
          }}
        >
          Перейти ко всем настройкам
        </div>
        <div className="btn btn_link popup-text">Помощь</div>
      </div>
      <div className="add_word">
        <div className="inputs">
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="input_popup"
            placeholder="Введите слово"
          />
          <TagAdderInput
            state={category}
            setState={setCategory}
            className={'tagAdderInput_popup'}
          />
        </div>
        <button
          className="btn_red add_button_popup popup_button_text"
          onClick={async () => {
            await addWord(word, category)
            setWord('')
            setCategory([])
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
