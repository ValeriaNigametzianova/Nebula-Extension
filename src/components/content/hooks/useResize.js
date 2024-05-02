import { useEffect, useState } from 'react'

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth)
      setHeight(event.target.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    width,
    height,
  }
}
