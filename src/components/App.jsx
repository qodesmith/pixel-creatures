import PixelCreature from './PixelCreature'
import {useLayoutEffect, useMemo, useState, useContext} from 'react'
import PlusMinus from './PlusMinus'
import {IntervalProvider, IntervalContext} from './IntervalContext'

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
  const [size, setSize] = useState(5)
  const [squares, setSquares] = useState(5)
  const [numOfCreatures, setNumOfCreatures] = useState(5)
  const root = useMemo(() => document.querySelector(':root'))
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useLayoutEffect(() => {
    root.style.setProperty('--size', `${size}px`)
  }, [size])

  return (
    <div className="df flex-col vh-100">
      <section className="flex-grow-1 bg-black-80 fw4 white-80 tc pt24">
        <div className="df justify-center">
          <div className="df flex-col align-items-center">
            <div>
              <button
                onClick={() => setNum(n => n + 1)}
                className="ph12 pv4 f-initial">
                Regenerate Creatures
              </button>
              <button
                className="ph12 pv4 f-initial ml8"
                onClick={() => setShouldAnimate(val => !val)}>
                {shouldAnimate ? 'Stop' : 'Start'} Animating
              </button>
              <IntervalProvider>
                <Test />
              </IntervalProvider>
            </div>
            <div className="df mv16 ba-1px pa12">
              <div>
                <label htmlFor="creatures">Creatures ({numOfCreatures})</label>
                <PlusMinus setter={setNumOfCreatures} />
                <input
                  id="creatures"
                  type="range"
                  min="1"
                  max="300"
                  step="1"
                  className="db mt8"
                  value={numOfCreatures}
                  onChange={e => setNumOfCreatures(+e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="size">Size ({size})</label>
                <PlusMinus setter={setSize} />
                <input
                  id="size"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  className="db mt8"
                  value={size}
                  onChange={e => {
                    setSize(+e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="squares">
                  Squares ({squares} &times; {squares})
                </label>
                <PlusMinus setter={setSquares} />
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
          <IntervalProvider>
            {Array.from({length: numOfCreatures}, (_, i) => {
              const color = blues[i % blues.length]

              return (
                <div key={color + i} style={{margin: 10}}>
                  <PixelCreature
                    squares={squares}
                    bg={`bg-${color}`}
                    shouldAnimate={shouldAnimate && !((i - 2) % 3)} // Every 3rd one animates.
                    regenerateTrigger={num}
                  />
                </div>
              )
            })}
          </IntervalProvider>
        </div>
      </section>
    </div>
  )
}

function Test() {
  const num = useContext(IntervalContext)
  return <span>{num}</span>
}
