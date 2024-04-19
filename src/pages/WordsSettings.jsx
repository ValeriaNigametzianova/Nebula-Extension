import React, { useEffect, useMemo, useState } from 'react'
import { ListItem } from '../components/ListItem'
import { Dropdown } from '../components/Dropdown'
import { addWord } from '../components/utils/wordsUtils'
import { useSortList } from '../components/utils/sorting'

const WordsSettings = () => {
  const [word, setWord] = useState('')
  const [category, setCategory] = useState([])
  const [word_list, setWordList] = useState(null)
  const [filter, setFilter] = useState('date')
  const [ascending, setAscending] = useState(true)

  const sortedWordList = useSortList(word_list, filter, ascending)

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
    })
  }, [])

  return (
    <div className="wrapper_content">
      <div className="add_word_section">
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="input_page main-text"
          placeholder="Введите слово или фразу"
        ></input>
        <Dropdown
          state={category}
          setState={setCategory}
          className="input_page"
        />
        <button
          className="button-text add_button_page btn_red"
          onClick={() => {
            addWord(word, category)
            setWord('')
            setCategory([])
          }}
        >
          Добавить
        </button>
        <button
          className="button-text add_button_page btn_red"
          onClick={async (e) => {
            await chrome.storage.sync.remove(['word_list'])
          }}
        >
          Удалить все
        </button>
      </div>
      <div className="list_section">
        <div className="list_start_line">
          <div className="list_title subtitle">Весь список</div>
          <div className="list_sorting">
            <button
              className="btn_black"
              style={{ borderRadius: '2px' }}
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? 'A-Z' : 'Z-A'}
            </button>
            <select
              className="select_dropdown mark"
              onClick={(e) => setFilter(e.target.value)}
            >
              <option value="date">По дате добавления</option>
              <option value="alphabet">По алфавиту</option>
            </select>
          </div>
        </div>
        <div className="list_header">
          <div className="word mark">Слово</div>
          <div className="category mark">Категория</div>
        </div>
        <div id="list" className="list">
          {word_list ? (
            sortedWordList.map((word) => (
              <ListItem
                key={word}
                word={word}
                categories={word_list[word].categories}
                word_list={word_list}
              />
            ))
          ) : (
            <div>Load</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WordsSettings
