import './eContract.css';

function EContract() {
  const features = [
    {
      icon: '📝',
      title: 'Tạo hợp đồng nhanh chóng',
      description: 'Sử dụng mẫu có sẵn hoặc tải lên file hợp đồng của bạn.'
    },
    {
      icon: '📧',
      title: 'Gửi – nhận – ký toàn online',
      description: 'Ký điện tử không gặp mặt, phù hợp làm việc từ xa.'
    },
    {
      icon: '👥',
      title: 'Quy trình ký nhiều bên',
      description: 'Ký song song hoặc theo thứ tự – tuân thủ đúng nghiệp vụ doanh nghiệp.'
    },
    {
      icon: '📁',
      title: 'Quản lý hợp đồng tập trung',
      description: 'Lưu trữ khoa học, phân quyền truy cập, tìm kiếm nhanh chóng.'
    },
    {
      icon: '🔔',
      title: 'Theo dõi trạng thái hợp đồng',
      description: 'Hệ thống thông báo khi hợp đồng được mở, xem, ký hoặc hoàn thành.'
    },
    {
      icon: '🔌',
      title: 'Tích hợp với ERP – CRM – Website',
      description: 'API mở giúp kết nối liền mạch với mọi hệ thống hiện có.'
    }
  ];

  return (
    <section id="solutions" className="econtract">
      <div className="econtract-container">
        <div className="econtract-header">
          <h2 className="section-title">Giải pháp Hợp đồng điện tử – TDT eContract</h2>
          <p className="section-subtitle">
            Tăng tốc quy trình ký kết – tự động hóa toàn bộ vòng đời hợp đồng.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EContract;

