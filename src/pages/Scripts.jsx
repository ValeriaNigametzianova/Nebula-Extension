import OpenAI from 'openai'
import React, { useEffect, useState } from 'react'

export const Scripts = () => {
  const [systemStatus, setSystemStatus] = useState(false)
  const elems = document.body.getElementsByTagName('*')
  const images = document.body.getElementsByTagName('img')
  const researchTitles = [true, false]
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  })
  let resultsHMTL = []

  useEffect(() => {
    chrome.storage.sync.get(['status']).then(({ status }) => {
      status && setSystemStatus(status)
    })
  }, [])

  const hideText = () => {
    const parsedHTML = parseHTML()
    for (let key in parsedHTML) {
      parsedHTML[key] = getRandomAIAnswer()
      const node = document.evaluate(
        `/${key}`,
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue
      if (parsedHTML[key]) node.style.backgroundColor = `#52dc02`
      else node.style.backgroundColor = `#ff4a60`
    }
  }

  const getRandomAIAnswer = () => {
    return researchTitles[Math.floor(Math.random() * researchTitles.length)]
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

  const sendPrompts = async () => {
    // const image = await openai.images.generate({ model: 'dall-e-2', prompt: 'A cute baby sea otter' })
    const text = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
        Следующий текст содержит спойлеры к Наруто? Ответь только true или false.

        Однако Какаши, выбранный членом альянса пяти деревень ниндзя, едва не становится Шестым Хокаге (хоть, по собственному признанию, не стремился к этому титулу и считает, что есть люди, более достойные его), однако, перед его официальным назначением предыдущий правитель, Пятая Хокаге Цунаде приходит в себя.`,
        },
      ],
      model: 'gpt-3.5-turbo',
    })
    console.log(text)
  }

  for (let i = 0; i < images.length; i++) {
    images[i].style.filter = `blur(50px)`
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
        style={{
          width: '300px',
          padding: '10px 25px',
          color: 'red',
          backgroundColor: 'black',
          cursor: 'pointer',
          fontFamily: 'Geologica',
          fontSize: '20px',
          marginTop: '20px',
        }}
        onClick={hideText}
      >
        AHAHAHAHAHHA
      </button>
    </div>
  )
}
