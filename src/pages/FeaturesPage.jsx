import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useEffect } from 'react';
import useScrollToTop from '../hooks/useScrollToTop';
import './FeaturesPage.css';

function FeaturesPage() {
  useScrollToTop();

  const allFeatures = [
    {
      category: 'Quản lý hợp đồng',
      icon: '📋',
      features: [
        {
          title: 'Tạo hợp đồng từ mẫu',
          description: 'Thư viện mẫu hợp đồng đa dạng, sẵn sàng sử dụng cho nhiều lĩnh vực khác nhau'
        },
        {
          title: 'Soạn thảo trực tiếp',
          description: 'Công cụ soạn thảo trực quan, dễ dàng tạo hợp đồng theo yêu cầu riêng'
        },
        {
          title: 'Upload file có sẵn',
          description: 'Hỗ trợ upload file PDF, Word và chuyển đổi thành hợp đồng điện tử'
        },
        {
          title: 'Quản lý phiên bản',
          description: 'Theo dõi lịch sử thay đổi, so sánh các phiên bản hợp đồng'
        }
      ]
    },
    {
      category: 'Chữ ký số',
      icon: '✍️',
      features: [
        {
          title: 'Chữ ký số từ xa',
          description: 'Ký hợp đồng bằng chữ ký số từ bất kỳ đâu, không cần thiết bị USB Token'
        },
        {
          title: 'Đa dạng nhà cung cấp',
          description: 'Hỗ trợ tất cả các tổ chức cấp chứng thư số được cấp phép tại Việt Nam'
        },
        {
          title: 'Chữ ký số đám mây',
          description: 'SmartCA - giải pháp chữ ký số trên nền tảng đám mây, tiện lợi và an toàn'
        },
        {
          title: 'Xác thực sinh trắc học',
          description: 'Tích hợp xác thực vân tay, khuôn mặt để bảo mật tối đa'
        }
      ]
    },
    {
      category: 'Định danh điện tử',
      icon: '🆔',
      features: [
        {
          title: 'eKYC - Định danh trực tuyến',
          description: 'Xác thực danh tính khách hàng tự động qua CMND/CCCD'
        },
        {
          title: 'Video Call KYC',
          description: 'Xác minh danh tính qua video call trực tiếp với nhân viên'
        },
        {
          title: 'OCR thông minh',
          description: 'Trích xuất thông tin từ giấy tờ tùy thân tự động, chính xác cao'
        },
        {
          title: 'AI Face Matching',
          description: 'So khớp khuôn mặt với ảnh trên giấy tờ bằng công nghệ AI'
        }
      ]
    },
    {
      category: 'Thương thảo & Phê duyệt',
      icon: '💬',
      features: [
        {
          title: 'Thương thảo trực tuyến',
          description: 'Trao đổi, bình luận trực tiếp trên hợp đồng giữa các bên'
        },
        {
          title: 'Theo dõi thay đổi',
          description: 'Ghi lại tất cả các sửa đổi, ai thay đổi, thay đổi gì, khi nào'
        },
        {
          title: 'Quy trình phê duyệt',
          description: 'Thiết lập quy trình phê duyệt nhiều cấp, linh hoạt theo doanh nghiệp'
        },
        {
          title: 'Thông báo tự động',
          description: 'Gửi email/SMS thông báo đến các bên liên quan theo từng bước'
        }
      ]
    },
    {
      category: 'Bảo mật & An toàn',
      icon: '🔒',
      features: [
        {
          title: 'Mã hóa đầu cuối',
          description: 'Áp dụng công nghệ mã hóa khóa công khai bảo vệ nội dung hợp đồng'
        },
        {
          title: 'Blockchain',
          description: 'Lưu trữ hash hợp đồng trên Blockchain VNPT, chống giả mạo'
        },
        {
          title: 'Kiểm soát truy cập',
          description: 'Chỉ các bên tham gia mới được xem và thao tác với hợp đồng'
        },
        {
          title: 'Bảo vệ bằng mật khẩu',
          description: 'Chia sẻ tài liệu với mật khẩu, tăng cường bảo mật'
        },
        {
          title: 'Audit Log',
          description: 'Ghi lại toàn bộ lịch sử truy cập và thao tác trên hợp đồng'
        },
        {
          title: 'Sao lưu tự động',
          description: 'Hệ thống tự động sao lưu dữ liệu định kỳ, đảm bảo an toàn'
        }
      ]
    },
    {
      category: 'Tích hợp & API',
      icon: '🔗',
      features: [
        {
          title: 'RESTful API',
          description: 'API đầy đủ để tích hợp với hệ thống hiện có của doanh nghiệp'
        },
        {
          title: 'Webhook',
          description: 'Nhận thông báo real-time về trạng thái hợp đồng'
        },
        {
          title: 'Single Sign-On (SSO)',
          description: 'Đăng nhập một lần, sử dụng nhiều hệ thống'
        },
        {
          title: 'Tích hợp ERP/CRM',
          description: 'Kết nối liền mạch với các phần mềm quản lý doanh nghiệp'
        }
      ]
    },
    {
      category: 'WAAP - Web Application & API Protection',
      icon: '🛡️',
      features: [
        {
          title: 'CDN toàn cầu',
          description: '2800+ PoPs, 70+ quốc gia - Tăng tốc độ truy cập website'
        },
        {
          title: 'DDoS Protection',
          description: 'Bảo vệ chống tấn công từ chối dịch vụ phân tán'
        },
        {
          title: 'WAF - Web Application Firewall',
          description: 'Tường lửa ứng dụng web, chặn các cuộc tấn công web'
        },
        {
          title: 'Bot Management',
          description: 'Quản lý và chặn bot độc hại, bảo vệ tài nguyên'
        },
        {
          title: 'API Security',
          description: 'Bảo mật API với AI Central Engine'
        },
        {
          title: 'Hợp tác CDNetworks',
          description: 'Đối tác chiến lược toàn cầu về bảo mật và CDN'
        }
      ]
    },
    {
      category: 'CustomerCare - Chăm sóc khách hàng',
      icon: '🤝',
      features: [
        {
          title: 'Kiến trúc Microservice',
          description: 'Hệ thống linh hoạt, dễ mở rộng theo nhu cầu'
        },
        {
          title: 'Quản lý tài khoản',
          description: 'Quản lý thông tin khách hàng tập trung, hiệu quả'
        },
        {
          title: 'Hệ thống ticket',
          description: 'Theo dõi và xử lý yêu cầu hỗ trợ chuyên nghiệp'
        },
        {
          title: 'Quản lý nhân sự',
          description: 'Phân quyền và quản lý đội ngũ chăm sóc khách hàng'
        },
        {
          title: 'Cổng thông tin khách hàng',
          description: 'Portal cho khách hàng tự tra cứu và quản lý dịch vụ'
        },
        {
          title: 'Tích hợp đa kênh',
          description: 'Email, SMS, Chat, Social Media - Tất cả trong một'
        }
      ]
    },
    {
      category: 'Hóa đơn điện tử',
      icon: '🧾',
      features: [
        {
          title: 'Tuân thủ pháp luật',
          description: 'Đáp ứng đầy đủ quy định về hóa đơn điện tử Việt Nam'
        },
        {
          title: 'Ký số tự động',
          description: 'Tích hợp chữ ký số, đảm bảo tính pháp lý'
        },
        {
          title: 'Báo cáo thuế',
          description: 'Xuất báo cáo thuế theo quy định cơ quan thuế'
        },
        {
          title: 'Phân tích doanh thu',
          description: 'Dashboard thống kê, phân tích doanh thu chi tiết'
        },
        {
          title: 'Đa ngành nghề',
          description: 'Áp dụng cho bán lẻ, TMĐT, sản xuất, ngân hàng'
        },
        {
          title: 'Gửi tự động',
          description: 'Gửi hóa đơn qua email/SMS tự động cho khách hàng'
        }
      ]
    },
    {
      category: 'Báo cáo & Phân tích',
      icon: '📊',
      features: [
        {
          title: 'Dashboard tổng quan',
          description: 'Thống kê trực quan về số lượng, trạng thái hợp đồng'
        },
        {
          title: 'Báo cáo chi tiết',
          description: 'Xuất báo cáo theo nhiều tiêu chí: thời gian, bộ phận, loại hợp đồng'
        },
        {
          title: 'Phân tích xu hướng',
          description: 'Biểu đồ xu hướng ký kết, giúp dự báo và ra quyết định'
        },
        {
          title: 'Export dữ liệu',
          description: 'Xuất dữ liệu ra Excel, PDF phục vụ báo cáo nội bộ'
        }
      ]
    },
    {
      category: 'Hỗ trợ đa nền tảng',
      icon: '📱',
      features: [
        {
          title: 'Web Application',
          description: 'Truy cập qua trình duyệt, không cần cài đặt'
        },
        {
          title: 'Mobile App iOS',
          description: 'Ứng dụng di động cho iPhone, iPad'
        },
        {
          title: 'Mobile App Android',
          description: 'Ứng dụng di động cho điện thoại và máy tính bảng Android'
        },
        {
          title: 'Responsive Design',
          description: 'Giao diện tự động điều chỉnh theo kích thước màn hình'
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      
      <section className="features-hero">
        <div className="features-hero-container">
          <h1 className="features-hero-title">Tính năng toàn diện</h1>
          <p className="features-hero-subtitle">
            TDT eContract cung cấp đầy đủ các tính năng cần thiết cho quản lý và ký kết hợp đồng điện tử
          </p>
        </div>
      </section>

      <section className="features-content">
        <div className="features-container">
          {allFeatures.map((category, index) => (
            <div key={index} className="feature-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2 className="category-title">{category.category}</h2>
              </div>
              <div className="features-grid">
                {category.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <div className="feature-number">{String(idx + 1).padStart(2, '0')}</div>
                    <h3 className="feature-item-title">{feature.title}</h3>
                    <p className="feature-item-description">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="features-cta">
        <div className="features-cta-container">
          <h2 className="cta-title">Sẵn sàng trải nghiệm TDT eContract?</h2>
          <p className="cta-subtitle">Đăng ký dùng thử miễn phí ngay hôm nay</p>
          <button className="btn-primary-large">Dùng thử miễn phí</button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FeaturesPage;
