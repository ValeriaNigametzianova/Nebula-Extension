import React, { useState } from 'react'

export const Dropdown = ({ state, setState, className }) => {
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
    <div className="tags_input main_text">
      <input
        type="text"
        className={className}
        onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
        placeholder="Добавить тэг - Enter"
      />
      <ul id="tags">
        {state &&
          state.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag_close_icon"
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}
