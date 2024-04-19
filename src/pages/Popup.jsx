import React, { useEffect, useState } from 'react'
import { Dropdown } from '../components/Dropdown'
import { addWord } from '../components/utils/wordsUtils'
import { addDomain, deleteDomain } from '../components/utils/domainsUtils'

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

  useEffect(() => {
    chrome.storage.sync.get(['status']).then(({ status }) => {
      status && setIsWorked(status)
    })
    chrome.tabs
      .query({
        active: true,
      })
      .then((res) => {
        setCurrentURL(res[0].url)
        console.log(res[0].url, 'res')
      })
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
      for (let key in domains_list) {
        if (currentURL.includes(key) || key.includes(currentURL)) {
          setWhiteURL(true)
          return
        } else {
          setWhiteURL(false)
        }
      }
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
        chrome.storage.sync.get(null, (allkeys) => {
          console.log('allkeys: ', allkeys)
        })
        return () => {
          chrome.storage.sync.onChanged.removeListener(storageListener)
        }
      }
    )
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
      console.log('word_list', word_list)
    })
  }, [])

  return (
    <div className="body">
      <h1 className="title">Небула</h1>
      <div className="toggle">
        <div className="main-text">выкл</div>
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
        <div className="main-text">вкл</div>
      </div>
      <div className="links">
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>Доверять этому сайту</div>
          <input
            type="checkbox"
            style={{ height: '20px', width: '20px' }}
            checked={whiteURl}
            onChange={(e) => {
              setWhiteURL(e.target.checked)
              if (e.target.checked) addDomain(currentURL, '')
              else deleteDomain(currentURL)
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
          <Dropdown
            state={category}
            setState={setCategory}
            className="dropdown_popup input_popup"
          />
        </div>
        <button
          className="btn_red add_button_popup popup-button-text"
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
