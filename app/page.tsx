import Link from 'next/link'
import siteData from '@/data/site.json'
import Counter from '@/components/Counter'

export default function HomePage() {
  const { hero, stats, about, projects, testimonials, whyInvest } = siteData
  const approved = testimonials.filter(t => t.approved).slice(0, 3)
  const delivered = projects.filter(p => p.status === 'delivered')
  const upcoming = projects.filter(p => p.status === 'upcoming')

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-grad" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-inner">
            <div>
              <div className="hero-badge">
                <span className="hero-dot" />
                {hero.badge}
              </div>
              <h1 className="hero-title">
                Where <em>Dreams</em><br />Find Their<br />Address
              </h1>
              <p className="hero-subtitle">{hero.subtitle}</p>
              <p className="hero-desc">{hero.description}</p>
              <div className="hero-btns">
                <Link href={hero.btn1.href} className="btn btn-teal btn-lg">{hero.btn1.label} →</Link>
                <Link href={hero.btn2.href} className="btn btn-ghost btn-lg">{hero.btn2.label}</Link>
              </div>
            </div>

            {/* Project status card */}
            <div className="hero-card">
              <div className="hero-card-title">Our Projects</div>
              {projects.map(p => (
                <div key={p.id} className="proj-item">
                  <div className={`proj-dot ${p.status === 'delivered' ? 'ready' : 'upcoming'}`} />
                  <div className="proj-info">
                    <div className="proj-name">{p.name} {p.phase}</div>
                    <div className="proj-loc">📍 {p.location}</div>
                  </div>
                  <span className={`proj-tag ${p.status === 'delivered' ? 'tag-r' : 'tag-u'}`}>
                    {p.status === 'delivered' ? 'Ready' : 'Upcoming'}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <Link href="/contact" className="btn btn-teal btn-full">📞 Book a Site Visit</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bottom strip */}
        <div className="hero-bottom">
          <div className="hero-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="hstat">
                <div className="hstat-num">{s.num}{s.suffix}</div>
                <div className="hstat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT BAND ── */}
      <div className="about-band">
        <div className="container about-band-grid">
          <div>
            <div className="section-label" style={{ color: 'rgba(26,200,175,.8)' }}>About Oasis Group</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, color: '#fff', fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
              {about.heading}
            </h2>
            <p className="about-band-text">{about.shortDesc}</p>
          </div>
          <div className="about-mini-grid">
            {about.pillars.map((p, i) => (
              <div key={i} className="about-mini">
                <div className="about-mini-icon">{p.icon}</div>
                <div className="about-mini-title">{p.title}</div>
                <div className="about-mini-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DELIVERED PROJECTS ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label">Ready to Move In</div>
              <h2 className="section-title">Delivered Projects</h2>
              <div className="gold-line" />
            </div>
            <Link href="/projects" className="btn btn-outline">View All Projects →</Link>
          </div>
          <div className="projects-grid">
            {delivered.map(p => (
              <div key={p.id} className="proj-card">
                <div className="proj-img-wrap">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="proj-card-img" />
                  ) : (
                    <div className="proj-img-placeholder">
                      <span style={{ fontSize: 40 }}>🏢</span>
                      <span>{p.name}</span>
                    </div>
                  )}
                  <div className="proj-status-pill status-delivered">{p.statusLabel}</div>
                </div>
                <div className="proj-card-body">
                  <div className="proj-card-tag">📍 {p.location}</div>
                  <div className="proj-card-name">{p.name} {p.phase}</div>
                  <div className="proj-card-sub">{p.bhk} | {p.nearbyLabel}</div>
                  <div className="proj-card-desc">{p.desc}</div>
                  <div className="proj-chips">
                    {p.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="chip chip-teal">{h}</span>
                    ))}
                  </div>
                  <div className="proj-card-footer">
                    <div className="proj-rera">{p.rera}</div>
                    <Link href={`/projects#${p.id}`} className="proj-arrow">→</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div className="stats-band">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-num">
                  <Counter target={parseFloat(s.num)} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="center-text" style={{ marginBottom: 56 }}>
            <div className="section-label center">Resident Stories</div>
            <h2 className="section-title">What Our Residents Say</h2>
            <div className="gold-line center" />
            <p className="section-desc" style={{ margin: '14px auto 0' }}>Real words from the 500+ families who trusted Oasis Group with their most important decision.</p>
          </div>
          <div className="testi-grid">
            {approved.map(t => (
              <div key={t.id} className="testi-card">
                <div className="testi-quote">&ldquo;</div>
                <div className="testi-stars">
                  {Array.from({ length: t.rating }).map((_, i) => <span key={i} className="testi-star">★</span>)}
                </div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-unit">{t.unit}</div>
                    <div className="testi-project">{t.project}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING ── */}
      {upcoming.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-label">Coming Soon</div>
            <h2 className="section-title">Upcoming Projects</h2>
            <div className="gold-line" />
            <div className="projects-grid" style={{ marginTop: 40, gridTemplateColumns: 'repeat(2,1fr)' }}>
              {upcoming.map(p => (
                <div key={p.id} className="proj-card">
                  <div className="proj-img-wrap" style={{ background: 'linear-gradient(135deg,#0f2044,#1a3060)', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                      <div style={{ fontSize: 48, marginBottom: 8 }}>🏢</div>
                      <div style={{ fontSize: 13 }}>{p.name}</div>
                    </div>
                    <div className="proj-status-pill status-upcoming">{p.statusLabel}</div>
                  </div>
                  <div className="proj-card-body">
                    <div className="proj-card-tag">📍 {p.location}</div>
                    <div className="proj-card-name">{p.name} {p.phase}</div>
                    <div className="proj-card-sub">{p.bhk} | {p.nearbyLabel}</div>
                    <div className="proj-card-desc">{p.desc}</div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                      <Link href="/contact" className="btn btn-teal btn-sm">Register Interest →</Link>
                      <span style={{ fontSize: 12, color: 'var(--faint)', alignSelf: 'center' }}>{p.rera}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY INVEST ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="center-text" style={{ marginBottom: 52 }}>
            <div className="section-label center">Why Choose Us</div>
            <h2 className="section-title">Why Invest with Oasis?</h2>
            <div className="gold-line center" />
            <p className="section-desc" style={{ margin: '14px auto 0' }}>Six core promises backed by 23 years of delivering on our word.</p>
          </div>
          <div className="why-grid">
            {whyInvest.map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-band">
        <div className="container cta-inner">
          <div className="section-label center" style={{ color: 'rgba(26,200,175,.8)', justifyContent: 'center', display: 'flex', marginBottom: 18 }}>Start Your Journey</div>
          <h2 className="cta-title">Find Your Perfect Home<br />at Oasis</h2>
          <p className="cta-desc">Schedule a free site visit and experience the quality of Oasis Group&apos;s construction firsthand. Our team is available 6 days a week.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn btn-teal btn-lg">Book a Site Visit →</Link>
            <a href="https://wa.me/919999000911" target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg">💬 WhatsApp Us</a>
          </div>
        </div>
      </div>
    </>
  )
}
