import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Register from './pages/Register'
import Login from './pages/Login'
import Courts from './pages/Courts'
import CourtDetail from './pages/CourtDetail'
import ProtectedRoute from './components/ProtectedRoute'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="courts" element={<ProtectedRoute><Courts /></ProtectedRoute>} />
          <Route path="courts/:id" element={<ProtectedRoute><CourtDetail /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
