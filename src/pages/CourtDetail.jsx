import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useParams } from 'react-router-dom'

function ReservationForm({ courtId, onCreated }){
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const onSubmit = async e => {
    e.preventDefault()
    try {
      await api.post('/reservations', { court: courtId, startTime, endTime })
      alert('Reservation created')
      setStartTime(''); setEndTime('')
      onCreated && onCreated()
    } catch (err) {
      alert(err?.response?.data?.message || 'Error creating reservation')
    }
  }
  return (
    <form onSubmit={onSubmit} style={{ marginTop: 20 }}>
      <div>
        <label>Start</label><br />
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div>
        <label>End</label><br />
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required style={{ width: '100%', marginTop: 5 }} />
      </div>
      <button type="submit" style={{ marginTop: 10 }}>Create reservation</button>
    </form>
  )
}

export default function CourtDetail(){
  const { id } = useParams()
  const [court, setCourt] = useState(null)
  const [reservations, setReservations] = useState([])

  const load = async () => {
    try {
      const res = await api.get('/courts/' + id)
      setCourt(res.data)
      // load reservations for this court (protected route)
      const rr = await api.get('/reservations', { params: { courtId: id } })
      setReservations(rr.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { load() }, [id])

  if (!court) return <div>Loading court...</div>

  return (
    <div className="container">
      <div className="card">
        <h2>{court.name}</h2>
        <div>{court.sport} — {court.location}</div>
        <div>Precio: ${court.pricePerHour}</div>

      <h3 style={{ marginTop: 20 }}>Reservas</h3>
{reservations.length === 0 ? (
          <p>No hay reservas para esta cancha.</p>
        ) : (
          <ul>
            {reservations.map(r => (
              <li key={r._id}>{new Date(r.startTime).toLocaleString()} → {new Date(r.endTime).toLocaleString()} — {r.user && r.user.email}</li>
            ))}
          </ul>
        )}

      <h3 style={{ marginTop: 20 }}>Crear reserva</h3>
      <ReservationForm courtId={id} onCreated={load} />
      </div> {/* end card */}
    </div> /* end container */
  )
}
