import { getElementsArray } from './getElementsArray'

export const parseHTML = (wordList, elementsArray) => {
  for (let key in wordList) {
    const headings = document.evaluate(
      // `.//*[contains(text(), "${key}")]`,
      `.//*[contains(text(), "${key}") and not(contains(@class, 'nebula'))]`,
      // `.//*[not(contains(@class, 'nebula'))]`,
      document.body,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    )

    for (let i = 0, length = headings.snapshotLength; i < length; ++i) {
      getElementsArray(headings.snapshotItem(i), elementsArray)
    }
  }
}
