import React from 'react'

export const DropdownMenu = ({
  onClick,
  defaultOption,
  option_1,
  option_2,
}) => {
  return (
    <select
      className="select_dropdown mark"
      onClick={(e) => onClick(e.target.value)}
    >
      {defaultOption ? (
        <option value="" disabled selected>
          {defaultOption}
        </option>
      ) : (
        <></>
      )}
      <option value="date">{option_1}</option>
      <option value="alphabet">{option_2}</option>
    </select>
  )
}
