import { useEffect, useRef } from 'react'

export const useAppendChild = (node) => {
  const nodeRef = useRef(null)
  useEffect(() => {
    nodeRef.current.appendChild(node)
  }, [])

  return nodeRef
}
