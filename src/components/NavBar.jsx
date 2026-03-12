import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const logout = () => { localStorage.removeItem('token'); navigate('/') }

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Link to="/courts">Canchas</Link>
      {token ? (
        <button onClick={logout} style={{ marginLeft: 'auto' }}>Logout</button>
      ) : (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  )
}
