import React from 'react'
import '../css/global/variables.css'

const ShowContentButton = ({ onClick, visibility }) => {
  return (
    <button
      className="nebula_btn_show_content"
      onClick={() => {
        onClick(!visibility)
      }}
    >
      {visibility ? 'Скрыть' : 'Показать'}
    </button>
  )
}

export default ShowContentButton
