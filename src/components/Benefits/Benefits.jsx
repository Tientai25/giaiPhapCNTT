import './Benefits.css';

function Benefits() {
  const benefits = [
    {
      icon: '⏱️',
      title: 'Rút ngắn 90% thời gian ký kết',
      description: 'Không còn chờ chuyển phát, không cần gặp mặt trực tiếp.'
    },
    {
      icon: '💰',
      title: 'Tiết kiệm đến 70% chi phí vận hành',
      description: 'Cắt giảm in ấn, giấy tờ, lưu trữ hồ sơ, chuyển phát nhanh.'
    },
    {
      icon: '📱',
      title: 'Ký mọi lúc, mọi nơi',
      description: 'Hỗ trợ ký trên web và điện thoại, tiện lợi cho mọi bộ phận.'
    },
    {
      icon: '📊',
      title: 'Theo dõi trạng thái hợp đồng theo thời gian thực',
      description: 'Biết ngay khi đối tác mở, xem, ký hoặc từ chối.'
    },
    {
      icon: '🔒',
      title: 'Tuân thủ pháp lý – an toàn tuyệt đối',
      description: 'Đáp ứng tiêu chuẩn Nghị định 130, Thông tư 06 và các quy định pháp luật Việt Nam.'
    }
  ];

  return (
    <section className="benefits">
      <div className="benefits-container">
        <h2 className="section-title">Lợi ích khi chuyển sang Hợp đồng điện tử</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;

