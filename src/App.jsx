import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

export default function App(){
  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 className="title">Reserva tu Cancha</h1>
        <NavBar />
      </header>
      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  )
 }
