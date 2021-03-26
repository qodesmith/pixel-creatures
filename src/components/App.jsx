import PixelCreature from './PixelCreature'
import {useEffect, useMemo, useState, useRef} from 'react'

const blues = [
  'aqua',
  'cyan',
  'lightcyan',
  'paleturquoise',
  'aquamarine',
  'turquoise',
  'mediumturquoise',
  'darkturquoise',
  'cadetblue',
  'steelblue',
  'lightsteelblue',
  'powderblue',
  'lightblue',
  'skyblue',
  'lightskyblue',
  'deepskyblue',
  'dodgerblue',
  'cornflowerblue',
  'mediumslateblue',
  'royalblue',
  'blue',
  'mediumblue',
  'darkblue',
  'navy',
  'midnightblue',
]

export default function App() {
  const [num, setNum] = useState(0)
  const [size, setSize] = useState(10)
  const [squares, setSquares] = useState(5)
  const root = useMemo(() => document.querySelector(':root'))
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (!isFirstRun.current) {
      root.style.setProperty('--size', `${size}px`)
    } else {
      isFirstRun.current = false
    }
  }, [size])

  return (
    <div className="df flex-col vh-100">
      <section className="flex-grow-1 bg-black-80 fw4 white-80 tc pt24">
        <div className="df justify-center">
          <div className="df flex-col align-items-center">
            <button
              onClick={() => setNum(n => n + 1)}
              className="ph12 pv4 f-initial">
              Regenerate Creatures
            </button>
            <div className="mt8 df">
              <div>
                <label htmlFor="size">Size ({size})</label>
                <input
                  id="size"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  className="db mt8"
                  value={size}
                  onChange={e => {
                    setSize(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="squares">
                  Squares ({squares} &times; {squares})
                </label>
                <input
                  id="squares"
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  className="db mt8"
                  value={squares}
                  onChange={e => {
                    setSquares(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="df flex-wrap justify-center">
          {blues.map(color => {
            return (
              <div key={color + num} className="ma32">
                <PixelCreature squares={squares} bg={`bg-${color}`} />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
