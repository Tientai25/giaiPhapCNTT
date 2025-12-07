import './BusinessManagement.css';

function BusinessManagement() {
  const features = [
    {
      icon: '📋',
      title: 'Quản lý công việc – quy trình',
      description: 'Theo dõi task, phân công, deadline và workflow tự động'
    },
    {
      icon: '📦',
      title: 'Quản lý kho – vật tư',
      description: 'Nhập xuất tồn kho, theo dõi vật tư, cảnh báo hết hàng'
    },
    {
      icon: '🤝',
      title: 'Quản lý bán hàng – CRM',
      description: 'Quản lý khách hàng, đơn hàng, báo giá, hợp đồng'
    },
    {
      icon: '👥',
      title: 'Quản lý nhân sự',
      description: 'Chấm công, tính lương, nghỉ phép, đánh giá KPI'
    },
    {
      icon: '💰',
      title: 'Quản lý tài chính',
      description: 'Thu chi, công nợ, báo cáo doanh thu và lợi nhuận'
    },
    {
      icon: '📊',
      title: 'Báo cáo phân tích',
      description: 'Dashboard tổng hợp, biểu đồ, xuất báo cáo Excel/PDF'
    },
    {
      icon: '🔐',
      title: 'Phân quyền người dùng',
      description: 'Phân quyền linh hoạt theo vị trí, bộ phận'
    },
    {
      icon: '⚙️',
      title: 'Tùy chỉnh linh hoạt',
      description: 'Cấu hình quy trình, biểu mẫu theo nhu cầu doanh nghiệp'
    }
  ];

  const benefits = [
    'Tăng hiệu suất làm việc và giảm sai sót thủ công',
    'Dễ sử dụng, phù hợp với SME không chuyên IT',
    'Tiết kiệm chi phí triển khai so với hệ thống lớn',
    'Giúp lãnh đạo ra quyết định nhanh bằng dữ liệu',
    'Hỗ trợ chuyển đổi số toàn diện cho doanh nghiệp'
  ];

  const useCases = [
    { icon: '🏭', text: 'Sản xuất & Gia công' },
    { icon: '🛒', text: 'Bán lẻ & Phân phối' },
    { icon: '🏢', text: 'Dịch vụ & Tư vấn' },
    { icon: '🎓', text: 'Giáo dục & Đào tạo' }
  ];

  return (
    <section id="business-management" className="business-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Giải pháp đóng gói</span>
          <h2 className="section-title">
            Phần Mềm Quản Lý Doanh Nghiệp<br />
            Cho SME
          </h2>
          <p className="section-description">
            Giải pháp quản trị tổng thể từ bán hàng, kho, nhân sự đến tài chính. 
            Dễ triển khai, phù hợp với đa dạng mô hình kinh doanh vừa và nhỏ.
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
          <h3 className="benefits-title">Lợi ích mang lại</h3>
          <ul className="benefits-list">
            {benefits.map((benefit, index) => (
              <li key={index} className="benefit-item">
                <span className="benefit-check">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="use-cases">
          <h3 className="use-cases-title">Phù hợp cho</h3>
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-card">
                <span className="use-case-icon">{useCase.icon}</span>
                <span className="use-case-text">{useCase.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section">
          <button className="btn-primary-large">Tìm hiểu chi tiết</button>
          <button className="btn-outline-large">Đặt lịch demo</button>
        </div>
      </div>
    </section>
  );
}

export default BusinessManagement;
