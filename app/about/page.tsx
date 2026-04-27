import Link from 'next/link'
import siteData from '@/data/site.json'

export const metadata = { title: 'About Oasis Group | Trusted Real Estate Developer Delhi NCR' }

export default function AboutPage() {
  const { about, leadership, values } = siteData
  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-hero-badge">Our Story</div>
          <h1>About Oasis Group</h1>
          <p>From modest beginnings in 2002 to delivering 2.2 million sq. ft. of premium homes — a journey built on trust, quality, and community.</p>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb-sep">›</span><span>About Us</span>
          </nav>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-label">Our Journey</div>
              <h2 className="section-title" style={{ fontSize: 40 }}>Building NCR Since 2002</h2>
              <div className="gold-line" />
              <p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.85, marginBottom: 18, marginTop: 20 }}>{about.fullDesc}</p>
              <p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.85 }}>Our customer&apos;s faith prompts us to provide spaces made with the most efficient construction methods, best materials available without compromising quality and at an economical price range.</p>
              <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
                <Link href="/projects" className="btn btn-teal">Explore Projects →</Link>
                <Link href="/contact" className="btn btn-outline">Contact Us</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'var(--navy)', borderRadius: 20, padding: '32px 28px', color: '#fff' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 700, color: 'var(--gold2)', lineHeight: 1 }}>2.2M+</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', marginTop: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Sq. Ft. Delivered</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: 'var(--teal3)', borderRadius: 16, padding: 24, border: '1px solid rgba(26,140,125,.15)' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 700, color: 'var(--teal2)', lineHeight: 1 }}>500+</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Happy Families</div>
                </div>
                <div style={{ background: 'var(--gold3)', borderRadius: 16, padding: 24, border: '1px solid rgba(201,150,58,.15)' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>23+</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Years Experience</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: 'var(--off)', borderRadius: 16, padding: 24, border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>5</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Projects Completed / Ongoing</div>
                </div>
                <div style={{ background: 'var(--off)', borderRadius: 16, padding: 24, border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>3</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Thriving Communities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-label">Leadership</div>
          <h2 className="section-title">Our Driving Force</h2>
          <div className="gold-line" style={{ marginBottom: 40 }} />
          <div className="leader-card">
            <div className="leader-photo">
              <img src={leadership.image} alt={leadership.name} onError={() => {}} />
            </div>
            <div>
              <div className="leader-name">{leadership.name}</div>
              <div className="leader-role">{leadership.title}</div>
              <p className="leader-desc">{leadership.bio}</p>
              <p className="leader-desc" style={{ marginTop: 16 }}>His ever-energetic attitude pushes everyone to put in their best inputs and motivates them for corrective suggestions. Under his leadership, Oasis Group has become one of the most trusted names in Delhi NCR real estate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="center-text" style={{ marginBottom: 52 }}>
            <div className="section-label center">What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
            <div className="gold-line center" />
            <p className="section-desc" style={{ margin: '14px auto 0' }}>Six principles that define how we build, serve, and grow — every single day.</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="container cta-inner">
          <h2 className="cta-title">Ready to Be Part of<br />the Oasis Family?</h2>
          <p className="cta-desc">Join 500+ families who chose quality, transparency, and trust.</p>
          <div className="cta-btns">
            <Link href="/projects" className="btn btn-teal btn-lg">View Our Projects</Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">Get in Touch</Link>
          </div>
        </div>
      </div>
    </>
  )
}
