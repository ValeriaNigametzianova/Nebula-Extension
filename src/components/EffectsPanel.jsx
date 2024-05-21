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
    <div className="effects_wrapper">
      <div
        className={effect === 'none' ? 'effect_selected' : 'effect'}
        id="none"
        onClick={() => {
          setEffect('none')
        }}
      >
        Нет
      </div>
      <div
        className={effect === 'dots_effect' ? 'effect_selected' : 'effect'}
        id="dots_effect"
        onClick={() => {
          setEffect('dots_effect')
        }}
      >
        <Dots_1></Dots_1>
      </div>
      <div
        className={effect === 'flowers_effect' ? 'effect_selected' : 'effect'}
        id="flowers_effect"
        onClick={(e) => {
          setEffect('flowers_effect')
          console.log(e, 'sfsfsdfsf')
        }}
      >
        <Flower_1 />
      </div>
      <div className="effect"></div>
    </div>
  )
}
