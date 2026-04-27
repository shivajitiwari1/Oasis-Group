import Link from 'next/link'
import siteData from '@/data/site.json'

export const metadata = { title: 'Our Projects | Oasis Group Real Estate' }

export default function ProjectsPage() {
  const { projects } = siteData
  const delivered = projects.filter(p => p.status === 'delivered')
  const upcoming = projects.filter(p => p.status === 'upcoming')

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-hero-badge">Portfolio</div>
          <h1>Our Projects</h1>
          <p>From delivered masterpieces to exciting upcoming developments — discover Oasis Group&apos;s complete residential portfolio across Delhi NCR.</p>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb-sep">›</span><span>Our Projects</span>
          </nav>
        </div>
      </div>

      {/* Delivered */}
      <section className="section">
        <div className="container">
          <div className="section-label">Ready to Move In</div>
          <h2 className="section-title">Delivered Projects</h2>
          <div className="gold-line" style={{ marginBottom: 48 }} />

          {delivered.map(p => (
            <div key={p.id} id={p.id} style={{ marginBottom: 72 }}>
              <div className="proj-detail-grid">
                <div>
                  <div className="proj-img-wrap" style={{ height: 340, borderRadius: 18 }}>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="proj-card-img" style={{ borderRadius: 18 }} />
                    ) : (
                      <div className="proj-img-placeholder" style={{ borderRadius: 18 }}>
                        <span style={{ fontSize: 56 }}>🏢</span>
                        <span>{p.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <span className="proj-status-pill status-delivered" style={{ position: 'static', display: 'inline-block', marginBottom: 14 }}>{p.statusLabel}</span>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.1, marginBottom: 8 }}>{p.name} {p.phase}</h2>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--teal)', marginBottom: 16 }}>📍 {p.location} &nbsp;|&nbsp; {p.bhk}</div>
                  <div className="gold-line" style={{ marginBottom: 18 }} />
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>{p.desc}</p>
                  <div className="proj-highlights">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="proj-highlight">{h}</div>
                    ))}
                  </div>
                  <div style={{ marginTop: 24, fontSize: 12, color: 'var(--faint)', fontWeight: 500 }}>RERA: {p.rera}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                    <Link href="/contact" className="btn btn-teal">Book Site Visit →</Link>
                    <a href="https://wa.me/919999000911" target="_blank" rel="noreferrer" className="btn btn-outline">💬 WhatsApp</a>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, color: 'var(--navy)', margin: '40px 0 0' }}>Amenities</h3>
              <div className="amenities-grid">
                {p.amenities.map((a, i) => (
                  <div key={i} className="amenity-card">
                    <div className="amenity-icon">{a.icon}</div>
                    <div className="amenity-label">{a.label}</div>
                  </div>
                ))}
              </div>

              {/* Config table */}
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, color: 'var(--navy)', marginTop: 36 }}>Unit Configurations</h3>
              <table className="config-table">
                <thead><tr><th>Type</th><th>Area</th><th>Floors</th><th>Price</th></tr></thead>
                <tbody>
                  {p.configs.map((c, i) => (
                    <tr key={i}><td><strong>{c.type}</strong></td><td>{c.area}</td><td>{c.floor}</td><td style={{ color: 'var(--teal)', fontWeight: 600 }}>{c.price}</td></tr>
                  ))}
                </tbody>
              </table>
              <div style={{ height: 1, background: 'var(--border)', margin: '56px 0 0' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-label">Coming Soon</div>
          <h2 className="section-title">Upcoming Projects</h2>
          <div className="gold-line" style={{ marginBottom: 48 }} />
          <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            {upcoming.map(p => (
              <div key={p.id} id={p.id} className="proj-card">
                <div className="proj-img-wrap" style={{ background: 'linear-gradient(135deg,var(--navy2),var(--navy3))', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    <div style={{ fontSize: 52, marginBottom: 10 }}>🏢</div>
                    <div style={{ fontSize: 14 }}>{p.name}</div>
                  </div>
                  <div className="proj-status-pill status-upcoming">{p.statusLabel}</div>
                </div>
                <div className="proj-card-body">
                  <div className="proj-card-tag">📍 {p.location}</div>
                  <div className="proj-card-name">{p.name} {p.phase}</div>
                  <div className="proj-card-sub">{p.bhk} | {p.nearbyLabel}</div>
                  <div className="proj-card-desc">{p.desc}</div>
                  <div className="proj-highlights" style={{ marginBottom: 20 }}>
                    {p.highlights.slice(0, 4).map((h, i) => (
                      <div key={i} className="proj-highlight">{h}</div>
                    ))}
                  </div>
                  <div className="proj-card-footer">
                    <div className="proj-rera">{p.rera}</div>
                    <Link href="/contact" className="btn btn-teal btn-sm">Register Interest →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container cta-inner">
          <h2 className="cta-title">Interested in a Project?</h2>
          <p className="cta-desc">Our sales team will call you within 2 hours. Schedule your free site visit today.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn btn-teal btn-lg">Contact Us →</Link>
            <a href="https://wa.me/919999000911" target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  )
}
