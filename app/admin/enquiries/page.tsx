'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'

interface Enquiry { id: string; firstName: string; lastName: string; phone: string; email: string; project: string; type: string; message: string; status: string; createdAt: string }

export default function EnquiriesPage() {
  const { checking } = useAdminAuth()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Enquiry | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const fetch2 = () => fetch('/api/admin/enquiries').then(r => r.json()).then(d => { setEnquiries(Array.isArray(d) ? d : []); setLoading(false) }).catch(() => setLoading(false))
  useEffect(() => { if (!checking) fetch2() }, [checking])

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/enquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    fetch2()
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null)
  }
  const del = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return
    await fetch('/api/admin/enquiries', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setSelected(null); fetch2()
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  const filtered = enquiries.filter(e => filter === 'all' || e.status === filter).filter(e => !search || `${e.firstName} ${e.lastName} ${e.phone} ${e.email} ${e.project}`.toLowerCase().includes(search.toLowerCase()))

  if (checking) return null

  return (
    <AdminShell title="Enquiries">
      <div className="admin-page-header">
        <div><h2>Contact Enquiries</h2><p>{enquiries.length} total · {enquiries.filter(e => e.status === 'new').length} new</p></div>
      </div>

      <div className="admin-search">
        <input placeholder="Search name, phone, email, project..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-empty"><div className="empty-icon">⏳</div><h3>Loading...</h3></div>
        : filtered.length === 0 ? <div className="admin-empty"><div className="empty-icon">📩</div><h3>No enquiries found</h3><p>{search ? 'Try a different search.' : 'No enquiries yet.'}</p></div>
        : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Contact</th><th>Project</th><th>Type</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} style={{ fontWeight: e.status === 'new' ? 600 : 400 }}>
                    <td>
                      <button onClick={() => setSelected(e)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                        <strong style={{ color: e.status === 'new' ? 'var(--teal)' : '#1a1a1a' }}>{e.firstName} {e.lastName}</strong>
                        <div style={{ fontSize: 12, color: '#7a7a7a', fontWeight: 400 }}><a href={`tel:${e.phone}`}>{e.phone}</a></div>
                        {e.email && <div style={{ fontSize: 12, color: '#7a7a7a', fontWeight: 400 }}>{e.email}</div>}
                      </button>
                    </td>
                    <td style={{ fontSize: 13 }}>{e.project || '—'}</td>
                    <td style={{ fontSize: 13 }}>{e.type}</td>
                    <td style={{ fontSize: 12, color: '#7a7a7a', whiteSpace: 'nowrap' }}>{fmt(e.createdAt)}</td>
                    <td><span className={`badge badge-${e.status}`}>{e.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setSelected(e)}>👁 View</button>
                        {e.status === 'new' && <button className="admin-btn admin-btn-success admin-btn-sm" onClick={() => updateStatus(e.id, 'contacted')}>✓ Contacted</button>}
                        {e.status === 'contacted' && <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => updateStatus(e.id, 'converted')}>★ Converted</button>}
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => del(e.id)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="admin-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selected.firstName} {selected.lastName}</h3>
              <button className="admin-modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <span className={`badge badge-${selected.status}`} style={{ fontSize: 13, padding: '5px 14px', marginBottom: 20, display: 'inline-block' }}>{selected.status}</span>
              {[['Phone', selected.phone],['Email', selected.email || '—'],['Project', selected.project || '—'],['Enquiry Type', selected.type],['Submitted', fmt(selected.createdAt)]].map(([l, v]) => (
                <div key={l} className="detail-row"><span className="detail-label">{l}</span><span className="detail-value">{v}</span></div>
              ))}
              {selected.message && <div className="detail-row"><span className="detail-label">Message</span><span className="detail-value" style={{ fontStyle: 'italic', color: '#7a7a7a' }}>{selected.message}</span></div>}
            </div>
            <div className="admin-modal-footer">
              <a href={`tel:${selected.phone}`} className="admin-btn admin-btn-primary">📞 Call Now</a>
              {selected.email && <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-secondary">✉ Email</a>}
              {selected.status === 'new' && <button className="admin-btn admin-btn-success" onClick={() => updateStatus(selected.id, 'contacted')}>✓ Mark Contacted</button>}
              {selected.status === 'contacted' && <button className="admin-btn admin-btn-primary" onClick={() => updateStatus(selected.id, 'converted')}>★ Mark Converted</button>}
              <button className="admin-btn admin-btn-secondary" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
