import Link from 'next/link'
import siteData from '@/data/site.json'

export default function Footer() {
  const { contact } = siteData
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-mark">O</div>
              <div className="footer-logo-text">
                <strong>Oasis Group</strong>
                <span>Est. 2002</span>
              </div>
            </div>
            <p>Building premium residential communities across Delhi NCR since 2002. Over 2.2 million sq. ft. delivered. 500+ happy families calling our projects home.</p>
            <div className="footer-social">
              <a href={contact.social.facebook} target="_blank" rel="noreferrer" className="social-btn">f</a>
              <a href={contact.social.twitter} target="_blank" rel="noreferrer" className="social-btn">𝕏</a>
              <a href={contact.social.instagram} target="_blank" rel="noreferrer" className="social-btn">◉</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Our Projects</h4>
            <ul>
              <li><Link href="/projects#grandstand-1">Oasis Grandstand Ph.1</Link></li>
              <li><Link href="/projects#grandstand-2">Oasis Grandstand Ph.2</Link></li>
              <li><Link href="/projects#venetia">Oasis Venetia Heights</Link></li>
              <li><Link href="/projects#homes">Oasis Homes</Link></li>
              <li><Link href="/projects#arcade">Oasis Arcade</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Oasis Group</Link></li>
              <li><Link href="/nri">NRI Section</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><a href="https://www.oasis.in/rera-faq/" target="_blank" rel="noreferrer">RERA FAQ</a></li>
              <li><a href="https://www.oasis.in/why-invest-with-us/" target="_blank" rel="noreferrer">Why Invest</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul>
              <li><a>📍 {contact.address}</a></li>
              <li><a href={`tel:${contact.phone1}`}>📞 {contact.phone1}</a></li>
              <li><a href={`tel:${contact.phone2}`}>📞 {contact.phone2}</a></li>
              <li><a href={`mailto:${contact.email}`}>✉ {contact.email}</a></li>
              <li><a>{contact.hours}</a></li>
            </ul>
          </div>
        </div>
        <div className="disclaimer-text">
          Disclaimer: This website is for informational purposes only. All specifications, images, plans and other information are indicative and subject to change without notice. RERA registration numbers are mentioned wherever applicable. Verify all details at the time of booking. This is not an offer or invitation to offer.
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Oasis Group of Companies. All Rights Reserved.</span>
          <span>UPRERAPRJ6908 | UPRERAPRJ1646 | UPRERAPRJ585804</span>
        </div>
      </div>
    </footer>
  )
}
