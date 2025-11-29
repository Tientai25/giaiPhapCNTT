import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Giới thiệu</h3>
            <p className="footer-text">
              TDT eContract & eSign - Giải pháp hợp đồng điện tử và chữ ký số 
              hàng đầu cho doanh nghiệp Việt Nam.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Liên kết</h3>
            <ul className="footer-links">
              <li><a href="#home">Trang chủ</a></li>
              <li><a href="#solutions">Giải pháp</a></li>
              <li><a href="#pricing">Báo giá</a></li>
              <li><a href="#contact">Liên hệ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Chính sách</h3>
            <ul className="footer-links">
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Liên hệ</h3>
            <ul className="footer-contact">
              <li>📞 Hotline: 1900 1234</li>
              <li>📧 Email: support@tdt.vn</li>
              <li>📍 Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 TDT eContract & eSign. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

