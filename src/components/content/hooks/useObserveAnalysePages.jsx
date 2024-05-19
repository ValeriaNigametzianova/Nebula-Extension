import { useState } from 'react'
import { debounce } from '../../utils/debounce'
import { getElementsArray } from '../preparationForAnalyse/getElementsArray'
import { hideText } from '../preparationForAnalyse/hideText'

export const useObserveAnalysePages = (wordList) => {
  const observeNode = document.getElementsByTagName('body')[0]
  let newElementsArray = []
  const [isNodeHasClass, setIsNodeHasClass] = useState(false)
  const [nodeClass, setNodeClass] = useState('')

  let observer = new MutationObserver((mutations) => {
    mutations.map((el) => {
      if (el.addedNodes.length > 0) {
        const node = el.addedNodes[el.addedNodes.length - 1]

        if (!node.getAttributeNode('class')) {
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
          let trust = false
          for (let word in wordList) {
            if (node.textContent.includes(word)) {
              trust = true
              return
            }
          }
          if (trust) getElementsArray(node, newElementsArray)
        }
      }
    })

    if (newElementsArray.length > 0)
      debouncedHideText(newElementsArray, wordList)
  })

  observer.observe(observeNode, {
    childList: true,
    subtree: true,
  })

  const debouncedHideText = debounce(hideText, 1000)
}
