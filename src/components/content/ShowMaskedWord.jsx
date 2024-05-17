import React from 'react'

export const ShowMaskedWord = (props) => {
  return (
    <div className="show_masked_word">
      <div className="mark">{props.word}</div>
      <div className="mark">{props.category}</div>
    </div>
  )
}
