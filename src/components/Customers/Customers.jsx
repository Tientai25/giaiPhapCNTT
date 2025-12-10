import './Customers.css';

function Customers() {
  const ecosystemProducts = [
    {
      name: 'TDT eContract',
      icon: '📝',
      description: 'Giải pháp hợp đồng điện tử chính xác cao để số hóa trải nghiệm khách hàng'
    },
    {
      name: 'TDT ASME',
      icon: '🏢',
      description: 'Giải pháp quản lý doanh nghiệp toàn diện cho SME'
    },
    {
      name: 'TDT eKYC',
      icon: '🆔',
      description: 'Giải pháp định danh điện tử và xác thực khách hàng trực tuyến'
    },
    {
      name: 'TDT iOffice',
      icon: '📄',
      description: 'Hệ thống quản lý văn bản và điều hành doanh nghiệp'
    },
    {
      name: 'TDT Invoice',
      icon: '🧾',
      description: 'Giải pháp hóa đơn điện tử cho doanh nghiệp'
    },
    {
      name: 'SMS Brand Name',
      icon: '📱',
      description: 'Dịch vụ tin nhắn thương hiệu chuyên nghiệp'
    },
    {
      name: 'TDT SmartCA',
      icon: '🔐',
      description: 'Chứng thư số và chữ ký số thông minh'
    },
    {
      name: 'TDT PAY',
      icon: '💳',
      description: 'Giải pháp thanh toán điện tử toàn diện'
    }
  ];

  return (
    <section className="customers">
      <div className="customers-container">
        <h2 className="section-title">Hệ sinh thái TDT</h2>
        <p className="section-subtitle">
          TDT eContract là một giải pháp hệ sinh thái toàn diện cho khách hàng doanh nghiệp từ SME đến SOE
        </p>
        <div className="customers-grid">
          {ecosystemProducts.map((product, index) => (
            <div key={index} className="customer-card">
              <div className="customer-logo">
                <div className="logo-placeholder">{product.icon}</div>
              </div>
              <h3 className="customer-name">{product.name}</h3>
              <p className="customer-description">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Customers;

