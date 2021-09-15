import * as React from 'react'
import {useState, useEffect} from 'react'

export const IntervalContext = React.createContext(0)

export function IntervalProvider({children}) {
  const [num, setNum] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNum(oldNum => oldNum + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <IntervalContext.Provider value={num}>{children}</IntervalContext.Provider>
  )
}
