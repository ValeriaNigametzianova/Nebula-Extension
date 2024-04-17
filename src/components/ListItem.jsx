import React, { useState } from 'react'
import { Trash } from '../icons/Trash'
import { Edit } from '../icons/Edit'
import { Dropdown } from './Dropdown'
import { Accept } from '../icons/Accept'

export const ListItem = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [newWord, setNewWord] = useState(props.word)
  const [categories, setCategories] = useState(props.category)
  const categoryesDivider = () => {
    for (let i = 0; i < props.category.length; i++) {
      categories[i] = props.category[i] + `, `
      if (i == props.category.length - 1) categories[i] = props.category[i]
    }
  }
  const deleteWord = async () => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      delete word_list[props.word]
      chrome.storage.sync.set({
        word_list,
      })
    })
  }

  const editWord = async () => {
    if (props.word && categories) {
      const { word_list } = await chrome.storage.sync.get(['word_list'])
      // const list = word_list[props.word]

      // categories.forEach((category) => {
      //   if (list.includes(category)) return
      //   list.push(category)
      // })

      if (props.word === newWord) {
        await chrome.storage.sync.set({
          word_list: { ...word_list, [props.word]: categories },
        })
      } else {
        delete word_list[props.word]
        await chrome.storage.sync.set({
          word_list: { ...word_list, [newWord]: categories },
        })
      }
    }
    setCategories(categories)
  }

  return (
    <div className={editMode === false ? 'item' : 'item_active'}>
      {props.word &&
        (editMode === false ? (
          <div className="item_word main-text">{props.word}</div>
        ) : (
          <input
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            className="input_page main-text"
            placeholder="Введите слово или фразу"
          ></input>
        ))}

      {props.domain && (
        <div className="item_word main-text">{props.domain}</div>
      )}
      {categories &&
        (editMode === false ? (
          <div className="item_category main-text">
            {categories.map((category, index) => (
              <span key={index}>
                {index === categories.length - 1 ? category : category + ', '}
              </span>
            ))}
          </div>
        ) : (
          <Dropdown
            state={categories}
            setState={setCategories}
            className="input_page"
          />
        ))}
      {props.domainName && (
        <div className="item_category main-text">{props.domainName}</div>
      )}
      <div className={editMode === false ? 'actions' : 'actions_active'}>
        {editMode === false ? (
          <button
            className="icon_button"
            onClick={() => {
              setEditMode(true)
            }}
          >
            <Edit />
          </button>
        ) : (
          <button
            className="icon_button"
            onClick={() => {
              editWord()
              setEditMode(false)
            }}
          >
            <Accept />
          </button>
        )}

        <button className="icon_button" onClick={deleteWord}>
          <Trash />
        </button>
      </div>
    </div>
  )
}
