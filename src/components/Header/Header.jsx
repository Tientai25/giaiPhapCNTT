import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId) => {
    if (sectionId === 'contact') {
      navigate('/lien-he');
    } else if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { sectionId } });
    }
  };

  const handleLogin = () => {
    if (location.pathname !== '/dang-nhap') {
      navigate('/dang-nhap');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" role="button" tabIndex={0} onClick={() => navigate('/')} onKeyDown={(e) => e.key === 'Enter' && navigate('/')}>
          <h2>TDT eContract & eSign</h2>
        </div>
        <nav className="nav">
          <button type="button" onClick={() => handleNavClick('home')}>
            Trang chủ
          </button>
          <button type="button" onClick={() => handleNavClick('solutions')}>
            Giải pháp
          </button>
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
      </div>
    </header>
  );
}

export default Header;

