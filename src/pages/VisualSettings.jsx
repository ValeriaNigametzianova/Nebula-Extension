import React, { useEffect, useState } from 'react'
import { Prewiew } from '../components/Prewiew'
import { Slider } from '../components/Slider'
import { BlurColorPicker } from '../components/BlurColorPicker'
import { EffectsPanel } from '../components/EffectsPanel'
import { EffectsColorPicker } from '../components/EffectsColorPicker'
import { HoverBehaviorPanel } from '../components/HoverBehaviorPanel'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'
const DEFAULT_OBJECT = {
  blur_degree: '50',
  blur_color: '#5cc9ff',
  effect_color: '#ffffff',
  effect: 'none',
  hoverBehavior: 'none',
}

export const VisualSettings = () => {
  const [blurColor, setBlurColor] = useState(DEFAULT_OBJECT.blur_color)
  const [effectColor, setEffectColor] = useState(DEFAULT_OBJECT.effect_color)
  const [value, setValue] = useState(DEFAULT_OBJECT.blur_degree)
  const [effect, setEffect] = useState(DEFAULT_OBJECT.effect)
  const [hoverBehavior, setHoverBehavior] = useState(DEFAULT_OBJECT.effect)

  useLogAllKeys()

  const resetSettings = async () => {
    await chrome.storage.sync.set({
      blur_settings: DEFAULT_OBJECT,
    })
    setBlurColor(DEFAULT_OBJECT.blur_color)
    setEffectColor(DEFAULT_OBJECT.effect_color)
    setValue(DEFAULT_OBJECT.blur_degree)
    setEffect(DEFAULT_OBJECT.effect)
    setHoverBehavior(DEFAULT_OBJECT.hoverBehavior)
  }

  return (
    <div>
      <div className="nebula_title">Внешний вид</div>
      <Prewiew blurColor={blurColor} effectColor={effectColor} value={value} />
      <div className="levers">
        <div className="blur_degree">
          <div className="name mark">Степень размытия</div>
          <Slider value={value} setValue={setValue}></Slider>
        </div>
        <div className="blur_color">
          <div className="name mark">Цвет размытия</div>
          <BlurColorPicker blurColor={blurColor} setBlurColor={setBlurColor} />
        </div>
        <div className="additional_effects">
          <div className="name mark">Дополнительные эффекты</div>
          <EffectsPanel effect={effect} setEffect={setEffect} />
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
          <HoverBehaviorPanel
            hoverBehavior={hoverBehavior}
            setHoverBehavior={setHoverBehavior}
          />
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
        <button className="reset_button mark btn_link" onClick={resetSettings}>
          Сбросить все
        </button>
      </div>
    </div>
  )
}
