import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge">SẢN PHẨM CỦA</p>
          <h1 className="hero-title">
            Hợp Đồng Điện Tử<br />
            TDT eContract
          </h1>
          <p className="hero-subtitle">
            Cung cấp giải pháp hợp đồng điện tử cho phép các bên ký kết hợp đồng một cách điện tử
          </p>
          <div className="hero-cta">
            <button className="btn-primary-large">Dùng thử miễn phí</button>
          </div>
          <div className="hero-download">
            <p className="download-text">Tải ứng dụng TDT eContract miễn phí ngay bây giờ!</p>
            <p className="download-subtext">Để ký hợp đồng mọi lúc, mọi nơi</p>
            <div className="app-buttons">
              <span className="app-label">eContract V1</span>
              <button className="app-btn">👍 iOS</button>
              <button className="app-btn">👍 Android</button>
            </div>
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

