import React from 'react'
import '../css/dotsMove.css'

export const Dots_1 = ({ effectColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      fill={effectColor}
    >
      <circle id="third" cx="84.5" cy="66.5" r="20.5" />
      <circle id="second" cx="198.5" cy="140.5" r="9.5" />
      <circle id="first" cx="163" cy="193" r="13" />
      <circle id="fourth" cx="46" cy="27" r="13" />
      <circle id="fifth" cx="227.5" cy="247.5" r="6.5" />
    </svg>
  )
}
