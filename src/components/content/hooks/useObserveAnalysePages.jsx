import { useState } from 'react'
import { debounce } from '../../utils/debounce'
import { getElementsArray } from '../preparationForAnalyse/getElementsArray'
import { useHideText } from './useHideText'

export const useObserveAnalysePages = (wordList) => {
  const observeNode = document.getElementsByTagName('body')[0]
  let newElementsArray = []
  const [isNodeHasClass, setIsNodeHasClass] = useState(false)
  const [nodeClass, setNodeClass] = useState('')
  const hideText = useHideText()

  let observer = new MutationObserver((mutations) => {
    let currentWords = new Set()

    mutations.map((el) => {
      if (el.addedNodes.length > 0) {
        const node = el.addedNodes[el.addedNodes.length - 1]
        if (!node?.getAttributeNode || !node.getAttributeNode('class')) {
          setIsNodeHasClass(false)
        } else {
          setIsNodeHasClass(true)
          setNodeClass(node.getAttributeNode('class').value)
        }

        if (nodeClass.includes('nebula')) setIsNodeHasClass(true)
        else setIsNodeHasClass(false)

        if (
          !isNodeHasClass &&
          node.textContent &&
          !newElementsArray.some((el) => node.isEqualNode(el))
        ) {
          for (let word in wordList) {
            if (node.textContent.includes(word)) {
              const textIncudeWord = getElementsArray(node, newElementsArray)
              if (textIncudeWord) currentWords.add(word)
              return
            }
          }
        }
      }
    })

    if (newElementsArray.length > 0)
      debouncedHideText(newElementsArray, currentWords, wordList)
  })

  observer.observe(observeNode, {
    childList: true,
    subtree: true,
  })

  const debouncedHideText = debounce(hideText, 1000)
}
