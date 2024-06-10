import React from 'react'
import '../../css/global/spoiler.css'

export const ShowMaskedWord = (props) => {
  return (
    <div className="nebula_show_masked_word">
      {props?.showWord && <div className="nebula_mark">{props.word + ':'}</div>}
      {props?.showCategory && (
        <div className="nebula_mark">{props.category}</div>
      )}
    </div>
  )
}
