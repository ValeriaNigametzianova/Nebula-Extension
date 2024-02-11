import React from 'react'
import { Trash } from '../icons/Trash'
import { Edit } from '../icons/Edit'

export const ListItem = ({ word, category }) => {
  return (
    <div className='item'>
      <div className='item_word main-text'>{word}</div>
      <div className='item_category main-text'>{category}</div>
      <div className='actions'>
        <Edit />
        <Trash />
      </div>
    </div>
  )
}
