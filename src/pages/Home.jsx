import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Benefits from '../components/Benefits/Benefits';
import ECommerce from '../components/ECommerce/ECommerce';
import BusinessManagement from '../components/BusinessManagement/BusinessManagement';
import Process from '../components/Process/Process';
import WhyChoose from '../components/WhyChoose/WhyChoose';
import Customers from '../components/Customers/Customers';

import Footer from '../components/Footer/Footer';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  useScrollToTop();

  useEffect(() => {
    if (location.state?.sectionId) {
      const section = document.getElementById(location.state.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      navigate('.', { replace: true, state: null });
    }
  }, [location, navigate]);

  return (
    <>
      <Header />
      <Hero />
      <ECommerce />
      <BusinessManagement />
      <Benefits />
      <Process />
      <WhyChoose />
      <Customers />   
      <Footer />
    </>
  );
}

export default Home;

