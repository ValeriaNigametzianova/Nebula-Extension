import React, { useEffect, useRef, useState } from 'react'
import { Accept } from '../icons/Accept'
import { DropdownMenu } from './DropdownMenu'

export const NeuronetAdder = ({ useNeuronet }) => {
  const [APIKey, setAPIKey] = useState('')
  const [neuronetModel, setNeuronetModel] = useState('')
  const inputRef = useRef(null)
  const listOfNeuronetModel = {
    ChatGPT: 'ChatGPT',
    GigaChat: 'GigaChat',
  }

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
      setNeuronetModel(storage.neuronet_model)
      setAPIKey(storage.API_keys[neuronetModel])
    })
  }, [neuronetModel])

  const dropdownHandler = (value) => {
    setNeuronetModel(value)
    chrome.storage.sync.set({
      neuronet_model: value,
    })
  }

  const setNeuronetSettings = async () => {
    inputRef.current.value = ''
    chrome.storage.sync.get('API_keys').then(({ API_keys }) => {
      chrome.storage.sync.set({
        use_neuronet: useNeuronet,
        API_keys: { ...API_keys, [neuronetModel]: APIKey },
      })
    })
  }

  return (
    <div className="neuronet_adder">
      <div className="nebula_neuronet_adder_dropdownMenu">
        <DropdownMenu
          onClick={dropdownHandler}
          defaultOption={'Выберите нейросеть'}
          optionItems={listOfNeuronetModel}
          useNeuronet={useNeuronet}
          neuronetModel={neuronetModel}
          disabled
        />
      </div>

      <div className="nebula_neuronet_APIKey_input">
        {APIKey && (
          <div className="nebula_icon_button" onClick={() => {}}>
            <Accept />
          </div>
        )}

        <input
          ref={inputRef}
          disabled={!useNeuronet}
          // value={word}
          onChange={(e) => setAPIKey(e.target.value)}
          className="nebula_input_page nebula_main_text"
          placeholder={
            APIKey
              ? `API-ключ для ${neuronetModel} уже добавлен`
              : `Введите API-ключ для ${neuronetModel}`
          }
        ></input>
      </div>

      <button
        className="nebula_button_text nebula_add_button_page nebula_btn_black"
        disabled={!APIKey}
        onClick={async () => {
          await setNeuronetSettings()
        }}
      >
        {!APIKey ? 'Сохранить' : 'Добавить новый'}
      </button>
    </div>
  )
}
