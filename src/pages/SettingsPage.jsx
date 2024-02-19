import React, { useEffect, useState } from 'react'
import { Slider } from '../components/Slider'
import { Prewiew } from '../components/Prewiew'
import { BlurColorPicker } from '../components/BlurColorPicker'
import WordsSettings from './WordsSettings'
import DomensSettings from './DomainsSettings'

export const SettingsPage = () => {
  const [activePage, setActivePage] = useState('btn_words')
  const [wordButton, setWordButton] = useState(true)
  const [domainButton, setDomainButton] = useState(false)

  return (
    <div className="wrapper_page">
      <button className="help_button btn_red title">?</button>
      <div className="left_side">
        <div className="tabs">
          <button
            className={
              wordButton ? 'title tab btn_black_select' : 'title tab btn_black'
            }
            id="btn_words"
            onClick={(e) => {
              setActivePage(e.target.id)
              setWordButton(!wordButton)
              setDomainButton(!domainButton)
            }}
          >
            Слова
          </button>
          <button
            className={
              domainButton
                ? 'title tab btn_black_select'
                : 'title tab btn_black'
            }
            id="btn_domains"
            onClick={(e) => {
              setActivePage(e.target.id)
              setDomainButton(!domainButton)
              setWordButton(!wordButton)
            }}
          >
            Домены
          </button>
        </div>
        {activePage == 'btn_words' && <WordsSettings />}
        {activePage == 'btn_domains' && <DomensSettings />}
      </div>

      <div className="right_side">
        <div className="title Title">Внешний вид</div>
        <Prewiew />
        <div className="levers">
          <div className="blur_degree">
            <div className="name mark">Степень размытия</div>
            <Slider></Slider>
          </div>
          <div className="blur_color">
            <div className="name mark">Цвет размытия</div>
            <BlurColorPicker />
          </div>
          <div className="additional_effects">
            <div className="name mark">Дополнительные эффекты</div>
            <div className="effects_wrapper">
              <button className="effect"></button>
              <button className="effect"></button>
              <button className="effect"></button>
              <button className="effect"></button>
              <button className="effect"></button>
              <button className="effect"></button>
              <button className="effect"></button>
            </div>
          </div>
          <div className="effects_color">
            <div className="name mark">Цвет эффекта</div>
            <div>
              <input id="colorpicker" type="color" />
            </div>
          </div>
          <div className="hover_behavior">
            <div className="name mark">Поведение при наведении</div>
            <div className="behavior_wrapper">
              <button className="behavior btn_black">Нет</button>
              <button className="behavior btn_black">Размытие</button>
              <button className="behavior btn_black">Зум</button>
              <button className="behavior btn_black">Размытие</button>
              <button className="behavior btn_black">Зум</button>
            </div>
          </div>
          <div className="show_options">
            <div className="show_word">
              <div className="name mark">Показать слово</div>
              <div className="show_toggle" id="show_toggle">
                <input type="checkbox" />
                <span></span>
              </div>
            </div>
            <div className="show_category">
              <div className="name mark">Показать категорию</div>
              <div className="show_toggle" id="show_toggle">
                <input type="checkbox" />
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
