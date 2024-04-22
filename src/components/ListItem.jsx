import React, { useState } from 'react'
import { Trash } from '../icons/Trash'
import { Edit } from '../icons/Edit'
import { TagAdderInput } from './TagAdderInput'
import { Accept } from '../icons/Accept'
import { deleteWord, editWord } from './utils/wordsUtils'
import { deleteDomain, editDomain } from './utils/domainsUtils'

export const ListItem = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [newWord, setNewWord] = useState(props.word)
  const [categories, setCategories] = useState(props.categories)
  const [newDomain, setNewDomain] = useState(props.domain)
  const [domainName, setDomainName] = useState(props.domainName)

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

      {props.domain &&
        (editMode === false ? (
          <div className="item_word main-text">{props.domain}</div>
        ) : (
          <input
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="input_page main-text"
            placeholder="https://domain.com"
          ></input>
        ))}

      {props.categories &&
        (editMode === false ? (
          <div className="item_category main-text">
            {categories.map((category, index) => (
              <span key={index}>
                {index === categories.length - 1 ? category : category + ', '}
              </span>
            ))}
          </div>
        ) : (
          <TagAdderInput
            state={categories}
            setState={setCategories}
            className="input_page"
          />
        ))}

      {props.domain &&
        (editMode === false ? (
          <div className="item_category main-text">{domainName}</div>
        ) : (
          <input
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            className="input_page_right main-text"
            placeholder="Можете дать название"
          ></input>
        ))}

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
            onClick={async () => {
              props.word && (await editWord(props.word, newWord, categories))
              props.domain &&
                (await editDomain(props.domain, newDomain, domainName))
              props.word && setCategories(categories)
              props.domain && setDomainName(domainName)
              setEditMode(false)
            }}
          >
            <Accept />
          </button>
        )}

        <button
          className="icon_button"
          onClick={async () => {
            props.word && (await deleteWord(props.word))
            props.domain && (await deleteDomain(props.domain))
          }}
        >
          <Trash />
        </button>
      </div>
    </div>
  )
}
