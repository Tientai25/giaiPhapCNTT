import './Pricing.css';
import { useState } from 'react';

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const plans = [
    {
      name: 'Gói Cá Nhân',
      price: isAnnual ? 'Miễn phí' : 'Miễn phí',
      monthlyPrice: 'Miễn phí',
      annualPrice: 'Miễn phí',
      features: [
        'Ký 20 hợp đồng/tháng',
        '1 người ký',
        'Lưu trữ 1GB',
        'Hỗ trợ qua email',
        'Xác thực cơ bản'
      ],
      popular: false,
      cta: 'Bắt đầu miễn phí'
    },
    {
      name: 'Gói Pro',
      price: isAnnual ? '199.000đ/tháng' : '249.000đ/tháng',
      monthlyPrice: '249.000đ/tháng',
      annualPrice: '199.000đ/tháng',
      savings: isAnnual ? '20% tiết kiệm' : '',
      features: [
        'Không giới hạn hợp đồng',
        'Tối đa 5 người ký',
        'Lưu trữ 50GB',
        'Hỗ trợ ưu tiên',
        'Xác thực nâng cao',
        'Báo cáo & thống kê'
      ],
      popular: true,
      cta: 'Dùng thử 14 ngày'
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      monthlyPrice: 'Liên hệ',
      annualPrice: 'Liên hệ',
      features: [
        'Không giới hạn mọi thứ',
        'Không giới hạn người ký',
        'Lưu trữ không giới hạn',
        'Hỗ trợ 24/7',
        'Xác thực bảo mật cao',
        'Tích hợp API đầy đủ',
        'SLA tùy chỉnh'
      ],
      popular: false,
      cta: 'Liên hệ ngay'
    }
  ];

  const faqs = [
    {
      question: 'Gói Cá Nhân có thể nâng cấp lên gói Pro không?',
      answer: 'Có, bạn có thể nâng cấp bất kỳ lúc nào. Chúng tôi sẽ tính toán theo tỉ lệ cho các ngày còn lại trong tháng.'
    },
    {
      question: 'Có thể hủy gói bất kỳ lúc nào không?',
      answer: 'Có, bạn có thể hủy gói bất kỳ lúc nào. Không có hợp đồng dài hạn hay phí hủy. Dữ liệu của bạn sẽ được giữ trong 30 ngày.'
    },
    {
      question: 'Có hỗ trợ cho tích hợp API không?',
      answer: 'Gói Pro và Doanh Nghiệp đều hỗ trợ tích hợp API. Để biết thêm chi tiết, vui lòng liên hệ với đội bán hàng.'
    },
    {
      question: 'Thanh toán hàng năm có được giảm giá không?',
      answer: 'Có! Khi bạn thanh toán hàng năm, bạn sẽ nhận được chiết khấu 20% so với thanh toán hàng tháng.'
    }
  ];

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="section-title">Bảng Giá</h2>
          <p className="section-subtitle">Chọn gói phù hợp với nhu cầu của bạn</p>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          <span className={!isAnnual ? 'active' : ''}>Hàng tháng</span>
          <button 
            className={`toggle-switch ${isAnnual ? 'annual' : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle annual billing"
          >
            <span className="toggle-circle"></span>
          </button>
          <span className={isAnnual ? 'active' : ''}>
            Hàng năm <span className="discount-badge">Tiết kiệm 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Phổ biến</div>}
              {plan.savings && <div className="savings-badge">{plan.savings}</div>}
              
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">{plan.price}</div>
              
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <svg className="feature-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`plan-button ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3 className="faq-title">Câu hỏi thường gặp</h3>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  {faq.question}
                  <span className={`faq-icon ${expandedFaq === index ? 'expanded' : ''}`}>+</span>
                </button>
                {expandedFaq === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
