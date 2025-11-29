import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    need: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate with EmailJS or your backend
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã gửi yêu cầu! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      need: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="section-title">Nhận tư vấn miễn phí</h2>
          <p className="section-subtitle">
            Trải nghiệm hệ thống ký số ngay hôm nay
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Họ và tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập email"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Doanh nghiệp</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nhập tên doanh nghiệp"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="need">Nhu cầu</label>
            <textarea
              id="need"
              name="need"
              value={formData.need}
              onChange={handleChange}
              rows="4"
              placeholder="Mô tả nhu cầu của bạn..."
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

