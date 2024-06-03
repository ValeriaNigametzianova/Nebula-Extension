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
    <div className="nebula_behavior_wrapper">
      <button
        className={
          hoverBehavior === 'none'
            ? 'nebula_behavior nebula_btn_black_selected nebula_button_text'
            : 'nebula_behavior nebula_btn_black nebula_button_text'
        }
        onClick={() => {
          setHoverBehavior('none')
        }}
      >
        Нет
      </button>
      <button
        className={
          hoverBehavior === 'blur'
            ? 'nebula_button_text nebula_behavior nebula_btn_black_selected'
            : 'nebula_button_text nebula_behavior nebula_btn_black'
        }
        onClick={() => {
          setHoverBehavior('blur')
        }}
      >
        Размытие
      </button>
      <button
        className={
          hoverBehavior === 'zoom'
            ? 'nebula_button_text nebula_behavior nebula_btn_black_selected'
            : 'nebula_button_text nebula_behavior nebula_btn_black'
        }
        onClick={() => {
          setHoverBehavior('zoom')
        }}
      >
        Зум
      </button>
    </div>
  )
}
