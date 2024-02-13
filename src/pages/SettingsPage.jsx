import React, { useEffect, useRef, useState } from 'react'
import { ListItem } from '../components/ListItem'
import { Dropdown } from '../components/Dropdown'
import { Slider } from '../components/Slider'
import { Prewiew } from '../components/Prewiew'
import { BlurColorPicker } from '../components/BlurColorPicker'

export const SettingsPage = () => {
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
      const list = word_list[word]

      if (list) {
        if (list.includes(category)) return
        list.push(category)
        await chrome.storage.sync.set({ word_list: { ...word_list, [word]: list } })
      } else await chrome.storage.sync.set({ word_list: { ...word_list, [word]: [category] } })
    }
  }

  return (
    <div className='wrapper_page'>
      <button className='help_button btn_red title'>?</button>
      <div className='left_side'>
        <div className='tabs'>
          <button className='title tab btn_black' id='btn_words'>
            Слова
          </button>
          <button className='title tab btn_black' id='btn_domens'>
            Домены
          </button>
          <button className='title tab btn_black' id='btn_wish'>
            Отложенные
          </button>
        </div>
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
                chrome.storage.sync.remove(['word_list'])
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
                Object.entries(word_list).map((el) => (
                  <ListItem key={el[0] + ' ' + el[1]} word={el[0]} category={el[1]} />
                ))
              ) : (
                <div>Load</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='right_side'>
        <div className='title Title'>Внешний вид</div>
        <Prewiew />
        <div className='levers'>
          <div className='blur_degree'>
            <div className='name mark'>Степень размытия</div>
            <Slider></Slider>
          </div>
          <div className='blur_color'>
            <div className='name mark'>Цвет размытия</div>
            <BlurColorPicker />
          </div>
          <div className='additional_effects'>
            <div className='name mark'>Дополнительные эффекты</div>
            <div className='effects_wrapper'>
              <button className='effect'></button>
              <button className='effect'></button>
              <button className='effect'></button>
              <button className='effect'></button>
              <button className='effect'></button>
              <button className='effect'></button>
              <button className='effect'></button>
            </div>
          </div>
          <div className='effects_color'>
            <div className='name mark'>Цвет эффекта</div>
            <div>
              <input id='colorpicker' type='color' />
            </div>
          </div>
          <div className='hover_behavior'>
            <div className='name mark'>Поведение при наведении</div>
            <div className='behavior_wrapper'>
              <button className='behavior btn_black'>Нет</button>
              <button className='behavior btn_black'>Размытие</button>
              <button className='behavior btn_black'>Зум</button>
              <button className='behavior btn_black'>Размытие</button>
              <button className='behavior btn_black'>Зум</button>
            </div>
          </div>
          <div className='show_options'>
            <div className='show_word'>
              <div className='name mark'>Показать слово</div>
              <div className='show_toggle' id='show_toggle'>
                <input type='checkbox' />
                <span></span>
              </div>
            </div>
            <div className='show_category'>
              <div className='name mark'>Показать категорию</div>
              <div className='show_toggle' id='show_toggle'>
                <input type='checkbox' />
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
