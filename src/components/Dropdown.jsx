import React from 'react'

export const Dropdown = ({ state, setState, className }) => {
  return (
    <select value={state} className={className} onChange={(e) => setState(e.target.value)}>
      <option value=''>Категория</option>
      <option value='Фильмы'>Фильмы</option>
      <option value='Игры'>Игры</option>
      <option value='Новости'>Новости</option>
      <option value='Люди'>Люди</option>
      <option>Добавить категорию</option>
    </select>
  )
}
