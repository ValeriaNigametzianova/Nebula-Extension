import React, { useEffect, useState } from 'react'
import { ListItem } from '../components/ListItem'

const DomainsSettings = () => {
  const [domain, setDomain] = useState('')
  const [domainName, setDomainName] = useState('')
  const [domain_list, setDomainList] = useState(null)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.domain_list) setDomainList(event.domain_list.newValue)
        chrome.storage.sync.get(null, (allkeys) => {
          console.log('allkeys: ', allkeys)
        })
        return () => {
          chrome.storage.sync.onChanged.removeListener(storageListener)
        }
      }
    )
  }, [])

  useEffect(() => {
    chrome.storage.sync.get(['domain_list']).then(({ domain_list }) => {
      setDomainList(domain_list)
      console.log('domain_list', domain_list)
    })
  }, [])

  const addDomain = async () => {
    if (domain && domainName) {
      const { domain_list } = await chrome.storage.sync.get(['domain_list'])
      const list = domain_list ? Object.keys(domain_list) : null
      console.log('list', list)
      if (list) {
        if (list.includes(domain)) return
        else
          await chrome.storage.sync.set({
            domain_list: { ...domain_list, [domain]: domainName },
          })
      } else
        await chrome.storage.sync.set({
          domain_list: { ...domain_list, [domain]: domainName },
        })
      ChangeManifest(list)
    }
  }

  const removeDomains = async () => {
    await chrome.storage.sync.remove(['domain_list'])
    const { domain_list } = await chrome.storage.sync.get(['domain_list'])
    const list = domain_list ? Object.keys(domain_list) : null
    ChangeManifest(list)
  }
  const ChangeManifest = (list) => {
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i] + '*'
      console.log(list[i])
    }
    console.log('man_list', list)
    let myDynamicManifest = {
      manifest_version: 3,
      version: '1.0.0',
      name: 'Nebula',
      description: '',
      action: {
        default_popup: 'src/html/popup.html',
      },
      content_scripts: [
        {
          js: ['src/content.jsx'],
          matches: ['<all_urls>'],
          exclude_matches: list,
        },
      ],
      permissions: ['tabs', 'storage'],
      host_permissions: ['<all_urls>'],
      background: {
        service_worker: 'src/background.js',
      },
    }
    const stringManifest = JSON.stringify(myDynamicManifest)
    const blob = new Blob([stringManifest], { type: 'application/json' })
    console.log('blob', blob)
    const manifestURL = URL.createObjectURL(blob)
    console.log('manifestURL', manifestURL)
    document
      .querySelector('#my-manifest-placeholder')
      .setAttribute('href', manifestURL)
  }

  return (
    <div className="wrapper_content">
      <div className="add_word_section">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="input_page main-text"
          placeholder="https://domain.com"
        ></input>
        <input
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          className="input_page_right main-text"
          placeholder="Можете дать название"
        ></input>
        <button
          className="button-text add_button_page btn_red"
          onClick={addDomain}
        >
          Добавить
        </button>
        <button
          className="button-text add_button_page btn_red"
          onClick={removeDomains}
        >
          Удалить все
        </button>
      </div>
      <div className="list_section">
        <div className="list_start_line">
          <div className="list_title subtitle">Весь список</div>
          <select name="" id="" className="select_dropdown mark">
            <option value="films">По дате добавления</option>
            <option value="games">По алфавиту</option>
          </select>
        </div>
        <div className="list_header">
          <div className="word mark">Имя</div>
          <div className="category mark">Домен</div>
        </div>
        <div id="list" className="list">
          {domain_list ? (
            Object.entries(domain_list).map((el) => (
              <ListItem
                key={el[0] + ' ' + el[1]}
                domainName={el[0]}
                domain={el[1]}
              />
            ))
          ) : (
            <div>Load</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DomainsSettings
