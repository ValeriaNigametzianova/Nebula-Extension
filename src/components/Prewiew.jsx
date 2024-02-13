import React, { useEffect, useRef, useState } from 'react'

export const Prewiew = () => {
  const [settings, setSettings] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener((event) => {
      if (event.blur_settings) setSettings(event.blur_settings.newValue)

      return () => {
        chrome.storage.sync.onChanged.removeListener(storageListener)
      }
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) => {
      blur_settings && setSettings(blur_settings)
    })
  }, [])

  useEffect(() => {
    settings && setPrewiewSettings(settings)
  })

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(() => {
      chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) => {
        setPrewiewSettings(blur_settings)
      })
      return () => {
        chrome.storage.sync.onChanged.removeListener(storageListener)
      }
    })
  }, [])

  const setPrewiewSettings = (settings) => {
    ref.current.style.filter = `blur(${settings.blur_degree / 8}px)`
    ref.current.style.backgroundColor = `${settings.blur_color}`
  }

  return (
    <div className='preview' ref={ref}>
      <div className='main_text'>
        ВАШИНГТОН, 12 фев — РИА Новости. Российская экономика развивается лучше, чем ожидалось, заявила первый
        заместитель главы Международного валютного фонда (МВФ) Гита Гопинат в интервью журналу Foreign Policy.
      </div>
    </div>
  )
}
