import React from 'react'
import { Trash } from '../icons/Trash'
import { Edit } from '../icons/Edit'

export const ListItem = (props) => {
  const categories = []
  const categoryesDivider = () => {
    for (let i = 0; i < props.category.length; i++) {
      categories[i] = props.category[i] + `, `
      if (i == props.category.length - 1) categories[i] = props.category[i]
    }
  }
  props.category && categoryesDivider()
  return (
    <div className="item">
      {props.word && <div className="item_word main-text">{props.word}</div>}
      {props.domain && (
        <div className="item_word main-text">{props.domain}</div>
      )}
      {props.category && (
        <div className="item_category main-text">{categories}</div>
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
