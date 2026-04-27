'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminAuth } from '@/components/useAdminAuth'

interface Contact { address: string; phone1: string; phone2: string; email: string; hours: string; whatsapp: string; mapEmbed: string; social: { facebook: string; twitter: string; instagram: string } }

export default function ContactEditorPage() {
  const { checking } = useAdminAuth()
  const [c, setC] = useState<Contact | null>(null)
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')

  useEffect(() => {
    if (!checking) fetch('/api/admin/site?section=contact').then(r => r.json()).then(setC)
  }, [checking])

  const upd = (field: string, val: string) => setC(prev => prev ? { ...prev, [field]: val } : prev)
  const updSocial = (field: string, val: string) => setC(prev => prev ? { ...prev, social: { ...prev.social, [field]: val } } : prev)

  const save = async () => {
    setStatus('saving')
    const res = await fetch('/api/admin/site?section=contact', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(c) })
    setStatus(res.ok ? 'saved' : 'error')
    setTimeout(() => setStatus('idle'), 3000)
  }

  if (checking || !c) return null

  const inp = (val: string, onChange: (v: string) => void, placeholder?: string) => (
    <input value={val} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 14, fontFamily: 'Inter,sans-serif' }} />
  )

  return (
    <AdminShell title="Contact Info">
      <div className="admin-page-header"><div><h2>Contact Information</h2><p>Details shown in footer and contact page.</p></div></div>
      <div className="admin-card">
        <div className="admin-card-header"><h3>Office Details</h3></div>
        <div className="admin-card-body">
          <div className="admin-form-group"><label>Full Address</label>{inp(c.address, v => upd('address', v), 'A 77, Sector 2, Noida...')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-form-group"><label>Phone 1</label>{inp(c.phone1, v => upd('phone1', v), '+91 8010-111-777')}</div>
            <div className="admin-form-group"><label>Phone 2</label>{inp(c.phone2, v => upd('phone2', v), '+91 9999-000-911')}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-form-group"><label>Email</label>{inp(c.email, v => upd('email', v), 'info@oasis.in')}</div>
            <div className="admin-form-group"><label>WhatsApp Number (with country code, no +)</label>{inp(c.whatsapp, v => upd('whatsapp', v), '919999000911')}</div>
          </div>
          <div className="admin-form-group"><label>Office Hours</label>{inp(c.hours, v => upd('hours', v), 'Monday – Saturday: 10:00 AM – 6:00 PM')}</div>
          <div className="admin-form-group"><label>Google Maps Embed URL</label>
            <textarea value={c.mapEmbed} onChange={e => upd('mapEmbed', e.target.value)} rows={3} placeholder="https://www.google.com/maps/embed?..." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0dace', borderRadius: 8, fontSize: 13, fontFamily: 'Inter,sans-serif', resize: 'vertical' }} />
          </div>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-header"><h3>Social Media Links</h3></div>
        <div className="admin-card-body">
          <div className="admin-form-group"><label>Facebook URL</label>{inp(c.social.facebook, v => updSocial('facebook', v), 'https://facebook.com/...')}</div>
          <div className="admin-form-group"><label>Twitter / X URL</label>{inp(c.social.twitter, v => updSocial('twitter', v), 'https://x.com/...')}</div>
          <div className="admin-form-group"><label>Instagram URL</label>{inp(c.social.instagram, v => updSocial('instagram', v), 'https://instagram.com/...')}</div>
        </div>
      </div>
      <div className="admin-save-bar">
        <p className={status === 'saved' ? 'save-success' : status === 'error' ? 'save-error' : ''}>{status === 'saved' ? '✓ Saved!' : status === 'error' ? '✗ Error.' : 'Edit contact details above.'}</p>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={status === 'saving'}>{status === 'saving' ? 'Saving...' : '💾 Save Changes'}</button>
      </div>
    </AdminShell>
  )
}
