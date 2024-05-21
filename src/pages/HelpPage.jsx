import React from 'react'
import { Telegram } from '../icons/Telegram'
import { GitHub } from '../icons/GitHub'

export const HelpPage = () => {
  return (
    <div className="help_page_wrapper">
      <div className="help_page_content">
        <div className="subtitle">Инструкция по использованию расширения</div>
        <div className="help_page_contacts">
          <div className="subtitle">Связаться с разработчиком</div>
          <div className="help_page_links">
            <button className="icon_button" href="https://t.me/nerpyshka">
              <Telegram />
            </button>
            <button
              className="icon_button"
              href="https://github.com/ValeriaNigametzianova/Nebula-Extention"
            >
              <GitHub />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
