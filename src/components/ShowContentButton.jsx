import React from 'react'
import '../css/global/variables.css'

const ShowContentButton = ({ onClick, visibility }) => {
  return (
    <button
      className="btn_show_content"
      onClick={(e) => {
        onClick(!visibility)
      }}
    >
      {visibility ? 'Скрыть' : 'Показать'}
    </button>
  )
}

export default ShowContentButton
