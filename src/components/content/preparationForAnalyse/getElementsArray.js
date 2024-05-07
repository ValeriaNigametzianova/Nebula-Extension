export const getElementsArray = (element, array) => {
  if (
    element &&
    element.nodeType == Node.ELEMENT_NODE &&
    element.nodeName !== 'SCRIPT' &&
    element.nodeName !== 'BUTTON'
  ) {
    array.push(element)
  }
}
