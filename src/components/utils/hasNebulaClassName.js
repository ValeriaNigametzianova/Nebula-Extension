export const hasNebulaClassName = (node) => {
  if (!node?.getAttributeNode || !node.getAttributeNode('class')) return false
  return node?.getAttributeNode('class')?.value?.includes('nebula')
}
