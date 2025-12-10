import './Benefits.css';

function Benefits() {
  const benefits = [
    {
      icon: '💰',
      title: '50% Chi phí',
      description: 'Tiết kiệm chi phí in ấn giấy tờ hợp đồng. Chi phí đi lại, lưu trú để gặp mặt trực tiếp ký kết và thương thảo hợp đồng.'
    },
    {
      icon: '⏱️',
      title: '30% Thời gian',
      description: 'Thông báo sẽ ngay lập tức được gửi đến các bên liên quan để thực thi hợp đồng. Tiết kiệm thời gian ký kết hợp đồng.'
    },
    {
      icon: '👥',
      title: '40% Nguồn lực',
      description: 'Tiết kiệm nguồn nhân lực như kiểm soát con người, quản lý đồng thời tăng năng suất của đội ngũ bán hàng.'
    },
    {
      icon: '✨',
      title: '100% Minh bạch',
      description: 'Minh bạch trong quá trình đàm phán, ký kết, quản lý dịch vụ kinh doanh.'
    }
  ];

  return (
    <section className="benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="section-title">Lợi ích</h2>
          <p className="section-subtitle">TDT eContract giúp doanh nghiệp làm việc <strong>tiết kiệm, hiệu quả</strong> và <strong>minh bạch</strong></p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
        <p className="section-footer">Chúng tôi được tin tưởng bởi hơn 1.000 đối tác hàng đầu</p>
      </div>
    </section>
  );
}

export default Benefits;

