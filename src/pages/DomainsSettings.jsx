import React, { useEffect, useState } from 'react'
import { ListItem } from '../components/ListItem'
import { addDomain } from '../components/utils/domainsUtils'
import { useSortList } from '../components/utils/sorting'
import { WordAdder } from '../components/WordAdder'

const DomainsSettings = () => {
  const [domainsList, setDomainList] = useState(null)
  const [filter, setFilter] = useState('date')
  const [ascending, setAscending] = useState(true)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.domains_list) setDomainList(event.domains_list.newValue)
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
    chrome.storage.sync.get(['domains_list']).then(({ domains_list }) => {
      setDomainList(domains_list)
    })
  }, [])

  const removeDomains = async () => {
    await chrome.storage.sync.remove(['domains_list'])
    const { domains_list } = await chrome.storage.sync.get(['domains_list'])
    const list = domains_list ? Object.keys(domains_list) : null
    // ChangeManifest(list)
  }

  const sortedDomainsList = useSortList(domainsList, filter, ascending)

  return (
    <div className="wrapper_content">
      <WordAdder
        subtitle="Добавьте сайт, на котором не следует анализировать"
        placeholder="https://domain.com"
        onSubmit={(domain, domainName) => {
          addDomain(domain, domainName)
        }}
      />
      <div className="list_section">
        <div className="list_start_line">
          <div className="list_title subtitle">Весь список</div>
          <div className="list_sorting">
            <button
              className="btn_black"
              style={{ borderRadius: '2px' }}
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? 'A-Z' : 'Z-A'}
            </button>
            <select
              className="select_dropdown mark"
              onClick={(e) => setFilter(e.target.value)}
            >
              <option value="date">По дате добавления</option>
              <option value="alphabet">По алфавиту</option>
            </select>
          </div>
        </div>
        <div className="list_header">
          <div className="word mark">Домен</div>
          <div className="category mark">Имя</div>
          <button className="mark btn_link" onClick={removeDomains}>
            Удалить все
          </button>
        </div>
        <div id="list" className="list">
          {domainsList ? (
            sortedDomainsList.map((domain) => (
              <ListItem
                key={domain}
                domainName={domainsList[domain].domain_name}
                domain={domain}
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
