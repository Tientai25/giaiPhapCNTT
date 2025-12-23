import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId) => {
    if (sectionId === 'contact') {
      navigate('/lien-he');
    } else if (sectionId === 'pricing') {
      navigate('/bao-gia');
    } else if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { sectionId } });
    }
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    if (location.pathname !== '/dang-nhap') {
      navigate('/dang-nhap');
    }
  };

  const handleProductClick = (path) => {
    navigate(path);
    setProductMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" role="button" tabIndex={0} onClick={() => navigate('/')} onKeyDown={(e) => e.key === 'Enter' && navigate('/')}>
          <h2>TDT eContract</h2>
        </div>
        <nav className="nav">
          <button type="button" onClick={() => navigate('/')}>
            Trang chủ
          </button>
          <button type="button" onClick={() => navigate('/tinh-nang')}>
            Tính năng
          </button>
          <button type="button" onClick={() => navigate('/ve-chung-toi')}>
            Về chúng tôi
          </button>
          <button type="button" onClick={() => handleNavClick('pricing')}>
            Bảng giá
          </button>
          <button type="button" onClick={() => handleNavClick('contact')}>
            Liên hệ
          </button>
        </nav>
        <div className="header-actions">
          <button type="button" className="btn-secondary" onClick={handleLogin}>
            Đăng nhập
          </button>
          <button type="button" className="btn-primary" onClick={() => navigate('/lien-he')}>
            Đăng ký dùng thử
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="mobile-menu">
          <button type="button" onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>
            Trang chủ
          </button>
          <button type="button" onClick={() => { navigate('/tinh-nang'); setMobileMenuOpen(false); }}>
            Tính năng
          </button>
          <button type="button" onClick={() => { navigate('/ve-chung-toi'); setMobileMenuOpen(false); }}>
            Về chúng tôi
          </button>
          <button type="button" onClick={() => handleNavClick('pricing')}>
            Bảng giá
          </button>
          <button type="button" onClick={() => handleNavClick('contact')}>
            Liên hệ
          </button>
          <div className="mobile-menu-divider"></div>
          <button type="button" className="mobile-btn-secondary" onClick={() => { handleLogin(); setMobileMenuOpen(false); }}>
            Đăng nhập
          </button>
          <button type="button" className="mobile-btn-primary" onClick={() => { navigate('/lien-he'); setMobileMenuOpen(false); }}>
            Đăng ký dùng thử
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;

