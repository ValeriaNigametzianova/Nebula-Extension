import React, { useState } from 'react'

export const Dropdown = ({ state, setState }) => {
  const removeTags = (indexToRemove) => {
    setState([...state.filter((_, index) => index !== indexToRemove)])
  }
  const addTags = (event) => {
    if (event.target.value !== '') {
      setState([...state, event.target.value])
      // props.selectedTags([...tags, event.target.value])
      event.target.value = ''
    }
  }
  return (
    <div className="tags-input main-text">
      <ul id="tags">
        {state &&
          state.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
      </ul>
      <input
        type="text"
        className="input_page"
        onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
        placeholder="Добавить тэг - Enter"
      />
    </div>
  )
}
