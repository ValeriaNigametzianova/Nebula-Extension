import React, { useEffect, useState } from 'react'
import { Flowers } from './effects/Flowers'
import { Dots_1 } from '../images/dots/svg/1'
import { Flower_1 } from '../images/flowers/svg/1'

export const EffectsPanel = () => {
  const [currentEffect, setCurrentEffect] = useState('')

  useEffect(() => {
    chrome.storage.sync
      .get(['blur_settings'])
      .then(
        ({ blur_settings }) =>
          blur_settings?.effect && setCurrentEffect(blur_settings.effect)
      )
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
        chrome.storage.sync.set({
          blur_settings: { ...blur_settings, effect: currentEffect },
        })
      )
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [currentEffect])

  return (
    <div className="effects_wrapper">
      <div
        className={currentEffect === 'none' ? 'effect_selected' : 'effect'}
        id="none"
        onClick={(e) => {
          setCurrentEffect('none')
        }}
      >
        Нет
      </div>
      <div
        className={
          currentEffect === 'dots_effect' ? 'effect_selected' : 'effect'
        }
        id="dots_effect"
        onClick={(e) => {
          setCurrentEffect('dots_effect')
        }}
      >
        <Dots_1></Dots_1>
      </div>
      <div
        className={
          currentEffect === 'flowers_effect' ? 'effect_selected' : 'effect'
        }
        id="flowers_effect"
        onClick={(e) => {
          setCurrentEffect('flowers_effect')
          console.log(e, 'sfsfsdfsf')
        }}
      >
        <Flower_1 />
      </div>
      <div className="effect"></div>
    </div>
  )
}
