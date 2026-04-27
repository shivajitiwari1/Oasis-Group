'use client'
import Link from 'next/link'
import { useState } from 'react'
import siteData from '@/data/site.json'

export default function ContactPage() {
  const { contact, projects } = siteData
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', project: '', type: 'Project Enquiry', message: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ firstName: '', lastName: '', phone: '', email: '', project: '', type: 'Project Enquiry', message: '' })
    } catch { setStatus('error') }
  }

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-hero-badge">Get in Touch</div>
          <h1>Contact Oasis Group</h1>
          <p>Whether you&apos;re looking to buy your dream home, make an investment, or simply have a question — our team is ready to help you.</p>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb-sep">›</span><span>Contact Us</span>
          </nav>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Left: info */}
            <div>
              <div className="section-label">Our Details</div>
              <h2 className="section-title" style={{ fontSize: 38 }}>We&apos;re Right Here<br />for You</h2>
              <div className="gold-line" style={{ marginBottom: 28 }} />
              <p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.82, marginBottom: 32 }}>Visit our office in Noida, call us, or drop an email. Our team typically responds within 2 hours during business hours — and we&apos;re available on WhatsApp anytime.</p>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div className="contact-label">Head Office</div>
                    <div className="contact-val">{contact.address}</div>
                    <div className="contact-sub">{contact.hours}</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">📞</div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-val"><a href={`tel:${contact.phone1}`}>{contact.phone1}</a></div>
                    <div className="contact-sub"><a href={`tel:${contact.phone2}`}>{contact.phone2}</a></div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-val"><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
                    <div className="contact-sub">Response within 24 hours</div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="contact-map-wrap">
                <iframe src={contact.mapEmbed} title="Oasis Group Location" loading="lazy" />
              </div>

              {/* WhatsApp box */}
              <div className="whatsapp-box">
                <div style={{ fontWeight: 600, color: 'var(--teal2)', marginBottom: 6, fontSize: 14 }}>💬 Prefer WhatsApp?</div>
                <p>Get instant responses by connecting with us on WhatsApp. Our team replies within 30 minutes.</p>
                <a href={`https://wa.me/${contact.whatsapp}?text=I'm interested in Oasis Group projects!`} target="_blank" rel="noreferrer" className="btn btn-teal btn-sm" style={{ marginTop: 12 }}>Open WhatsApp →</a>
              </div>
            </div>

            {/* Right: form */}
            <div className="form-card">
              <div className="form-title">Register Your Interest</div>
              <div className="form-sub">Fill in your details — our team will call you within 24 hours.</div>

              {status === 'success' && <div className="alert-success">✓ Thank you! We&apos;ll contact you within 24 hours.</div>}
              {status === 'error' && <div className="alert-error">Something went wrong. Please try again or call us directly.</div>}

              <form onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input className="form-input" required value={form.firstName} onChange={set('firstName')} placeholder="First name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input className="form-input" required value={form.lastName} onChange={set('lastName')} placeholder="Last name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" required type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 00000 00000" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Enquiry Type</label>
                  <select className="form-input" value={form.type} onChange={set('type')}>
                    <option>Project Enquiry</option>
                    <option>Site Visit Request</option>
                    <option>NRI Investment</option>
                    <option>Home Loan Query</option>
                    <option>Career Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project of Interest</label>
                  <select className="form-input" value={form.project} onChange={set('project')}>
                    <option value="">Select a project...</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.name}>{p.name} {p.phase} — {p.location}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" value={form.message} onChange={set('message')} placeholder="Tell us what you're looking for — BHK configuration, budget, timeline..." />
                </div>
                <button type="submit" className="form-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Submitting...' : 'Submit Enquiry →'}
                </button>
                <p className="form-note">By submitting, you agree to be contacted by our team. Your information is kept private and never shared.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
