import React from 'react'
import { Tooltip } from '../icons/Tooltip'

export const SmallToggleButton = ({
  title,
  value,
  setValue,
  className,
  disabled,
  tooltip,
}) => {
  return (
    <div className={className}>
      <div className="nebula_show_toggle_title">
        {title && <div className="nebula_name nebula_mark">{title}</div>}
        {tooltip && (
          <button
            className="nebula_icon_button_toolip"
            style={{ scale: '0.8' }}
            title={tooltip}
          >
            <Tooltip />
          </button>
        )}
      </div>
      <div className="nebula_show_toggle" id="show_toggle">
        <input
          className="nebula_checkbox_input"
          disabled={disabled}
          type="checkbox"
          checked={value}
          onChange={(e) => {
            setValue(e.target.checked)
          }}
        />
        <span></span>
      </div>
    </div>
  )
}
