import { getElementsArray } from './getElementsArray'
import { transliterate } from './transliterate'

export const parseHTML = (wordList, elementsArray) => {
  let currentWords = new Set()
  for (let word in wordList) {
    const stemms = wordList[word].stemms
    const transliteration = transliterate(stemms)
    if (stemms)
      for (let i = 0; i < stemms.length; i++) {
        const stemma = stemms[i]
        const transliterateWord = transliteration[i]
        const headings = document.evaluate(
          `.//*[${getXpathContains(stemma)} or ${getXpathContains(transliterateWord)}]`,
          document.body,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        )
        for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
          const textIncudeWord = getElementsArray(
            headings.snapshotItem(i),
            elementsArray
          )
          if (textIncudeWord) currentWords.add(word)
        }
      }
    else {
      const transliterateWord = transliterate(word)
      const headings = document.evaluate(
        `.//*[${getXpathContains(word)} or ${getXpathContains(transliterateWord)}]`,
        document.body,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      )
      for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
        const textIncudeWord = getElementsArray(
          headings.snapshotItem(i),
          elementsArray
        )
        if (textIncudeWord) currentWords.add(word)
      }
    }
  }
  return currentWords
}

export const getXpathContains = (param) => {
  const string = `contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'), "${param}")`
  return string
}
