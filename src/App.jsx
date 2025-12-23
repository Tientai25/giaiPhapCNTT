import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ContactPage from './pages/ContactPage';
import Pricing from './components/Pricing/Pricing';
import PricingPage from './pages/PricingPage';
import VAsProductPage from './pages/VAsProductPage';
import BusinessManagementPage from './pages/BusinessManagementPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tinh-nang" element={<FeaturesPage />} />
        <Route path="/ve-chung-toi" element={<AboutPage />} />
        <Route path="/dang-nhap" element={<AuthPage />} />
        <Route path="/bao-gia" element={<PricingPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/san-pham/vas-thuong-mai-dien-tu" element={<VAsProductPage />} />
        <Route path="/san-pham/quan-ly-doanh-nghiep" element={<BusinessManagementPage />} />
      </Routes>
    </div>
  );
}

export default App;
