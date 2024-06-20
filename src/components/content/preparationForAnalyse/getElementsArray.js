export const getElementsArray = (element, array) => {
  if (
    element &&
    element.nodeType == Node.ELEMENT_NODE &&
    element.nodeName !== 'SCRIPT' &&
    element.nodeName !== 'BUTTON' &&
    element.nodeName !== 'IFRAME' &&
    element.nodeName !== 'A' &&
    element.nodeName !== 'STYLE' &&
    element.nodeName !== 'TEXTAREA' &&
    element.nodeName !== 'IFARME' &&
    element.nodeName !== 'NOINDEX' &&
    element.nodeName !== 'IMG'
  ) {
    let dublicate = false
    let nodeHasHref = false
    let node = element

    while (node.parentNode) {
      const oldParent = node.parentNode
      if (oldParent?.getAttributeNode && oldParent.getAttributeNode('href')) {
        nodeHasHref = true
        break
      }
      node = oldParent
    }

    array?.map((node) => {
      if (node === element) {
        dublicate = true
      }
    })

    if (!dublicate && !nodeHasHref) {
      array.push(element)
      return true
    }
  }
  return false
}
