import React from 'react'
import { Dots_1 } from '../../images/dots/svg/1.jsx'
import { Dots_2 } from '../../images/dots/svg/2.jsx'
import { Dots_3 } from '../../images/dots/svg/3.jsx'
import { Dots_4 } from '../../images/dots/svg/4.jsx'
import { Dots_5 } from '../../images/dots/svg/5.jsx'

export const Dots = ({ effectColor, previewHeight, previewWidth }) => {
  const blockWidth = 50
  const blockHeight = 50

  const repeatCount =
    Math.ceil(previewWidth / blockWidth) *
    Math.ceil(previewHeight / blockHeight)
  if (!previewHeight || !previewWidth) return null

  return (
    <div
      id="dots"
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
          <Dots_1 effectColor={effectColor} />
          <Dots_2 effectColor={effectColor} />
          <Dots_3 effectColor={effectColor} />
          <Dots_4 effectColor={effectColor} />
          <Dots_5 effectColor={effectColor} />
        </div>
      ))}
    </div>
  )
}
