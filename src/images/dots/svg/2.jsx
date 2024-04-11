import React from 'react'
import '../css/dotsMove.css'

export const Dots_2 = ({ effectColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      fill={effectColor}
    >
      <circle id="fifth" cx="76.75" cy="238.5" r="15.5" />
      <circle id="second" cx="190.75" cy="54.5" r="9.5" />
      <circle id="first" cx="130.25" cy="206" r="13" />
      <circle id="fourth" cx="13.25" cy="131" r="9" />
      <circle id="third" cx="267.75" cy="153.5" r="6.5" />
    </svg>
  )
}
