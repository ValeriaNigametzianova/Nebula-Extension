import React, { useState } from 'react'
import { Telegram } from '../icons/Telegram'
import { GitHub } from '../icons/GitHub'
import { Gmail } from '../icons/Gmail'
import { useResize } from '../components/content/hooks/useResize'
import { ContactsLinkButton } from '../components/ContactsLinkButton'
import { Behance } from '../icons/Behance'

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
            src={`https://youtube.com/embed/gd7XKKL2izo?origin=chrome-extension://${chrome.runtime.id}`}
            frameBorder="0"
            allowFullScreen="true"
          ></iframe>
          <div className="nebula_mark">
            Если видео не загрузилось, то оно также доступно по ссылке:{' '}
            <a
              href="https://youtu.be/gd7XKKL2izo?si=d1bh6pMazXc872IS"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://youtu.be/gd7XKKL2izo?si=d1bh6pMazXc872IS
            </a>
          </div>
        </div>
        <div className="nebula_help_page_contacts">
          <div className="nebula_subtitle">Связаться с разработчиком</div>
          <div className="nebula_help_page_links">
            <ContactsLinkButton href="mailto:valeria.ngmtzva@gmail.com?subject=Расширение%20Небула">
              <Gmail />
            </ContactsLinkButton>
            <ContactsLinkButton href="https://t.me/nerpyshka">
              <Telegram />
            </ContactsLinkButton>
            <ContactsLinkButton href="https://github.com/ValeriaNigametzianova/Nebula-Extension">
              <GitHub />
            </ContactsLinkButton>
            <ContactsLinkButton href="https://www.behance.net/valeria_ngmtzva">
              <Behance />
            </ContactsLinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
