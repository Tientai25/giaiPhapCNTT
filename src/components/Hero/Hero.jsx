import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hợp Đồng Điện Tử & Chữ Ký Số<br />
            Cho Doanh Nghiệp Hiện Đại
          </h1>
          <p className="hero-subtitle">
            Tự động hóa toàn bộ quy trình ký kết – nhanh hơn, an toàn hơn, tiết kiệm hơn.
          </p>
          <p className="hero-description">
            Ký mọi lúc, mọi nơi, thay thế hoàn toàn ký tay và lưu trữ giấy tờ.
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

