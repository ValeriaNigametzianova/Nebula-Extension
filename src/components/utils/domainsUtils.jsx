export const addDomain = async (domain, domainName) => {
  if (domain) {
    const { domains_list } = await chrome.storage.sync.get(['domains_list'])
    if (domains_list[domain]) return
    else {
      await chrome.storage.sync.set({
        domains_list: {
          ...domains_list,
          [domain]: {
            domain_name: domainName,
            dateCreated: new Date().toISOString(),
            dateEdited: new Date().toISOString(),
          },
        },
      })
    }
  }
}

export const editDomain = async (domain, newDomain, domainName) => {
  if (domain) {
    const { domains_list } = await chrome.storage.sync.get(['domains_list'])
    const dateCreated = domains_list[domain].dateCreated
    if (domain === newDomain) {
      await chrome.storage.sync.set({
        domains_list: {
          ...domains_list,
          [domain]: {
            domain_name: domainName,
            dateCreated: dateCreated,
            dateEdited: new Date().toISOString(),
          },
        },
      })
    } else {
      delete domains_list[domain]
      await chrome.storage.sync.set({
        domains_list: {
          ...domains_list,
          [newDomain]: {
            domain_name: domainName,
            dateCreated: dateCreated,
            dateEdited: new Date().toISOString(),
          },
        },
      })
    }
  }
}

export const deleteDomain = async (domain) => {
  chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
    delete domains_list[domain]
    chrome.storage.sync.set({
      domains_list,
    })
  })
}
