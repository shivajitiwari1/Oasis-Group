'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const nav = [
  { section: 'OVERVIEW' },
  { label: 'Dashboard', icon: '📊', href: '/admin/dashboard' },
  { section: 'SUBMISSIONS' },
  { label: 'Enquiries', icon: '📩', href: '/admin/enquiries', badge: 'new' },
  { section: 'SITE CONTENT' },
  { label: 'Hero Section', icon: '🏠', href: '/admin/site/hero' },
  { label: 'Projects', icon: '🏢', href: '/admin/site/projects' },
  { label: 'Statistics', icon: '📈', href: '/admin/site/stats' },
  { label: 'Testimonials', icon: '💬', href: '/admin/site/testimonials' },
  { label: 'Why Invest', icon: '⭐', href: '/admin/site/why' },
  { label: 'Contact Info', icon: '📍', href: '/admin/site/contact' },
]

export default function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [newEnquiries, setNewEnquiries] = useState(0)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => {
    fetch('/api/admin/enquiries').then(r => r.json()).then(d => {
      if (Array.isArray(d)) setNewEnquiries(d.filter((e: { status: string }) => e.status === 'new').length)
    }).catch(() => {})
  }, [pathname])

  const logout = async () => {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="admin-body">
      <div className="admin-shell">
        {open && <div className="admin-sidebar-overlay" onClick={() => setOpen(false)} />}

        <aside className={`admin-sidebar${open ? ' open' : ''}`}>
          <div className="admin-sidebar-logo">
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,var(--teal),var(--gold))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#fff', fontWeight: 700, flexShrink: 0 }}>O</div>
            <div><strong>Oasis Admin</strong><span>Control Panel</span></div>
            <button className="admin-sidebar-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <nav className="admin-nav">
            {nav.map((item, i) => {
              if ('section' in item && !('href' in item)) return <div key={i} className="admin-nav-section">{item.section}</div>
              if (!('href' in item)) return null
              return (
                <Link key={item.href} href={item.href!} className={`admin-nav-link${pathname === item.href ? ' active' : ''}`} onClick={() => setOpen(false)}>
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge === 'new' && newEnquiries > 0 && <span className="admin-nav-badge">{newEnquiries}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="admin-sidebar-footer">
            <Link href="/" className="admin-nav-link" target="_blank" rel="noreferrer"><span className="nav-icon">🌐</span>View Website</Link>
            <button className="admin-logout-btn" onClick={logout} disabled={loggingOut}><span className="nav-icon">🚪</span>{loggingOut ? 'Logging out...' : 'Logout'}</button>
          </div>
        </aside>

        <div className="admin-main">
          <div className="admin-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="admin-hamburger" onClick={() => setOpen(o => !o)}><span /><span /><span /></button>
              <h1>{title}</h1>
            </div>
            <div className="admin-user-badge"><div className="avatar">A</div>Administrator</div>
          </div>
          <div className="admin-content">{children}</div>
        </div>
      </div>
    </div>
  )
}
