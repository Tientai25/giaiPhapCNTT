import './Footer.css';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">TDT Solutions</h3>
            <p className="footer-text">
              Giải pháp chuyển đổi số toàn diện cho doanh nghiệp Việt Nam.
              Từ thương mại điện tử đến quản lý doanh nghiệp.
            </p>
            <div className="footer-keywords">
              <span className="keyword-tag">Phần mềm TMĐT</span>
              <span className="keyword-tag">Quản lý doanh nghiệp</span>
              <span className="keyword-tag">Chuyển đổi số</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Sản phẩm</h3>
            <ul className="footer-links">
              <li><a href="/san-pham/vas-thuong-mai-dien-tu" onClick={(e) => { e.preventDefault(); navigate('/san-pham/vas-thuong-mai-dien-tu'); }}>VAS - TMĐT & Thanh Toán</a></li>
              <li><a href="/san-pham/quan-ly-doanh-nghiep" onClick={(e) => { e.preventDefault(); navigate('/san-pham/quan-ly-doanh-nghiep'); }}>Quản Lý Doanh Nghiệp</a></li>
              <li><a href="/bao-gia" onClick={(e) => { e.preventDefault(); navigate('/bao-gia'); }}>Bảng giá</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Hỗ trợ</h3>
            <ul className="footer-links">
              <li><a href="/lien-he" onClick={(e) => { e.preventDefault(); navigate('/lien-he'); }}>Liên hệ</a></li>
              <li><a href="#">Tài liệu hướng dẫn</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Liên hệ</h3>
            <ul className="footer-contact">
              <li>📞 Hotline: 1900 1234</li>
              <li>📧 Email: info@tdt.edu.vn</li>
              <li>📍 19 Nguyễn Hữu Thọ, Quận 7, TP.HCM</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 TDT Solutions. All rights reserved.</p>
          <div className="footer-seo">
            <span>Phần mềm thương mại điện tử</span>
            <span>•</span>
            <span>Phần mềm quản lý doanh nghiệp</span>
            <span>•</span>
            <span>Giải pháp TMĐT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

