import './ECommerce.css';

function ECommerce() {
  const features = [
    {
      icon: '🛒',
      title: 'Website TMĐT chuyên nghiệp',
      description: 'Xây dựng cửa hàng online đẹp mắt, dễ sử dụng, tối ưu chuyển đổi'
    },
    {
      icon: '📦',
      title: 'Quản lý sản phẩm – tồn kho',
      description: 'Theo dõi sản phẩm, danh mục, biến thể và tồn kho theo thời gian thực'
    },
    {
      icon: '💳',
      title: 'Thanh toán đa dạng',
      description: 'QR Code, ví điện tử, ngân hàng, COD – tất cả trong một hệ thống'
    },
    {
      icon: '🚚',
      title: 'Quản lý đơn hàng – vận chuyển',
      description: 'Tự động hóa quy trình từ đặt hàng đến giao hàng và đối soát'
    },
    {
      icon: '📊',
      title: 'Dashboard báo cáo',
      description: 'Theo dõi doanh thu, đơn hàng, khách hàng theo thời gian thực'
    },
    {
      icon: '🎯',
      title: 'Marketing tích hợp',
      description: 'Mã giảm giá, điểm thưởng, email marketing, remarketing'
    },
    {
      icon: '🔒',
      title: 'Bảo mật chuẩn doanh nghiệp',
      description: 'SSL, mã hóa dữ liệu, tuân thủ PCI DSS cho thanh toán'
    },
    {
      icon: '📱',
      title: 'Đa nền tảng',
      description: 'Responsive hoàn hảo trên mọi thiết bị: desktop, tablet, mobile'
    }
  ];

  const benefits = [
    'Tối ưu hóa quy trình bán hàng online',
    'Tăng tỉ lệ chuyển đổi nhờ trải nghiệm mượt mà',
    'Tiết kiệm chi phí vận hành và nhân sự',
    'Dễ dàng mở rộng khi quy mô phát triển',
    'Tích hợp đầy đủ công cụ marketing'
  ];

  return (
    <section id="ecommerce" className="ecommerce-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Sản phẩm nổi bật</span>
          <h2 className="section-title">
            VAs – Hệ Thống Thương Mại Điện Tử<br />
            & Thanh Toán Thông Minh
          </h2>
          <p className="section-description">
            Nền tảng giúp doanh nghiệp xây dựng và vận hành hệ thống TMĐT một cách dễ dàng, 
            tối ưu trải nghiệm người dùng và tích hợp đầy đủ các phương thức thanh toán hiện đại.
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

        <div className="benefits-section">
          <h3 className="benefits-title">Lợi ích cho doanh nghiệp</h3>
          <ul className="benefits-list">
            {benefits.map((benefit, index) => (
              <li key={index} className="benefit-item">
                <span className="benefit-check">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="cta-section">
          <button className="btn-primary-large">Tìm hiểu thêm về VAs</button>
          <button className="btn-outline-large">Đăng ký dùng thử</button>
        </div>
      </div>
    </section>
  );
}

export default ECommerce;
