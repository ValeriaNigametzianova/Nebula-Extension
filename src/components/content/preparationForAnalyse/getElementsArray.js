export const getElementsArray = (element, array) => {
  if (
    element &&
    element.nodeType == Node.ELEMENT_NODE &&
    element.nodeName !== 'SCRIPT' &&
    element.nodeName !== 'BUTTON' &&
    element.nodeName !== 'IFRAME' &&
    element.nodeName !== 'A' &&
    element.nodeName !== 'STYLE'
  ) {
    array.push(element)
  }
}
