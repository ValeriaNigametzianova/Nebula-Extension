export const getElementsArray = (element, array) => {
  if (
    element &&
    element.textContent !== '' &&
    element.nodeType == Node.ELEMENT_NODE &&
    element.nodeName !== 'SCRIPT' &&
    element.nodeName !== 'BUTTON' &&
    element.nodeName !== 'IFRAME' &&
    element.nodeName !== 'A' &&
    element.nodeName !== 'STYLE' &&
    element.nodeName !== 'LABEL' &&
    element.nodeName !== 'NOINDEX'
  ) {
    array.push(element)
  }
}
