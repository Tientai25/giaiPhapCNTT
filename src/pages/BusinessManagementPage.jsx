import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useScrollToTop from '../hooks/useScrollToTop';
import './BusinessManagementPage.css';

function BusinessManagementPage() {
  useScrollToTop();

  const features = [
    {
      icon: '📋',
      title: 'Quản lý công việc – quy trình',
      description: 'Tạo task, phân công, theo dõi tiến độ và deadline. Workflow tự động cho từng bộ phận. Quản lý dự án theo Kanban, Gantt chart.'
    },
    {
      icon: '📦',
      title: 'Quản lý kho – vật tư',
      description: 'Nhập xuất tồn kho chi tiết, theo dõi serial/lot. Cảnh báo hết hàng, đặt hàng tự động. Kiểm kê định kỳ, báo cáo tồn kho.'
    },
    {
      icon: '🤝',
      title: 'Quản lý bán hàng – CRM',
      description: 'Quản lý khách hàng, lịch sử mua hàng, công nợ. Báo giá, đơn hàng, hợp đồng. Pipeline bán hàng, dự báo doanh thu.'
    },
    {
      icon: '👥',
      title: 'Quản lý nhân sự',
      description: 'Hồ sơ nhân viên, chấm công (GPS, QR, vân tay). Tính lương tự động, quản lý nghỉ phép, đánh giá KPI theo tháng/quý.'
    },
    {
      icon: '💰',
      title: 'Quản lý tài chính',
      description: 'Thu chi, công nợ phải thu/trả. Báo cáo doanh thu, chi phí, lợi nhuận. Kế hoạch ngân sách, dự báo dòng tiền.'
    },
    {
      icon: '📊',
      title: 'Báo cáo phân tích',
      description: 'Dashboard tổng hợp theo thời gian thực. Biểu đồ trực quan, drill-down chi tiết. Xuất báo cáo Excel/PDF, gửi email tự động.'
    },
    {
      icon: '🔐',
      title: 'Phân quyền người dùng',
      description: 'Phân quyền linh hoạt theo vai trò, bộ phận. Kiểm soát truy cập dữ liệu nhạy cảm. Audit log đầy đủ mọi thao tác.'
    },
    {
      icon: '⚙️',
      title: 'Tùy chỉnh & mở rộng',
      description: 'Cấu hình quy trình, biểu mẫu theo nhu cầu. Tích hợp API cho kế toán, ngân hàng. Module bổ sung: sản xuất, bảo hành...'
    }
  ];

  const benefits = [
    {
      title: 'Tăng hiệu suất làm việc',
      description: 'Tự động hóa quy trình, giảm 70% thời gian nhập liệu và báo cáo thủ công'
    },
    {
      title: 'Dễ sử dụng cho SME',
      description: 'Giao diện thân thiện, không cần kiến thức IT. Đào tạo nhanh chóng trong 1-2 ngày'
    },
    {
      title: 'Tiết kiệm chi phí',
      description: 'Chi phí chỉ 1/3 so với SAP, Oracle. Không phí setup, license vĩnh viễn'
    },
    {
      title: 'Ra quyết định nhanh',
      description: 'Dữ liệu thời gian thực, báo cáo đa chiều giúp lãnh đạo nắm bắt tình hình ngay lập tức'
    }
  ];

  const modules = [
    { name: 'Bán hàng & CRM', icon: '🤝', color: '#4f46e5' },
    { name: 'Kho & Vật tư', icon: '📦', color: '#0ea5e9' },
    { name: 'Nhân sự & Lương', icon: '👥', color: '#10b981' },
    { name: 'Tài chính & Kế toán', icon: '💰', color: '#f59e0b' },
    { name: 'Sản xuất & Gia công', icon: '🏭', color: '#8b5cf6' },
    { name: 'Dự án & Task', icon: '📋', color: '#ec4899' }
  ];

  const useCases = [
    { title: 'Sản xuất & Gia công', icon: '🏭' },
    { title: 'Bán lẻ & Phân phối', icon: '🛒' },
    { title: 'Dịch vụ & Tư vấn', icon: '🏢' },
    { title: 'Giáo dục & Đào tạo', icon: '🎓' }
  ];

  return (
    <>
      <Header />
      <div className="product-page">
        {/* Hero Section */}
        <section className="product-hero business-hero">
          <div className="container">
            <div className="hero-badge">Giải pháp đóng gói cho SME</div>
            <h1 className="hero-title">
              Phần Mềm Quản Lý<br />
              Doanh Nghiệp Toàn Diện
            </h1>
            <p className="hero-description">
              Giải pháp quản trị tổng thể từ bán hàng, kho, nhân sự đến tài chính. 
              Dễ triển khai, phù hợp với đa dạng mô hình kinh doanh vừa và nhỏ.
            </p>
            <div className="hero-cta">
              <button className="btn-primary-large">Đặt lịch demo</button>
              <button className="btn-outline-large">Dùng thử 14 ngày</button>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="modules-section">
          <div className="container">
            <h2 className="section-title">Các module chính</h2>
            <div className="modules-grid">
              {modules.map((module, index) => (
                <div key={index} className="module-card" style={{ borderLeftColor: module.color }}>
                  <span className="module-icon">{module.icon}</span>
                  <span className="module-name">{module.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Tính năng chi tiết</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="container">
            <h2 className="section-title">Lợi ích mang lại</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-number">{index + 1}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="use-cases-section">
          <div className="container">
            <h2 className="section-title">Phù hợp cho</h2>
            <div className="use-cases-grid">
              {useCases.map((useCase, index) => (
                <div key={index} className="use-case-card">
                  <span className="use-case-icon">{useCase.icon}</span>
                  <span className="use-case-title">{useCase.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <h2>Sẵn sàng chuyển đổi số doanh nghiệp?</h2>
              <p>Đặt lịch tư vấn miễn phí với chuyên gia của chúng tôi</p>
              <button className="btn-primary-large">Đặt lịch tư vấn ngay</button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default BusinessManagementPage;
