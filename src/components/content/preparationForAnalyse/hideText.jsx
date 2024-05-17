import React from 'react'
import ReactDOM from 'react-dom/client'
import { HiddenBlock } from '../HiddenBlock'
import { AnalyseHTML, testRequest } from '../../utils/http'

export const hideText = async (array, wordList) => {
  const currentURL = window.location.href
  console.log(132)
  const AIResponse = await AnalyseHTML(
    wordList,
    array.map((el) => el.textContent)
  )
  const testResponce = await testRequest(currentURL)
  // const AIResponse = Object.assign(
  //   {},
  //   array.map(() => true) //раньше тут стоял elementsArray
  // )

  for (let key in AIResponse) {
    if (AIResponse[key].bool === true) {
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
