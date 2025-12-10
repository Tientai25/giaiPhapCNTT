import './BusinessManagement.css';

function BusinessManagement() {
  const features = [
    {
      icon: '🔒',
      title: 'Chỉ các bên tham gia xem được',
      description: 'Nội dung hợp đồng điện tử chỉ được xem bởi các bên ký kết hợp đồng'
    },
    {
      icon: '🔐',
      title: 'Mã hóa khóa công khai',
      description: 'Áp dụng công nghệ khóa công khai để mã hóa nội dung hợp đồng'
    },
    {
      icon: '🔑',
      title: 'Bảo vệ bằng mật khẩu',
      description: 'Chia sẻ thông tin tài liệu được bảo vệ bằng mật khẩu'
    },
    {
      icon: '⛓️',
      title: 'Công nghệ Blockchain',
      description: 'Kiểm soát và xác minh bằng công nghệ TDT Blockchain'
    }
  ];

  return (
    <section id="business-management" className="business-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            An toàn & Bảo mật
          </h2>
          <p className="section-description">
            Áp dụng công nghệ hiện đại để bảo vệ tất cả thông tin khách hàng, hồ sơ và hợp đồng một cách bí mật
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <button className="btn-primary-large">Tìm hiểu thêm về bảo mật</button>
        </div>
      </div>
    </section>
  );
}

export default BusinessManagement;
