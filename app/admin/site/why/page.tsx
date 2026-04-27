'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'

interface Why { icon: string; title: string; desc: string }

export default function WhyEditorPage() {
  const { checking } = useAdminAuth()
  const [items, setItems] = useState<Why[]>([])
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')

  useEffect(() => {
    if (!checking) fetch('/api/admin/site?section=whyInvest').then(r => r.json()).then(setItems)
  }, [checking])

  const upd = (i: number, field: keyof Why, val: string) =>
    setItems(s => s.map((item, idx) => idx === i ? { ...item, [field]: val } : item))
  const add = () => setItems(s => [...s, { icon: '⭐', title: '', desc: '' }])
  const remove = (i: number) => { if (confirm('Remove?')) setItems(s => s.filter((_, idx) => idx !== i)) }

  const save = async () => {
    setStatus('saving')
    const res = await fetch('/api/admin/site?section=whyInvest', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) })
    setStatus(res.ok ? 'saved' : 'error')
    setTimeout(() => setStatus('idle'), 3000)
  }

  if (checking) return null
  const inp = { style: { width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif' } }

  return (
    <AdminShell title="Why Invest">
      <div className="admin-page-header">
        <div><h2>Why Invest with Oasis</h2><p>Cards shown on homepage and why-invest section.</p></div>
        <button className="admin-btn admin-btn-primary" onClick={add}>+ Add Card</button>
      </div>
      <div className="admin-card">
        <div className="admin-card-body">
          {items.map((w, i) => (
            <div key={i} className="array-item">
              <div className="array-item-header">
                <div className="array-item-num">{i + 1}</div>
                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => remove(i)}>🗑</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12, marginBottom: 10 }}>
                <div className="admin-form-group"><label>Icon (emoji)</label><input value={w.icon} onChange={e => upd(i, 'icon', e.target.value)} {...inp} /></div>
                <div className="admin-form-group"><label>Title</label><input value={w.title} onChange={e => upd(i, 'title', e.target.value)} placeholder="Financial Integrity" {...inp} /></div>
              </div>
              <div className="admin-form-group"><label>Description</label>
                <textarea value={w.desc} onChange={e => upd(i, 'desc', e.target.value)} rows={2} placeholder="Describe this benefit..." style={{ ...inp.style, resize: 'vertical' }} />
              </div>
            </div>
          ))}
          <button className="add-item-btn" onClick={add}>+ Add New Card</button>
        </div>
      </div>
      <div className="admin-save-bar">
        <p className={status === 'saved' ? 'save-success' : status === 'error' ? 'save-error' : ''}>{status === 'saved' ? '✓ Saved!' : status === 'error' ? '✗ Error.' : `${items.length} cards`}</p>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={status === 'saving'}>{status === 'saving' ? 'Saving...' : '💾 Save Changes'}</button>
      </div>
    </AdminShell>
  )
}
