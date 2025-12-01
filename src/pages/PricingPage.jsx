import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
// import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Pricing from '../components/Pricing/Pricing';

function PricingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={{ padding: '1rem 2rem', textAlign: 'center', background: '#f8fafc' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            background: 'transparent',
            border: '1px solid #e2e8f0',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#64748b',
            fontSize: '0.9rem'
          }}
        >
          ← Quay lại trang chủ
        </button>
      </div>
      <Pricing />
      <Footer />
    </>
  );
}

export default PricingPage;