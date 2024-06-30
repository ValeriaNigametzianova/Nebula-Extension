export const removeAllMasks = () => {
  const wrappersArray = Array.from(
    document.getElementsByClassName('nebula_hidden_block_wrapper')
  )

  wrappersArray.forEach((node) => {
    const oldNode = node.parentNode
    let tagretNode = null
    let currentNode = node

    while (!tagretNode && !!currentNode.firstChild) {
      if (
        Boolean(currentNode.firstChild?.dataset?.nebulaTargetElement) === true
      )
        tagretNode = currentNode.firstChild
      else {
        currentNode = currentNode.firstChild
      }
    }
    oldNode.replaceChild(tagretNode, node)

    if (tagretNode?.getAttributeNode && tagretNode.getAttributeNode('class')) {
      const nodeClassName = tagretNode?.getAttributeNode('class').value
      const defaulNodeClassName = nodeClassName.replace(' nebula', '')

      tagretNode.setAttribute('class', defaulNodeClassName)
    }
  })
}
