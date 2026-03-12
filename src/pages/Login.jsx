import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', form)
      localStorage.setItem('token', res.data.token)
      alert('Logged in')
      navigate('/courts')
    } catch (err) {
      alert(err?.response?.data?.message || 'Error')
    }
  }
  return (
    <div className="container">
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label><br />
            <input name="email" value={form.email} onChange={onChange} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label>Password</label><br />
            <input type="password" name="password" value={form.password} onChange={onChange} style={{ width: '100%' }} />
          </div>
          <button type="submit" style={{ marginTop: 10 }}>Login</button>
        </form>
      </div>
    </div>
  )
}
