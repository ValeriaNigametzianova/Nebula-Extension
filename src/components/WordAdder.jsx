import React, { useState } from 'react'
import { TagAdderInput } from './TagAdder/TagAdderInput'

export const WordAdder = ({
  subtitle,
  placeholder,
  onSubmit,
  multi,
  required,
}) => {
  const [word, setWord] = useState('')
  const [category, setCategory] = useState(multi ? [] : '')
  return (
    <div className="add_word_section">
      <>
        <div className="subtitle">{subtitle}</div>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="input_page main_text"
          placeholder={placeholder}
        ></input>
        {multi ? (
          <TagAdderInput
            state={category}
            setState={setCategory}
            className={'tagAdderInput_page'}
          />
        ) : (
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input_page_right main_text"
            placeholder="Можете дать название"
          ></input>
        )}
        <button
          className="button_text add_button_page btn_black"
          disabled={required && (!word || !category.length)}
          onClick={() => {
            onSubmit(word, category)
            setWord('')
            setCategory(multi ? [] : '')
          }}
        >
          Добавить
        </button>
      </>
    </div>
  )
}
