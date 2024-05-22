import React from 'react'
import '../../css/global/spoiler.css'

export const ShowMaskedWord = (props) => {
  return (
    <div className="show_masked_word">
      {props.showWord && <div className="mark">{props.word + ':'}</div>}
      {props.showCategory && <div className="mark">{props.category}</div>}
    </div>
  )
}
