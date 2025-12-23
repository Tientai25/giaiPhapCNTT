import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useScrollToTop from '../hooks/useScrollToTop';
import './AboutPage.css';

function AboutPage() {
  useScrollToTop();

  const services = [
    {
      icon: '🏗️',
      title: 'Tư vấn – Thiết kế hạ tầng CNTT',
      items: [
        'Thiết kế hệ thống LAN/WAN bảo mật, mở rộng',
        'Triển khai server & storage',
        'Giải pháp Cloud Computing tối ưu chi phí & linh hoạt'
      ]
    },
    {
      icon: '💻',
      title: 'Phát triển phần mềm "may đo"',
      items: [
        'Web application: cổng thông tin, quản lý, TMĐT',
        'Mobile app: iOS & Android',
        'Phần mềm theo yêu cầu doanh nghiệp'
      ]
    },
    {
      icon: '🔄',
      title: 'Giải pháp chuyển đổi số',
      items: [
        'Hợp đồng điện tử (eContract)',
        'Cổng thông tin điện tử (Portal)',
        'Chăm sóc khách hàng (CustomerCare)',
        'Hóa đơn – biên lai điện tử'
      ]
    },
    {
      icon: '🛡️',
      title: 'An toàn thông tin',
      items: [
        'Bảo mật từ mạng – ứng dụng – dữ liệu',
        'Thiết kế hệ thống ATTT theo Nghị định 85/2016/NĐ-CP',
        'Đánh giá, kiểm tra lỗ hổng bảo mật',
        'Đào tạo & luyện thi chứng chỉ ATTT'
      ]
    }
  ];

  const technologies = [
    {
      category: 'Hạ tầng & DevOps',
      icon: '🔧',
      items: ['Kubernetes', 'Rancher', 'GitLab', 'ArgoCD', 'Cloud Native – GitOps']
    },
    {
      category: 'Lập trình',
      icon: '💻',
      items: ['Backend: Go, Go-zero', 'Frontend/Mobile: React Native, Flutter']
    },
    {
      category: 'Dữ liệu & xử lý',
      icon: '📊',
      items: ['Kafka', 'Redis', 'Elasticsearch', 'PostgreSQL', 'MySQL', 'MongoDB', 'Ceph', 'MinIO']
    }
  ];

  const certifications = [
    'Business Analysis (CCBA)',
    'Cloud & DevOps (Google, Kubernetes)',
    'Security: CISSP, CISM, CISA, CEH, OSWE, OSED',
    'Testing: ISTQB Foundation & Advanced'
  ];

  const whyChoose = [
    {
      icon: '👥',
      title: 'Đội ngũ chuyên gia giàu kinh nghiệm',
      description: 'Với chứng chỉ quốc tế và kinh nghiệm thực tế'
    },
    {
      icon: '🤝',
      title: 'Đồng hành từ triển khai đến vận hành',
      description: 'Hỗ trợ toàn diện trong suốt quá trình'
    },
    {
      icon: '💰',
      title: 'Giải pháp linh hoạt theo ngân sách',
      description: 'Tối ưu chi phí, phù hợp từng doanh nghiệp'
    },
    {
      icon: '🚀',
      title: 'Liên tục đổi mới công nghệ',
      description: 'Áp dụng công nghệ hiện đại, cập nhật xu hướng'
    }
  ];

  return (
    <div className="about-page">
      <Header />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <h1 className="about-hero-title">Về TDT Company</h1>
          <p className="about-hero-subtitle">
            Công ty Cổ phần Dịch vụ Công nghệ và Chuyển đổi số
          </p>
          <div className="about-hero-info">
            <div className="info-item">
              <span className="info-icon">📅</span>
              <span>Thành lập: 01/2021</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <span>Lĩnh vực: Công nghệ thông tin – Chuyển đổi số – An toàn thông tin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-card">
              <div className="card-icon">🎯</div>
              <h2>Tầm nhìn</h2>
              <p>
                Trở thành công ty công nghệ phục vụ chuyển đổi số cho doanh nghiệp phát triển bền vững.
                Kết hợp tri thức – đoàn kết – công nghệ ở tầm cao mới.
              </p>
            </div>
            <div className="vision-card">
              <div className="card-icon">🤝</div>
              <h2>Cam kết dịch vụ</h2>
              <ul>
                <li>✅ Phản hồi nhanh, hiệu quả</li>
                <li>✅ Đảm bảo dịch vụ hoạt động liên tục</li>
                <li>✅ Thái độ phục vụ nhiệt tình, chuyên nghiệp</li>
                <li>✅ Giá cả hợp lý, cạnh tranh</li>
                <li>✅ Đào tạo nhân sự liên tục, chuyên môn cao</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy">
        <div className="container">
          <h2 className="section-title">Định hướng & Triết lý hoạt động</h2>
          <div className="philosophy-grid">
            <div className="philosophy-item">
              <span className="philosophy-icon">💡</span>
              <h3>Sáng tạo & hợp tác</h3>
            </div>
            <div className="philosophy-item">
              <span className="philosophy-icon">🚀</span>
              <h3>Tiên phong đổi mới</h3>
            </div>
            <div className="philosophy-item">
              <span className="philosophy-icon">🤝</span>
              <h3>Đồng hành cùng khách hàng</h3>
            </div>
            <div className="philosophy-item">
              <span className="philosophy-icon">⚙️</span>
              <h3>Hiệu quả – bền vững – tối ưu</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Lĩnh vực & Dịch vụ chính</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <ul className="service-list">
                  {service.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="technologies-section">
        <div className="container">
          <h2 className="section-title">Nền tảng công nghệ sử dụng</h2>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-icon">{tech.icon}</div>
                <h3>{tech.category}</h3>
                <div className="tech-tags">
                  {tech.items.map((item, idx) => (
                    <span key={idx} className="tech-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="tech-advantages">
            <h3>Ưu thế công nghệ</h3>
            <div className="advantages-grid">
              <div className="advantage-item">
                <span className="advantage-icon">✅</span>
                <p>Tự động hóa & kiểm soát phiên bản chặt chẽ</p>
              </div>
              <div className="advantage-item">
                <span className="advantage-icon">⚡</span>
                <p>Hiệu suất cao với Big Data & streaming</p>
              </div>
              <div className="advantage-item">
                <span className="advantage-icon">📈</span>
                <p>Mở rộng linh hoạt từ nhỏ đến lớn</p>
              </div>
              <div className="advantage-item">
                <span className="advantage-icon">🔗</span>
                <p>Đa nền tảng – tương thích cao</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section">
        <div className="container">
          <h2 className="section-title">Năng lực & Chứng chỉ đội ngũ</h2>
          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-item">
                <span className="cert-icon">🏆</span>
                <p>{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Lý do chọn TDT Company</h2>
          <div className="why-grid">
            {whyChoose.map((item, index) => (
              <div key={index} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <h2 className="section-title">Thông tin liên hệ</h2>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Địa chỉ</h4>
                <p>Tầng 2, Tòa nhà Detech Tower, 8 Tôn Thất Thuyết,<br/>Mỹ Đình 2, Nam Từ Liêm, Hà Nội</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Hotline</h4>
                <p>0919 437 678</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>contact@digitalservices.vn</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon">🌐</span>
              <div>
                <h4>Website</h4>
                <p>www.digitalservices.vn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;
