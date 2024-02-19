import React from 'react'
import { Trash } from '../icons/Trash'
import { Edit } from '../icons/Edit'

export const ListItem = (props) => {
  return (
    <div className="item">
      {props.word && <div className="item_word main-text">{props.word}</div>}
      {props.domain && (
        <div className="item_word main-text">{props.domain}</div>
      )}
      {props.category && (
        <div className="item_category main-text">{props.category}</div>
      )}
      {props.domainName && (
        <div className="item_category main-text">{props.domainName}</div>
      )}
      <div className="actions">
        <Edit />
        <Trash />
      </div>
    </div>
  )
}
