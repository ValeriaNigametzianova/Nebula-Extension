import React, { useState } from 'react'

export const TabBar = ({ activePage, setActivePage }) => {
  const [wordButton, setWordButton] = useState(true)
  const [domainButton, setDomainButton] = useState(false)
  const [AiButton, setAiButton] = useState(false)

  const TabClick = (tabCLick) => {
    setActivePage(tabCLick.target.id)
    setWordButton(!wordButton)
    setDomainButton(!domainButton)
    setAiButton(!AiButton)
  }
  return (
    <div className="tabs">
      <button
        className={'nebula_title btn_tab tab'}
        id="btn_words"
        onClick={(e) => {
          TabClick(e)
        }}
      >
        Слова
      </button>
      <button
        className={'nebula_title btn_tab tab'}
        id="btn_domains"
        onClick={(e) => {
          TabClick(e)
        }}
      >
        Домены
      </button>
      <button
        className={'nebula_title btn_tab tab'}
        id="btn_neuronet"
        onClick={(e) => {
          TabClick(e)
        }}
      >
        Нейросеть
      </button>
      <div className="active_line">
        {activePage === 'btn_words' ? (
          <></>
        ) : activePage === 'btn_domains' ? (
          <div className="active_domain_page"></div>
        ) : (
          <div className="active_neuronet_page"></div>
        )}
      </div>
    </div>
  )
}
