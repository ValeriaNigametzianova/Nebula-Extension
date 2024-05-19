import React, { useEffect, useState } from 'react'
import { Prewiew } from '../components/Prewiew'
import { Slider } from '../components/Slider'
import { EffectsPanel } from '../components/EffectsPanel'
import { ColorPicker } from '../components/ColorPicker'
import { HoverBehaviorPanel } from '../components/HoverBehaviorPanel'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'
import { SmallToggleButton } from '../components/SmallToggleButton'
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
          <ColorPicker
            parameter={blurColor}
            setParameter={setBlurColor}
            parameterName={'blur_color'}
          />
        </div>
        <div className="additional_effects">
          <div className="name mark">Дополнительные эффекты</div>
          <EffectsPanel effect={effect} setEffect={setEffect} />
        </div>
        <div className="effects_color">
          <div className="name mark">Цвет эффекта</div>
          <ColorPicker
            parameter={effectColor}
            setParameter={setEffectColor}
            parameterName={'effect_color'}
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
          <SmallToggleButton title={'Показать слово'} className={'show_word'} />
          <SmallToggleButton
            title={'Показать категорию'}
            className={'show_category'}
          />
        </div>
        <button className="reset_button mark btn_link" onClick={resetSettings}>
          Сбросить все
        </button>
      </div>
    </div>
  )
}