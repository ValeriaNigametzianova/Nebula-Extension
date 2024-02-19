import React, { useEffect, useState } from 'react'

export const BlurColorPicker = () => {
  const [blurColor, setBlurColor] = useState('')

  useEffect(() => {
    chrome.storage.sync
      .get(['blur_settings'])
      .then(
        ({ blur_settings }) =>
          blur_settings.blur_color && setBlurColor(blur_settings.blur_color)
      )
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync
        .get(['blur_settings'])
        .then(({ blur_settings }) =>
          chrome.storage.sync.set({
            blur_settings: { ...blur_settings, blur_color: blurColor },
          })
        )
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [blurColor])

  return (
    <input
      id="colorpicker"
      type="color"
      value={blurColor}
      onChange={(e) => setBlurColor(e.target.value)}
    />
  )
}
