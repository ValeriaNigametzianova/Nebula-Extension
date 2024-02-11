document.getElementById('add_new_word').addEventListener('click', async (e) => {
  const word = document.getElementById('word_input').value
  const category = document.getElementById('category_input').value

  if (word && category) {
    const currentCategories = await chrome.storage.sync.get([word])
    const list = currentCategories[word]

    if (list) {
      if (list.includes(category)) return
      list.push(category)
      await chrome.storage.sync.set({ [word]: list })
    } else await chrome.storage.sync.set({ [word]: [category] })
    addListItem(word, category)
  }
})

document.getElementById('clear_all').addEventListener('click', async (e) => {
  chrome.storage.sync.clear()
})

chrome.storage.sync.onChanged.addListener(() => {
  chrome.storage.sync.get(null, (allkeys) => {
    console.log('storage: ', allkeys)
  })
})

const addListItem = (word, category) => {
  let list = document.getElementById('list')

  let item = document.createElement('div')
  item.className = 'item'

  let item_word = document.createElement('div')
  item_word.innerHTML = word
  item_word.className = 'item_word main-text'

  let item_category = document.createElement('div')
  item_category.innerHTML = category
  item_category.className = 'item_category main-text'

  let actions = document.createElement('div')
  actions.className = 'actions'

  let edit_icon = document.createElement('OBJECT')
  edit_icon.setAttribute('data', '/Icons/Edit.svg')

  actions.append(edit_icon)
  item.append(item_word)
  item.append(item_category)
  item.append(actions)
  list.append(item)
}
