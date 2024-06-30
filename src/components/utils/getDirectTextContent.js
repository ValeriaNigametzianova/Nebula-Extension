export const getDirectTextContent = (node) => {
  if (!(node instanceof HTMLElement)) return ''

  let textContent = ''

  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      textContent += child.nodeValue
    }
  })

  return textContent
}
