import './Process.css';

function Process() {
  const steps = [
    {
      number: '1',
      title: 'Tạo hợp đồng',
      description: 'Chọn mẫu / upload file'
    },
    {
      number: '2',
      title: 'Thêm người ký',
      description: 'Gán vai trò, thứ tự ký'
    },
    {
      number: '3',
      title: 'Gửi hợp đồng',
      description: 'Email/SMS mời ký tự động'
    },
    {
      number: '4',
      title: 'Người nhận ký số online',
      description: 'Không cần gặp mặt'
    },
    {
      number: '5',
      title: 'Hoàn tất',
      description: 'Tự động lưu trữ điện tử & xuất file PDF đã ký'
    }
  ];

  return (
    <section className="process">
      <div className="process-container">
        <h2 className="section-title">Quy trình ký hợp đồng điện tử</h2>
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
      </div>
    </section>
  );
}

export default Process;

