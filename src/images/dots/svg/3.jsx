import React from 'react'
import '../css/dotsMove.css'

export const Dots_3 = ({ effectColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      fill={effectColor}
    >
      <circle id="first" cx="110" cy="153.5" r="10.5" />
      <circle id="second" cx="24" cy="104.5" r="4.5" />
      <circle id="third" cx="219" cy="293.5" r="4.5" />
      <circle id="fourth" cx="120.5" cy="26" r="9" />
      <circle id="fifth" cx="262" cy="260.5" r="6.5" />
    </svg>
  )
}
