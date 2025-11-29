import './eSign.css';

function ESign() {
  const features = [
    {
      icon: '🔐',
      title: 'Hỗ trợ Token, SmartCA, Remote Signing',
      description: 'Linh hoạt cho mọi mô hình ký – từ cá nhân đến doanh nghiệp lớn.'
    },
    {
      icon: '📄',
      title: 'Ký PDF, XML, hợp đồng và dữ liệu giao dịch',
      description: 'Tương thích với quy trình của tài chính, ngân hàng, bảo hiểm, logistics…'
    },
    {
      icon: '🛡️',
      title: 'Bảo mật đa tầng – chống giả mạo',
      description: 'Mã hóa, xác thực OTP, log đầy đủ quá trình ký.'
    },
    {
      icon: '✅',
      title: 'Chuẩn pháp lý',
      description: 'Tuân thủ đầy đủ tiêu chuẩn chữ ký số tại Việt Nam và quốc tế.'
    },
    {
      icon: '💻',
      title: 'Dễ sử dụng – không cần cài đặt',
      description: 'Ký trực tiếp trên trình duyệt, thao tác đơn giản, tốc độ xử lý nhanh.'
    }
  ];

  return (
    <section className="esign">
      <div className="esign-container">
        <div className="esign-header">
          <h2 className="section-title">Giải pháp Chữ ký số – TDT eSign</h2>
          <p className="section-subtitle">
            Đáp ứng mọi nhu cầu ký số của cá nhân và doanh nghiệp.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ESign;

