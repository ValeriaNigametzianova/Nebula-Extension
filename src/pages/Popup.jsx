import React, { useEffect, useRef, useState } from 'react'
import { addWord } from '../components/utils/wordsUtils'
import { addDomain, deleteDomain } from '../components/utils/domainsUtils'
import { TagAdderInput } from '../components/TagAdder/TagAdderInput'

export const Popup = () => {
  const [category, setCategory] = useState([])
  const [word, setWord] = useState('')
  const [setWordList] = useState(null)
  const [isWorked, setIsWorked] = useState(false)
  const [whiteURl, setWhiteURL] = useState(false)
  const [currentURL, setCurrentURL] = useState('')
  const checkboxRef = useRef(null)

  useEffect(() => {
    chrome.storage.sync.get(['status']).then(({ status }) => {
      status && setIsWorked(status)
    })

    chrome.runtime.sendMessage(
      {
        message: 'Send me an activeTab',
      },
      (response) => {
        console.log(response)
      }
    )
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'Send you activeTabURL') {
        const activeTabURL = request.activeTabURL
        setCurrentURL(activeTabURL)
        chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
          const currentOrigin = new URL(activeTabURL).origin
          for (let key in domains_list) {
            if (key.includes(currentOrigin)) {
              setWhiteURL(true)
              console.log(1)
              break
            } else {
              console.log(2)
              continue
            }
          }
          sendResponse('I got activeTabURL')
        })
      }
      return true
    })
  }, [])

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

  return (
    <div className="body_popup">
      <h1 className="nebula_title">Небула</h1>
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
          <div className="btn btn_link popup-text">Доверять этому сайту</div>
          <input
            ref={checkboxRef}
            className="checkbox_popup"
            type="checkbox"
            checked={whiteURl}
            onChange={async (e) => {
              setWhiteURL(!whiteURl)
              if (e.target.checked) {
                console.log('addDomain', currentURL)
                await addDomain(currentURL, '')
              } else {
                console.log('deleteDomain', currentURL)
                await deleteDomain(currentURL)
              }
            }}
          ></input>
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
        <div
          className="btn btn_link popup-text"
          onClick={() => {
            const url = chrome.runtime.getURL('src/html/helpPage.html')
            chrome.tabs.create({ url })
            window.close()
          }}
        >
          Помощь
        </div>
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
