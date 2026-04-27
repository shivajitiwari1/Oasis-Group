'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'

interface Project { id: string; name: string; phase: string; location: string; city: string; status: string; statusLabel: string; families: string; bhk: string; nearbyLabel: string; rera: string; image: string; tagline: string; desc: string }

export default function ProjectsEditorPage() {
  const { checking } = useAdminAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0)

  useEffect(() => {
    if (!checking) fetch('/api/admin/site?section=projects').then(r => r.json()).then(setProjects)
  }, [checking])

  const upd = (i: number, field: keyof Project, val: string) =>
    setProjects(s => s.map((p, idx) => idx === i ? { ...p, [field]: val } : p))

  const save = async () => {
    setStatus('saving')
    const res = await fetch('/api/admin/site?section=projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(projects) })
    setStatus(res.ok ? 'saved' : 'error')
    setTimeout(() => setStatus('idle'), 3000)
  }

  if (checking) return null
  const inp = (val: string, onChange: (v: string) => void, placeholder?: string, full?: boolean) => (
    <input value={val} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: full ? '100%' : undefined, padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif', ...(full ? { width: '100%' } : {}) }} />
  )

  return (
    <AdminShell title="Projects Editor">
      <div className="admin-page-header"><div><h2>Projects</h2><p>Manage project cards and details. {projects.length} projects total.</p></div></div>
      {projects.map((p, i) => (
        <div key={p.id} className="admin-card" style={{ marginBottom: 16 }}>
          <div className="admin-card-header" style={{ cursor: 'pointer' }} onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}>
            <div>
              <h3>{p.name} {p.phase || ''}</h3>
              <div style={{ fontSize: 12, color: '#7a7a7a', marginTop: 2 }}>{p.location} · <span className={`badge badge-${p.status === 'delivered' ? 'approved' : 'pending'}`}>{p.status}</span></div>
            </div>
            <span style={{ fontSize: 18, color: '#7a7a7a' }}>{expandedIdx === i ? '▲' : '▼'}</span>
          </div>
          {expandedIdx === i && (
            <div className="admin-card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 12 }}>
                <div className="admin-form-group"><label>Project Name</label>{inp(p.name, v => upd(i, 'name', v), 'Oasis Grandstand', true)}</div>
                <div className="admin-form-group"><label>Phase (optional)</label>{inp(p.phase, v => upd(i, 'phase', v), 'Phase 1', true)}</div>
                <div className="admin-form-group"><label>Location</label>{inp(p.location, v => upd(i, 'location', v), 'Yamuna Expressway', true)}</div>
                <div className="admin-form-group"><label>City</label>{inp(p.city, v => upd(i, 'city', v), 'Greater Noida', true)}</div>
                <div className="admin-form-group"><label>Status</label>
                  <select value={p.status} onChange={e => upd(i, 'status', e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif', background: '#fdfcf8' }}>
                    <option value="delivered">Delivered</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="admin-form-group"><label>Status Label (badge text)</label>{inp(p.statusLabel, v => upd(i, 'statusLabel', v), 'Ready to Move', true)}</div>
                <div className="admin-form-group"><label>Families / Availability</label>{inp(p.families, v => upd(i, 'families', v), '350+', true)}</div>
                <div className="admin-form-group"><label>BHK / Type</label>{inp(p.bhk, v => upd(i, 'bhk', v), '2 & 3 BHK', true)}</div>
                <div className="admin-form-group"><label>Nearby Label</label>{inp(p.nearbyLabel, v => upd(i, 'nearbyLabel', v), 'Near Noida Airport', true)}</div>
                <div className="admin-form-group"><label>RERA Number</label>{inp(p.rera, v => upd(i, 'rera', v), 'UPRERAPRJ6908', true)}</div>
              </div>
              <div className="admin-form-group"><label>Image URL</label>{inp(p.image, v => upd(i, 'image', v), 'https://...', true)}</div>
              <div className="admin-form-group"><label>Tagline</label>{inp(p.tagline, v => upd(i, 'tagline', v), 'One line tagline...', true)}</div>
              <div className="admin-form-group"><label>Description</label>
                <textarea value={p.desc} onChange={e => upd(i, 'desc', e.target.value)} rows={3} placeholder="Full project description..." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif', resize: 'vertical' }} />
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="admin-save-bar">
        <p className={status === 'saved' ? 'save-success' : status === 'error' ? 'save-error' : ''}>{status === 'saved' ? '✓ Saved!' : status === 'error' ? '✗ Error.' : 'Edit projects then save.'}</p>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={status === 'saving'}>{status === 'saving' ? 'Saving...' : '💾 Save All Projects'}</button>
      </div>
    </AdminShell>
  )
}
