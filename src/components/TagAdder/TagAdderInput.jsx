import React, { useEffect, useRef, useState } from 'react'
import { CloseIcon } from '../../icons/CloseIcon'
import { AddIcon } from '../../icons/AddIcon'

export const TagAdderInput = ({ state, setState, className }) => {
  const [inputValue, setInputValue] = useState('')
  const [inputVisible, setInputVisible] = useState(false)
  const [inputWidth, setInputWidth] = useState('20px')
  const removeTags = (indexToRemove) => {
    setState([...state.filter((_, index) => index !== indexToRemove)])
  }
  const addTags = (tagName) => {
    if (tagName !== '') {
      setState([...state, tagName])
    }
  }
  const inputRef = useRef(null)
  const spanRef = useRef(null)

  useEffect(() => {
    if (inputVisible) inputRef.current.focus()
  }, [inputVisible])

  useEffect(() => {
    setInputWidth(spanRef.current.offsetWidth + 12 + 'px')
  }, [inputValue])

  return (
    <div className={`${className} nebula_tags_adder nebula_main_text`}>
      <ul id="tags">
        {state &&
          state.map((tag, index) => (
            <li key={index} className="nebula_tag nebula_mark">
              <span className="tag_title">{tag}</span>
              <button
                className="nebula_tag_icon"
                onClick={() => removeTags(index)}
              >
                <CloseIcon style={{ scale: '1.5' }} />
              </button>
            </li>
          ))}
        <div
          className="tags_adder_placeholder nebula_main_text"
          style={{
            display: inputVisible || state.length > 0 ? 'none' : 'block',
          }}
          onClick={() => {
            setInputVisible(true)
          }}
        >
          Добавить категории
        </div>
        <input
          ref={inputRef}
          value={inputValue}
          type="text"
          style={{
            display: inputVisible ? 'block' : 'none',
            minWidth: inputWidth,
            width: inputWidth,
          }}
          className="nebula_tags_input nebula_mark"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              addTags(event.target.value)
              setInputValue('')
            }
          }}
          onBlur={() => {
            if (inputValue === '') setInputVisible(false)
          }}
        />
        <span
          className="nebula_tags_input nebula_mark"
          ref={spanRef}
          style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
        >
          {inputValue}
        </span>
        <button
          className="nebula_tag_icon nebula_tag_icon_add"
          onClick={() => {
            setInputVisible(true)
            addTags(inputValue)
            setInputValue('')
            if (inputVisible) inputRef.current.focus()
          }}
        >
          <AddIcon />
        </button>
      </ul>
    </div>
  )
}
