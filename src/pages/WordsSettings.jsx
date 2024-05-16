import React, { useEffect, useState } from 'react'
import { ListItem } from '../components/ListItem'
import { TagAdderInput } from '../components/TagAdder/TagAdderInput'
import { addWord } from '../components/utils/wordsUtils'
import { useSortList } from '../components/utils/sorting'
import { WordAdder } from '../components/WordAdder'

const WordsSettings = () => {
  const [word_list, setWordList] = useState(null)
  const [filter, setFilter] = useState('date')
  const [ascending, setAscending] = useState(true)

  const sortedWordList = useSortList(word_list, filter, ascending)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.word_list) setWordList(event.word_list.newValue)
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
    <div>
      <WordAdder
        subtitle="Добавьте слово, которое следует замаскировать"
        placeholder="Введите слово или фразу"
        onSubmit={(word, categories) => {
          addWord(word, categories)
        }}
        multi
      />
      <div className="list_section">
        <div className="list_start_line">
          <div className="subtitle">Весь список слов</div>
          <div className="list_sorting">
            <button
              className="btn_black mark"
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? 'А-Я' : 'Я-А'}
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
          <div className="category mark">Категории</div>
          <button
            className="mark btn_link"
            onClick={async () => {
              await chrome.storage.sync.remove(['word_list'])
            }}
          >
            Удалить все
          </button>
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
            <div className="mark">Нет добавленных слов</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WordsSettings
