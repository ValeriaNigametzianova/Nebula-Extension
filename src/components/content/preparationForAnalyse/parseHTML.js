import { getElementsArray } from './getElementsArray'
import { transliterate } from './transliterate'

export const parseHTML = (wordList, elementsArray) => {
  console.log(1)
  for (let word in wordList) {
    const stemms = wordList[word].stemms
    const transliteration = transliterate(stemms)
    if (stemms)
      for (let i = 0; i < stemms.length; i++) {
        const stemma = stemms[i]
        const transliterateWord = transliteration[i]
        const headings = document.evaluate(
          `.//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'), "${stemma}") or contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'), "${transliterateWord}")]`,
          document.body,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        )
        for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
          getElementsArray(headings.snapshotItem(i), elementsArray)
        }
      }
    else {
      const headings = document.evaluate(
        `.//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'), "${word}")]`,
        document.body,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      )
      for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
        getElementsArray(headings.snapshotItem(i), elementsArray)
      }
    }
  }
}
