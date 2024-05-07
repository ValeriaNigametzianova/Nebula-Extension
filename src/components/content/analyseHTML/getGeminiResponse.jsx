import { GoogleGenerativeAI } from '@google/generative-ai'

export const getGeminiResponse = () => {
  const API_KEY = '...'

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY)

  // ...

  const model = genAI.getGenerativeModel({ model: 'MODEL_NAME' })
}
