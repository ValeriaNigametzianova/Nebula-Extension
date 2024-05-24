import { getElementsArray } from './getElementsArray'

export const parseHTML = (wordList, elementsArray) => {
  for (let word in wordList) {
    const stemms = wordList[word].stemms
    if (stemms)
      stemms.map((stemma) => {
        const headings = document.evaluate(
          `.//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'), "${stemma}")]`,
          document.body,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        )
        for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
          getElementsArray(headings.snapshotItem(i), elementsArray)
        }
      })
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
