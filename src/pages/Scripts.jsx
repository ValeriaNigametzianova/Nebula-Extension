import ReactDOM from 'react-dom/client'
import OpenAI from 'openai'
import React, { useEffect, useState } from 'react'
import '../css/global/spoiler.css'
import '../css/global/buttons.css'
import '../css/pages/page.css'
import ShowContentButton from '../components/ShowContentButton'
import { HiddenBlock } from '../components/content/HiddenBlock'

export const Scripts = () => {
  const [wordList, setWordList] = useState(null)
  const [domainsList, setDomainsList] = useState(null)
  const elementsArray = []
  const [URLIncludes, setURLIncludes] = useState(false)
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
    })
    setURL()
  }, [])

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        console.log(event)
        if (event.domains_list) {
          setURL()
        }
      }
    )
    return () => {
      chrome.storage.sync.onChanged.removeListener(storageListener)
    }
  }, [])

  const setURL = () => {
    const currentURL = window.location.href
    chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
      setDomainsList(domains_list)

      // Если список доменов пустой, то досрочно выходим. Также убираем флаг URLIncluds
      if (Object.keys(domains_list).length === 0) {
        setURLIncludes(false)
        return
      }

      for (let key in domains_list) {
        if (currentURL.includes(key) || key.includes(currentURL)) {
          setURLIncludes(true)
        } else {
          setURLIncludes(false)
          //     hideText()
          //   }
        }
      }
    })
  }

  const getAIResponse = async () => {
    parseHTML()
    const content = `Ты получишь два объекта. Твоя задача - найти все слова в тексте, которые подходят по контексту. У слова может существовать много категорий (смыслов), но твоя задача - использовать указанную. Слова и категории находятся в первом объекте, у которого ключами являются слова, необходимые для поиска, а их значениями - массив категорий. Во втором объекте значениями являются тексты, в которых ты должен искать указанные слова. Если текст содержит вхождение слова в нужном контексте, то ты отвечаешь "true". Если нет, то "false". В своем ответе верни объект, в котором ключом будет ключ из второго объхекта, а значением "true" или "false" (булевые) в зависимости от того, найдено ли слово в тексте или нет. Первый объект: ${JSON.stringify(wordList)}, второй объект: ${JSON.stringify(
      Object.assign(
        {},
        elementsArray.map((el) => el.textContent)
      )
    )}`
    // const content = `
    // your task is to find all mentions of words in the text that fit into a certain category. There can be many categories and meanings of a word, but you need to find exactly the one specified. You will get two objects. The object contains key-value pairs, where the key is the word you want to lock, and the value is an array of categories in the context of which the word can be used. The array contains the texts in which you want to look for words. You need to read all the text from the second object and match it with the words from the first object. If the text contains a word in the correct context, you answer 'true'. If the text doesn't contain the word, or contains it in the wrong context, you answer 'false'. As a result, create only an object with the key being the identifier from the second object and the value being 'true' or 'false' (boolean) depending on the world found in the each text. Object:${JSON.stringify(wordList)}. Second object:${JSON.stringify(
    //   Object.assign(
    //     {},
    //     elementsArray.map((el) => el.textContent)
    //   )
    // )}`

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
    // const AIResponse = emulateAIAnswer()
    const AIResponse = await getAIResponse()
    const nodeArray = []
    console.log(AIResponse, 'AIResponse')

    for (let key in AIResponse) {
      if (AIResponse[key] === true) {
        const node = elementsArray[key]
        const oldParent = node.parentNode

        // создаем подкорень Реакта
        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'hidden_block_wrapper')
        wrapper.id = 'root ' + key
        oldParent?.replaceChild(wrapper, node)
        // oldParent.append(wrapper)

        if (oldParent) {
          ReactDOM.createRoot(wrapper).render(
            <React.StrictMode>
              <HiddenBlock node={node} />
            </React.StrictMode>
          )
        } else return
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
    for (let key in wordList) {
      const headings = document.evaluate(
        // '//*[string-length(normalize-space(text())) > 0]',
        `.//*[contains(text(), "${key}")]`,
        document.body,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
      )

      for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
        getElementsArray(headings.snapshotItem(i))
      }
    }
    // return elementsArray
  }

  const getElementsArray = (element) => {
    if (
      element &&
      element.nodeType == Node.ELEMENT_NODE &&
      element.nodeName !== 'SCRIPT'
      // && element.nodeName !== 'A'
    ) {
      elementsArray.push(element)
    }
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
      {URLIncludes ? null : (
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
            console.log('start hiding')
            hideText()
            console.log('end hiding')
          }}
        >
          Замаскировать контент
        </button>
      )}
    </div>
  )
}
