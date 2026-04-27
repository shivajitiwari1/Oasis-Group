'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) router.replace('/admin/dashboard')
    else { setError('Invalid username or password.'); setLoading(false) }
  }

  return (
    <div className="admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg,#0a1628,#0f2044,#0d2a1e)' }}>
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#1a8c7d,#c9963a)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: '#fff', fontWeight: 700, margin: '0 auto 14px' }}>O</div>
          <h1>Oasis Admin Panel</h1>
          <p>Sign in to manage your website</p>
        </div>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={submit} className="admin-login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" required autoComplete="username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" required type="password" autoComplete="current-password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Enter password" />
          </div>
          <button type="submit" className="admin-login-btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign In →'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#aaa' }}>Default: admin / oasis@2025</p>
      </div>
    </div>
  )
}
