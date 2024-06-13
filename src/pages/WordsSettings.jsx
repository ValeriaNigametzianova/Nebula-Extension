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
  const sortingParameters = {
    dateCreated: 'По дате добавления',
    dateEdited: 'По дате изменения',
    alphabet: 'По алфавиту',
  }
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
      <div className="nebula_list_section">
        <div className="nebula_list_start_line">
          <div className="nebula_subtitle">Весь список слов</div>
          <div className="nebula_list_sorting">
            <button
              className="nebula_mark nebula_btn_black"
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? 'А-Я' : 'Я-А'}
            </button>
            <DropdownMenu
              onClick={setFilter}
              sortingParameters={sortingParameters}
            />
          </div>
        </div>
        <div className="nebula_list_header">
          <div className="nebula_word nebula_mark">Слово</div>
          <div className="nebula_category nebula_mark">Категории</div>
          <button
            className="nebula_mark nebula_btn_link"
            onClick={async () => {
              await chrome.storage.sync.remove(['word_list'])
            }}
          >
            Удалить все
          </button>
        </div>
        <div id="list" className="nebula_list">
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
            <div className="nebula_mark">Нет добавленных слов</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WordsSettings
