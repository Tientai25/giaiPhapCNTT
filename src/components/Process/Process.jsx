import './Process.css';

function Process() {
  const steps = [
    {
      number: '01',
      title: 'Tạo hợp đồng',
      description: 'Tạo hợp đồng từ mẫu hợp đồng có sẵn, hoặc soạn hợp đồng trực tiếp trên ứng dụng, hoặc tải lên file hợp đồng có sẵn'
    },
    {
      number: '02',
      title: 'Gửi đến các bên ký hợp đồng',
      description: 'Thêm người ký và gửi thông báo đến các bên tham gia'
    },
    {
      number: '03',
      title: 'Thương thảo trực tuyến',
      description: 'Các bên có thể thảo luận, theo dõi thay đổi và điều chỉnh hợp đồng trực tuyến'
    },
    {
      number: '04',
      title: 'Ký kết hợp đồng',
      description: 'Các bên ký kết hợp đồng bằng chữ ký số mọi lúc, mọi nơi'
    }
  ];

  return (
    <section className="process">
      <div className="process-container">
        <h2 className="section-title">Quy trình ký hợp đồng điện tử</h2>
        <p className="section-subtitle">Quản lý & ký kết hợp đồng điện tử cho các bên tham gia mọi lúc, mọi nơi</p>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
        <div className="cta-section">
          <p className="cta-text">Trải nghiệm TDT eContract ngay bây giờ</p>
          <p className="cta-subtext">Để ký hợp đồng mọi lúc, mọi nơi</p>
          <button className="btn-primary-large">Dùng thử miễn phí</button>
        </div>
      </div>
    </section>
  );
}

export default Process;

