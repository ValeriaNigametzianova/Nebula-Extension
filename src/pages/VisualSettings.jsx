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
  show_word: false,
  show_category: false,
}

export const VisualSettings = () => {
  const [blurColor, setBlurColor] = useState(DEFAULT_OBJECT.blur_color)
  const [effectColor, setEffectColor] = useState(DEFAULT_OBJECT.effect_color)
  const [value, setValue] = useState(DEFAULT_OBJECT.blur_degree)
  const [effect, setEffect] = useState(DEFAULT_OBJECT.effect)
  const [hoverBehavior, setHoverBehavior] = useState(DEFAULT_OBJECT.effect)
  const [showWord, setShowWord] = useState(DEFAULT_OBJECT.show_word)
  const [showCategory, setShowCategory] = useState(DEFAULT_OBJECT.show_category)
  const [useNeuronet, setUseNeuronet] = useState(false)

  useLogAllKeys()

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
      storage?.use_neuronet && setUseNeuronet(storage.use_neuronet)
      storage?.blur_settings?.show_word &&
        setShowWord(storage.blur_settings.show_word)
      storage?.blur_settings?.show_category &&
        setShowCategory(storage.blur_settings.show_category)
    })
  }, [])

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.use_neuronet) {
          setUseNeuronet(event.use_neuronet.newValue)
          setShowWord(false)
          setShowCategory(false)
          chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
            chrome.storage.sync.set({
              blur_settings: {
                ...blur_settings,
                show_word: false,
                show_category: false,
              },
            })
          )
        }
        return () => {
          chrome.storage.sync.onChanged.removeListener(storageListener)
        }
      }
    )
  }, [])

  const showWordToggleHandler = (value) => {
    console.log(value)
    setShowWord(value)
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
      chrome.storage.sync.set({
        blur_settings: { ...blur_settings, show_word: value },
      })
    )
  }

  const showCategoryToggleHandler = (value) => {
    setShowCategory(value)
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
      chrome.storage.sync.set({
        blur_settings: { ...blur_settings, show_category: value },
      })
    )
  }

  const resetSettings = async () => {
    await chrome.storage.sync.set({
      blur_settings: DEFAULT_OBJECT,
    })
    setBlurColor(DEFAULT_OBJECT.blur_color)
    setEffectColor(DEFAULT_OBJECT.effect_color)
    setValue(DEFAULT_OBJECT.blur_degree)
    setEffect(DEFAULT_OBJECT.effect)
    setHoverBehavior(DEFAULT_OBJECT.hoverBehavior)
    setShowWord(DEFAULT_OBJECT.show_word)
    setShowCategory(DEFAULT_OBJECT.show_category)
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
          <SmallToggleButton
            title={'Показать слово'}
            className={'show_word'}
            value={showWord}
            setValue={showWordToggleHandler}
            tooltip="Недоступно без использования нейросети"
            disabled={!useNeuronet}
          />
          <SmallToggleButton
            title={'Показать категорию'}
            className={'show_category'}
            value={showCategory}
            setValue={showCategoryToggleHandler}
            tooltip="Недоступно без использования нейросети"
            disabled={!useNeuronet}
          />
        </div>
        <button className="reset_button mark btn_link" onClick={resetSettings}>
          Сбросить все
        </button>
      </div>
    </div>
  )
}
