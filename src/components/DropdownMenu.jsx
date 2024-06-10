import React from 'react'

export const DropdownMenu = ({
  onClick,
  defaultOption,
  value_1,
  value_2,
  option_1,
  option_2,
  useNeuronet,
  neuronetModel,
  disabled,
}) => {
  return (
    <select
      className="nebula_select_dropdown nebula_mark"
      disabled={disabled && !useNeuronet}
      onChange={(e) => onClick(e.target.value)}
      value={neuronetModel}
    >
      {defaultOption ? (
        <option value="" disabled>
          {defaultOption}
        </option>
      ) : (
        <></>
      )}
      <option value={value_1}>{option_1}</option>
      <option value={value_2}>{option_2}</option>
    </select>
  )
}
