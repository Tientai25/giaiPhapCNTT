import './ECommerce.css';

function ECommerce() {
  const features = [
    {
      icon: '✍️',
      title: 'Chữ ký số',
      description: 'Hỗ trợ tất cả các loại chữ ký số của tất cả các tổ chức cấp chứng thư số tại Việt Nam'
    },
    {
      icon: '👤',
      title: 'Định danh trực tuyến',
      description: 'Cung cấp các giải pháp eKYC và Video KYC cho phép xác định khách hàng trực tuyến'
    },
    {
      icon: '💬',
      title: 'Thương thảo trực tuyến',
      description: 'Các bên liên quan có thể thảo luận, theo dõi tất cả các thay đổi, đàm phán và điều chỉnh hợp đồng trực tuyến'
    },
    {
      icon: '🔒',
      title: 'Bảo mật',
      description: 'Chỉ các bên tham gia trong hợp đồng mới có thể truy cập thông tin hợp đồng của họ'
    }
  ];

  return (
    <section id="ecommerce" className="ecommerce-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Tính năng chính
          </h2>
          <p className="section-description">
            Quản lý & ký kết hợp đồng điện tử cho các bên tham gia mọi lúc, mọi nơi
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
          <a href="#feature" className="explore-link">Khám phá tất cả tính năng</a>
        </div>
      </div>
    </section>
  );
}

export default ECommerce;
