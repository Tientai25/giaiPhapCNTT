import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Giải Pháp Chuyển Đổi Số<br />
            Toàn Diện Cho Doanh Nghiệp
          </h1>
          <p className="hero-subtitle">
            Hệ thống Thương mại điện tử & Phần mềm Quản lý – Tối ưu hiệu suất, tiết kiệm chi phí
          </p>
          <p className="hero-description">
            Từ bán hàng online đến quản trị doanh nghiệp, chúng tôi có giải pháp phù hợp cho mọi quy mô SME.
          </p>
          <div className="hero-cta">
            <button className="btn-primary-large">Dùng thử miễn phí</button>
            <button className="btn-outline-large">Nhận tư vấn giải pháp</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="graphic-circle"></div>
            <div className="graphic-circle"></div>
            <div className="graphic-circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

