import React, { useEffect, useState } from 'react'
import { useAppendChild } from './hooks/useAppendChild'
import { Flowers } from '../effects/Flowers'
import { Dots } from '../effects/Dots'

export const HiddenBlock = ({ node }) => {
  const nodeRef = useAppendChild(node)
  const [blurColor, setBlurColor] = useState('')
  const [blurDegree, setBlurDegree] = useState('')
  const [visibility, setVisibility] = useState(false)
  const [blurSettings, setBlurSettings] = useState(null)

  useEffect(() => {
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) => {
      setBlurColor(blur_settings.blur_color)
      setBlurDegree(blur_settings.blur_degree)
      setBlurSettings(blur_settings)
      console.log(node.offsetHeight, 'node.current.offsetHeight')
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
      <div>
        {blurSettings?.effect === 'dots_effect' ? (
          <Dots
            effectColor={blurSettings?.effect_color}
            previewHeight={node.offsetHeight}
            previewWidth={node.offsetWidth}
          />
        ) : null}
        {blurSettings?.effect === 'flowers_effect' ? (
          <Flowers
            effectColor={blurSettings?.effect_color}
            previewHeight={node.offsetHeight}
            previewWidth={node.offsetWidth}
          />
        ) : null}
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
