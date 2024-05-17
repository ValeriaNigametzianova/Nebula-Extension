export const URLExceptionsSetter = (setURLIncludes, currentURL) => {
  chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
    // Если список доменов пустой, то досрочно выходим. Также убираем флаг URLIncluds
    if (Object.keys(domains_list).length === 0) {
      setURLIncludes(false)
      return
    }

    for (let key in domains_list) {
      if (currentURL.includes(key) || key.includes(currentURL)) {
        setURLIncludes(true)
      } else {
        setURLIncludes(false)
      }
    }
  })
}
