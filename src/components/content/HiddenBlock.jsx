import React, { useEffect, useState } from 'react'
import { useAppendChild } from './hooks/useAppendChild'

export const HiddenBlock = ({ node }) => {
  const nodeRef = useAppendChild(node)
  const [blurColor, setBlurColor] = useState('')
  const [blurDegree, setBlurDegree] = useState('')
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) => {
      setBlurColor(blur_settings.blur_color)
      setBlurDegree(blur_settings.blur_degree)
    })
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={'nebula_mask_wrapper'}
        style={
          visibility
            ? undefined
            : {
                backgroundColor: blurColor,
                filter: `blur(${blurDegree / 8}px)`,
              }
        }
      >
        <div ref={nodeRef}></div>
      </div>
      <button
        className="btn_show_content"
        onClick={() => {
          setVisibility(!visibility)
        }}
      >
        Показать
      </button>
    </div>
  )
}
