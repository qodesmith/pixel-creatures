import {useMemo, memo} from 'react'
import {cn} from 'helpers'

export default memo(function PixelCreature({grid, bg}) {
  const pixels = useMemo(() => makeGrid(grid))

  return pixels.map((row, i) => {
    return (
      <div key={i} className="df justify-center">
        {row.map((bool, j) => {
          return <div key={j} className={cn('pixel', {[bg]: bool})} />
        })}
      </div>
    )
  })
})

function makeGrid(size) {
  const half = size / 2
  const num = Math.floor(half)

  const rows = []

  for (let i = 0; i < size; i++) {
    const row = []

    for (let j = 0; j < size; j++) {
      row.push(Math.random() < 0.5)
    }

    row.splice(row.length - num, num, ...row.slice(0, num).reverse())
    rows.push(row)
  }

  return rows
}
