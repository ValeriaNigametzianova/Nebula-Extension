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
    <div className="nebula_add_word_section">
      <>
        <div className="nebula_subtitle">{subtitle}</div>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="nebula_input_page nebula_main_text"
          placeholder={placeholder}
        ></input>
        {multi ? (
          <TagAdderInput
            state={category}
            setState={setCategory}
            className={'nebula_tagAdderInput_page'}
          />
        ) : (
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="nebula_input_page_right nebula_main_text"
            placeholder="Можете дать название"
          ></input>
        )}
        <button
          className="nebula_button_text nebula_add_button_page nebula_btn_black"
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
