'use client'

import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState<number>(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setSize(window.innerWidth)

    const updateSize = () => {
      setSize(window.innerWidth)
    }

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isMounted ? size : 0
}