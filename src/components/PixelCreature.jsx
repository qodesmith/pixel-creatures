import {useMemo, useLayoutEffect, memo, useContext, useRef} from 'react'
import {IntervalContext} from './IntervalContext'
import {cn} from 'helpers'
import usePrevious from 'hooks/usePrevious'

export default memo(function PixelCreature({
  squares,
  bg,
  shouldAnimate,

  // Static button that causes every creature to regenerate.
  regenerateTrigger,
}) {
  const initialPixels = useMemo(() => makeGrid(squares), [])
  const pixelsRef = useRef(initialPixels)
  const previousRegenerateTrigger = usePrevious(regenerateTrigger)

  // App-wide interval setting the cadence of regeneration.
  const intervalTrigger = useContext(shouldAnimate ? IntervalContext : {})
  const previousIntervalTrigger = usePrevious(intervalTrigger)

  console.log(regenerateTrigger !== previousRegenerateTrigger)

  useLayoutEffect(() => {
    if (shouldAnimate || regenerateTrigger !== previousRegenerateTrigger) {
      pixelsRef.current = makeGrid(squares)
    }
  }, [
    shouldAnimate, //
    regenerateTrigger,
    previousRegenerateTrigger,
    intervalTrigger,
  ])

  const x = [
    4332423423423, //
    23423423432423,
    4324312345245,
    5645634563456,
    65354634635654,
    345634563465346345,
    6535636534636,
    43563456363456,
    3242394802384029834092384092384098,
  ]

  return pixelsRef.current.map((row, i) => {
    return (
      <div key={i} className="df justify-center">
        {row.map((bool, j) => {
          return <div key={j} className={cn('pixel', {[bg]: bool})} />
        })}
      </div>
    )
  })
})

function makeGrid(squares) {
  const half = Math.floor(squares / 2)
  const rows = []

  for (let i = 0; i < squares; i++) {
    const arr1 = []
    for (let j = 0; j < half; j++) arr1.push(getBool())

    const arr2 = arr1.slice().reverse()
    if (squares % 2) arr1.push(getBool())

    rows.push(arr1.concat(arr2))
  }

  return rows
}

function getBool() {
  return Math.random() < 0.5
}
