import React from 'react'
import { Flower_1 } from '../../images/flowers/svg/1.jsx'
import { Flower_2 } from '../../images/flowers/svg/2.jsx'

export const Flowers = ({ effectColor, previewHeight, previewWidth }) => {
  const blockWidth = 50
  const blockHeight = 50

  const repeatCount =
    Math.ceil(previewWidth / blockWidth) *
    Math.ceil(previewHeight / blockHeight)
  if (!previewHeight || !previewWidth) return null

  return (
    <div
      id="flowers"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat( ${Math.ceil(previewWidth / blockWidth)}, ${blockWidth}px)`,
        gridTemplateRows: `repeat(${Math.ceil(previewHeight / blockHeight)}, ${blockHeight})`,
        gridAutoFlow: 'row',
      }}
    >
      {Array.apply(null, Array(Math.ceil(repeatCount))).map((_, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            minWidth: `${blockWidth}px`,
            height: `${blockWidth}px`,
          }}
        >
          <Flower_1 effectColor={effectColor} />
          <Flower_2 effectColor={effectColor} />
        </div>
      ))}
    </div>
  )
}
