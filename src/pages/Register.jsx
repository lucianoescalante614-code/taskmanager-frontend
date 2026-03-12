import React, { useState } from 'react'
import axios from 'axios'

export default function Register(){
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/auth/register', form)
      alert('Registered. Check your email to verify account.')
    } catch (err) {
      alert(err?.response?.data?.message || 'Error')
    }
  }
  return (
    <div className="container">
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label><br />
            <input name="name" value={form.name} onChange={onChange} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label>Email</label><br />
            <input name="email" value={form.email} onChange={onChange} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label>Password</label><br />
            <input type="password" name="password" value={form.password} onChange={onChange} style={{ width: '100%' }} />
          </div>
          <button type="submit" style={{ marginTop: 10 }}>Register</button>
        </form>
      </div>
    </div>
  )
}
