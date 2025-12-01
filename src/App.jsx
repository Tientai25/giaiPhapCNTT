import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ContactPage from './pages/ContactPage';
import Pricing from './components/Pricing/Pricing';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dang-nhap" element={<AuthPage />} />
        <Route path="/bao-gia" element={<PricingPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
