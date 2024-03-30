import React, { useEffect, useState } from 'react'
import { Dropdown } from '../components/Dropdown'

export const Popup = () => {
  const [category, setCategory] = useState([])
  const [value, setValue] = useState(false)
  const [word, setWord] = useState('')
  const [word_list, setWordList] = useState(null)

  useEffect(() => {
    chrome.storage.sync.get(['status']).then(({ status }) => {
      status && setValue(status)
    })
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.set({
        status: value,
      })
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [value])

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

  const addWord = async () => {
    console.log(1)
    if (word && category) {
      console.log(2)
      const { word_list } = await chrome.storage.sync.get(['word_list'])
      console.log('word_list', word_list)
      const list = word_list ? word_list[word] : null
      if (list) {
        category.forEach((category) => {
          if (list.includes(category)) return
          console.log('return is working')
          list.push(category)
        })
        await chrome.storage.sync.set({
          word_list: { ...word_list, [word]: list },
        })
        console.log('push word')
      } else {
        await chrome.storage.sync.set({
          word_list: { ...word_list, [word]: category },
        })
        console.log('push category')
      }
    }
    setCategory([])
  }

  return (
    <div className="body">
      <h1 className="title">Небула</h1>
      <div className="toggle">
        <div className="main-text">выкл</div>
        <div className="toggle-btn" id="_1st_toggle-btn">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => {
              setValue(e.target.checked)
              console.log(e.target.checked, 'value')
            }}
          />
          <span></span>
        </div>
        <div className="main-text">вкл</div>
      </div>
      <div className="links">
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
          onClick={() => {
            addWord
            console.log(1111)
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
