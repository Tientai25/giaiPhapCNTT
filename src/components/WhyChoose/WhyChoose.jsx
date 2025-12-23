import './WhyChoose.css';

function WhyChoose() {
  const legalPoints = [
    {
      icon: '📜',
      title: 'Luật Giao dịch Điện tử 2005 - Điều 34',
      description: 'Giá trị pháp lý của một hợp đồng điện tử cụ thể được công nhận: "Giá trị pháp lý của hợp đồng điện tử không thể bị phủ nhận chỉ vì nó được thể hiện dưới dạng thông điệp dữ liệu"'
    },
    {
      icon: '✅',
      title: 'Luật Giao dịch Điện tử 2005 - Điều 14',
      description: 'Quy định: "Thông điệp dữ liệu không được phủ nhận giá trị làm chứng cứ chỉ vì nó là thông điệp dữ liệu"'
    },
    {
      icon: '⚖️',
      title: 'Tuân thủ đầy đủ pháp luật Việt Nam',
      description: 'TDT eContract đáp ứng đầy đủ các điều kiện và nguyên tắc của Luật Giao dịch Điện tử Việt Nam'
    }
  ];

  return (
    <section className="why-choose">
      <div className="why-choose-container">
        <h2 className="section-title">Cơ sở pháp lý</h2>
        <p className="section-subtitle">
          Tuân thủ đầy đủ Luật Giao dịch Điện tử Việt Nam,<br/>
          đảm bảo giá trị pháp lý tối đa cho hợp đồng của bạn
        </p>
        <div className="reasons-grid">
          {legalPoints.map((point, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon">{point.icon}</div>
              <h3 className="reason-title">{point.title}</h3>
              <p className="reason-description">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;

