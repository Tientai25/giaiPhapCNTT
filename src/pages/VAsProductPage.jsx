import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useScrollToTop from '../hooks/useScrollToTop';
import './VAsProductPage.css';

function VAsProductPage() {
  useScrollToTop();

  const features = [
    {
      icon: '🛒',
      title: 'Website TMĐT chuyên nghiệp',
      description: 'Xây dựng cửa hàng online đẹp mắt với giao diện hiện đại, tối ưu SEO và tốc độ tải trang nhanh. Responsive hoàn hảo trên mọi thiết bị.'
    },
    {
      icon: '📦',
      title: 'Quản lý sản phẩm – tồn kho',
      description: 'Theo dõi sản phẩm, danh mục, biến thể (size, màu) và tồn kho theo thời gian thực. Cảnh báo tự động khi hết hàng.'
    },
    {
      icon: '💳',
      title: 'Thanh toán online đa dạng',
      description: 'Tích hợp QR Code (VNPay, MoMo), ví điện tử, chuyển khoản ngân hàng, COD. Bảo mật chuẩn PCI DSS.'
    },
    {
      icon: '🚚',
      title: 'Quản lý đơn hàng – vận chuyển',
      description: 'Tự động hóa quy trình từ đặt hàng, xác nhận, đóng gói đến giao hàng. Tích hợp đơn vị vận chuyển: GHN, GHTK, Viettel Post.'
    },
    {
      icon: '📊',
      title: 'Dashboard báo cáo thời gian thực',
      description: 'Theo dõi doanh thu, đơn hàng, sản phẩm bán chạy, khách hàng mới. Xuất báo cáo Excel/PDF theo ngày, tháng, năm.'
    },
    {
      icon: '🎯',
      title: 'Marketing tích hợp',
      description: 'Tạo mã giảm giá, chương trình khuyến mãi, điểm thưởng tích lũy. Email marketing, SMS, remarketing Facebook Pixel.'
    },
    {
      icon: '🔒',
      title: 'Bảo mật chuẩn doanh nghiệp',
      description: 'SSL miễn phí, mã hóa dữ liệu, xác thực 2 lớp (2FA). Backup tự động hàng ngày, khôi phục dữ liệu nhanh chóng.'
    },
    {
      icon: '🔧',
      title: 'Tùy chỉnh & mở rộng',
      description: 'API đầy đủ cho tích hợp bên thứ 3. Hỗ trợ multi-store, đa ngôn ngữ, đa tiền tệ cho doanh nghiệp mở rộng.'
    }
  ];

  const benefits = [
    {
      title: 'Tối ưu hóa quy trình bán hàng',
      description: 'Tự động hóa từ A-Z, giảm thời gian xử lý đơn hàng xuống 80%'
    },
    {
      title: 'Tăng tỉ lệ chuyển đổi',
      description: 'Trải nghiệm mua sắm mượt mà, checkout nhanh chóng, tăng 35% chuyển đổi'
    },
    {
      title: 'Tiết kiệm chi phí vận hành',
      description: 'Không cần thuê nhân sự IT, giảm 60% chi phí so với thuê developer riêng'
    },
    {
      title: 'Dễ dàng mở rộng',
      description: 'Sẵn sàng scale khi doanh nghiệp phát triển, không giới hạn sản phẩm và đơn hàng'
    }
  ];

  const useCases = [
    { title: 'Cửa hàng thời trang', icon: '👗' },
    { title: 'Mỹ phẩm & làm đẹp', icon: '💄' },
    { title: 'Điện tử – công nghệ', icon: '📱' },
    { title: 'Nội thất – gia dụng', icon: '🛋️' },
    { title: 'Thực phẩm – F&B', icon: '🍔' },
    { title: 'Sách – văn phòng phẩm', icon: '📚' }
  ];

  return (
    <>
      <Header />
      <div className="product-page">
        {/* Hero Section */}
        <section className="product-hero">
          <div className="container">
            <div className="hero-badge">Giải pháp Thương mại điện tử</div>
            <h1 className="hero-title">
              VAS – Hệ Thống TMĐT<br />
              & Thanh Toán Thông Minh
            </h1>
            <p className="hero-description">
              Nền tảng giúp doanh nghiệp xây dựng và vận hành hệ thống thương mại điện tử 
              một cách dễ dàng, tối ưu trải nghiệm người dùng và tích hợp đầy đủ các phương thức thanh toán hiện đại.
            </p>
            <div className="hero-cta">
              <button className="btn-primary-large">Dùng thử 14 ngày miễn phí</button>
              <button className="btn-outline-large">Xem demo trực tiếp</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Tính năng nổi bật</h2>
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
            <h2 className="section-title">Lợi ích cho doanh nghiệp</h2>
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
            <h2 className="section-title">Phù hợp cho các ngành</h2>
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
              <h2>Sẵn sàng bắt đầu bán hàng online?</h2>
              <p>Dùng thử miễn phí 14 ngày – Không cần thẻ tín dụng</p>
              <button className="btn-primary-large">Đăng ký ngay</button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default VAsProductPage;
