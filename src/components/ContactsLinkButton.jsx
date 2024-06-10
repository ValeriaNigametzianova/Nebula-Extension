import React from 'react'

export const ContactsLinkButton = ({ href, children }) => {
  return (
    <a className="nebula_icon_button" href={href}>
      {children}
    </a>
  )
}
