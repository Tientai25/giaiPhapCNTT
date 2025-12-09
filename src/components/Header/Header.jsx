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
          <h2>TDT Solutions</h2>
        </div>
        <nav className="nav">
          <button type="button" onClick={() => navigate('/')}>
            Trang chủ
          </button>
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setProductMenuOpen(true)}
            onMouseLeave={() => setProductMenuOpen(false)}
          >
            <button type="button">
              Sản phẩm ▾
            </button>
            {productMenuOpen && (
              <div className="dropdown-menu">
                <button type="button" onClick={() => handleProductClick('/san-pham/vas-thuong-mai-dien-tu')}>
                  🛒 VAS - TMĐT & Thanh Toán
                </button>
                <button type="button" onClick={() => handleProductClick('/san-pham/quan-ly-doanh-nghiep')}>
                  📊 Quản Lý Doanh Nghiệp
                </button>
              </div>
            )}
          </div>
          <button type="button" onClick={() => handleNavClick('pricing')}>
            Báo giá
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
            Dùng thử miễn phí
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
          <div className="mobile-submenu">
            <div className="mobile-submenu-title">Sản phẩm</div>
            <button type="button" onClick={() => handleProductClick('/san-pham/vas-thuong-mai-dien-tu')}>
              🛒 VAS - TMĐT & Thanh Toán
            </button>
            <button type="button" onClick={() => handleProductClick('/san-pham/quan-ly-doanh-nghiep')}>
              📊 Quản Lý Doanh Nghiệp
            </button>
          </div>
          <button type="button" onClick={() => handleNavClick('pricing')}>
            Báo giá
          </button>
          <button type="button" onClick={() => handleNavClick('contact')}>
            Liên hệ
          </button>
          <div className="mobile-menu-divider"></div>
          <button type="button" className="mobile-btn-secondary" onClick={() => { handleLogin(); setMobileMenuOpen(false); }}>
            Đăng nhập
          </button>
          <button type="button" className="mobile-btn-primary" onClick={() => { navigate('/lien-he'); setMobileMenuOpen(false); }}>
            Dùng thử miễn phí
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;

