import OpenAI from 'openai'
import React, { useEffect, useState } from 'react'
import '../css/global/spoiler.css'

export const Scripts = () => {
  const [systemStatus, setSystemStatus] = useState(false)
  const elems = document.body.getElementsByTagName('*')
  const images = document.body.getElementsByTagName('img')
  const researchTitles = [true, false]
  let resultsHMTL = []
  const [blurColor, setBlurColor] = useState('')
  const [blurDegree, setBlurDegree] = useState('')
  const [wordList, setWordList] = useState(null)
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  useEffect(() => {
    chrome.storage.sync.get(['blur_settings']).then(({ blur_settings }) => {
      setBlurColor(blur_settings.blur_color)
      setBlurDegree(blur_settings.blur_degree)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['word_list']).then(({ word_list }) => {
      setWordList(word_list)
    })
  }, [])

  const getAIResponse = async () => {
    const parsedHTML = parseHTML()
    const content = `Your task is to identify all spoilers in the text. You get two objects.The first object contains key-value pairs, where the key is the word to be blocked and the value is an array of categories in the context of which the word can be used. The second object contains key-value pairs, in which the key is an identifier and the value is the text in which to look for spoilers. It is necessary to read all texts from the second object and match them with words from the first object. If the text contains a spoiler in the right context, it is true. If the text does not contain spoilers, it is false. As a result, only the object with the key being the identifier from the second object and the value being true or false depending on the spoilers found in the text. The first object: ${JSON.stringify(wordList)}. The second object: ${JSON.stringify(parsedHTML)}`
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content,
        },
      ],
      model: 'gpt-3.5-turbo',
    })
    // for (let key in parsedHTML) {
    //   AIResponse[key] = getRandomAIAnswer()
    // }
    const AIResponse = JSON.parse(response.choices[0].message.content)
    return AIResponse
  }

  const str =
    '{\n  "/html/body/div[2]/section[2]/div[4]/div[2]/div[3]/div[2]/div/center[2]/table/tbody/tr[6]/td[2]/a": false,\n  "/html/body/div[2]/section[2]/div[4]/div[2]/div[3]/div[2]/div/center[2]/table/tbody/tr[10]/td[2]/a": true,\n  "/html/body/div[2]/section[2]/div[4]/div[2]/div[3]/div[2]/div/center[2]/table/tbody/tr[41]/td[2]/a": true,\n  "/html/body/div[2]/section[2]/div[4]/div[2]/div[3]/div[2]/div/center[2]/table/tbody/tr[102]/td[2]/a": true\n}'

  const hideText = async () => {
    const AIResponse = emulateAIAnswer()
    console.log('ai', AIResponse)
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
      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'nebula_mask_wrapper')
      wrapper.style.backgroundColor = blurColor
      wrapper.style.filter = `blur(${blurDegree / 8}px)`
      oldParent.style.overflow = `hidden`
      oldParent.style.position = `relative`
      oldParent.replaceChild(wrapper, node)
      wrapper.appendChild(node)
      console.log(1, wrapper.style)
      console.log(2, wrapper.offsetHeight)

      let spoiler = document.createElement('div')
      spoiler.setAttribute('class', 'spoiler')
      oldParent.appendChild(spoiler)
      for (let i = 0; i < 500; i++) {
        dots(spoiler)
      }
    }
  }

  const dots = (spoiler) => {
    let dot = document.createElement('div')
    dot.className = 'dot'
    dot.style.top = spoiler.offsetHeight * Math.random() + 'px'
    dot.style.left = spoiler.offsetWidth * Math.random() + 'px'
    let size = Math.random() * 0.5
    dot.style.height = size + 'mm'
    dot.style.width = size + 'mm'
    // dot.animate(
    //   [
    //     { transform: `translate( ${size * Math.random(0.5)}px` },
    //     { transform: `translate( ${size * Math.random(0.5)}px` },
    //   ],
    //   {
    //     duration: 500,
    //     iterations: Infinity,
    //   }
    // )

    // dot.style.transform =
    //   `translate(` +
    //   size * Math.random(0.5) +
    //   'px, ' +
    //   size * Math.random(0.5) +
    //   'px)'
    console.log('aaaaaaaaaaaaaaaaaaaa', dot.style.transform)
    spoiler.appendChild(dot)
  }

  const emulateAIAnswer = () => {
    const parsedHTML = parseHTML()
    for (let el in parsedHTML) {
      el = Math.random() < 0.5
    }
    return parsedHTML
    // return researchTitles[Math.floor(Math.random() * researchTitles.length)]
  }

  const parseHTML = () => {
    const parsedHTML = {}
    const headings = document.evaluate(
      '//*[contains(text(), "Какаши")]',
      // '//*/text()[contains(., "Какаши")]',
      document.body,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    )
    for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
      resultsHMTL.push(headings.snapshotItem(i))
      const xpath = getElementXPath(headings.snapshotItem(i))
      parsedHTML[xpath] = headings.snapshotItem(i).textContent
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

  for (let i = 0; i < images.length; i++) {
    images[i].style.filter = `blur(25px)`
  }

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
