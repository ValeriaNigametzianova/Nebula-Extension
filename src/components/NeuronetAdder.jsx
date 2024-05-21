import React, { useEffect, useRef, useState } from 'react'
import { Accept } from '../icons/Accept'
import { DropdownMenu } from './DropdownMenu'

export const NeuronetAdder = ({ useNeuronet }) => {
  const [APIKey, setAPIKey] = useState('')
  const [neuronetModel, setNeuronetModel] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (neuronetModel) {
      chrome.storage.sync.get().then((storage) => {
        setNeuronetModel(storage.neuronet_model)
        setAPIKey(storage.API_keys[neuronetModel])
      })
    }
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
      <div className="neuronet_adder_dropdownMenu">
        <DropdownMenu
          onClick={dropdownHandler}
          defaultOption={'Выберите нейросеть'}
          value_1={'ChatGPT'}
          value_2={'GigaChat'}
          option_1={'ChatGPT'}
          option_2={'GigaChat'}
          useNeuronet={useNeuronet}
          neuronetModel={neuronetModel}
        />
      </div>

      <div className="neuronet_APIKey_input">
        {APIKey && (
          <div className="icon_button" onClick={() => {}}>
            <Accept />
          </div>
        )}

        <input
          ref={inputRef}
          disabled={!useNeuronet}
          // value={word}
          onChange={(e) => setAPIKey(e.target.value)}
          className="input_page main_text"
          placeholder={
            APIKey
              ? `API-ключ для ${neuronetModel} уже добавлен`
              : `Введите API-ключ для ${neuronetModel}`
          }
        ></input>
      </div>

      <button
        className="button_text add_button_page btn_black"
        disabled={!APIKey}
        onClick={async () => {
          await setNeuronetSettings()
        }}
      >
        Сохранить
      </button>
    </div>
  )
}
