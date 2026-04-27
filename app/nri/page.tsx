import Link from 'next/link'

export const metadata = { title: 'NRI Section | Oasis Group — Invest from Anywhere' }

const steps = [
  { num: '1', title: 'Connect with NRI Desk', desc: 'Contact our dedicated NRI team via WhatsApp, email, or phone. We\'ll assign you a personal relationship manager who speaks your language and understands your needs.' },
  { num: '2', title: 'Virtual Site Tour', desc: 'Get a live virtual walkthrough of your chosen project with our team via video call. See every detail, ask every question — from anywhere in the world.' },
  { num: '3', title: 'Documentation & Booking', desc: 'Complete all documentation remotely with our legal team\'s guidance. Secure your unit with an online booking process from anywhere in the world.' },
  { num: '4', title: 'Bank & Legal Support', desc: 'Our finance team assists with NRI home loans from all major Indian banks, FEMA compliance, power of attorney, and all legal formalities.' },
  { num: '5', title: 'Possession & Management', desc: 'Collect your keys on your next visit or we handle the entire possession process on your behalf. Post-possession maintenance and rental management also available.' },
]

const benefits = [
  { icon: '📈', title: 'High Appreciation', desc: 'Properties near Noida Airport & Yamuna Expressway consistently show 12–18% annual appreciation. One of India\'s highest-growth real estate corridors.' },
  { icon: '🏛️', title: 'RERA Registered', desc: 'All Oasis projects are RERA registered, providing complete legal protection and transparency for your NRI investment.' },
  { icon: '💰', title: 'Easy Home Loans', desc: 'Tie-ups with SBI, HDFC, ICICI and all major banks offering competitive NRI home loan rates with minimal documentation.' },
  { icon: '🌐', title: 'Dedicated NRI Desk', desc: 'Relationship managers available across time zones — IST, EST, PST, GST, SGT. We\'re available when you are.' },
  { icon: '✈️', title: 'Near Jewar Airport', desc: 'Noida International Airport will be India\'s largest airport — properties in the vicinity are set for massive value appreciation.' },
  { icon: '📋', title: 'Full Compliance', desc: 'Our legal team ensures 100% compliance with FEMA, RBI guidelines, and all NRI property purchase regulations.' },
]

export default function NRIPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-hero-badge">NRI Investment Services</div>
          <h1>Invest from Anywhere<br />in the World</h1>
          <p>Oasis Group makes it seamless for Non-Resident Indians to invest in premium properties in Delhi NCR — with full support, transparency, and legal guidance at every step.</p>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb-sep">›</span><span>NRI Section</span>
          </nav>
        </div>
      </div>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="section-label">Why NRIs Choose Oasis</div>
              <h2 className="section-title" style={{ fontSize: 40 }}>Safe. Transparent.<br />Profitable.</h2>
              <div className="gold-line" />
              <p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.82, margin: '20px 0 32px' }}>
                Investing in Indian real estate is one of the most profitable financial decisions for NRIs — and with Oasis Group, it&apos;s completely hassle-free. We handle everything from selection and paperwork to possession and beyond.
              </p>
              <div style={{ background: 'var(--teal3)', borderRadius: 18, padding: 28, border: '1px solid rgba(26,140,125,.2)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Quick Enquiry</div>
                <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16 }}>Our NRI desk is available Monday–Saturday, 9am–9pm IST. Response guaranteed within 4 hours.</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href="https://wa.me/919999000911" target="_blank" rel="noreferrer" className="btn btn-teal">💬 WhatsApp NRI Desk</a>
                  <Link href="/contact" className="btn btn-outline">Email Us</Link>
                </div>
              </div>
            </div>
            <div className="why-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {benefits.map((b, i) => (
                <div key={i} className="why-card" style={{ padding: 24 }}>
                  <div className="why-icon" style={{ width: 46, height: 46, fontSize: 20 }}>{b.icon}</div>
                  <div className="why-title" style={{ fontSize: 17 }}>{b.title}</div>
                  <div className="why-desc" style={{ fontSize: 13.5 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section-alt">
        <div className="container">
          <div className="center-text" style={{ marginBottom: 52 }}>
            <div className="section-label center">Investment Process</div>
            <h2 className="section-title">5 Simple Steps to Your<br />Dream Home in India</h2>
            <div className="gold-line center" />
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div className="nri-steps">
              {steps.map((s, i) => (
                <div key={i} className="nri-step">
                  <div className="nri-step-num">{s.num}</div>
                  <div>
                    <div className="nri-step-title">{s.title}</div>
                    <div className="nri-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured project for NRIs */}
      <section className="section">
        <div className="container">
          <div className="center-text" style={{ marginBottom: 48 }}>
            <div className="section-label center">Best NRI Investment</div>
            <h2 className="section-title">Recommended: Oasis Grandstand</h2>
            <div className="gold-line center" />
            <p className="section-desc" style={{ margin: '14px auto 0' }}>Near Jewar International Airport — India&apos;s biggest upcoming infrastructure project. Maximum appreciation potential.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', height: 320 }}>
              <img src="https://www.oasis.in/wp-content/uploads/2025/04/grand.jpg" alt="Grandstand" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Oasis Grandstand</h3>
              <div style={{ fontSize: 15, color: 'var(--teal)', fontWeight: 600, marginBottom: 16 }}>Phase 1 Ready · Phase 2 Launching</div>
              <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>Strategically located on the main Yamuna Expressway, in the fastest emerging expanse of Delhi NCR — in close proximity to Noida International Airport and the F1 Circuit.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {['✈️ 15 mins from Jewar International Airport','🏎️ Adjacent to F1 Circuit','📈 Highest appreciation zone in NCR','🏡 2 & 3 BHK premium residences'].map((h, i) => (
                  <div key={i} className="proj-highlight">{h}</div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/projects" className="btn btn-teal">View Project →</Link>
                <Link href="/contact" className="btn btn-outline">Register Interest</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container cta-inner">
          <h2 className="cta-title">Your Homeland is Calling</h2>
          <p className="cta-desc">Talk to our NRI specialists today. We&apos;re available 6 days a week across all major time zones.</p>
          <div className="cta-btns">
            <a href="https://wa.me/919999000911" target="_blank" rel="noreferrer" className="btn btn-teal btn-lg">WhatsApp NRI Desk →</a>
            <Link href="/contact" className="btn btn-ghost btn-lg">Contact Form</Link>
          </div>
        </div>
      </div>
    </>
  )
}
