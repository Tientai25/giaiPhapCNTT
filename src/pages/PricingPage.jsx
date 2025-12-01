import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
// import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Pricing from '../components/Pricing/Pricing';
import '../styles/PricingPage.css';
import '../styles/mobile.css';
import useScrollToTop from '../hooks/useScrollToTop';

function PricingPage() {
  const navigate = useNavigate();
  useScrollToTop();

  return (
    <>
      <Header />

      <section className="pricing-hero">
        <div className="pricing-hero-inner">
          <div className="hero-text">
            <h1>Giải pháp & Bảng giá</h1>
            <p className="subtitle">Chọn gói phù hợp với tổ chức của bạn — từ cá nhân đến doanh nghiệp lớn.</p>
          </div>
        </div>
      </section>

      <main className="pricing-page-container">
        <Pricing />
      </main>

      <Footer />
    </>
  );
}

export default PricingPage;