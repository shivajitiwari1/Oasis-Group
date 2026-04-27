'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'

interface Stat { num: string; suffix: string; label: string }

export default function StatsEditorPage() {
  const { checking } = useAdminAuth()
  const [stats, setStats] = useState<Stat[]>([])
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')

  useEffect(() => {
    if (!checking) fetch('/api/admin/site?section=stats').then(r => r.json()).then(setStats)
  }, [checking])

  const upd = (i: number, field: keyof Stat, val: string) =>
    setStats(s => s.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  const save = async () => {
    setStatus('saving')
    const res = await fetch('/api/admin/site?section=stats', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stats) })
    setStatus(res.ok ? 'saved' : 'error')
    setTimeout(() => setStatus('idle'), 3000)
  }

  if (checking) return null

  const inp = (style?: React.CSSProperties) => ({ style: { width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif', ...style } })

  return (
    <AdminShell title="Edit Statistics">
      <div className="admin-page-header"><div><h2>Statistics</h2><p>Hero numbers shown on homepage and stats band.</p></div></div>
      <div className="admin-card">
        <div className="admin-card-body">
          {stats.map((s, i) => (
            <div key={i} className="array-item">
              <div className="array-item-header">
                <div className="array-item-num">{i + 1}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 14 }}>
                <div className="admin-form-group"><label>Number</label><input value={s.num} onChange={e => upd(i, 'num', e.target.value)} placeholder="500" {...inp()} /></div>
                <div className="admin-form-group"><label>Suffix</label><input value={s.suffix} onChange={e => upd(i, 'suffix', e.target.value)} placeholder="+" {...inp()} /></div>
                <div className="admin-form-group"><label>Label</label><input value={s.label} onChange={e => upd(i, 'label', e.target.value)} placeholder="Satisfied Clients" {...inp()} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-save-bar">
        <p className={status === 'saved' ? 'save-success' : status === 'error' ? 'save-error' : ''}>{status === 'saved' ? '✓ Saved!' : status === 'error' ? '✗ Error.' : 'Edit stats above then save.'}</p>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={status === 'saving'}>{status === 'saving' ? 'Saving...' : '💾 Save Changes'}</button>
      </div>
    </AdminShell>
  )
}
