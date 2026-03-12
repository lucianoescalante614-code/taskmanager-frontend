import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

export default function Courts(){
  const [courts, setCourts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/courts')
        setCourts(res.data)
      } catch (err) {
        console.error(err)
      } finally { setLoading(false) }
    })()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container">
      <h2>Canchas</h2>
      {courts.length === 0 ? (
        <p>No hay canchas registradas.</p>
      ) : (
        <ul>
          {courts.map(c => (
            <li key={c._id} className="card">
              <Link to={`/courts/${c._id}`}>{c.name}</Link>
              <div>{c.sport} — {c.location} — ${c.pricePerHour}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
