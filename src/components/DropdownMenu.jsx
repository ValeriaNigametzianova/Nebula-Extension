import React from 'react'

export const DropdownMenu = ({
  onClick,
  defaultOption,
  optionItems,
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
      {Object.entries(optionItems).map((sortingPair) => (
        <option key={sortingPair[0]} value={sortingPair[0]}>
          {sortingPair[1]}
        </option>
      ))}
    </select>
  )
}
