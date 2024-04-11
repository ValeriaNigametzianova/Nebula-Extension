import React, { useEffect } from 'react'

export const EffectsColorPicker = ({ effectColor, setEffectColor }) => {
  useEffect(() => {
    chrome.storage.sync
      .get(['blur_settings'])
      .then(
        ({ blur_settings }) =>
          blur_settings?.effect_color &&
          setEffectColor(blur_settings.effect_color)
      )
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
        chrome.storage.sync.set({
          blur_settings: { ...blur_settings, effect_color: effectColor },
        })
      )
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [effectColor])

  return (
    <input
      id="colorpicker"
      type="color"
      value={effectColor}
      onChange={(e) => setEffectColor(e.target.value)}
    />
  )
}
