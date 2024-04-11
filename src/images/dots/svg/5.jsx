import React from 'react'
import '../css/dotsMove.css'

export const Dots_5 = ({ effectColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      fill={effectColor}
    >
      <circle id="first" cx="130" cy="275" r="9" />
      <circle id="second" cx="118.5" cy="183.5" r="4.5" />
      <circle id="third" cx="17.5" cy="150.5" r="4.5" />
      <circle id="fourth" cx="169" cy="150" r="8" />
      <circle id="fifth" cx="273.5" cy="104.5" r="6.5" />
    </svg>
  )
}
