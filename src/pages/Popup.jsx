import React from 'react'
import { Dropdown } from '../components/Dropdown'

export const Popup = () => {
  const [category, setCategory] = useState('')
  return (
    <div className='body'>
      <h1 className='title'>Небула</h1>
      <div className='toggle'>
        <div main-text>выкл</div>
        <div className='toggle-btn' id='_1st_toggle-btn'>
          <input type='checkbox' />
          <span></span>
        </div>
        <div main-text>вкл</div>
      </div>
      <div className='links'>
        <div
          className='btn btn_link popup-text'
          id='btn_setting'
          onClick={() => {
            const url = chrome.runtime.getURL('src/html/page.html')
            chrome.tabs.create({ url })
            window.close()
          }}
        >
          Перейти ко всем настройкам
        </div>
        <div className='btn btn_link popup-text'>Помощь</div>
      </div>
      <div className='add_word'>
        <div className='inputs'>
          <input type='text popup-text' className='input_popup' placeholder='Введите слово' />
          <Dropdown state={category} setState={setCategory} className='dropdown_popup' />
        </div>
        <button className='btn_red add_button_popup popup-button-text'>Добавить</button>
      </div>
    </div>
  )
}
