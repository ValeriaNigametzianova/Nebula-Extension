import React, { useEffect } from 'react'

export const ColorPicker = ({ parameter, setParameter, parameterName }) => {
  useEffect(() => {
    chrome.storage.sync
      .get(['blur_settings'])
      .then(
        ({ blur_settings }) =>
          blur_settings[parameterName] &&
          setParameter(blur_settings[parameterName])
      )
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
        chrome.storage.sync.set({
          blur_settings: { ...blur_settings, [parameterName]: parameter },
        })
      )
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [parameter])

  return (
    <input
      id="colorpicker"
      type="color"
      value={parameter}
      onChange={(e) => setParameter(e.target.value)}
    />
  )
}
