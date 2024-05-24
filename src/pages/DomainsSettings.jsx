import React, { useEffect, useState } from 'react'
import { ListItem } from '../components/ListItem'
import { addDomain } from '../components/utils/domainsUtils'
import { useSortList } from '../components/utils/sorting'
import { WordAdder } from '../components/WordAdder'
import { DropdownMenu } from '../components/DropdownMenu'

const DomainsSettings = () => {
  const [domainsList, setDomainList] = useState(null)
  const [filter, setFilter] = useState('date')
  const [ascending, setAscending] = useState(true)

  useEffect(() => {
    const storageListener = chrome.storage.sync.onChanged.addListener(
      (event) => {
        if (event.domains_list) setDomainList(event.domains_list.newValue)
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
          <div className="list_title subtitle">Весь список сайтов</div>
          <div className="list_sorting">
            <button
              className="btn_black mark"
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? 'А-Я' : 'Я-А'}
            </button>
            <DropdownMenu
              onClick={setFilter}
              value_1={'date'}
              value_2={'alphabet'}
              option_1={'По дате добавления'}
              option_2={'По алфавиту'}
            />
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
          {domainsList && Object.keys(domainsList).length > 0 ? (
            sortedDomainsList.map((domain) => (
              <ListItem
                key={domain}
                domainName={domainsList[domain].domain_name}
                domain={domain}
              />
            ))
          ) : (
            <div>Нет добавленных сайтов</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DomainsSettings
