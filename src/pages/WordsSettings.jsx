import React, { useEffect, useState } from 'react'
import { ListItem } from '../components/ListItem'
import { addWord } from '../components/utils/wordsUtils'
import { useSortList } from '../components/utils/sorting'
import { WordAdder } from '../components/WordAdder'
import { DropdownMenu } from '../components/DropdownMenu'

const WordsSettings = () => {
  const [word_list, setWordList] = useState(null)
  const [filter, setFilter] = useState('date')
  const [ascending, setAscending] = useState(true)

  const sortedWordList = useSortList(word_list, filter, ascending)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.word_list) {
          setWordList(event.word_list.newValue)
        }
      }
    )
    return () => {
      chrome.storage.sync.onChanged.removeListener(storageListener)
    }
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
        required
        multi
      />
      <div className="list_section">
        <div className="list_start_line">
          <div className="subtitle">Весь список слов</div>
          <div className="list_sorting">
            <button
              className="mark btn_black"
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? 'А-Я' : 'Я-А'}
            </button>
            <DropdownMenu
              onClick={setFilter}
              value_1={'date'}
              value_2={'alphabet'}
              option_1={'По дате добавления'}
              option_2={'По алфавиту'}
            />
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
          {sortedWordList.length > 0 ? (
            sortedWordList.map((word) => (
              <ListItem
                key={word + word_list[word].dateEdited}
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
