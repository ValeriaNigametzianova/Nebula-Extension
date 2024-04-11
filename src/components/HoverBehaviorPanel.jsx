import React, { useEffect, useState } from 'react'

export const HoverBehaviorPanel = () => {
  const [currentBehavior, setCurrentBehavior] = useState('')

  useEffect(() => {
    chrome.storage.sync
      .get(['blur_settings'])
      .then(
        ({ blur_settings }) =>
          blur_settings?.hover_behavior &&
          setCurrentBehavior(blur_settings.hover_behavior)
      )
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
        chrome.storage.sync.set({
          blur_settings: { ...blur_settings, hover_behavior: currentBehavior },
        })
      )
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [currentBehavior])

  return (
    <div className="behavior_wrapper">
      <button
        className={
          currentBehavior === 'none'
            ? 'behavior btn_black_selected'
            : 'behavior btn_black'
        }
        onClick={(e) => {
          setCurrentBehavior('none')
        }}
      >
        Нет
      </button>
      <button
        className={
          currentBehavior === 'blur'
            ? 'behavior btn_black_selected'
            : 'behavior btn_black'
        }
        onClick={(e) => {
          setCurrentBehavior('blur')
        }}
      >
        Размытие
      </button>
      <button
        className={
          currentBehavior === 'zoom'
            ? 'behavior btn_black_selected'
            : 'behavior btn_black'
        }
        onClick={(e) => {
          setCurrentBehavior('zoom')
        }}
      >
        Зум
      </button>
    </div>
  )
}
