import React, { useEffect } from 'react'

export const HoverBehaviorPanel = ({ hoverBehavior, setHoverBehavior }) => {
  useEffect(() => {
    chrome.storage.sync
      .get(['blur_settings'])
      .then(
        ({ blur_settings }) =>
          blur_settings?.hover_behavior &&
          setHoverBehavior(blur_settings.hover_behavior)
      )
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) =>
        chrome.storage.sync.set({
          blur_settings: { ...blur_settings, hover_behavior: hoverBehavior },
        })
      )
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [hoverBehavior])

  return (
    <div className="behavior_wrapper">
      <button
        className={
          hoverBehavior === 'none'
            ? 'behavior btn_black_selected'
            : 'behavior btn_black'
        }
        onClick={(e) => {
          setHoverBehavior('none')
        }}
      >
        Нет
      </button>
      <button
        className={
          hoverBehavior === 'blur'
            ? 'behavior btn_black_selected'
            : 'behavior btn_black'
        }
        onClick={(e) => {
          setHoverBehavior('blur')
        }}
      >
        Размытие
      </button>
      <button
        className={
          hoverBehavior === 'zoom'
            ? 'behavior btn_black_selected'
            : 'behavior btn_black'
        }
        onClick={(e) => {
          setHoverBehavior('zoom')
        }}
      >
        Зум
      </button>
    </div>
  )
}
