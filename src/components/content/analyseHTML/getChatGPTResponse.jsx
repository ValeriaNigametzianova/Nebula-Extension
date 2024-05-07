import OpenAI from 'openai'
export const getChatGPTResponse = async (wordList, elementsArray) => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_CHATGPT_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  //   const content = `Ты получишь два объекта. Твоя задача - найти все слова в тексте, которые подходят по контексту. У слова может существовать много категорий (смыслов), но твоя задача - использовать указанную. Слова и категории находятся в первом объекте, у которого ключами являются слова, необходимые для поиска, а их значениями - массив категорий. Во втором объекте значениями являются тексты, в которых ты должен искать указанные слова. Если текст содержит вхождение слова в нужном контексте, то ты отвечаешь "true". Если нет, то "false". В своем ответе верни объект, в котором ключом будет ключ из второго объхекта, а значением "true" или "false" (булевые) в зависимости от того, найдено ли слово в тексте или нет. Первый объект: ${JSON.stringify(wordList)}, второй объект: ${JSON.stringify(
  //     Object.assign(
  //       {},
  //       elementsArray.map((el) => el.textContent)
  //     )
  //   )}`
  // const content = `
  // your task is to find all mentions of words in the text that fit into a certain category. There can be many categories and meanings of a word, but you need to find exactly the one specified. You will get two objects. The object contains key-value pairs, where the key is the word you want to lock, and the value is an array of categories in the context of which the word can be used. The array contains the texts in which you want to look for words. You need to read all the text from the second object and match it with the words from the first object. If the text contains a word in the correct context, you answer 'true'. If the text doesn't contain the word, or contains it in the wrong context, you answer 'false'. As a result, create only an object with the key being the identifier from the second object and the value being 'true - ' or 'false - ' and why u think it is used in certain context depending on the world found in the each text. Object:${JSON.stringify(wordList)}. Second object:${JSON.stringify(
  //   Object.assign(
  //     {},
  //     elementsArray.map((el) => el.textContent)
  //   )
  // )}`
  console.log('w', wordList)
  console.log(
    'ts',
    Object.assign(
      {},
      elementsArray.map((el) => el.textContent)
    )
  )

  const word = Object.keys(wordList)[0]
  const textsStringified = JSON.stringify(
    Object.assign(
      {},
      elementsArray.map((el) => el.textContent)
    )
  )

  // const content = `does the word ${word} in paragraphs ${textsStringified} used in context of ${categories}? answer with object containing a boolean with true/false for each object entry. Explain why after word Explanation:`
  // const response = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: 'system',
  //       content,
  //     },
  //   ],
  //   model: 'gpt-3.5-turbo',
  // })
  // console.log(content, 'content')
  // const [respObject, explanation] =
  //   response.choices[0].message.content.split('Explanation')
  // console.log(respObject)
  // console.log(explanation)
  // const AIResponse = JSON.parse(respObject)
  let AnalysedText = undefined
  for (let word in wordList) {
    const categories = wordList[word].categories.join(', ')

    const content = `does the word ${word} in paragraphs ${textsStringified} used in context of ${categories}? answer with object containing a boolean with true/false for each object entry into AnalysedText. Explain why into Explanation`

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.',
        },
        {
          role: 'user',
          content,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
      response_format: { type: 'json_object' },
    })

    const AnalysedTemp = JSON.parse(
      response.choices[0].message.content
    ).AnalysedText
    console.log('AnalysedTemp', AnalysedTemp)

    if (AnalysedText === undefined) AnalysedText = AnalysedTemp
    else {
      for (let i = 0; i < Object.keys(AnalysedText).length; i++) {
        if (AnalysedText[i] === true) console.log('1')
        else if (AnalysedTemp[i] === true) AnalysedText[i] = AnalysedTemp[i]
        else AnalysedTemp[i] === false
      }
    }
    console.log('AnalysedText', AnalysedText)
  }

  const AIResponse = AnalysedText

  return AIResponse
}
