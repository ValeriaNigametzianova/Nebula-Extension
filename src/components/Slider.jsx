import React, { useEffect, useRef, useState } from 'react'

export const Slider = () => {
  const labelRef = useRef(null)
  const inputRef = useRef(null)
  const [value, setValue] = useState('50')

  useEffect(() => {
    chrome.storage.sync.get(['blur_degree']).then(({ blur_degree }) => blur_degree && setValue(blur_degree))
  }, [])

  useEffect(() => {
    labelRef.current.style.left = (value / inputRef.current.max) * inputRef.current.offsetWidth * 0.97 + 'px'
    const delayDebounceFn = setTimeout(() => {
      chrome.storage.sync.set({ blur_degree: value })
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [value])

  const showSliderValue = (e) => {
    labelRef.current.style.left = (e.target.value / e.target.max) * e.target.offsetWidth * 0.97 + 'px'
  }

  return (
    <div className='range-slider'>
      <span ref={labelRef} className='slider-label'>
        {value}
      </span>
      <input
        ref={inputRef}
        className='slider'
        type='range'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          showSliderValue(e)
        }}
        min='0'
        max='100'
      />
    </div>
  )
}
