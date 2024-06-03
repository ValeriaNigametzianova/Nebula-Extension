import React, { useEffect, useRef, useState } from 'react'
import { Dots } from './effects/Dots'
import { Flowers } from './effects/Flowers'
import { ShowMaskedWord } from './content/ShowMaskedWord'

export const Prewiew = ({ blurColor, effectColor, value }) => {
  const [settings, setSettings] = useState(null)
  const [previewHeight, setPrewiewHeight] = useState(null)
  const [previewWidth, setPrewiewWigth] = useState(null)
  const [useNeuronet, setUseNeuronet] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.blur_settings) setSettings(event.blur_settings.newValue)

        return () => {
          chrome.storage.sync.onChanged.removeListener(storageListener)
        }
      }
    )
  }, [])

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
      storage?.blur_settings && setSettings(storage.blur_settings)
      storage?.use_neuronet && setUseNeuronet(storage.use_neuronet)
    })
  }, [])

  useEffect(() => {
    settings && setPrewiewSettings(settings)
  }, [settings])

  const setPrewiewSettings = (settings) => {
    ref.current.style.filter = settings
      ? `blur(${settings.blur_degree / 8}px)`
      : `blur(${value}px)`

    ref.current.style.backgroundColor = settings
      ? `${settings.blur_color}`
      : `${blurColor}`
    setPrewiewHeight(ref.current.offsetHeight)
    setPrewiewWigth(ref.current.offsetWidth)
  }

  return (
    <div className="nebula_preview_wrap">
      <div
        className={
          settings?.hover_behavior === 'zoom'
            ? 'effects_wrap zoom'
            : settings?.hover_behavior === 'blur'
              ? 'effects_wrap nebula_blur'
              : 'effects_wrap'
        }
      >
        <div className="nebula_preview" ref={ref}>
          <div className="nebula_main_text" style={{ padding: '10px' }}>
            ВАШИНГТОН, 12 фев — РИА Новости. Российская экономика развивается
            лучше, чем ожидалось, заявила первый заместитель главы
            Международного валютного фонда (МВФ) Гита Гопинат в интервью журналу
            Foreign Policy.
          </div>
        </div>
        {settings?.effect === 'dots_effect' ? (
          <Dots
            effectColor={settings ? settings?.effect_color : effectColor}
            previewHeight={previewHeight}
            previewWidth={previewWidth}
          />
        ) : null}
        {settings?.effect === 'flowers_effect' ? (
          <Flowers
            effectColor={settings ? settings?.effect_color : effectColor}
            previewHeight={previewHeight}
            previewWidth={previewWidth}
          />
        ) : null}
      </div>

      {useNeuronet ? (
        (settings?.show_word || settings?.show_category) && (
          <ShowMaskedWord
            word={'Субботник'}
            category={'Акция, Общество'}
            showWord={settings?.show_word}
            showCategory={settings?.show_category}
          ></ShowMaskedWord>
        )
      ) : (
        <></>
      )}
    </div>
  )
}
