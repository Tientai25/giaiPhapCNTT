import './Footer.css';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">TDT Company</h3>
            <p className="footer-text">
              Công ty Cổ phần Dịch vụ Công nghệ và Chuyển đổi số
            </p>
            <p className="footer-text">
              Trụ sở: Tầng 2, Tòa nhà Detech Tower, 8 Tôn Thất Thuyết, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
            </p>
            <div className="footer-keywords">
              <span className="keyword-tag">Hợp đồng điện tử</span>
              <span className="keyword-tag">Chữ ký số</span>
              <span className="keyword-tag">eContract</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Chính sách</h3>
            <ul className="footer-links">
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Kênh truyền thông</h3>
            <ul className="footer-contact">
              <li>📞 Hotline: 0919 437 678</li>
              <li>📧 Email: contact@digitalservices.vn</li>
              <li>🌐 Website: www.digitalservices.vn</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Tải ứng dụng</h3>
            <p className="footer-text">eContract V1</p>
            <ul className="footer-links">
              <li><a href="https://play.google.com/store/apps/details?id=vnpt.it3.econtract" target="_blank" rel="noopener noreferrer">📱 Android</a></li>
              <li><a href="https://apps.apple.com/vn/app/econtract/id1583922938?l=vi" target="_blank" rel="noopener noreferrer">🍎 iOS</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; TDT 2025. All Rights Reserved.</p>
          <div className="footer-seo">
            <span>Hợp đồng điện tử TDT</span>
            <span>•</span>
            <span>Chữ ký số</span>
            <span>•</span>
            <span>eContract</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

