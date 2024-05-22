import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { HiddenBlock } from '../HiddenBlock'
import { AnalyseHTML, testRequest } from '../../utils/http'

export const useHideText = () => {
  const [AIModel, setAIModel] = useState('')
  const [APIKey, setAPIKey] = useState('')
  const [useNeuronet, setUseNeuronet] = useState('')

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
      setAIModel(storage.neuronet_model)
      setAPIKey(storage.API_keys[storage.neuronet_model])
      setUseNeuronet(storage.use_neuronet)
    })
  }, [])

  const hideText = async (array, wordList) => {
    const currentURL = window.location.href
    await testRequest(currentURL)
    console.log(456)
    let AIResponse = {}
    if (APIKey && useNeuronet) {
      AIResponse = await AnalyseHTML(
        wordList,
        array.map((el) => el.textContent),
        AIModel,
        APIKey
      )
    } else {
      AIResponse = Object.assign(
        {},
        array.map(() => ({
          bool: 'true',
          word: '',
          category: '',
        })) //раньше тут стоял elementsArray
      )
    }

    console.log(456, AIResponse)

    for (let key in AIResponse) {
      if (AIResponse[key].bool === 'true') {
        const node = array[key]
        const oldParent = node.parentNode

        // создаем подкорень Реакта
        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'hidden_block_wrapper')
        wrapper.id = 'root ' + key
        oldParent?.replaceChild(wrapper, node)

        if (oldParent) {
          ReactDOM.createRoot(wrapper).render(
            <React.StrictMode>
              <HiddenBlock
                node={node}
                word={AIResponse[key].word}
                category={AIResponse[key].category}
              />
            </React.StrictMode>
          )
        } else return
      }
    }
    array = []
  }
  return hideText
}
