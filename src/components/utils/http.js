export const AnalyseHTML = async (
  currentWords,
  wordList,
  elementsArray,
  AIModel,
  APIKey
) => {
  const url =
    AIModel === 'ChatGPT'
      ? `${import.meta.env.VITE_REACT_APP_API_URL}analyseHTML/chatgpt`
      : `${import.meta.env.VITE_REACT_APP_API_URL}analyseHTML/gigachat`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ currentWords, wordList, elementsArray, APIKey }),
  })
  const result = await res.json()
  return result
}

export const testRequest = async (url) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}analyseHTML/testRequest`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ url }),
    }
  )
  const result = await res.json()
  return result
}

export const stemmingWords = async (words) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}stemmingWords`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ words }),
    }
  )
  const result = await res.json()
  return result
}
