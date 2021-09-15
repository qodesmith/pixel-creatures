export default function PlusMinus({setter}) {
  return (
    <div className="df justify-center">
      <button onClick={() => setter(num => num - 1)}>-</button>
      <button onClick={() => setter(num => num + 1)}>+</button>
    </div>
  )
}
