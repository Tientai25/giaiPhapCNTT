import './WhyChoose.css';

function WhyChoose() {
  const reasons = [
    {
      icon: '🎯',
      title: 'Giải pháp chuyên sâu vào ký số và hợp đồng điện tử',
      description: 'Tập trung đúng nhu cầu thực tế của doanh nghiệp.'
    },
    {
      icon: '🔒',
      title: 'Bảo mật cao – công nghệ hiện đại',
      description: 'Hệ thống an toàn, mã hóa toàn diện, log mọi thao tác.'
    },
    {
      icon: '🔌',
      title: 'Tích hợp đa nền tảng',
      description: 'Kết nối nhanh với ERP, CRM, website, mobile app.'
    },
    {
      icon: '⚡',
      title: 'Tối ưu quy trình vận hành',
      description: 'Rút ngắn thời gian xử lý, tăng năng suất bộ phận.'
    },
    {
      icon: '👨‍💼',
      title: 'Đội ngũ triển khai có kinh nghiệm',
      description: 'Hỗ trợ 24/7, bám sát nghiệp vụ, đảm bảo vận hành ổn định.'
    }
  ];

  return (
    <section className="why-choose">
      <div className="why-choose-container">
        <h2 className="section-title">Vì sao doanh nghiệp chọn TDT eContract & eSign?</h2>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon">{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;

