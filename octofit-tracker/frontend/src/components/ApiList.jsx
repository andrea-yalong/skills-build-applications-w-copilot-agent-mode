import { useEffect, useState } from 'react'

function extractArray(resp, keyPlural) {
  if (Array.isArray(resp)) return resp
  if (resp == null) return []
  if (keyPlural && resp[keyPlural]) return resp[keyPlural]
  // common wrappers
  return resp.items || resp.results || resp.data || Object.values(resp)[0] || []
}

export default function ApiList({ resource, renderItem }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME
    const base = codespace ? `https://${codespace}-8000.app.github.dev/api` : `${window.location.protocol}//${window.location.hostname}:8000/api`
    const url = `${base}/${resource}`

    setLoading(true)
    fetch(url)
      .then(r => r.json())
      .then(body => {
        const arr = extractArray(body, resource)
        setItems(arr || [])
      })
      .catch(err => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [resource])

  if (loading) return <div>Loading {resource}…</div>
  if (error) return <div>Error: {error}</div>
  if (!items || items.length === 0) return <div>No {resource} found.</div>

  return (
    <ul>
      {items.map((it, idx) => (
        <li key={it._id || it.id || idx}>{renderItem ? renderItem(it) : JSON.stringify(it)}</li>
      ))}
    </ul>
  )
}
