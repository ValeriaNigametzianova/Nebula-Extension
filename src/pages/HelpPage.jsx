import React from 'react'
import { Telegram } from '../icons/Telegram'
import { GitHub } from '../icons/GitHub'
import { useResize } from '../components/content/hooks/useResize'

export const HelpPage = () => {
  const { width } = useResize()

  return (
    <div className="nebula_help_page_wrapper">
      <div className="nebula_help_page_content" id="help_page_content">
        <div className="nebula_wrap_tutorual">
          <div className="nebula_subtitle">
            Инструкция по использованию расширения
          </div>
          <iframe
            className="nebula_tutorial"
            id="player"
            type="text/html"
            width={(width * 45) / 100 + 'px'}
            height={(width * 26) / 100 + 'px'}
            src="https://youtube.com/embed/gd7XKKL2izo"
            frameBorder="0"
            allowFullScreen="true"
          ></iframe>
        </div>

        <div className="nebula_help_page_contacts">
          <div className="nebula_subtitle">Связаться с разработчиком</div>
          <div className="nebula_help_page_links">
            <button
              className="nebula_icon_button"
              href="https://t.me/nerpyshka"
            >
              <Telegram />
            </button>
            <button
              className="nebula_icon_button"
              href="https://github.com/ValeriaNigametzianova/Nebula-Extension"
            >
              <GitHub />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
