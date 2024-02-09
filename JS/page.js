document.getElementById('add_new_word').addEventListener('click', async (e) => {
  const word = document.getElementById('word_input').value
  const category = document.getElementById('category_input').value

  if (word && category) {
    const currentCategories = await chrome.storage.sync.get([word])
    const list = currentCategories[word]

    if (list) {
      if (list.includes(category)) return
      list.push(category)
      chrome.storage.sync.set({ [word]: list })
    } else chrome.storage.sync.set({ [word]: [category] })
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
