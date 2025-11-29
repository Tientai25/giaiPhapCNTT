import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>TDT eContract & eSign</h2>
        </div>
        <nav className="nav">
          <a href="#home">Trang chủ</a>
          <a href="#solutions">Giải pháp</a>
          <a href="#pricing">Báo giá</a>
          <a href="#contact">Liên hệ</a>
        </nav>
        <div className="header-actions">
          <button className="btn-secondary">Đăng nhập</button>
          <button className="btn-primary">Dùng thử miễn phí</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

