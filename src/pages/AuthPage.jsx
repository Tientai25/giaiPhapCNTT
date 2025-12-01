import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Auth from '../components/Auth/Auth';
import Footer from '../components/Footer/Footer';
import useScrollToTop from '../hooks/useScrollToTop';

function AuthPage() {
  const navigate = useNavigate();
  useScrollToTop();

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
      <Auth />
      <Footer />
    </>
  );
}

export default AuthPage;