import React, { useEffect, useState } from 'react'
import { useAppendChild } from './hooks/useAppendChild'
import { Flowers } from '../effects/Flowers'
import { Dots } from '../effects/Dots'

export const HiddenBlock = ({ node }) => {
  const nodeRef = useAppendChild(node)
  const [visibility, setVisibility] = useState(false)
  const [blurSettings, setBlurSettings] = useState(null)

  useEffect(() => {
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) => {
      setBlurSettings(blur_settings)
    })
  }, [])

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className={
          visibility
            ? undefined
            : `nebula_mask_wrapper ${
                blurSettings?.hover_behavior === 'zoom'
                  ? 'zoom'
                  : blurSettings?.hover_behavior === 'blur'
                    ? 'blur'
                    : ''
              }`
        }
      >
        <div
          style={
            visibility
              ? undefined
              : {
                  backgroundColor: blurSettings?.blur_color,
                  filter: `blur(${blurSettings?.blur_degree / 8}px)`,
                }
          }
        >
          <div ref={nodeRef}></div>
        </div>
        {visibility ? undefined : (
          <div
            style={{
              overflow: 'hidden',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
            }}
          >
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
        )}
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
