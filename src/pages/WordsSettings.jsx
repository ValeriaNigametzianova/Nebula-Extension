import React, { useEffect, useState } from 'react'
import { ListItem } from '../components/ListItem'
import { Dropdown } from '../components/Dropdown'

const WordsSettings = () => {
  const [word, setWord] = useState('')
  const [category, setCategory] = useState('')
  const [word_list, setWordList] = useState(null)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener((event) => {
      if (event.word_list) setWordList(event.word_list.newValue)
      chrome.storage.sync.get(null, (allkeys) => {
        console.log('allkeys: ', allkeys)
      })
      return () => {
        chrome.storage.sync.onChanged.removeListener(storageListener)
      }
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
      console.log('word_list', word_list)
    })
  }, [])

  const addWord = async () => {
    if (word && category) {
      const { word_list } = await chrome.storage.sync.get(['word_list'])
      console.log('word_list', word_list)
      const list = word_list ? word_list[word] : null
      if (list) {
        if (list.includes(category)) return
        list.push(category)
        await chrome.storage.sync.set({ word_list: { ...word_list, [word]: list } })
      } else await chrome.storage.sync.set({ word_list: { ...word_list, [word]: [category] } })
    }
  }

  return (
    <div className='wrapper_content'>
      <div className='add_word_section'>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className='input_page main-text'
          placeholder='Введите слово или фразу'
        ></input>
        <Dropdown state={category} setState={setCategory} className='dropdown_page main-text' />
        <button className='button-text add_button_page btn_red' onClick={addWord}>
          Добавить
        </button>
        <button
          className='button-text add_button_page btn_red'
          onClick={async (e) => {
            console.log(1)
            const keys = Object.keys(word_list)
            await chrome.storage.sync.remove(['word_list'])
            console.log(2, keys)
          }}
        >
          Удалить все
        </button>
      </div>
      <div className='list_section'>
        <div className='list_start_line'>
          <div className='list_title subtitle'>Весь список</div>
          <select name='' id='' className='select_dropdown mark'>
            <option value='films'>По дате добавления</option>
            <option value='games'>По алфавиту</option>
          </select>
        </div>
        <div className='list_header'>
          <div className='word mark'>Слово</div>
          <div className='category mark'>Категория</div>
        </div>
        <div id='list' className='list'>
          {word_list ? (
            Object.entries(word_list).map((el) => <ListItem key={el[0] + ' ' + el[1]} word={el[0]} category={el[1]} />)
          ) : (
            <div>Load</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WordsSettings
