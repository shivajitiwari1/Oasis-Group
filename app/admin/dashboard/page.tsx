'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'
import Link from 'next/link'

interface Enquiry { id: string; firstName: string; lastName: string; phone: string; email: string; project: string; type: string; status: string; createdAt: string }

export default function DashboardPage() {
  const { checking } = useAdminAuth()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (checking) return
    fetch('/api/admin/enquiries').then(r => r.json()).then(d => { setEnquiries(Array.isArray(d) ? d : []); setLoading(false) }).catch(() => setLoading(false))
  }, [checking])

  if (checking) return null

  const newCount = enquiries.filter(e => e.status === 'new').length
  const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  const quickLinks = [
    { label: '🏠 Hero Section', href: '/admin/site/hero' },
    { label: '🏢 Projects', href: '/admin/site/projects' },
    { label: '📈 Stats', href: '/admin/site/stats' },
    { label: '💬 Testimonials', href: '/admin/site/testimonials' },
    { label: '⭐ Why Invest', href: '/admin/site/why' },
    { label: '📍 Contact Info', href: '/admin/site/contact' },
  ]

  return (
    <AdminShell title="Dashboard">
      <div className="admin-stats-grid">
        <div className="admin-stat-card"><div className="admin-stat-icon teal">📩</div><div><div className="admin-stat-num">{enquiries.length}</div><div className="admin-stat-label">Total Enquiries</div></div></div>
        <div className="admin-stat-card"><div className="admin-stat-icon gold">🔔</div><div><div className="admin-stat-num">{newCount}</div><div className="admin-stat-label">New Enquiries</div></div></div>
        <div className="admin-stat-card"><div className="admin-stat-icon green">✅</div><div><div className="admin-stat-num">{enquiries.filter(e => e.status === 'contacted').length}</div><div className="admin-stat-label">Contacted</div></div></div>
        <div className="admin-stat-card"><div className="admin-stat-icon blue">🏢</div><div><div className="admin-stat-num">5</div><div className="admin-stat-label">Active Projects</div></div></div>
      </div>

      {/* Recent Enquiries */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Recent Enquiries</h3>
          <Link href="/admin/enquiries" className="admin-btn admin-btn-secondary admin-btn-sm">View All →</Link>
        </div>
        {loading ? (
          <div className="admin-empty"><div className="empty-icon">⏳</div><h3>Loading...</h3></div>
        ) : enquiries.length === 0 ? (
          <div className="admin-empty"><div className="empty-icon">📩</div><h3>No enquiries yet</h3><p>Contact form submissions will appear here.</p></div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Project</th><th>Type</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {enquiries.slice(0, 8).map(e => (
                  <tr key={e.id}>
                    <td><strong>{e.firstName} {e.lastName}</strong><br /><span style={{ fontSize: 12, color: '#7a7a7a' }}>{e.email}</span></td>
                    <td><a href={`tel:${e.phone}`} style={{ color: 'var(--teal)' }}>{e.phone}</a></td>
                    <td style={{ fontSize: 13 }}>{e.project || '—'}</td>
                    <td style={{ fontSize: 13 }}>{e.type}</td>
                    <td style={{ fontSize: 12, color: '#7a7a7a', whiteSpace: 'nowrap' }}>{fmt(e.createdAt)}</td>
                    <td><span className={`badge badge-${e.status}`}>{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Edit */}
      <div className="admin-card">
        <div className="admin-card-header"><h3>Quick Edit Site Content</h3></div>
        <div className="admin-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
            {quickLinks.map(l => (
              <Link key={l.href} href={l.href} className="admin-btn admin-btn-secondary" style={{ justifyContent: 'center' }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
