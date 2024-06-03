import React, { useEffect } from 'react'
import { Dots_1 } from '../images/dots/svg/1'
import { Flower_1 } from '../images/flowers/svg/1'

export const EffectsPanel = ({ effect, setEffect }) => {
  // const [currentEffect, setCurrentEffect] = useState(effect)

  useEffect(() => {
    chrome.storage.sync
      .get(['blur_settings'])
      .then(
        ({ blur_settings }) =>
          blur_settings?.effect && setEffect(blur_settings.effect)
      )
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
        chrome.storage.sync.set({
          blur_settings: { ...blur_settings, effect: effect },
        })
      )
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [effect])

  return (
    <div className="nebula_effects_wrapper">
      <div
        className={
          effect === 'none' ? 'nebula_effect_selected' : 'nebula_effect'
        }
        id="none"
        onClick={() => {
          setEffect('none')
        }}
      >
        Нет
      </div>
      <div
        className={
          effect === 'dots_effect' ? 'nebula_effect_selected' : 'nebula_effect'
        }
        id="dots_effect"
        onClick={() => {
          setEffect('dots_effect')
        }}
      >
        <Dots_1></Dots_1>
      </div>
      <div
        className={
          effect === 'flowers_effect'
            ? 'nebula_effect_selected'
            : 'nebula_effect'
        }
        id="flowers_effect"
        onClick={() => {
          setEffect('flowers_effect')
        }}
      >
        <Flower_1 />
      </div>
    </div>
  )
}
