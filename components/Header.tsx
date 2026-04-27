'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'NRI Section', href: '/nri' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a href="tel:+918010111777">📞 +91 8010-111-777</a>
            <div className="topbar-divider" />
            <a href="mailto:info@oasis.in">✉ info@oasis.in</a>
          </div>
          <div className="topbar-right">
            <span className="topbar-pill">RERA Registered Developer</span>
            <span>Delhi NCR&apos;s Trusted Builder Since 2002</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">O</div>
            <div className="logo-text">
              <strong>Oasis Group</strong>
              <span>Real Estate Developer</span>
            </div>
          </Link>

          <nav className="site-nav">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`}>{l.label}</Link>
            ))}
          </nav>

          <div className="header-right">
            <span className="header-phone">📞 +91 8010-111-777</span>
            <a href="https://wa.me/919999000911?text=Interested%20in%20Oasis%20Group!" target="_blank" rel="noreferrer" className="btn btn-teal btn-sm nav-cta">Register Interest</a>
            <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && <div className="mobile-overlay" onClick={close} />}

      {/* Mobile drawer */}
      <div className={`mobile-nav${open ? ' open' : ''}`}>
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Oasis Group</span>
          <button className="mobile-nav-close" onClick={close} aria-label="Close">✕</button>
        </div>
        {links.map(l => (
          <div key={l.href} className="mobile-nav-item">
            <Link href={l.href} className={pathname === l.href ? 'active' : ''}>{l.label}</Link>
          </div>
        ))}
        <div className="mobile-nav-cta">
          <a href="https://wa.me/919999000911" target="_blank" rel="noreferrer">Register Interest →</a>
        </div>
        <div className="mobile-nav-bottom">
          <button onClick={close}>✕ Close Menu</button>
        </div>
      </div>
    </>
  )
}
