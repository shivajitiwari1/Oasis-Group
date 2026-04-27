'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'

interface Hero { badge: string; title: string; subtitle: string; description: string; btn1: { label: string; href: string }; btn2: { label: string; href: string } }

export default function HeroEditorPage() {
  const { checking } = useAdminAuth()
  const [hero, setHero] = useState<Hero | null>(null)
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')

  useEffect(() => { if (!checking) fetch('/api/admin/site?section=hero').then(r => r.json()).then(setHero) }, [checking])

  const save = async () => {
    setStatus('saving')
    const res = await fetch('/api/admin/site?section=hero', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hero) })
    setStatus(res.ok ? 'saved' : 'error')
    setTimeout(() => setStatus('idle'), 3000)
  }

  if (checking || !hero) return null

  const upd = (field: string, val: string) => setHero(h => h ? { ...h, [field]: val } : h)

  return (
    <AdminShell title="Edit Hero Section">
      <div className="admin-page-header"><div><h2>Hero Section</h2><p>The main homepage hero — first thing visitors see.</p></div></div>
      <div className="admin-card">
        <div className="admin-card-body">
          <div className="admin-form-group"><label>Badge Text (small pill above title)</label><input className="admin-form-group input" value={hero.badge} onChange={e => upd('badge', e.target.value)} placeholder="NCR's Trusted Real Estate Developer Since 2002" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif' }} /></div>
          <div className="admin-form-group"><label>Main Title</label><input value={hero.title} onChange={e => upd('title', e.target.value)} placeholder="Where Dreams Find Their Address" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif' }} /></div>
          <div className="admin-form-group"><label>Subtitle (italic, below title)</label><input value={hero.subtitle} onChange={e => upd('subtitle', e.target.value)} placeholder="Building lives, not just homes" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif' }} /></div>
          <div className="admin-form-group"><label>Description</label><textarea value={hero.description} onChange={e => upd('description', e.target.value)} rows={3} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif', resize: 'vertical' }} /></div>
          <div className="admin-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div className="admin-form-group"><label>Button 1 Label</label><input value={hero.btn1.label} onChange={e => setHero(h => h ? { ...h, btn1: { ...h.btn1, label: e.target.value } } : h)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif' }} /></div>
              <div className="admin-form-group"><label>Button 1 Link</label><input value={hero.btn1.href} onChange={e => setHero(h => h ? { ...h, btn1: { ...h.btn1, href: e.target.value } } : h)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif' }} /></div>
            </div>
            <div>
              <div className="admin-form-group"><label>Button 2 Label</label><input value={hero.btn2.label} onChange={e => setHero(h => h ? { ...h, btn2: { ...h.btn2, label: e.target.value } } : h)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif' }} /></div>
              <div className="admin-form-group"><label>Button 2 Link</label><input value={hero.btn2.href} onChange={e => setHero(h => h ? { ...h, btn2: { ...h.btn2, href: e.target.value } } : h)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif' }} /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-save-bar">
        <p className={status === 'saved' ? 'save-success' : status === 'error' ? 'save-error' : ''}>{status === 'saved' ? '✓ Saved!' : status === 'error' ? '✗ Error saving.' : 'Save to apply changes.'}</p>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={status === 'saving'}>{status === 'saving' ? 'Saving...' : '💾 Save Changes'}</button>
      </div>
    </AdminShell>
  )
}
