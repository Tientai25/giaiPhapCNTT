import './Pricing.css';

function Pricing() {
  const plans = [
    {
      name: 'Gói Cá Nhân',
      price: 'Miễn phí',
      features: [
        'Ký 20 hợp đồng/tháng',
        '1 người ký',
        'Lưu trữ 1GB',
        'Hỗ trợ qua email'
      ],
      popular: false
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      features: [
        'Không giới hạn hợp đồng',
        'Nhiều vai trò ký',
        'Quy trình ký nâng cao',
        'Hỗ trợ tích hợp API',
        'Lưu trữ 20GB'
      ],
      popular: true
    },
    {
      name: 'Gói Enterprise',
      price: 'Tùy chỉnh',
      features: [
        'Tùy chỉnh theo nhu cầu',
        'Tích hợp sâu hệ thống nội bộ',
        'SLA 24/7',
        'Bảo mật nâng cao',
        'Lưu trữ không giới hạn'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <h2 className="section-title">Bảng giá</h2>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Phổ biến</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">{plan.price}</div>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`plan-button ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.price === 'Miễn phí' ? 'Bắt đầu miễn phí' : 'Liên hệ ngay'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;

