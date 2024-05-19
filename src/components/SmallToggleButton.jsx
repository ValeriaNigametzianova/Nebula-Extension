import React from 'react'

export const SmallToggleButton = ({ title }) => {
  return (
    <div className="show_word">
      <div className="name mark">{title}</div>
      <div className="show_toggle" id="show_toggle">
        <input className="checkbox_input" type="checkbox" />
        <span></span>
      </div>
    </div>
  )
}
