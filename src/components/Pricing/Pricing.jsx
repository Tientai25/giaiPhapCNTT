import './Pricing.css';
import { useState } from 'react';

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeProduct, setActiveProduct] = useState('vas'); // 'vas' or 'business'

  const vasPlans = [
    {
      name: 'Gói Khởi Động',
      price: isAnnual ? '1.990.000đ/tháng' : '2.490.000đ/tháng',
      monthlyPrice: '2.490.000đ/tháng',
      annualPrice: '1.990.000đ/tháng',
      savings: isAnnual ? '20% tiết kiệm' : '',
      features: [
        'Website TMĐT cơ bản',
        'Tối đa 500 sản phẩm',
        'Thanh toán: QR, COD',
        'Quản lý đơn hàng',
        '10GB lưu trữ',
        'Hỗ trợ email'
      ],
      popular: false,
      cta: 'Dùng thử 14 ngày'
    },
    {
      name: 'Gói Chuyên Nghiệp',
      price: isAnnual ? '3.990.000đ/tháng' : '4.990.000đ/tháng',
      monthlyPrice: '4.990.000đ/tháng',
      annualPrice: '3.990.000đ/tháng',
      savings: isAnnual ? '20% tiết kiệm' : '',
      features: [
        'Website TMĐT nâng cao',
        'Không giới hạn sản phẩm',
        'Thanh toán: Tất cả phương thức',
        'Marketing tích hợp',
        'Dashboard báo cáo',
        '50GB lưu trữ',
        'Hỗ trợ ưu tiên'
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
        'Tùy chỉnh toàn diện',
        'Không giới hạn mọi thứ',
        'API tích hợp',
        'Multi-store',
        'Lưu trữ không giới hạn',
        'Hỗ trợ 24/7',
        'SLA cam kết'
      ],
      popular: false,
      cta: 'Liên hệ ngay'
    }
  ];

  const businessPlans = [
    {
      name: 'Gói Cơ Bản',
      price: isAnnual ? '1.590.000đ/tháng' : '1.990.000đ/tháng',
      monthlyPrice: '1.990.000đ/tháng',
      annualPrice: '1.590.000đ/tháng',
      savings: isAnnual ? '20% tiết kiệm' : '',
      features: [
        'Tối đa 10 users',
        'Quản lý bán hàng & kho',
        'Quản lý nhân sự cơ bản',
        'Báo cáo cơ bản',
        '10GB lưu trữ',
        'Hỗ trợ email'
      ],
      popular: false,
      cta: 'Dùng thử 14 ngày'
    },
    {
      name: 'Gói Chuyên Nghiệp',
      price: isAnnual ? '2.990.000đ/tháng' : '3.690.000đ/tháng',
      monthlyPrice: '3.690.000đ/tháng',
      annualPrice: '2.990.000đ/tháng',
      savings: isAnnual ? '20% tiết kiệm' : '',
      features: [
        'Tối đa 50 users',
        'Đầy đủ tính năng quản lý',
        'CRM & Marketing',
        'Quản lý tài chính',
        'Báo cáo nâng cao',
        '50GB lưu trữ',
        'Hỗ trợ ưu tiên'
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
        'Không giới hạn users',
        'Tùy chỉnh quy trình',
        'Tích hợp API',
        'Multi-chi nhánh',
        'Lưu trữ không giới hạn',
        'Hỗ trợ 24/7',
        'Training & Onboarding'
      ],
      popular: false,
      cta: 'Liên hệ ngay'
    }
  ];

  const plans = activeProduct === 'vas' ? vasPlans : businessPlans;

  const faqs = [
    {
      question: 'Có thể dùng thử trước khi quyết định không?',
      answer: 'Có, tất cả các gói (trừ gói Doanh Nghiệp) đều có 14 ngày dùng thử miễn phí. Không cần thẻ tín dụng khi đăng ký.'
    },
    {
      question: 'Có thể nâng cấp hoặc hạ cấp gói bất kỳ lúc nào không?',
      answer: 'Có, bạn có thể thay đổi gói bất kỳ lúc nào. Chúng tôi sẽ tính toán theo tỉ lệ cho các ngày còn lại trong tháng.'
    },
    {
      question: 'Có hỗ trợ triển khai và đào tạo không?',
      answer: 'Gói Chuyên Nghiệp có tài liệu hướng dẫn chi tiết. Gói Doanh Nghiệp bao gồm training trực tiếp và hỗ trợ onboarding.'
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
          <p className="section-subtitle">Chọn sản phẩm và gói phù hợp với doanh nghiệp của bạn</p>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <button 
            className={`tab-btn ${activeProduct === 'vas' ? 'active' : ''}`}
            onClick={() => setActiveProduct('vas')}
          >
            🛒 VAS - TMĐT & Thanh Toán
          </button>
          <button 
            className={`tab-btn ${activeProduct === 'business' ? 'active' : ''}`}
            onClick={() => setActiveProduct('business')}
          >
            📊 Quản Lý Doanh Nghiệp
          </button>
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
