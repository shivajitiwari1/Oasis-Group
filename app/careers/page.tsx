import Link from 'next/link'

export const metadata = { title: 'Careers | Oasis Group — Build Your Career with Us' }

const jobs = [
  { dept: 'Sales & Marketing', title: 'Senior Sales Manager', loc: 'Noida', type: 'Full-time', exp: '5+ years', desc: 'Lead sales for our premium residential projects. Drive revenue targets, manage client relationships, and guide the sales team to exceed expectations.' },
  { dept: 'Architecture & Design', title: 'Senior Architect', loc: 'Noida', type: 'Full-time', exp: '7+ years', desc: 'Design elegant residential and commercial spaces that balance aesthetic beauty with structural integrity and practicality across our ongoing projects.' },
  { dept: 'Construction', title: 'Project Manager — Civil', loc: 'Yamuna Expressway', type: 'Full-time', exp: '8+ years', desc: 'Oversee all construction activities for our Grandstand Phase 2 project, ensuring quality standards, safety norms, and project timelines are met.' },
  { dept: 'Customer Relations', title: 'CRM Executive', loc: 'Noida', type: 'Full-time', exp: '2+ years', desc: 'Be the voice of Oasis for our clients — managing relationships from the moment of booking through possession and long-term community management.' },
  { dept: 'Finance', title: 'Finance & Accounts Manager', loc: 'Noida', type: 'Full-time', exp: '6+ years', desc: 'Manage financial planning, budgeting, and reporting for our real estate projects. Ensure compliance with all regulatory and financial requirements.' },
  { dept: 'Marketing', title: 'Digital Marketing Executive', loc: 'Noida / Remote', type: 'Full-time', exp: '2+ years', desc: 'Drive Oasis Group\'s digital presence through SEO, social media, performance marketing, and content strategy to generate quality leads.' },
]

const perks = [
  { icon: '🚀', title: 'Fast Career Growth', desc: 'Clear career paths in a rapidly expanding organization with landmark projects.' },
  { icon: '🎓', title: 'Continuous Learning', desc: 'Regular training, industry exposure, and mentorship from experienced leaders.' },
  { icon: '🏅', title: 'Performance Rewards', desc: 'Competitive compensation with performance bonuses and recognition programs.' },
  { icon: '🤝', title: 'Collaborative Culture', desc: 'A supportive, respectful workplace where every voice matters and ideas thrive.' },
]

export default function CareersPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-hero-badge">Join Our Team</div>
          <h1>Build Your Career<br />with Oasis Group</h1>
          <p>We&apos;re looking for passionate, driven professionals to help us shape Delhi NCR&apos;s most trusted real estate developer. Come build something extraordinary.</p>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb-sep">›</span><span>Careers</span>
          </nav>
        </div>
      </div>

      {/* Why Work With Us */}
      <section className="section">
        <div className="container">
          <div className="section-label">Why Oasis</div>
          <h2 className="section-title">A Place to Grow</h2>
          <div className="gold-line" style={{ marginBottom: 40 }} />
          <div className="why-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 0 }}>
            {perks.map((p, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{p.icon}</div>
                <div className="why-title" style={{ fontSize: 18 }}>{p.title}</div>
                <div className="why-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-label">Open Positions</div>
          <h2 className="section-title">Current Openings</h2>
          <div className="gold-line" style={{ marginBottom: 40 }} />
          <div className="job-grid">
            {jobs.map((j, i) => (
              <div key={i} className="job-card">
                <div className="job-dept">{j.dept}</div>
                <div className="job-title">{j.title}</div>
                <div className="job-meta">
                  <span className="job-meta-tag">📍 {j.loc}</span>
                  <span className="job-meta-tag">💼 {j.type}</span>
                  <span className="job-meta-tag">⭐ {j.exp}</span>
                </div>
                <div className="job-desc">{j.desc}</div>
                <Link href="/contact" className="job-apply">Apply Now →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Application */}
      <section className="section">
        <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ background: 'var(--navy)', borderRadius: 24, padding: 48, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📩</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, marginBottom: 14 }}>Don&apos;t See Your Role?</h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>We&apos;re always looking for talented people. Send us your resume and we&apos;ll reach out when the right opportunity arises.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:info@oasis.in?subject=Career Enquiry" className="btn btn-teal">Send Open Application →</a>
              <Link href="/contact" className="btn btn-ghost">Contact HR</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
