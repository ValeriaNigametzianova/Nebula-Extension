export const AnalyseHTML = async (wordList, elementsArray) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}analyseHTML/chatgpt`,
    // `${import.meta.env.VITE_REACT_APP_API_URL}analyseHTML/gigachat`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ wordList, elementsArray }),
    }
  )
  const result = await res.json()
  console.log('result', result)
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
