import React, { useEffect, useRef, useState } from 'react'
import { Slider } from '../components/Slider'
import { Prewiew } from '../components/Prewiew'
import { BlurColorPicker } from '../components/BlurColorPicker'
import WordsSettings from './WordsSettings'
import DomainsSettings from './DomainsSettings'
import { EffectsColorPicker } from '../components/EffectsColorPicker'
import { EffectsPanel } from '../components/EffectsPanel'
import { HoverBehaviorPanel } from '../components/HoverBehaviorPanel'
import { useResize } from '../components/content/hooks/useResize'
import { useLogAllKeys } from '../components/content/hooks/useLogAllKeys'
import { VisualSettings } from './VisualSettings'

export const SettingsPage = () => {
  const rightSideRef = useRef(null)
  const { height } = useResize()
  const [activePage, setActivePage] = useState('btn_words')
  const [wordButton, setWordButton] = useState(true)
  const [domainButton, setDomainButton] = useState(false)

  return (
    <div className="wrapper_page">
      <button className="help_button btn_red nebula_title">?</button>
      <div className="left_side">
        <div className="tabs">
          <button
            className={
              wordButton
                ? 'nebula_title btn_tab tab'
                : 'nebula_title btn_tab tab'
            }
            id="btn_words"
            onClick={(e) => {
              setActivePage(e.target.id)
              setWordButton(!wordButton)
              setDomainButton(!domainButton)
            }}
          >
            Слова
          </button>
          <button
            className={
              domainButton
                ? 'nebula_title btn_tab tab'
                : 'nebula_title btn_tab tab'
            }
            id="btn_domains"
            onClick={(e) => {
              setActivePage(e.target.id)
              setDomainButton(!domainButton)
              setWordButton(!wordButton)
            }}
          >
            Домены
          </button>
          <div className="active_line">
            {activePage === 'btn_words' ? <></> : <div className="tr"></div>}
          </div>
        </div>
        {activePage == 'btn_words' && <WordsSettings />}
        {activePage == 'btn_domains' && <DomainsSettings />}
      </div>

      <div
        ref={rightSideRef}
        className="right_side"
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
