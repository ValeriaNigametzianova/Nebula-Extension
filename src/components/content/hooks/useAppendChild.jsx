import { useEffect, useRef } from 'react'

export const useAppendChild = (node) => {
  const nodeRef = useRef(null)
  useEffect(() => {
    nodeRef.current.appendChild(node)

    if (node?.getAttributeNode('class')) {
      const nodeClass = node.getAttributeNode('class').value

      if (!nodeClass.includes('nebula')) {
        node.setAttribute('class', nodeClass + ' nebula')
      }
    }
  }, [])

  return nodeRef
}
