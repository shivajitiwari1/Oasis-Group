'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'

interface Testi { id: string; name: string; unit: string; project: string; rating: number; text: string; approved: boolean }

export default function TestimonialsEditorPage() {
  const { checking } = useAdminAuth()
  const [items, setItems] = useState<Testi[]>([])
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')

  useEffect(() => {
    if (!checking) fetch('/api/admin/site?section=testimonials').then(r => r.json()).then(setItems)
  }, [checking])

  const upd = (i: number, field: keyof Testi, val: string | boolean | number) =>
    setItems(s => s.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  const add = () => setItems(s => [...s, { id: Date.now().toString(), name: '', unit: '', project: '', rating: 5, text: '', approved: true }])
  const remove = (i: number) => { if (confirm('Remove this testimonial?')) setItems(s => s.filter((_, idx) => idx !== i)) }

  const save = async () => {
    setStatus('saving')
    const res = await fetch('/api/admin/site?section=testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) })
    setStatus(res.ok ? 'saved' : 'error')
    setTimeout(() => setStatus('idle'), 3000)
  }

  if (checking) return null
  const inp = { style: { width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif' } }

  return (
    <AdminShell title="Testimonials">
      <div className="admin-page-header">
        <div><h2>Testimonials</h2><p>Resident reviews shown on homepage.</p></div>
        <button className="admin-btn admin-btn-primary" onClick={add}>+ Add Testimonial</button>
      </div>
      <div className="admin-card">
        <div className="admin-card-body">
          {items.map((t, i) => (
            <div key={t.id} className="array-item">
              <div className="array-item-header">
                <div className="array-item-num">{i + 1}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <label style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={t.approved} onChange={e => upd(i, 'approved', e.target.checked)} />
                    Approved / Visible
                  </label>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => remove(i)}>🗑 Remove</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, marginBottom: 12 }}>
                <div className="admin-form-group"><label>Resident Name</label><input value={t.name} onChange={e => upd(i, 'name', e.target.value)} placeholder="Raj Kumar Pandey" {...inp} /></div>
                <div className="admin-form-group"><label>Unit</label><input value={t.unit} onChange={e => upd(i, 'unit', e.target.value)} placeholder="A 1401" {...inp} /></div>
                <div className="admin-form-group"><label>Project</label><input value={t.project} onChange={e => upd(i, 'project', e.target.value)} placeholder="Venetia Heights" {...inp} /></div>
                <div className="admin-form-group"><label>Rating</label>
                  <select value={t.rating} onChange={e => upd(i, 'rating', Number(e.target.value))} style={{ padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif', background: '#fdfcf8' }}>
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-group"><label>Review Text</label>
                <textarea value={t.text} onChange={e => upd(i, 'text', e.target.value)} rows={3} placeholder="What the resident said..." style={{ ...inp.style, resize: 'vertical' }} />
              </div>
            </div>
          ))}
          <button className="add-item-btn" onClick={add}>+ Add New Testimonial</button>
        </div>
      </div>
      <div className="admin-save-bar">
        <p className={status === 'saved' ? 'save-success' : status === 'error' ? 'save-error' : ''}>{status === 'saved' ? '✓ Saved successfully!' : status === 'error' ? '✗ Error saving.' : `${items.length} testimonials · ${items.filter(t => t.approved).length} approved`}</p>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={status === 'saving'}>{status === 'saving' ? 'Saving...' : '💾 Save Changes'}</button>
      </div>
    </AdminShell>
  )
}
