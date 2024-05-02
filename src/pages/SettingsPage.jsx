import React, { useEffect, useRef, useState } from 'react'
import { Slider } from '../components/Slider'
import { Prewiew } from '../components/Prewiew'
import { BlurColorPicker } from '../components/BlurColorPicker'
import WordsSettings from './WordsSettings'
import DomainsSettings from './DomainsSettings'
import { EffectsColorPicker } from '../components/EffectsColorPicker'
import { EffectsPanel } from '../components/EffectsPanel'
import { HoverBehaviorPanel } from '../components/HoverBehaviorPanel'
import { useResize } from '../components/content/hooks/useResize'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'

export const SettingsPage = () => {
  const rightSideRef = useRef(null)
  const { height } = useResize()
  const [activePage, setActivePage] = useState('btn_words')
  const [wordButton, setWordButton] = useState(true)
  const [domainButton, setDomainButton] = useState(false)
  const [blurColor, setBlurColor] = useState('#5cc9ff')
  const [effectColor, setEffectColor] = useState('#fff')
  const [value, setValue] = useState('50')

  const DEFAULT_OBJECT = {
    blur_degree: '50',
    blur_color: '#5cc9ff',
    effect_color: '#fff',
    effect: 'none',
  }
  useEffect(() => {
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) => {
      blur_settings?.blur_degree && setValue(blur_settings.blur_degree)
    })
  }, [])

  useLogAllKeys()

  const resetSettings = async () => {
    await chrome.storage.sync.set({
      blur_settings: DEFAULT_OBJECT,
    })
    setBlurColor(DEFAULT_OBJECT.blur_color)
    setEffectColor(DEFAULT_OBJECT.effect_color)
    setValue(DEFAULT_OBJECT.blur_degree)
    setValue(DEFAULT_OBJECT.effect)
  }

  return (
    <div className="wrapper_page">
      <button
        className="btn_red"
        style={{
          width: '300px',
          padding: '10px 25px',
          color: '#fff',
          backgroundColor: '#f05365',
          cursor: 'pointer',
          fontFamily: 'Geologica',
          fontSize: '20px',
          marginTop: '20px',
          marginBottom: '20px',
          border: '0px',
          borderRadius: '2px',
        }}
        onClick={() => {
          fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
            method: 'POST',
            // maxBodyLength: Infinity,
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
              Rquid: self.crypto.randomUUID().toString(),
              Authorization:
                'Basic MWY1OWNlYTctMjgwMi00ZDY5LTk0MzgtYjRlOTg2YWIwNjhmOmFjMmMwMjIzLTYwMGYtNGU2Ny05MjEyLTgxMDUwZGFlNTQwMw==',
            },
            body: new URLSearchParams({
              scope: 'GIGACHAT_API_PERS',
            }),
          }).then((response) => {
            console.log(response, 'gchat response')
            console.log(JSON.stringify(response))
            return JSON.parse(response.choises[0].message.content)
          })
        }}
      >
        Замаскировать контент
      </button>
      <button className="help_button btn_red title">?</button>
      <div className="left_side">
        <div className="tabs">
          <button
            className={wordButton ? 'title btn_tab tab' : 'title btn_tab tab'}
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
            className={domainButton ? 'title btn_tab tab' : 'title btn_tab tab'}
            id="btn_domains"
            onClick={(e) => {
              setActivePage(e.target.id)
              setDomainButton(!domainButton)
              setWordButton(!wordButton)
            }}
          >
            Домены
          </button>
          <div className="active_line">
            {activePage === 'btn_words' ? <></> : <div className="tr"></div>}
          </div>
        </div>
        {activePage == 'btn_words' && <WordsSettings />}
        {activePage == 'btn_domains' && <DomainsSettings />}
      </div>

      <div
        ref={rightSideRef}
        className="right_side"
        style={
          rightSideRef?.current?.scrollHeight >= height
            ? { position: 'absolute' }
            : { position: 'fixed' }
        }
      >
        <div className="title">Внешний вид</div>
        <Prewiew
          blurColor={blurColor}
          effectColor={effectColor}
          value={value}
        />
        <div className="levers">
          <div className="blur_degree">
            <div className="name mark">Степень размытия</div>
            <Slider value={value} setValue={setValue}></Slider>
          </div>
          <div className="blur_color">
            <div className="name mark">Цвет размытия</div>
            <BlurColorPicker
              blurColor={blurColor}
              setBlurColor={setBlurColor}
            />
          </div>
          <div className="additional_effects">
            <div className="name mark">Дополнительные эффекты</div>
            <EffectsPanel />
          </div>
          <div className="effects_color">
            <div className="name mark">Цвет эффекта</div>
            <EffectsColorPicker
              effectColor={effectColor}
              setEffectColor={setEffectColor}
            />
          </div>
          <div className="hover_behavior">
            <div className="name mark">Поведение при наведении</div>
            <HoverBehaviorPanel />
          </div>
          <div className="show_options">
            <div className="show_word">
              <div className="name mark">Показать слово</div>
              <div className="show_toggle" id="show_toggle">
                <input className="checkbox_input" type="checkbox" />
                <span></span>
              </div>
            </div>
            <div className="show_category">
              <div className="name mark">Показать категорию</div>
              <div className="show_toggle" id="show_toggle">
                <input className="checkbox_input" type="checkbox" />
                <span></span>
              </div>
            </div>
          </div>
          <button
            className="reset_button mark btn_link"
            onClick={resetSettings}
          >
            Сбросить все
          </button>
        </div>
      </div>
    </div>
  )
}
