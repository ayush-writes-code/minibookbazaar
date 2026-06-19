import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="container footer-top-grid">
        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="#">Career</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">YT Featured Video</Link></li>
            <li><Link href="#">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">Policies</h4>
          <ul className="footer-links">
            <li><Link href="#">Privacy Policies</Link></li>
            <li><Link href="#">Terms of Use</Link></li>
            <li><Link href="#">Secure Shopping</Link></li>
            <li><Link href="#">Copyright Policy</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Help</h4>
          <ul className="footer-links">
            <li><Link href="#">Payment</Link></li>
            <li><Link href="#">Shipping</Link></li>
            <li><Link href="#">Return</Link></li>
            <li><Link href="#">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Misc</h4>
          <ul className="footer-links">
            <li><Link href="#">Affiliate</Link></li>
            <li><Link href="#">Sitemap</Link></li>
          </ul>
          
          <div className="footer-app">
            <h4 className="footer-heading" style={{ marginTop: 'var(--space-4)' }}>Download Our App</h4>
            {/* Placeholder for Google Play Badge */}
            <div className="play-badge" style={{ display: 'inline-flex', alignItems: 'center', background: '#000', color: '#fff', padding: '5px 12px', borderRadius: '4px', gap: '8px', cursor: 'pointer', marginTop: 'var(--space-2)' }}>
              <span style={{ fontSize: '20px' }}>▶</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', lineHeight: '1' }}>GET IT ON</span>
                <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1' }}>Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="social-icons">
          {/* Simple CSS circles for placeholders */}
          <span className="social-icon" style={{background: '#3b5998'}}>f</span>
          <span className="social-icon" style={{background: '#000'}}>𝕏</span>
          <span className="social-icon" style={{background: '#0077b5'}}>in</span>
          <span className="social-icon" style={{background: '#cb2027'}}>P</span>
          <span className="social-icon" style={{background: '#ff0000'}}>▶</span>
          <span className="social-icon ig-icon" style={{background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'}}>IG</span>
        </div>
        <p className="copyright">Copyright &copy; {new Date().getFullYear()}. MiniBookBazaar.com. All Rights Reserved</p>
      </div>
    </footer>
  );
}
