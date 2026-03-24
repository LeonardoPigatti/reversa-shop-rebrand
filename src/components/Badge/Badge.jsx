import './Badge.css'

export default function Badge({ count }) {
  if (!count) return null
  return <span className="badge">{count}</span>
}
