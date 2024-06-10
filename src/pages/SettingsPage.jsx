import React, { useRef, useState } from 'react'
import WordsSettings from './WordsSettings'
import DomainsSettings from './DomainsSettings'
import { useResize } from '../components/content/hooks/useResize'
import { VisualSettings } from './VisualSettings'
import { TabBar } from '../components/TabBar'
import { NeuronetSettings } from './NeuronetSettings'

export const SettingsPage = () => {
  const rightSideRef = useRef(null)
  const { height } = useResize()
  const [activePage, setActivePage] = useState('btn_words')

  return (
    <div className="nebula_wrapper_page">
      <button
        className="nebula_help_button nebula_btn_red nebula_title"
        onClick={() => {
          const url = chrome.runtime.getURL('src/html/helpPage.html')
          chrome.tabs.create({ url })
        }}
      >
        ?
      </button>
      <div className="nebula_left_side">
        <TabBar activePage={activePage} setActivePage={setActivePage} />
        {activePage === 'btn_words' && <WordsSettings />}
        {activePage === 'btn_domains' && <DomainsSettings />}
        {activePage === 'btn_neuronet' && <NeuronetSettings />}
      </div>

      <div
        ref={rightSideRef}
        className="nebula_right_side"
        style={
          rightSideRef?.current?.scrollHeight >= height
            ? { position: 'absolute' }
            : { position: 'fixed' }
        }
      >
        <VisualSettings />
      </div>
    </div>
  )
}
