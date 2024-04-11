import React from 'react'
import '../css/dotsMove.css'

export const Dots_4 = ({ effectColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      fill={effectColor}
    >
      <circle id="first" cx="205.25" cy="249.5" r="17.5" />
      <circle id="second" cx="205.25" cy="44.5" r="4.5" />
      <circle id="third" cx="97.25" cy="267.5" r="4.5" />
      <circle id="fourth" cx="27.25" cy="230.5" r="11.5" />
      <circle id="fifth" cx="239.25" cy="25.5" r="6.5" />
    </svg>
  )
}
