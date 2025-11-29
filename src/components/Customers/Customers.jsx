import './Customers.css';

function Customers() {
  const customers = [
    {
      name: 'VMG Media',
      description: 'Số hóa toàn bộ quy trình ký kết, giảm mạnh thời gian xử lý hợp đồng.'
    },
    {
      name: 'Gtel',
      description: 'Ứng dụng ký số và hợp đồng điện tử cho quản trị nội bộ & đối tác.'
    },
    {
      name: 'BIDV',
      description: 'Ký số cho tài liệu nghiệp vụ, biểu mẫu, quy trình phê duyệt nội bộ.'
    },
    {
      name: 'CMC',
      description: 'Tích hợp ký số vào hệ thống quản trị giúp tối ưu vận hành và phê duyệt.'
    }
  ];

  return (
    <section className="customers">
      <div className="customers-container">
        <h2 className="section-title">Khách hàng tiêu biểu</h2>
        <p className="section-subtitle">
          Những doanh nghiệp lớn tin tưởng lựa chọn TDT
        </p>
        <div className="customers-grid">
          {customers.map((customer, index) => (
            <div key={index} className="customer-card">
              <div className="customer-logo">
                <div className="logo-placeholder">{customer.name.charAt(0)}</div>
              </div>
              <h3 className="customer-name">{customer.name}</h3>
              <p className="customer-description">{customer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Customers;

