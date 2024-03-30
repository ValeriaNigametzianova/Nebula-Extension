import ReactDOM from 'react-dom/client'
import OpenAI from 'openai'
import React, { useEffect, useRef, useState } from 'react'
import '../css/global/spoiler.css'
import '../css/global/buttons.css'
import ShowContentButton from '../components/ShowContentButton'
import { HiddenBlock } from '../components/content/HiddenBlock'

export const Scripts = () => {
  const [systemStatus, setSystemStatus] = useState(false)
  const elems = document.body.getElementsByTagName('*')
  const images = document.body.getElementsByTagName('img')
  const researchTitles = [true, false]
  let resultsHMTL = []
  const [wordList, setWordList] = useState(null)
  const mask_style = ''
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const first = useRef(<ShowContentButton />)

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
    })
  }, [])

  const getAIResponse = async () => {
    const parsedHTML = parseHTML()
    const content = `Your task is to identify all spoilers in the text. You get two objects.The first object contains key-value pairs, where the key is the word to be blocked and the value is an array of categories in the context of which the word can be used. The second object contains key-value pairs, in which the key is an identifier and the value is the text in which to look for spoilers. It is necessary to read all texts from the second object and match them with words from the first object. If the text contains a spoiler in the right context, it is true. If the text does not contain spoilers, it is false. As a result, only the object with the key being the identifier from the second object and the value being true or false depending on the spoilers found in the text. The first object: ${JSON.stringify(wordList)}. The second object: ${JSON.stringify(parsedHTML)}`
    console.log(JSON.stringify(wordList), 'JSON.stringify(wordList)')
    console.log(JSON.stringify(parsedHTML), 'JSON.stringify(parsedHTML)')
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content,
        },
      ],
      model: 'gpt-3.5-turbo',
    })
    const AIResponse = JSON.parse(response.choices[0].message.content)
    return AIResponse
  }

  const hideText = async () => {
    const AIResponse = emulateAIAnswer()
    // const AIResponse = await getAIResponse()
    for (let key in AIResponse) {
      const node = document.evaluate(
        `/${key}`,
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue
      const oldParent = node.parentNode

      // создаем подкорень Реакта
      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'hidden_block_wrapper')
      wrapper.id = 'root ' + key
      oldParent.replaceChild(wrapper, node)
      // oldParent.append(wrapper)

      if (oldParent) {
        ReactDOM.createRoot(wrapper).render(
          <React.StrictMode>
            <HiddenBlock node={node} />
          </React.StrictMode>
        )
      } else {
        return
      }
    }
  }

  const emulateAIAnswer = () => {
    const parsedHTML = parseHTML()
    for (let el in parsedHTML) {
      el = Math.random() < 0.5
    }
    return parsedHTML
  }

  const parseHTML = () => {
    const parsedHTML = {}
    for (let key in wordList) {
      const headings = document.evaluate(
        // '//*[string-length(normalize-space(text())) > 0]',
        `//*[contains(text(), "${key}")]`,
        // '//*/text()[contains(., "Какаши")]',
        document.body,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
      )

      for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
        resultsHMTL.push(headings.snapshotItem(i))
        const xpath = getElementXPath(headings.snapshotItem(i))
        if (xpath) parsedHTML[xpath] = headings.snapshotItem(i).textContent
      }
    }
    return parsedHTML
  }

  const getElementXPath = (element) => {
    let fullPath = ''
    for (
      ;
      element && element.nodeType == Node.ELEMENT_NODE;
      element = element.parentNode
    ) {
      if (element.nodeName === 'SCRIPT') {
        return
      }
      let index = 0
      for (
        let sibling = element.previousSibling;
        sibling;
        sibling = sibling.previousSibling
      ) {
        if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE) continue
        if (sibling.nodeName == element.nodeName) ++index
      }
      let tagName = element.nodeName.toLowerCase()
      let pathIndex = index ? '[' + (index + 1) + ']' : ''
      fullPath = '/' + tagName + pathIndex + fullPath
    }
    return fullPath
  }

  // for (let i = 0; i < images.length; i++) {
  //   images[i].style.filter = `blur(25px)`
  // }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        className="btn_red"
        style={{
          width: '300px',
          padding: '10px 25px',
          color: '#fff',
          backgroundColor: '#f05365',
          cursor: 'pointer',
          fontFamily: 'Geologica',
          fontSize: '20px',
          marginTop: '20px',
          marginBottom: '20px',
          border: '0px',
          borderRadius: '2px',
        }}
        onClick={() => {
          hideText()
        }}
      >
        Замаскировать контент
      </button>
    </div>
  )
}
