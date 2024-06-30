import { transliterate } from '../content/preparationForAnalyse/transliterate'
import { getDirectTextContent } from './getDirectTextContent'

export const removeTargetMasks = (newWord) => {
  const wrappersArray = Array.from(
    document.getElementsByClassName('nebula_hidden_block_wrapper')
  )
  const stemms = newWord.stemms
  const transliteration = transliterate(stemms)

  wrappersArray.forEach((node) => {
    const oldNode = node.parentNode
    let tagretNode = null
    let currentNode = node

    while (!tagretNode && !!currentNode.firstChild) {
      if (
        Boolean(currentNode.firstChild?.dataset?.nebulaTargetElement) === true
      ) {
        tagretNode = currentNode.firstChild
      } else {
        currentNode = currentNode.firstChild
      }
    }
    for (let i = 0; i < stemms.length; i++) {
      const stemma = stemms[i]
      const transliterateWord = transliteration[i]

      if (
        getDirectTextContent(tagretNode).includes(stemma) ||
        getDirectTextContent(tagretNode).includes(transliterateWord)
      ) {
        oldNode.replaceChild(tagretNode, node)
        return true
      }
    }
  })
}
